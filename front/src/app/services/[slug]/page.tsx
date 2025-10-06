"use client";

import { ServicesItems } from "@/helpers/ServicesItems";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const ServiceDetailPage = ({ params }: Props) => {
  // Desenvuelve la promesa de params
  const { slug } = use(params);

  const service = ServicesItems.find((item) => item.slug === slug);

  if (!service)
    return <p className="text-white p-6">Servicio no encontrado</p>;

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white py-10 px-4">
      <div className="max-w-[70%] mx-auto flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-center">{service.name}</h1>

        <div className="w-full flex justify-center rounded-3xl overflow-hidden">
        <Image
            src={service.image}
            alt={service.name}
            width={800}       // ancho deseado
            height={500}      // altura proporcional
            className="object-contain rounded-3xl"
        />
        </div>
        <p className="text-gray-300 text-lg w-full text-left">{service.description}</p>
        <p className="text-white font-bold text-xl w-full text-left">
          Precio: {service.price}
        </p>

        <Link
          href="/services"
          className="mt-4 px-6 py-2 rounded-full border border-blue-400 text-white font-bold hover:bg-blue-400 transition-colors"
        >
          Volver a Servicios
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
