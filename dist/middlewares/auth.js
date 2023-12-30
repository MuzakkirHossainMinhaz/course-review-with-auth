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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth_utils_1 = require("../modules/auth/auth.utils");
const user_model_1 = require("../modules/user/user.model");
const auth = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        // check if token is present
        if (!token) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        // check if token is valid
        const { _id, email, role, exp } = (0, auth_utils_1.verifyJWT)(token);
        // check if role is valid
        if (!roles.includes(role)) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        // check if user exists
        const user = yield user_model_1.UserModel.findOne({ _id, email });
        if (!user) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        // check if token is not expired
        if (Date.now() >= exp) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized Access");
        }
        // set user
        req.user = user;
        next();
    }));
};
exports.default = auth;
