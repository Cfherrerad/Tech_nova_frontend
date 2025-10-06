import * as Yup from "yup";

export interface LoginFormValuesType {
  username: string;
  password: string;
}

export const loginInitialValues: LoginFormValuesType = {
    username: "",
    password: "",
};

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .required("El username o email es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});