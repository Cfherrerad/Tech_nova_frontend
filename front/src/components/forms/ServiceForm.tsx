'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  ServiceFormValues,
  serviceInitialValues,
  serviceValidationSchema,
} from '@/validators/serviceSchema';

const MySwal = withReactContent(Swal);

const ServiceForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { token } = useAuth();

  const formik = useFormik<ServiceFormValues>({
    initialValues: serviceInitialValues,
    validationSchema: serviceValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price.toString());
        formData.append('description', values.description);
        if (values.image) formData.append('image', values.image);

        const response = await fetch('http://localhost:4000/api/services', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) throw new Error('Error al crear el servicio');

        const data = await response.json();
        console.log('✅ Servicio creado:', data);

        await MySwal.fire({
          icon: 'success',
          title: 'Servicio creado con éxito',
          text: 'El servicio se ha registrado correctamente.',
          background: '#1f2937',
          color: '#ffffff',
          confirmButtonColor: '#3b82f6',
          confirmButtonText: 'Aceptar',
          customClass: {
            popup: 'rounded-2xl shadow-lg border border-blue-400',
          },
        });

        setPreview(null);
        resetForm();
      } catch (error) {
        console.error('❌ Error al enviar formulario:', error);

        MySwal.fire({
          icon: 'error',
          title: 'Error al crear servicio',
          text: 'Ocurrió un problema al guardar el servicio.',
          background: '#1f2937',
          color: '#ffffff',
          confirmButtonColor: '#ef4444',
          confirmButtonText: 'Reintentar',
          customClass: {
            popup: 'rounded-2xl shadow-lg border border-red-500',
          },
        });
      }
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue('image', file);
      setPreview(URL.createObjectURL(file));
    } else {
      formik.setFieldValue('image', null);
      setPreview(null);
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 max-w-lg mx-auto bg-gray-900 p-6 rounded-3xl shadow-xl border border-gray-700"
    >
      <h2 className="text-2xl text-white font-bold text-center mb-4">
        Crear nuevo servicio
      </h2>

      {/* Nombre */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-white font-medium mb-1">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Nombre del servicio"
          className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Precio */}
      <div className="flex flex-col">
        <label htmlFor="price" className="text-white font-medium mb-1">
          Precio
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
          placeholder="Precio del servicio"
          className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="flex flex-col">
        <label htmlFor="description" className="text-white font-medium mb-1">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          rows={3}
          placeholder="Describe el servicio..."
          className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 resize-none"
        />
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.description}</p>
        )}
      </div>

      {/* Imagen con botón personalizado */}
      <div className="flex flex-col items-start">
        <label className="text-white font-medium mb-1">Imagen (opcional)</label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => document.getElementById('imageInput')?.click()}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl font-semibold transition-all"
          >
            Seleccionar imagen
          </button>
          {formik.values.image && (
            <span className="text-gray-300 text-sm">
              {(formik.values.image as File).name}
            </span>
          )}
        </div>

        <input
          id="imageInput"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        {preview && (
          <img
            src={preview}
            alt="Vista previa"
            className="w-48 mt-3 rounded-xl border border-gray-700 shadow-md object-cover"
          />
        )}
      </div>

      {/* Botón de enviar */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className={`mt-4 w-full bg-blue-600 border border-blue-500 text-white font-semibold py-2 rounded-xl transition-all ${
          formik.isSubmitting
            ? 'opacity-60 cursor-not-allowed'
            : 'hover:bg-blue-500 hover:border-blue-400'
        }`}
      >
        {formik.isSubmitting ? 'Creando...' : 'Crear servicio'}
      </button>
    </form>
  );
};

export default ServiceForm;
