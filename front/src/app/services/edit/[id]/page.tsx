'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  imageFile?: File; // Archivo seleccionado temporalmente
}

export default function EditServicePage() {
  const router = useRouter();
  const { id } = useParams();
   const { token} = useAuth();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);

  // Cargar datos del servicio
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`https://technova-backend-kappa.vercel.app/api/services/${id}`);
        if (!res.ok) throw new Error('Error al obtener el servicio');
        const data = await res.json();
        setService(data);
        setPreview(data.imageUrl);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service) return;

    try {
      const formData = new FormData();
      formData.append('name', service.name);
      formData.append('description', service.description);
      formData.append('price', service.price.toString());
      formData.append('active', service.active.toString());

      if (service.imageFile) formData.append('image', service.imageFile);

      const res = await fetch(`https://technova-backend-kappa.vercel.app/api/services/${id}`, {
        method: 'PUT',
        body: formData,
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Error al actualizar el servicio');

      await MySwal.fire({
        icon: 'success',
        title: 'Servicio actualizado',
        text: `"${service.name}" se actualizó correctamente.`,
        background: '#0a0f1c',
        color: '#e5e7eb',
        confirmButtonColor: '#3B82F6',
      });

      router.push('/services');
    } catch (error) {
      console.error(error);
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el servicio.',
        background: '#0a0f1c',
        color: '#e5e7eb',
        confirmButtonColor: '#3B82F6',
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-300">
        Cargando servicio...
      </div>
    );

  if (!service)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-400">
        Servicio no encontrado.
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#0a0f1c] text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-blue-500 pl-3">
        Editar servicio
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={service.name}
            onChange={(e) =>
              setService({ ...service, name: e.target.value })
            }
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Descripción
          </label>
          <textarea
            value={service.description}
            onChange={(e) =>
              setService({ ...service, description: e.target.value })
            }
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white h-24 focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Precio
          </label>
          <input
            type="number"
            value={service.price}
            onChange={(e) =>
              setService({ ...service, price: parseFloat(e.target.value) })
            }
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Imagen con botón personalizado */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Imagen del servicio
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => document.getElementById('imageInput')?.click()}
              className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold transition-all"
            >
              Seleccionar imagen
            </button>
            {service.imageFile && (
              <span className="text-gray-300 text-sm">
                {service.imageFile.name}
              </span>
            )}
          </div>

          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setService({ ...service, imageFile: file });
                setPreview(URL.createObjectURL(file));
              }
            }}
            className="hidden"
          />

          {preview && (
            <img
              src={preview}
              alt="Vista previa"
              className="mt-2 h-32 w-auto object-cover rounded"
            />
          )}
        </div>

        {/* Activo */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={service.active}
            onChange={(e) =>
              setService({ ...service, active: e.target.checked })
            }
            className="w-4 h-4 text-blue-500 border-gray-700 bg-gray-800 rounded"
          />
          <label className="text-sm text-gray-300">Activo</label>
        </div>

        {/* Botón Guardar */}
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md transition-all"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
