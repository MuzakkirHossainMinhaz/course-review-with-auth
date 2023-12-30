import httpStatus from "http-status";
import AppError from "../errors/AppError";
import { TUserRole } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync";
import { verifyJWT } from "../modules/auth/auth.utils";
import { UserModel } from "../modules/user/user.model";

const auth = (...roles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req.headers.authorization;

        // check if token is present
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }

        // check if token is valid
        const { _id, email, role, exp } = verifyJWT(token);

        // check if role is valid
        if (!roles.includes(role)) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }

        // check if user exists
        const user = await UserModel.findOne({ _id, email });
        if (!user) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }

        // check if token is not expired
        if (Date.now() >= exp) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized Access");
        }

        // set user
        req.user = user;

        next();
    });
};

export default auth;
