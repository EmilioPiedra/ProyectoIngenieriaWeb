export interface AuthResponse {
    body: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };

}

export interface AuthResponseError {
    body: {
        error: string;
    }
}

export interface User {
    _id: string;
    name: string;
    username: string;
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
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    // Añade otras propiedades según sea necesario
}