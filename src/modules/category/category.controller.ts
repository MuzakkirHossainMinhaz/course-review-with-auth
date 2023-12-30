import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryServices } from "./category.services";

const createCategory = catchAsync(async (req, res) => {
    const category = await CategoryServices.createCategory(req.user, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Category created successfully",
        data: category,
    });
});

const getAllCategories = catchAsync(async (req, res) => {
    const categories = await CategoryServices.getAllCategories();

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Categories retrieved successfully",
        data: categories,
    });
});

export const CategoryControllers = { createCategory, getAllCategories };
