/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginFormValuesType } from "@/validators/loginSchema";
import { RegisterFormValuesType } from "@/validators/registerSchema"


export const registerUser = async ( userData : RegisterFormValuesType) => {
    try {
        const response = await fetch(`http://localhost:3000/users/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return response.json()
        } else {
            // Agregar un alert => sweetalert | totify
            alert("¡Ups! We can't generate your register.");
            throw new Error("Registration failed");
        }

    } catch (error: any) {
        throw new Error(error);
    }
};

export const loginUser = async ( userData : LoginFormValuesType) => {
    try {
        const response = await fetch(`http://localhost:3000/users/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return response.json()
        } else {
            // Agregar un alert => sweetalert | totify
            alert("¡Ups! We can't loggin in your account.");
            throw new Error("Registration failed");
        }

    } catch (error: any) {
        throw new Error(error);
    }
};