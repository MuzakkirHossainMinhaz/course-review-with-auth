import mongoose, { Schema } from "mongoose";
import { ICourse, IDetails, ITag } from "./course.interface";

const tagSchema = new mongoose.Schema<ITag>(
    {
        name: {
            type: String,
            required: [true, "Tag name is required"],
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
        versionKey: false,
    },
);

const detailsSchema = new mongoose.Schema<IDetails>(
    {
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            required: [true, "Course level is required"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Course description is required"],
            trim: true,
        },
    },
    {
        _id: false,
        versionKey: false,
    },
);

const courseSchema = new mongoose.Schema<ICourse>(
    {
        title: {
            type: String,
            required: [true, "Course title is required"],
            trim: true,
            unique: true,
        },
        instructor: {
            type: String,
            required: [true, "Course instructor is required"],
            trim: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Course category is required"],
        },
        price: {
            type: Number,
            required: [true, "Course price is required"],
        },
        tags: [
            {
                type: tagSchema,
                required: [true, "Course tags are required"],
            },
        ],
        startDate: {
            type: String,
            required: [true, "Course start date is required"],
        },
        endDate: {
            type: String,
            required: [true, "Course end date is required"],
        },
        language: {
            type: String,
            required: [true, "Course language is required"],
            trim: true,
        },
        provider: {
            type: String,
            required: [true, "Course provider is required"],
            trim: true,
        },

        durationInWeeks: {
            type: Number,
            required: [true, "Course duration is required"],
        },
        details: {
            type: detailsSchema,
            required: [true, "Course details are required"],
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

export const CourseModel = mongoose.model<ICourse>("Course", courseSchema);
