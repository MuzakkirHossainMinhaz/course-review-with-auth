"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if user exists
    const user = yield user_model_1.UserModel.findOne({ username: payload.username }).select("+password -createdAt -updatedAt");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isPasswordMatched = yield user_model_1.UserModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Incorrect password");
    }
    // create token
    const jwtPayload = {
        _id: user._id,
        role: user.role,
        email: user.email,
        iat: Date.now(),
        exp: Date.now() +
            process.env.JWT_ACCESS_EXPIRES_IN *
                1000 *
                60 *
                60 *
                24, // 1 day,
    };
    const token = (0, auth_utils_1.createJWT)(jwtPayload);
    return { user, token };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // check if user exists
    const user = yield user_model_1.UserModel.findOne({
        username: userData.username,
    }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // check if current password is correct
    if (!(yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.currentPassword, user === null || user === void 0 ? void 0 : user.password))) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Incorrect current password");
    }
    // check if this password same as current password
    if ((payload === null || payload === void 0 ? void 0 : payload.newPassword) === (payload === null || payload === void 0 ? void 0 : payload.currentPassword)) {
        return { username: false, email: user.updatedAt };
    }
    // check if password is same as last 2 passwords from password history
    if (user.passwordHistory.length > 0) {
        if (user.passwordHistory.length >= 1 &&
            (yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.newPassword, (_a = user.passwordHistory[0]) === null || _a === void 0 ? void 0 : _a.password))) {
            return { username: false, email: user.passwordHistory[0].createdAt };
        }
        else if (user.passwordHistory.length > 1 &&
            (yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.newPassword, (_b = user.passwordHistory[1]) === null || _b === void 0 ? void 0 : _b.password))) {
            return { username: false, email: user.passwordHistory[1].createdAt };
        }
    }
    // hash new password
    const hashedPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, Number(process.env.BCRYPT_SALT_ROUNDS));
    if ((user === null || user === void 0 ? void 0 : user.passwordHistory.length) < 2) {
        user === null || user === void 0 ? void 0 : user.passwordHistory.push({
            password: user === null || user === void 0 ? void 0 : user.password,
            createdAt: new Date(),
        });
        user.password = hashedPassword;
    }
    else {
        user === null || user === void 0 ? void 0 : user.passwordHistory.shift();
        user === null || user === void 0 ? void 0 : user.passwordHistory.push({
            password: user === null || user === void 0 ? void 0 : user.password,
            createdAt: new Date(),
        });
        user.password = hashedPassword;
    }
    yield user.save();
    return user;
});
exports.AuthServices = {
    loginUser,
    changePassword,
};
