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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.UserModel.findOne({ email: payload.email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.password, Number(process.env.BCRYPT_SALT_ROUNDS));
    payload.password = hashedPassword;
    const user = yield user_model_1.UserModel.create(payload);
    return user;
});
exports.UserServices = {
    createUser,
};
