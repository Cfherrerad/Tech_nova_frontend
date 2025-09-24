'use client'

import { userSessionInterface } from "@/interfaces/userSession.interface";
import { createContext, useContext, useEffect, useState } from "react";

// Interfaz que define los valores
interface AuthContextProps { 
    dataUser: userSessionInterface | null;
    setDataUser: (dataUser: userSessionInterface | null) => void;
    logout: () => void;
}
//TODO crear un hook que se encargue de crear item, eliminar item, setear item
// Creacion del context
const AuthContext = createContext<AuthContextProps>({
    dataUser: null,
    setDataUser: () => {},
    logout: () => {},
});

interface AuthProviderProps{
    children: React.ReactElement;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [dataUser, setDataUser] = useState<userSessionInterface | null>(null);
    
    //Logica de useEffect
    useEffect(() => {
        if(dataUser) {
            localStorage.setItem("userSession", JSON.stringify(dataUser));
        }
    }, [dataUser])

    useEffect(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const dataUser = localStorage.getItem("userSession");
            if (dataUser) {
                setDataUser(JSON.parse(dataUser));
            }
        }
    }, []);

    //Metodos disponibles
    const logout = () => {
        setDataUser(null);
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.removeItem("userSession");
        }
    };


    return (
        <AuthContext.Provider value={{ dataUser, setDataUser, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);