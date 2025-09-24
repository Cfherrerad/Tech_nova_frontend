'use client'

import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="w-full mt-10">
      {/* Línea superior en todo el ancho */}
      <div className="w-full border-t border-[#1b2447]"></div>

      {/* Contenedor centrado con 70% de ancho */}
      <div className="w-[70%] mx-auto bg-[#0a0f1c] rounded-t-2xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start px-8 py-6 gap-6">
          
          {/* Logo + descripción */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/logo.png" alt="Logo" width={45} height={45} />
              <span className="text-lg font-semibold text-gray-200">
                NovaTech Solutions
              </span>
            </div>
            <small className="text-gray-400">
              Innovación tecnológica para impulsar a tu empresa.
            </small>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start text-gray-300">
            <h4 className="mb-3 text-white font-semibold">Contacto</h4>
            <small className="mb-1 hover:text-white transition">info@novatech.com</small>
            <small className="mb-1 hover:text-white transition">+57 300 000 0000</small>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-start text-gray-300">
            <h4 className="mb-3 text-white font-semibold">Legal</h4>
            <small className="mb-1">© 2025 NovaTech Solutions</small>
            <small className="mb-1">Todos los derechos reservados</small>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
