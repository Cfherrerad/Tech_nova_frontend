export interface userSessionInterface {
    login: boolean;
    token: string;
    user: {
        name: string;
        email: string;
        addres: string;
        phone: string;
        role: string;
        orders: [];
        id: number;
    };
}