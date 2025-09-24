import * as Yup from "yup";

export interface LoginFormValuesType {
    email: string;
    password: string;
}

export const loginInitialValues: LoginFormValuesType = {
    email: "",
    password: "",
};

export const loginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("The Email is mandatory."),
    password: Yup.string().min(6, "The password must be at least 6 characters long").required("The password is mandatory.")
});