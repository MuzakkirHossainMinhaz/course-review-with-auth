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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const queryBuilder_1 = require("../../builder/queryBuilder");
const review_model_1 = require("../review/review.model");
const course_model_1 = require("./course.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createCourse = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.createdBy = userData._id;
    const course = yield course_model_1.CourseModel.create(payload);
    return course;
});
const getAllCourses = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield (0, queryBuilder_1.queryBuilder)(queryParams, course_model_1.CourseModel)
        .populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    })
        .exec();
    return courses;
});
const updateCourseById = (courseId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, details } = payload, remainingData = __rest(payload, ["tags", "details"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // update the primtive fields
        const updatedPrimitiveCourseInfo = yield course_model_1.CourseModel.findByIdAndUpdate(courseId, remainingData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updatedPrimitiveCourseInfo) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update. Please try again!");
        }
        // update details info
        if (details) {
            const updatedDetails = yield course_model_1.CourseModel.findByIdAndUpdate(courseId, {
                $set: {
                    "details.level": details.level,
                    "details.description": details.description,
                },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!updatedDetails) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update. Please try again!");
            }
        }
        // update tags
        if (tags && tags.length > 0) {
            // delete the deleted tags
            const deletedTags = tags
                .filter((tag) => tag.name && tag.isDeleted)
                .map((tag) => tag.name);
            const deletedAllTags = yield course_model_1.CourseModel.findByIdAndUpdate(courseId, {
                $pull: {
                    tags: { name: { $in: deletedTags } },
                },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!deletedAllTags) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update. Please try again!");
            }
            // add new tags
            const newTags = tags === null || tags === void 0 ? void 0 : tags.filter((tag) => tag.name && !tag.isDeleted);
            const newAllTags = yield course_model_1.CourseModel.findByIdAndUpdate(courseId, {
                $addToSet: { tags: { $each: newTags } },
            }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!newAllTags) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update. Please try again!");
            }
        }
        yield session.commitTransaction();
        yield session.endSession();
        // updated course return
        const result = yield course_model_1.CourseModel.findById(courseId)
            .populate({
            path: "createdBy",
            select: "-createdAt -updatedAt",
        })
            .exec();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Failed to update. Please try again!");
    }
});
const getCourseByIdWithReviews = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.CourseModel.findById(courseId).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });
    const reviews = yield review_model_1.ReviewModel.find({ courseId: courseId }).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });
    return { course, reviews };
});
const getCourseById = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_model_1.CourseModel.findById(courseId).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });
    return course;
});
exports.CourseServices = {
    createCourse,
    getAllCourses,
    updateCourseById,
    getCourseByIdWithReviews,
    getCourseById,
};
