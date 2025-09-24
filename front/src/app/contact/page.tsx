export default function ContactsPage() {
  const integrantes = [
    "Juan David Huertas Zapata",
    "Diego Bolaños Zuñiga",
    "Christian Felipe Herrera Diaz",
    "Sergio Luis Hernández Ensuncho",
    "Andrés Felipe Martinez Aparicio Torres",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0a0f1c] py-10">
      {/* Título */}
      <h1 className="text-3xl font-bold text-white mb-8">
        Nuestro Equipo
      </h1>
      <p className="text-gray-400 text-center max-w-lg mb-10">
        Conoce a los integrantes de nuestro equipo.
      </p>

      {/* Grid de tarjetas */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6 
          w-[90%] lg:w-[70%] 
          mx-auto
        "
      >
        {integrantes.map((nombre, index) => (
          <div
            key={index}
            className="bg-[#101726] p-6 rounded-2xl shadow-lg flex flex-col justify-between"
          >
            <h2 className="text-xl font-semibold text-white text-center">
              {nombre}
            </h2>
            <p className="text-gray-400 text-sm text-center mt-3">
              Estudiante de Ingeniería
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
