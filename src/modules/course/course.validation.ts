import { z } from "zod";

// Zod schema for a single Tag
const tagSchema = z.object({
    name: z
        .string({
            required_error: "Tag name is required",
            invalid_type_error: "Tag name must be a string",
        })
        .trim(),
    isDeleted: z.boolean().default(false),
});

// Zod schema for Course details when creating a new Course
const detailsSchema = z.object({
    level: z.enum(["Beginner", "Intermediate", "Advanced"], {
        required_error: "Course level is required",
        invalid_type_error: "Course level must be a string",
    }),
    description: z
        .string({
            required_error: "Course description is required",
            invalid_type_error: "Course description must be a string",
        })
        .trim(),
});

// Zod schema for the Course model when creating a new Course
const createCourseSchema = z.object({
    title: z
        .string({
            required_error: "Course title is required",
            invalid_type_error: "Course title must be a string",
        })
        .trim(),
    instructor: z
        .string({
            required_error: "Course instructor is required",
            invalid_type_error: "Course instructor must be a string",
        })
        .trim(),
    categoryId: z.string({
        required_error: "Course category is required",
        invalid_type_error: "Course category must be a string",
    }),
    price: z
        .number({
            required_error: "Course price is required",
            invalid_type_error: "Course price must be a number",
        })
        .positive(),
    tags: z.array(tagSchema, {
        required_error: "Course tags are required",
        invalid_type_error: "Course tags must be an array",
    }),
    startDate: z
        .string({
            required_error: "Course start date is required",
            invalid_type_error: "Course start date must be a string",
        })
        .trim(),
    endDate: z
        .string({
            required_error: "Course end date is required",
            invalid_type_error: "Course end date must be a string",
        })
        .trim(),
    language: z
        .string({
            required_error: "Course language is required",
            invalid_type_error: "Course language must be a string",
        })
        .trim(),
    provider: z
        .string({
            required_error: "Course provider is required",
            invalid_type_error: "Course provider must be a string",
        })
        .trim(),
    durationInWeeks: z
        .number({
            required_error: "Course duration is required",
            invalid_type_error: "Course duration must be a number",
        })
        .positive()
        .optional(),
    details: detailsSchema,
});

// Zod schema for course details when updating an existing Course
const updateDetailsSchema = z.object({
    level: z
        .enum(["Beginner", "Intermediate", "Advanced"], {
            invalid_type_error: "Course level must be a string",
        })
        .optional(),
    description: z
        .string({
            invalid_type_error: "Course description must be a string",
        })
        .trim()
        .optional(),
});

// Zod schema for the Course model when updating an existing Course
const updateCourseSchema = z.object({
    title: z
        .string({
            invalid_type_error: "Course title must be a string",
        })
        .trim()
        .optional(),
    instructor: z
        .string({
            invalid_type_error: "Course instructor must be a string",
        })
        .trim()
        .optional(),
    categoryId: z
        .string({
            invalid_type_error: "Course category must be a string",
        })
        .optional(),
    price: z
        .number({
            invalid_type_error: "Course price must be a number",
        })
        .positive()
        .optional(),
    tags: z
        .array(tagSchema, {
            invalid_type_error: "Course tags must be an array",
        })
        .optional(),
    startDate: z
        .string({
            invalid_type_error: "Course start date must be a string",
        })
        .trim()
        .optional(),
    endDate: z
        .string({
            invalid_type_error: "Course end date must be a string",
        })
        .trim()
        .optional(),
    language: z
        .string({
            invalid_type_error: "Course language must be a string",
        })
        .trim()
        .optional(),
    provider: z
        .string({
            invalid_type_error: "Course provider must be a string",
        })
        .trim()
        .optional(),
    durationInWeeks: z
        .number({
            invalid_type_error: "Course duration must be a number",
        })
        .positive()
        .optional(),
    details: z.optional(updateDetailsSchema),
    createdBy: z
        .string({
            required_error: "Course created by is required",
            invalid_type_error: "Course created by must be a string",
        })
        .optional(),
});

// Export the Zod schema for use in your application
export const courseValidationSchemas = {
    createCourseSchema,
    updateCourseSchema,
};
