import ServiceCard from "@/components/ServiceCard";
import { ServicesItems } from "@/helpers/ServicesItems";

export default function services() {


  return (
<div>
  <h2 className="text-3xl font-bold ml-6 mt-8 mb-4">
    Nuestros Servicios
  </h2>

  <div
    className="
      grid 
      sm:grid-cols-2 lg:grid-cols-3 
      gap-6             /* Espacio uniforme horizontal y vertical */
      px-2 
      max-w-[1200px]    /* Limita el ancho total */
      mx-auto           /* Centra horizontalmente */
      justify-items-center
      mt-6 mb-15
    "
  >
    {ServicesItems.map((service) => (
      <ServiceCard service={service} key={service.name} />
    ))}
  </div>
</div>
  );
}