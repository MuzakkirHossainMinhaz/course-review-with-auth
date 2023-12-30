"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const ErrorHandler_1 = __importDefault(require("./middlewares/ErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
app.use("/api", routes_1.default);
// default route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to The Course Review server!",
    });
});
// 404 route
app.all("*", (req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "404! This Route Not Found.",
    });
});
// global error handler
app.use(ErrorHandler_1.default);
exports.default = app;
