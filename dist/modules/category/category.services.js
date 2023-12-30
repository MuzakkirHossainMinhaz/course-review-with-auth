"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const category_model_1 = require("./category.model");
const createCategory = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.createdBy = userData._id;
    const category = yield category_model_1.CategoryModel.create(payload);
    return category;
});
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.CategoryModel.find()
        .populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    })
        .exec();
    return { categories };
});
exports.CategoryServices = {
    createCategory,
    getAllCategories,
};
