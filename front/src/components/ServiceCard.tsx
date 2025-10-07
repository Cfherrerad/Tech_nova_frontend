'use client';

import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAuth } from "@/context/AuthContext";

const MySwal = withReactContent(Swal);

export interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  active: boolean;
}

const ServiceCard = ({ service }: { service: Service }) => {
  const { token, user } = useAuth();

  const handleDelete = async () => {
    const result = await MySwal.fire({
      title: "¿Eliminar servicio?",
      text: `Se eliminará "${service.name}". Esta acción no se puede deshacer.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#0a0f1c",
      color: "#e5e7eb",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      customClass: {
        popup: "rounded-2xl shadow-lg border border-[#1b2447]",
        title: "text-white",
      },
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://technova-backend-kappa.vercel.app/api/services/${service._id}`,
          { method: "DELETE", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error("Error al eliminar servicio");

        await MySwal.fire({
          icon: "success",
          title: "Servicio eliminado",
          text: `"${service.name}" fue eliminado correctamente.`,
          background: "#0a0f1c",
          color: "#e5e7eb",
          confirmButtonColor: "#3B82F6",
        });

        window.location.reload();
      } catch (error) {
        console.error(error);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar el servicio.",
          background: "#0a0f1c",
          color: "#e5e7eb",
          confirmButtonColor: "#3B82F6",
        });
      }
    }
  };

  // 🔹 Nueva función para solicitar servicio con notas
  const handleRequestService = async () => {
    if (!service.active) return;

    const { value: notes } = await MySwal.fire({
      title: "Agregar notas",
      input: 'textarea',
      inputPlaceholder: 'Escribe aquí cualquier detalle sobre la solicitud',
      showCancelButton: true,
      confirmButtonText: 'Enviar solicitud',
      cancelButtonText: 'Cancelar',
      background: "#0a0f1c",
      color: "#e5e7eb",
      inputAttributes: {
        'aria-label': 'Notas de la solicitud'
      },
    });

    if (notes !== undefined) {
      try {
        const res = await fetch("https://technova-backend-kappa.vercel.app/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ serviceId: service._id, notes }),
        });

        if (!res.ok) throw new Error("Error al solicitar servicio");

        await MySwal.fire({
          icon: "success",
          title: "Solicitud enviada",
          text: `Has solicitado "${service.name}" correctamente.`,
          background: "#0a0f1c",
          color: "#e5e7eb",
          confirmButtonColor: "#3B82F6",
        });
      } catch (err) {
        console.error(err);
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo enviar la solicitud",
          background: "#0a0f1c",
          color: "#e5e7eb",
          confirmButtonColor: "#3B82F6",
        });
      }
    }
  };

  return (
    <div
      className={`relative flex flex-col bg-gray-900 border border-gray-700 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition-all ${
        !service.active ? "opacity-70" : ""
      }`}
    >
      {/* Badge de inactivo */}
      {!service.active && (
        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs z-10">
          Inactivo
        </span>
      )}

      {/* Imagen */}
      <div className="relative w-full h-48">
        <Image
          src={service.imageUrl || "https://via.placeholder.com/300x200?text=Servicio"}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{service.name}</h3>
          <p className="text-gray-400 text-sm mb-3">
            {service.description.length > 100
              ? service.description.substring(0, 100) + "..."
              : service.description}
          </p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-blue-400 font-semibold text-lg">${service.price.toFixed(2)}</span>
        </div>

        {/* Botones */}
        <div className="flex justify-between items-center mt-2 gap-2">
          {/* Botón ver detalle */}
          <Link
            href={`/services/${service._id}`}
            className="flex-1 text-center bg-yellow-600 hover:bg-yellow-500 text-white text-sm px-3 py-2 rounded-md transition-all"
          >
            Ver detalle
          </Link>

          {/* Admin: editar/eliminar */}
          {user?.role === "admin" && (
            <>
              <Link
                href={`/services/edit/${service._id}`}
                className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-2 rounded-md transition-all"
              >
                Editar
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-2 rounded-md transition-all"
              >
                Eliminar
              </button>
            </>
          )}

          {/* Usuario normal: solicitar servicio */}
          {user && user.role !== "admin" && (
            <button
              disabled={!service.active}
              onClick={handleRequestService}
              className={`flex-1 text-center text-white text-sm px-3 py-2 rounded-md transition-all ${
                service.active
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              {service.active ? "Solicitar servicio" : "Inactivo"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
