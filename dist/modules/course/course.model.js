"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const tagSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Tag name is required"],
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
    versionKey: false,
});
const detailsSchema = new mongoose_1.default.Schema({
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
}, {
    _id: false,
    versionKey: false,
});
const courseSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.CourseModel = mongoose_1.default.model("Course", courseSchema);
