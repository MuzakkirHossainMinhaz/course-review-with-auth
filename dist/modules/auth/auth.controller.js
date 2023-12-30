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
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_services_1 = require("./auth.services");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_services_1.AuthServices.loginUser(req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User login successful",
        data: user,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_services_1.AuthServices.changePassword(req.user, req.body);
    if ((user === null || user === void 0 ? void 0 : user.username) === false) {
        // convert utc to local date and time
        const date = new Date(user === null || user === void 0 ? void 0 : user.email)
            .toLocaleDateString("en-US")
            .split("/")
            .reverse()
            .join("-");
        const time = new Date(user === null || user === void 0 ? void 0 : user.email).toLocaleTimeString("en-US");
        // throw error if password is same as last 2 used
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: 400,
            message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${date} at ${time}).`,
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Password changed successfully",
        data: user,
    });
}));
exports.AuthControllers = { loginUser, changePassword };
