export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    password: string;
}