export enum PATHROUTES {
    HOME = "/",
    SERVICES = "/services",
    CONTACT = "/contact",
    LOGIN = '/login',
    REGISTER = "/register"
}

export const NavItems = [
    {
        name: "Inicio",
        route: PATHROUTES.HOME
    },
    {
        name: "Servicios",
        route: PATHROUTES.SERVICES
    },
    {
        name: "Contacto",
        route: PATHROUTES.CONTACT
    },
    {
        name: "Login",
        route: PATHROUTES.LOGIN
    },
    {
        name: "Registrate",
        route: PATHROUTES.REGISTER
    },        
]