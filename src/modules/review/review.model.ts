import mongoose, { Schema } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new mongoose.Schema<IReview>(
    {
        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "Course Id is required"],
        },
        rating: {
            type: Number,
            validate: {
                validator: (value: number) => value >= 1 && value <= 5,
                message: "Rating must be between 1 and 5",
            },
            required: [true, "Rating is required"],
        },
        review: {
            type: String,
            required: [true, "Review is required"],
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ReviewModel = mongoose.model<IReview>("Review", reviewSchema);
