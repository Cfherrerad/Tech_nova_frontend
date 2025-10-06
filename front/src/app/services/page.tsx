import ServiceCard from "@/components/ServiceCard";
import { ServicesItems } from "@/helpers/ServicesItems";

const ServicesPage = () => {
  return (
    <div className="pb-10">
      <h2 className="text-3xl font-bold ml-6 mt-8 mb-4 text-white">Nuestros Servicios</h2>

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
        {ServicesItems.map((service) => (
          <ServiceCard service={service} key={service.slug} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
