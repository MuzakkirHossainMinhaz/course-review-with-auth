"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const checkValidation_1 = __importDefault(require("../../middlewares/checkValidation"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.use("/login", (0, checkValidation_1.default)(auth_validation_1.authValidationSchemas.authLoginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.use("/change-password", (0, checkValidation_1.default)(auth_validation_1.authValidationSchemas.changePasswordValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), auth_controller_1.AuthControllers.changePassword);
exports.AuthRoutes = router;
