import * as Yup from "yup";

export interface ServiceFormValues {
  name: string;
  price: number;
  description: string;
  image: File | null;
}

export const serviceInitialValues: ServiceFormValues = {
  name: "",
  price: 0,
  description: "",
  image: null,
};

export const serviceValidationSchema = Yup.object({
  name: Yup.string()
    .required("El nombre es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  price: Yup.number()
    .required("El precio es obligatorio")
    .positive("Debe ser un número positivo"),
  description: Yup.string()
    .required("La descripción es obligatoria")
    .max(500, "Máximo 500 caracteres"),
  image: Yup.mixed().nullable(),
});
