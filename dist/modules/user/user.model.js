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
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passwordHistorySchema = new mongoose_1.default.Schema({
    password: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, {
    _id: false,
    versionKey: false,
});
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: 0,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    passwordHistory: [passwordHistorySchema],
}, {
    timestamps: true,
    versionKey: false,
});
// password removal from response
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.passwordHistory;
    return obj;
};
userSchema.statics.isPasswordMatched = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!password || !hashedPassword) {
            return false;
        }
        return yield bcrypt_1.default.compare(password, hashedPassword);
    });
};
exports.UserModel = mongoose_1.default.model("User", userSchema);
