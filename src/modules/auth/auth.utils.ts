import { IJWTPayload } from "./auth.interface";
import jwt from "jsonwebtoken";

export const createJWT = (payload: IJWTPayload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string);
};

export const verifyJWT = (token: string) => {
    return jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET as string,
    ) as IJWTPayload;
};
