export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface UserRegister {
    name: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    name: string;
    email: string;
}