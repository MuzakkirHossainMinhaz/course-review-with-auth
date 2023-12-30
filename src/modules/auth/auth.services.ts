/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { IAuth, IChangePassword, IJWTPayload } from "./auth.interface";
import { createJWT } from "./auth.utils";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: IAuth) => {
    // check if user exists
    const user = await UserModel.findOne({ username: payload.username }).select(
        "+password -createdAt -updatedAt",
    );
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isPasswordMatched = await UserModel.isPasswordMatched(
        payload?.password,
        user?.password,
    );
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Incorrect password");
    }

    // create token
    const jwtPayload: IJWTPayload = {
        _id: user._id,
        role: user.role,
        email: user.email,
        iat: Date.now(),
        exp:
            Date.now() +
            (process.env.JWT_ACCESS_EXPIRES_IN as unknown as number) *
            1000 *
            60 *
            60 *
            24, // 1 day,
    };
    const token = createJWT(jwtPayload);

    return { user, token };
};

const changePassword = async (
    userData: JwtPayload,
    payload: IChangePassword,
) => {
    // check if user exists
    const user: any = await UserModel.findOne({
        username: userData.username,
    }).select("+password");
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // check if current password is correct
    if (!(await bcrypt.compare(payload?.currentPassword, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, "Incorrect current password");
    }

    // check if this password same as current password
    if (payload?.newPassword === payload?.currentPassword) {
        return { username: false, email: user.updatedAt };
    }

    // check if password is same as last 2 passwords from password history
    if (user.passwordHistory.length > 0) {
        if (user.passwordHistory.length >= 1 &&
            await bcrypt.compare(
                payload?.newPassword,
                user.passwordHistory[0]?.password,
            )
        ) {

            return { username: false, email: user.passwordHistory[0].createdAt };
        } else if (user.passwordHistory.length > 1 &&
            await bcrypt.compare(
                payload?.newPassword,
                user.passwordHistory[1]?.password,
            )
        ) {
            return { username: false, email: user.passwordHistory[1].createdAt };
        }
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(
        payload?.newPassword,
        Number(process.env.BCRYPT_SALT_ROUNDS),
    );

    if (user?.passwordHistory.length < 2) {
        user?.passwordHistory.push({
            password: user?.password,
            createdAt: new Date(),
        });
        user.password = hashedPassword;
    } else {
        user?.passwordHistory.shift();
        user?.passwordHistory.push({
            password: user?.password,
            createdAt: new Date(),
        });
        user.password = hashedPassword;
    }

    await user.save();

    return user;
};

export const AuthServices = {
    loginUser,
    changePassword,
};
