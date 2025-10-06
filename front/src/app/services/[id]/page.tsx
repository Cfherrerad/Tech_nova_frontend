'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/services/${id}`);
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

        <p className="text-gray-300 text-lg w-full text-left">
          {service.description}
        </p>

        <p className="text-white font-bold text-xl w-full text-left">
          Precio: {service.price}
        </p>

        <Link
          href="/services"
          className="mt-4 px-6 py-2 rounded-full border border-blue-400 text-white font-bold hover:bg-blue-400 transition-colors"
        >
          Volver a Servicios
        </Link>
      </div>
    </div>
  );
}
