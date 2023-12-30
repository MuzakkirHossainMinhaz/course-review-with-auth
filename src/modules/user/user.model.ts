import mongoose from "mongoose";
import { IPasswordHistory, IUser, UserModels } from "./user.interface";
import bcrypt from "bcrypt";

const passwordHistorySchema = new mongoose.Schema<IPasswordHistory>(
    {
        password: String,
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        _id: false,
        versionKey: false,
    },
);

const userSchema = new mongoose.Schema<IUser, UserModels>(
    {
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
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// password removal from response
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.passwordHistory;
    return obj;
};

userSchema.statics.isPasswordMatched = async function (
    password,
    hashedPassword,
) {
    if (!password || !hashedPassword) {
        return false;
    }
    return await bcrypt.compare(password, hashedPassword);
};

export const UserModel = mongoose.model<IUser, UserModels>("User", userSchema);
