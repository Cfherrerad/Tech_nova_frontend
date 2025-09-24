import * as Yup from 'yup';

//Definir la interfaz de los valores del formulario = register
export interface RegisterFormValuesType { 
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    address: string;
    phone: string;
};

//Definir los valores iniciales de mi formulario de register
export const registerInitalValues = { 
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    address: "",
    phone: "",
};

// Esquema de validacion para este formulario con YUP

export const registerValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("The Email is mandatory."),
    password: Yup.string().min(6, "The password must be at least 6 characters long").required("The password is mandatory."),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")],"The 2 passwords must be the same.").required("Password confirmation required"),
    name: Yup.string().required("This field is mandatory."),
    address: Yup.string().required("This field is mandatory."),
    phone: Yup.string().matches(/^[0-9+\-\s()]+$/,"Phone must have just letters and numbers").required("This field is mandatory."),

})