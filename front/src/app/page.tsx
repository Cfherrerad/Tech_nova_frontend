import Image from "next/image";
import Link from "next/link";
import { ServicesItems } from "@/helpers/ServicesItems";
import ServiceCard from "@/components/ServiceCard";

export default async function Home() {
  return (
    <div className="">
      {/* Hero */}
      <div className="border-b-1 border-[#1b2447] pb-6">
        <div className="relative bg-[url('/hero.jpg')] bg-cover bg-center rounded-3xl h-auto w-[90%] lg:w-[70%] mt-5 mx-auto">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-3xl z-0"></div>

          {/* Contenido */}
          <div className="relative z-10 flex-col justify-items-center py-30">
            <Image
              className="mb-4"
              src="/logo.png"
              alt="Logo-footer"
              width={150}
              height={150}
            />
            <h2 className="text-4xl font-bold text-center w-[80%] mx-auto mb-4">
              Soluciones tecnológicas que hacen crecer tu negocio
            </h2>
            <p className="text-center w-[80%] mx-auto mb-4">
              Desarrollo de software, automatización, infraestructura cloud y soporte especializado para pequeñas y grandes empresas.
            </p>

            <div className="flex gap-4">
              {/* Ver servicios */}
              <Link
                href="/services"
                className="w-[135px] h-[50px] flex items-center justify-center text-black font-bold bg-gradient-to-br from-blue-600 to-green-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-3xl text-md px-5 py-2.5 text-center me-2 mb-2"
              >
                Ver servicios
              </Link>

              {/* Contáctanos */}
              <Link
                href="/contact"
                className="w-[135px] h-[50px] flex items-center justify-center text-white font-bold border border-blue-400 rounded-full hover:bg-blue-400 hover:text-white text-md transition-all duration-300 px-5 py-2.5 mb-2 me-2"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios destacados */}
      <div>
        <h2 className="text-3xl font-bold ml-6 mt-8 mb-4">Servicios destacados</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 max-w-[1200px] mx-auto justify-items-center mt-6 mb-15">
          {ServicesItems.slice(0, 3).map((service) => (
            <ServiceCard service={service} key={service.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
