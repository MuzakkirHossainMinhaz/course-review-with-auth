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
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let server;
const PORT = process.env.PORT || 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // listen for requests
            server = app_1.default.listen(PORT, () => {
                console.log(`🌐 Server is running on http://localhost:${PORT}`);
            });
            // connect to database
            yield mongoose_1.default.connect(`${process.env.DATABASE_URL}`).then(() => {
                console.log("⚡️ Successfully connected to the database");
            });
        }
        catch (err) {
            // console.log(err);
        }
    });
}
main();
process.on("unhandledRejection", () => {
    console.log(`🚫 Unhandled Rejection detected , shutting down ...`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", () => {
    console.log(`🚫 Uncaught Exception detected , shutting down ...`);
    process.exit(1);
});
