"use client";

import { loginUser } from "@/services/auth.services";
import {
  LoginFormValuesType,
  loginInitialValues,
  loginValidationSchema,
} from "@/validators/loginSchema";
import { useFormik } from "formik";

const LoginForm = () => {
  const formik = useFormik<LoginFormValuesType>({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await loginUser(values);
      // TODO => AGREGAR LOGICA PARA LA PERSISTENCIA DE LA SESION
      console.log("Successful login with server response:", response);
      resetForm();
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      {/* Campo Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="text-white mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Ingresa tu email"
        />
        {formik.errors.email && (
          <p id="email-error" className="text-red-500 text-sm mt-1">
            {formik.errors.email}
          </p>
        )}
      </div>

      {/* Campo Password */}
      <div className="flex flex-col">
        <label htmlFor="password" className="text-white mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Ingresa tu contraseña"
        />
        {formik.errors.password && (
          <p id="password-error" className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </p>
        )}
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="mt-4 w-full border border-blue-400 text-white font-semibold py-2 rounded-xl hover:bg-blue-500 hover:border-blue-500 transition-all"
      >
        {formik.isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
