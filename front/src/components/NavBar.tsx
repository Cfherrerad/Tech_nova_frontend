'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NavItems } from '@/helpers/NavItems'
import { useAuth } from '@/context/AuthContext'

const NavBar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="w-screen h-[70px] flex items-center justify-between border-b border-[#1b2447] bg-[#0a0f1c]">
      {/* Logo */}
      <Link href="/">
        <Image className="mx-4" src="/logo.png" alt="Logo" width={45} height={45} />
      </Link>

      {/* Items de navegación */}
      <div className="flex items-center justify-between mr-4">
        {NavItems.map((navigationitem) => (
          <Link
            href={navigationitem.route}
            key={navigationitem.name}
            prefetch={false}
            className="
              mx-2
              px-4
              py-2
              text-gray-300
              rounded-xl
              hover:bg-[#141b2e]
              hover:text-white
              transition-all
              duration-200
            "
          >
            {navigationitem.name}
          </Link>
        ))}

        {/* Condicional según autenticación */}
        {!user ? (
          <>
            <Link
              href="/login"
              className="
                mx-2
                px-4
                py-2
                text-gray-300
                rounded-xl
                hover:bg-[#141b2e]
                hover:text-white
                transition-all
                duration-200
              "
            >
              Iniciar sesión
            </Link>
            <Link
              href="/register"
              className="
                mx-2
                px-4
                py-2
                text-gray-300
                rounded-xl
                hover:bg-[#141b2e]
                hover:text-white
                transition-all
                duration-200
              "
            >
              Registrate
            </Link>
          </>
        ) : (
          <div className="flex items-center">
            {/* Mostrar el username */}
            <span className="text-gray-300 mx-2">Hola, {user.username}</span>
            <button
              onClick={logout}
              className="
                mx-2
                px-4
                py-2
                text-gray-300
                rounded-xl
                hover:bg-[#141b2e]
                hover:text-white
                transition-all
                duration-200
              "
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
