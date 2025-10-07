'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Paginator from "@/components/paginator";

const MySwal = withReactContent(Swal);

type StatusType = "pending" | "completed" | "canceled" | "acepted" | "refused";

type Order = {
  _id: string;
  user?: { username: string };
  service: { name: string; price: number; description: string; imageUrl: string };
  total: number;
  status: StatusType;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export default function OrdersAdmin() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("https://technova-backend-kappa.vercel.app/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al obtener solicitudes");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar las solicitudes",
          background: "#0a0f1c",
          color: "#e5e7eb",
          confirmButtonColor: "#3B82F6",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, user]);

  const handleUpdateStatus = async (orderId: string, newStatus: StatusType) => {
    const result = await MySwal.fire({
      title: `¿Cambiar estado a "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
      background: "#0a0f1c",
      color: "#e5e7eb",
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`https://technova-backend-kappa.vercel.app/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("No se pudo actualizar la solicitud");

      setOrders(prev => prev.map(order => order._id === orderId ? { ...order, status: newStatus } : order));

      MySwal.fire({
        icon: "success",
        title: "Estado actualizado",
        background: "#0a0f1c",
        color: "#e5e7eb",
        confirmButtonColor: "#3B82F6",
      });
    } catch (err) {
      console.error(err);
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la solicitud",
        background: "#0a0f1c",
        color: "#e5e7eb",
        confirmButtonColor: "#3B82F6",
      });
    }
  };

  if (!user || user.role !== "admin") 
    return <p className="text-white text-center mt-10">No tienes permisos para ver esta página.</p>;

  if (loading) return <p className="text-white text-center mt-10">Cargando solicitudes...</p>;
  if (orders.length === 0) return <p className="text-white text-center mt-10">No hay solicitudes registradas.</p>;

  const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-[1200px] mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-3">
        Solicitudes de todos los usuarios
      </h2>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {paginatedOrders.map(order => (
          <div key={order._id} className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-40 h-32 sm:h-32 flex-shrink-0">
              <Image
                src={order.service.imageUrl || "https://via.placeholder.com/150x100?text=Servicio"}
                alt={order.service.name}
                fill
                className="object-cover rounded-xl"
              />
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Usuario: {order.user?.username || "Desconocido"}</p>
                <p className="text-gray-400 text-sm mb-1">Solicitud: {order._id.slice(-6).toUpperCase()}</p>

                <h3 className="text-xl font-semibold text-white">{order.service.name}</h3>
                <p className="text-gray-400 mb-2">{order.service.description}</p>
                <p className="text-blue-400 font-semibold mb-2">Precio: ${order.total.toFixed(2)}</p>

                <p className="mb-2">
                  Estado:{" "}
                  <span
                    className={`font-bold px-2 py-1 rounded-full text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-400/20 text-yellow-400"
                        : order.status === "completed"
                          ? "bg-green-400/20 text-green-400"
                          : order.status === "canceled"
                            ? "bg-red-400/20 text-red-400"
                            : order.status === "acepted"
                              ? "bg-blue-400/20 text-blue-400"
                              : "bg-gray-400/20 text-gray-400"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </p>

                {order.notes && <p className="text-gray-300 mb-2"><span className="font-semibold">Notas:</span> {order.notes}</p>}

                {/* Botones admin */}
                {order.status === "pending" && (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm"
                      onClick={() => handleUpdateStatus(order._id, "acepted")}
                    >
                      Aceptar
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm"
                      onClick={() => handleUpdateStatus(order._id, "refused")}
                    >
                      Rechazar
                    </button>
                  </div>
                )}

                {order.status === "acepted" && (
                  <button
                    className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm mt-2"
                    onClick={() => handleUpdateStatus(order._id, "completed")}
                  >
                    Marcar completada
                  </button>
                )}
              </div>

              <p className="text-gray-500 text-sm mt-2">Solicitado el: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-500 text-sm mt-1">Última actualización: {new Date(order.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}
