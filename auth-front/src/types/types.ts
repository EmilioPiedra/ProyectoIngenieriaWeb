export interface AuthResponse {
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };

}

export interface AuthResponseError {
    error: string;
    body: {
        error: string;
    }
}

export interface User {
    _id: string;
    id: string;
    name: string;
    username: string;
    role: string; // Agrega la propiedad 'role'
}

export interface AccessTokenResponse {
    statusCode: number;
    body: {
        accessToken: string;
    };
    error?: string;
}

export interface OrderDetails {
    recogidaUbicacion: string;
    recogidaFecha: string;
    recogidaHora: string;
    devolucionUbicacion: string;
    devolucionFecha: string;
    devolucionHora: string;
}

export interface Bicycle {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    status?: 'disponible' | 'ocupado'; // Agrega el campo 'status' como opcional
}


export interface CartItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
}

export interface Branch {
    _id: string
    name: string
    lat: number
    lon: number
    bicycles: Bicycle[]
}