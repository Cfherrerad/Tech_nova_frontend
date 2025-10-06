"use client";

import { useEffect, useState } from "react";
import ServiceCard from "@/components/ServiceCard";

// 👇 Tipo del servicio basado en tu modelo
interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  imageId?: string | null;
  active: boolean;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true); // 🔄 estado de carga
  const [error, setError] = useState<string | null>(null); // ⚠️ manejo de errores

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/services");
        if (!res.ok) throw new Error("Error al cargar los servicios");
        const data: Service[] = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Error al cargar servicios:", err);
        setError("No se pudieron cargar los servicios. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="pb-10">
      <h2 className="text-3xl font-bold ml-6 mt-8 mb-4 text-white">
        Nuestros Servicios
      </h2>

      {loading ? (
        // 🌀 Mientras carga
        <p className="text-center text-gray-400 mt-10">Cargando servicios...</p>
      ) : error ? (
        // ⚠️ Si hubo error
        <p className="text-center text-red-500 mt-10">{error}</p>
      ) : services.length === 0 ? (
        // 🚫 Si no hay servicios
        <p className="text-center text-gray-400 mt-10">
          No hay servicios disponibles por el momento.
        </p>
      ) : (
        // ✅ Si hay servicios, mostrar las tarjetas
        <div
          className="
            grid 
            sm:grid-cols-2 lg:grid-cols-3 
            gap-6
            px-2 
            max-w-[1200px]
            mx-auto
            justify-items-center
            mt-6 mb-15
          "
        >
          {services.map((service) => (
            <ServiceCard service={service} key={service._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;
