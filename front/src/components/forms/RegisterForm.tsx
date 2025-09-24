"use client";

import { registerUser } from "@/services/auth.services";
import {
  RegisterFormValuesType,
  registerInitalValues,
  registerValidationSchema,
} from "@/validators/registerSchema";
import { useFormik } from "formik";

const RegisterForm = () => {
  const formik = useFormik<RegisterFormValuesType>({
    initialValues: registerInitalValues,
    validationSchema: registerValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await registerUser(values);
      console.log(
        "Registration processed, with response from the server:",
        response
      );
      resetForm();
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-white mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Ingresa tu email"
        />
        {formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-white mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Crea una contraseña"
        />
        {formik.errors.password && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="text-white mb-1">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Confirma tu contraseña"
        />
        {formik.errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-white mb-1">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Tu nombre"
        />
        {formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Address */}
      <div className="flex flex-col">
        <label htmlFor="address" className="text-white mb-1">
          Dirección
        </label>
        <input
          id="address"
          name="address"
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Tu dirección"
        />
        {formik.errors.address && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <label htmlFor="phone" className="text-white mb-1">
          Teléfono
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Tu número de teléfono"
        />
        {formik.errors.phone && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="mt-4 w-full border border-blue-400 text-white font-semibold py-2 rounded-xl hover:bg-blue-500 hover:border-blue-500 transition-all"
      >
        {formik.isSubmitting ? "Registrando..." : "Registrarse"}
      </button>
    </form>
  );
};

export default RegisterForm;
