"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const reviewValidationSchema = zod_1.z.object({
    courseId: zod_1.z.string({
        required_error: "Course Id is required",
        invalid_type_error: "Course Id must be a string",
    }),
    rating: zod_1.z
        .number({
        required_error: "Rating is required",
        invalid_type_error: "Rating must be a number",
    })
        .min(1, {
        message: "Rating must be between 1 and 5",
    })
        .max(5, {
        message: "Rating must be between 1 and 5",
    }),
    review: zod_1.z
        .string({
        required_error: "Review is required",
        invalid_type_error: "Review must be a string",
    })
        .trim(),
});
exports.default = reviewValidationSchema;
