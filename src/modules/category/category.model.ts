import mongoose from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new mongoose.Schema<ICategory>(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            trim: true,
            unique: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const CategoryModel = mongoose.model<ICategory>(
    "Category",
    categorySchema,
);
