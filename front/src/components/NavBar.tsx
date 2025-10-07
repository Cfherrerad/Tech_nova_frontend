'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { NavItems } from '@/helpers/NavItems'
import { useAuth } from '@/context/AuthContext'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const NavBar = () => {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión actual se cerrará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: '#0a0f1c',
      color: '#e5e7eb',
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#6B7280',
      customClass: {
        popup: 'rounded-2xl shadow-lg border border-[#1b2447]',
        title: 'text-white',
        confirmButton: 'text-white font-semibold',
      },
    })

    if (result.isConfirmed) {
      logout()
      await MySwal.fire({
        icon: 'success',
        title: 'Sesión cerrada',
        text: 'Has salido correctamente.',
        background: '#0a0f1c',
        color: '#e5e7eb',
        confirmButtonColor: '#3B82F6',
      })
      setMenuOpen(false)
    }
  }

  return (
    <nav className="w-full h-[70px] flex items-center justify-between border-b border-[#1b2447] bg-[#0a0f1c] px-4 relative">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Logo" width={45} height={45} className="mr-2" />
        <span className="text-white font-bold text-lg hidden sm:block">NovaTech</span>
      </Link>

      {/* Botón menú hamburguesa (solo móvil) */}
      <button
        className="text-gray-300 text-2xl md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
      >
        {menuOpen ? '✖' : '☰'}
      </button>

      {/* Menú principal */}
      <div
        className={`
          flex-col md:flex md:flex-row md:items-center absolute md:static top-[70px] right-0 
          bg-[#0a0f1c] md:bg-transparent w-full md:w-auto z-50 transition-all duration-300
          ${menuOpen ? 'flex' : 'hidden'}
        `}
      >
        {NavItems.map((item) => (
          <Link
            href={item.route}
            key={item.name}
            prefetch={false}
            onClick={() => setMenuOpen(false)}
            className={`
              mx-2 px-4 py-2 text-center rounded-xl transition-all duration-200
              ${pathname === item.route
                ? 'bg-blue-500 text-white'
                : 'text-gray-300 hover:bg-[#141b2e] hover:text-white'}
            `}
          >
            {item.name}
          </Link>
        ))}

        {/* 🔹 Solo Admin: Gestión de solicitudes */}
        {user?.role === 'admin' && (
          <Link
            href="/orders"
            onClick={() => setMenuOpen(false)}
            className={`
              mx-2 px-4 py-2 text-center rounded-xl transition-all duration-200
              ${pathname === '/orders'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:bg-purple-700 hover:text-white'}
            `}
          >
            Solicitudes
          </Link>
        )}

        {/* 🔹 Solo Admin: Crear servicio */}
        {user?.role === 'admin' && (
          <Link
            href="/services/new"
            onClick={() => setMenuOpen(false)}
            className={`
              mx-2 px-4 py-2 text-center rounded-xl transition-all duration-200
              ${pathname === '/services/new'
                ? 'bg-green-600 text-white'
                : 'text-gray-300 hover:bg-green-700 hover:text-white'}
            `}
          >
            Crear servicio
          </Link>
        )}

        {/* 🔹 Usuario normal: Mis solicitudes */}
        {user && user.role !== 'admin' && (
          <Link
            href="/my-orders"
            onClick={() => setMenuOpen(false)}
            className={`
              mx-2 px-4 py-2 text-center rounded-xl transition-all duration-200
              ${pathname === '/my-orders'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:bg-purple-700 hover:text-white'}
            `}
          >
            Mis solicitudes
          </Link>
        )}

        {/* 🔹 Autenticación */}
        {!user ? (
          <>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mx-2 px-4 py-2 text-gray-300 text-center rounded-xl hover:bg-[#141b2e] hover:text-white transition-all duration-200"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="mx-2 px-4 py-2 text-gray-300 text-center rounded-xl hover:bg-[#141b2e] hover:text-white transition-all duration-200"
            >
              Registrate
            </Link>
          </>
        ) : (
          <div className="flex flex-col md:flex-row items-center">
            <span className="text-gray-300 mx-2 my-2 md:my-0">Hola, {user.username}</span>
            <button
              onClick={handleLogout}
              className="mx-2 px-4 py-2 text-gray-300 rounded-xl hover:bg-[#141b2e] hover:text-white transition-all duration-200"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
