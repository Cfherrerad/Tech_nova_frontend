import * as Yup from "yup";

// Interfaz que coincide con lo que espera el backend
// registerSchema.ts
export interface RegisterFormValuesType { 
  username: string;
  email: string;
  password: string;
  confirmPassword: string; // solo validación, no se manda al back
  role: string;
  fullName: string;
  phone: string;
}

// Valores iniciales
export const registerInitalValues: RegisterFormValuesType = { 
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
  fullName: "",
  phone: "",
};

// Esquema de validación con Yup
export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .required("El nombre de usuario es obligatorio."),
  email: Yup.string()
    .email("El correo no es válido")
    .required("El correo es obligatorio."),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("La confirmación es obligatoria"),
  fullName: Yup.string()
    .required("El nombre completo es obligatorio."),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, "El teléfono solo puede tener números y símbolos válidos")
    .required("El teléfono es obligatorio."),
});
