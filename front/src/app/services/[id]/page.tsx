'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useAuth } from '@/context/AuthContext';

const MySwal = withReactContent(Swal);

interface Service {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  active: boolean;
}

export default function ServiceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token, user } = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`https://technova-backend-kappa.vercel.app/api/services/${id}`);
        if (!res.ok) throw new Error('Error al obtener el servicio');
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error(error);
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el servicio.',
          background: '#0a0f1c',
          color: '#e5e7eb',
          confirmButtonColor: '#3B82F6',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleRequestService = async () => {
    if (!service || !service.active) return;

    if (!user) {
      MySwal.fire({
        icon: 'info',
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para solicitar este servicio.',
        background: '#0a0f1c',
        color: '#e5e7eb',
        confirmButtonColor: '#3B82F6',
      });
      return;
    }

    const { value: notes } = await MySwal.fire({
      title: 'Agregar notas',
      input: 'textarea',
      inputPlaceholder: 'Escribe aquí cualquier detalle sobre la solicitud',
      showCancelButton: true,
      confirmButtonText: 'Enviar solicitud',
      cancelButtonText: 'Cancelar',
      background: '#0a0f1c',
      color: '#e5e7eb',
    });

    if (notes !== undefined) {
      try {
        const res = await fetch('https://technova-backend-kappa.vercel.app/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ serviceId: service._id, notes }),
        });

        if (!res.ok) throw new Error('Error al solicitar servicio');

        await MySwal.fire({
          icon: 'success',
          title: 'Solicitud enviada',
          text: `Has solicitado "${service.name}" correctamente.`,
          background: '#0a0f1c',
          color: '#e5e7eb',
          confirmButtonColor: '#3B82F6',
        });

        router.push('/my-orders'); // opcional: redirigir a mis solicitudes
      } catch (err) {
        console.error(err);
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo enviar la solicitud',
          background: '#0a0f1c',
          color: '#e5e7eb',
          confirmButtonColor: '#3B82F6',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        Cargando servicio...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-400">
        Servicio no encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-center">{service.name}</h1>

        <div className="w-full flex justify-center rounded-3xl overflow-hidden">
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={800}
            height={500}
            className="object-contain rounded-3xl"
          />
        </div>

        <p className="text-gray-300 text-lg w-full text-left">{service.description}</p>

        <p className="text-white font-bold text-xl w-full text-left">
          Precio: ${service.price}
        </p>

        <div className="flex gap-4 mt-4">
          <Link
            href="/services"
            className="px-6 py-2 rounded-full border border-blue-400 text-white font-bold hover:bg-blue-400 transition-colors"
          >
            Volver a Servicios
          </Link>

          <button
            disabled={!service.active}
            onClick={handleRequestService}
            className={`px-6 py-2 rounded-full text-white font-bold transition-colors ${
              service.active ? 'bg-green-600 hover:bg-green-500' : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {service.active ? 'Solicitar Servicio' : 'Inactivo'}
          </button>
        </div>
      </div>
    </div>
  );
}
