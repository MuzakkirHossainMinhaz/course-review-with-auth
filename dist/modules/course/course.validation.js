"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseValidationSchemas = void 0;
const zod_1 = require("zod");
// Zod schema for a single Tag
const tagSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "Tag name is required",
        invalid_type_error: "Tag name must be a string",
    })
        .trim(),
    isDeleted: zod_1.z.boolean().default(false),
});
// Zod schema for Course details when creating a new Course
const detailsSchema = zod_1.z.object({
    level: zod_1.z.enum(["Beginner", "Intermediate", "Advanced"], {
        required_error: "Course level is required",
        invalid_type_error: "Course level must be a string",
    }),
    description: zod_1.z
        .string({
        required_error: "Course description is required",
        invalid_type_error: "Course description must be a string",
    })
        .trim(),
});
// Zod schema for the Course model when creating a new Course
const createCourseSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Course title is required",
        invalid_type_error: "Course title must be a string",
    })
        .trim(),
    instructor: zod_1.z
        .string({
        required_error: "Course instructor is required",
        invalid_type_error: "Course instructor must be a string",
    })
        .trim(),
    categoryId: zod_1.z.string({
        required_error: "Course category is required",
        invalid_type_error: "Course category must be a string",
    }),
    price: zod_1.z
        .number({
        required_error: "Course price is required",
        invalid_type_error: "Course price must be a number",
    })
        .positive(),
    tags: zod_1.z.array(tagSchema, {
        required_error: "Course tags are required",
        invalid_type_error: "Course tags must be an array",
    }),
    startDate: zod_1.z
        .string({
        required_error: "Course start date is required",
        invalid_type_error: "Course start date must be a string",
    })
        .trim(),
    endDate: zod_1.z
        .string({
        required_error: "Course end date is required",
        invalid_type_error: "Course end date must be a string",
    })
        .trim(),
    language: zod_1.z
        .string({
        required_error: "Course language is required",
        invalid_type_error: "Course language must be a string",
    })
        .trim(),
    provider: zod_1.z
        .string({
        required_error: "Course provider is required",
        invalid_type_error: "Course provider must be a string",
    })
        .trim(),
    durationInWeeks: zod_1.z
        .number({
        required_error: "Course duration is required",
        invalid_type_error: "Course duration must be a number",
    })
        .positive()
        .optional(),
    details: detailsSchema,
});
// Zod schema for course details when updating an existing Course
const updateDetailsSchema = zod_1.z.object({
    level: zod_1.z
        .enum(["Beginner", "Intermediate", "Advanced"], {
        invalid_type_error: "Course level must be a string",
    })
        .optional(),
    description: zod_1.z
        .string({
        invalid_type_error: "Course description must be a string",
    })
        .trim()
        .optional(),
});
// Zod schema for the Course model when updating an existing Course
const updateCourseSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        invalid_type_error: "Course title must be a string",
    })
        .trim()
        .optional(),
    instructor: zod_1.z
        .string({
        invalid_type_error: "Course instructor must be a string",
    })
        .trim()
        .optional(),
    categoryId: zod_1.z
        .string({
        invalid_type_error: "Course category must be a string",
    })
        .optional(),
    price: zod_1.z
        .number({
        invalid_type_error: "Course price must be a number",
    })
        .positive()
        .optional(),
    tags: zod_1.z
        .array(tagSchema, {
        invalid_type_error: "Course tags must be an array",
    })
        .optional(),
    startDate: zod_1.z
        .string({
        invalid_type_error: "Course start date must be a string",
    })
        .trim()
        .optional(),
    endDate: zod_1.z
        .string({
        invalid_type_error: "Course end date must be a string",
    })
        .trim()
        .optional(),
    language: zod_1.z
        .string({
        invalid_type_error: "Course language must be a string",
    })
        .trim()
        .optional(),
    provider: zod_1.z
        .string({
        invalid_type_error: "Course provider must be a string",
    })
        .trim()
        .optional(),
    durationInWeeks: zod_1.z
        .number({
        invalid_type_error: "Course duration must be a number",
    })
        .positive()
        .optional(),
    details: zod_1.z.optional(updateDetailsSchema),
    createdBy: zod_1.z
        .string({
        required_error: "Course created by is required",
        invalid_type_error: "Course created by must be a string",
    })
        .optional(),
});
// Export the Zod schema for use in your application
exports.courseValidationSchemas = {
    createCourseSchema,
    updateCourseSchema,
};
