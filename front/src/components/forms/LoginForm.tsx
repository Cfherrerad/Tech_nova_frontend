"use client";

import { useAuth } from "@/context/AuthContext";
import {
  LoginFormValuesType,
  loginInitialValues,
  loginValidationSchema,
} from "@/validators/loginSchema";
import { useFormik } from "formik";

const LoginForm = () => {
  const { login } = useAuth(); // hook context

  const formik = useFormik<LoginFormValuesType>({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        
        const response = await login(values);

        console.log("Successful login with server response:", response);

        resetForm();
        
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión, revisa tus credenciales");
      }
    },
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="username" className="text-white mb-1">
          Email o usuario
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Ingresa tu email o usuario"
        />
        {formik.touched.username && formik.errors.username && (
          <p id="username-error" className="text-red-500 text-sm mt-1">
            {formik.errors.username}
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
          onBlur={formik.handleBlur}
          className="bg-transparent border border-gray-600 text-white px-4 py-2 rounded-xl focus:outline-none focus:border-blue-400 placeholder-gray-500"
          placeholder="Ingresa tu contraseña"
        />
        {formik.touched.password && formik.errors.password && (
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
