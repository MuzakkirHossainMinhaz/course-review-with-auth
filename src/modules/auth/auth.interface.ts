import { Types } from "mongoose";

export interface IAuth {
    username: string;
    password: string;
}

export interface IJWTPayload {
    _id: Types.ObjectId;
    role: "user" | "admin";
    email: string;
    iat: number;
    exp: number;
}

export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
}
