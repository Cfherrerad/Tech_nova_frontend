import { Service } from "@/interfaces/service.interface";
import Image from "next/image";

interface CardProps {
    service: Service;
}

const ServiceCard = ({ service }: CardProps) => {
  return (
    <div className="flex flex-col bg-[#0f1630] shadow-md border border-[#1b2447] rounded-3xl w-[300px] h-[420px] mx-2 overflow-hidden">
      {/* Imagen */}
      <div className="relative w-full h-40">
        <Image
          src={service.image}
          alt={`Imagen de ${service.name}`}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col justify-between flex-grow p-4">
        {/* Nombre y descripción */}
        <div>
          <h3 className="text-white text-lg font-bold mb-2">
            {service.name}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
            {service.description}
          </p>
        </div>

        {/* Precio y botón al final */}
        <div className="mt-4 flex flex-col gap-2">
          <p className="text-white text-base font-bold">
            {service.price}
          </p>
          <button
            className="rounded-full w-full bg-transparent border border-blue-400 text-white py-2 text-center text-sm font-bold transition-all hover:bg-blue-400 hover:text-white"
            type="button"
          >
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  );
};


export default ServiceCard;