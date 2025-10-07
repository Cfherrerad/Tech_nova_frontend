import Image from "next/image";
import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";

type Service = {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
  slug: string;
};

// 🔹 Función para mezclar un array aleatoriamente (Fisher–Yates shuffle)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function Home() {
  let services: Service[] = [];

  try {
    const res = await fetch(`https://technova-backend-kappa.vercel.app/api/services`, {
      next: { revalidate: 60 }, // ✅ Revalidación cada 60s (ISR)
    });

    if (!res.ok) {
      console.error("Error al obtener servicios:", res.statusText);
    } else {
      services = await res.json();
    }
  } catch (error) {
    console.error("Error de conexión con el backend:", error);
  }

  // 🔹 Filtrar solo servicios activos
  const activeServices = services.filter(service => service.active);

  // 🔹 Mezclar aleatoriamente y seleccionar 3 para destacados
  const featured = shuffleArray(activeServices).slice(0, 3);

  return (
    <div className="bg-[#0a0f1c] min-h-screen text-gray-100">
      {/* 🌌 Hero */}
      <section className="border-b border-[#1b2447] pb-12">
        <div className="relative bg-[url('/hero.jpg')] bg-cover bg-center rounded-3xl h-auto w-[90%] lg:w-[70%] mt-10 mx-auto shadow-lg shadow-blue-900/30">
          <div className="absolute inset-0 bg-black/60 rounded-3xl z-0"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6">
            <Image
              src="/logo.png"
              alt="Logo TechNova"
              width={150}
              height={150}
              className="mb-6 drop-shadow-lg"
            />
            <h2 className="text-4xl font-bold mb-4 text-white leading-tight">
              Soluciones tecnológicas que hacen crecer tu negocio
            </h2>
            <p className="text-gray-300 max-w-xl mb-6">
              Desarrollo de software, automatización, infraestructura cloud y
              soporte especializado para pequeñas y grandes empresas.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Link
                href="/services"
                className="w-[150px] h-[50px] flex items-center justify-center font-semibold bg-gradient-to-br from-blue-600 to-green-400 hover:from-blue-500 hover:to-green-300 focus:ring-4 focus:ring-blue-600/40 rounded-3xl text-md transition-all duration-300 text-white shadow-md"
              >
                Ver servicios
              </Link>

              <Link
                href="/contact"
                className="w-[150px] h-[50px] flex items-center justify-center border border-blue-400 text-white font-semibold rounded-3xl hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 text-md"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 Servicios destacados */}
      <section className="max-w-[1200px] mx-auto mt-12 px-4 pb-20">
        <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-blue-500 pl-3">
          Servicios destacados
        </h2>

        {featured.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {featured.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-10">
            No hay servicios disponibles por el momento.
          </p>
        )}
      </section>
    </div>
  );
}
