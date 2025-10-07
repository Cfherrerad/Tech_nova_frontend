/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginFormValuesType } from "@/validators/loginSchema";
import { RegisterFormValuesType } from "@/validators/registerSchema";

// Registrar usuario
export const registerUser = async (userData: RegisterFormValuesType) => {
  try {
    console.log("Enviando datos de registro:", userData);

    const { confirmPassword, ...dataToSend } = userData;

    const response = await fetch("https://technova-backend-kappa.vercel.app/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    console.log("Respuesta cruda del backend (register):", response);

    if (response.ok) {
      const data = await response.json();
      console.log("Registro exitoso:", data);

      alert("Usuario creado correctamente");
      console.log("Usuario creado correctamente:", data);

      return data;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error devuelto por backend (register):", errorData);
      throw new Error(errorData.message || "Registration failed");
    }
  } catch (error: any) {
    console.error("Error en registerUser:", error);
    throw new Error(error.message);
  }
};

// Login usuario
export const loginUser = async (userData: LoginFormValuesType) => {
  try {
    console.log("Enviando datos al backend (login):", userData);

    const dataToSend = {
      username: userData.username,
      password: userData.password,
    };

    const response = await fetch("https://technova-backend-kappa.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    console.log("Respuesta cruda del backend (login):", response);

    if (response.ok) {
      const data = await response.json();
      console.log("Datos parseados del backend (login):", data);

      // Guardar info en localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      console.log("Usuario logueado y guardado en localStorage:", data.user);

      return data;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error("Error devuelto por backend (login):", errorData);
      throw new Error(errorData.message || "Login failed");
    }
  } catch (error: any) {
    console.error("Error en loginUser:", error);
    throw new Error(error.message);
  }
};

//Obtener info de usuario en localStorage
export const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

//Cerrar Sesion el localStorage
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.log("Sesión cerrada, localStorage limpio");
};
