/* eslint-disable @typescript-eslint/no-explicit-any */
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
      try {
        const response = await registerUser(values);

        console.log("Usuario creado correctamente:", response);

        alert("Usuario creado correctamente");

        resetForm();
      } catch (error: any) {
        console.error("Error en el registro:", error);
        alert(
          error?.response?.data?.message ||
            "Hubo un error al registrar el usuario"
        );
      }
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      {/* Username */}
      <div className="flex flex-col">
        <label htmlFor="username" className="text-white mb-1">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          value={formik.values.username}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Crea tu nombre de usuario"
        />
        {formik.errors.username && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.username}</p>
        )}
      </div>

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

      {/* Full Name */}
      <div className="flex flex-col">
        <label htmlFor="fullName" className="text-white mb-1">
          Nombre completo
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Tu nombre completo"
        />
        {formik.errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
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
