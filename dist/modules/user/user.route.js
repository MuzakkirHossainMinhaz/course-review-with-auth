"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const checkValidation_1 = __importDefault(require("../../middlewares/checkValidation"));
const user_validation_1 = __importDefault(require("./user.validation"));
const router = (0, express_1.Router)();
router.post("/register", (0, checkValidation_1.default)(user_validation_1.default), user_controller_1.UserControllers.createUser);
exports.UserRoutes = router;
