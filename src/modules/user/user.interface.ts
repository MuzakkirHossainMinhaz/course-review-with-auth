/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface IPasswordHistory {
    password: string;
    createdAt: Date;
}

export interface IUser {
    username: string;
    email: string;
    password: string;
    role: "user" | "admin";
    passwordHistory: IPasswordHistory[];
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModels extends Model<IUser> {
    isPasswordMatched(
        password: string,
        hashedPassword: string,
    ): Promise<boolean>;
}
