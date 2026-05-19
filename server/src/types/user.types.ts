export interface IUser{
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserRole = 'admin' | "sales";

export interface JwtPayload{
    id: string;
    role: UserRole;
}

export interface RegisterBody{
    name: string;
    email: string;
    password: string;
    role?: UserRole;
}

export interface LoginBody{
    email: string;
    password: string;
}