import { JwtPayload } from "jsonwebtoken";
import { ICategory } from "./category.interface";
import { CategoryModel } from "./category.model";

const createCategory = async (userData: JwtPayload, payload: ICategory) => {
    payload.createdBy = userData._id;
    const category = await CategoryModel.create(payload);
    return category;
};

const getAllCategories = async () => {
    const categories = await CategoryModel.find()
        .populate({
            path: "createdBy",
            select: "-createdAt -updatedAt",
        })
        .exec();
    return { categories };
};

export const CategoryServices = {
    createCategory,
    getAllCategories,
};
