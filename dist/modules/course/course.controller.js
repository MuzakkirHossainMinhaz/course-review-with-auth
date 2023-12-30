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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const course_services_1 = require("./course.services");
const review_model_1 = require("../review/review.model");
const createCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { startDate, endDate } = req.body;
    const durationInWeeks = calculateDurationWeeks(startDate, endDate);
    req.body.durationInWeeks = durationInWeeks;
    const course = yield course_services_1.CourseServices.createCourse(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Course created successfully",
        data: course,
    });
}));
function calculateDurationWeeks(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // difference in milliseconds
    const differenceInMilliseconds = end.getTime() - start.getTime();
    // calculating milliseconds to weeks
    const durationInWeeks = Math.ceil(differenceInMilliseconds / (7 * 24 * 60 * 60 * 1000));
    return durationInWeeks;
}
const getAllCourses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    const { page, limit } = queryParams;
    const courses = yield course_services_1.CourseServices.getAllCourses(queryParams);
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Courses retrieved successfully",
        meta: {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            total: courses.length,
        },
        data: { courses },
    });
}));
const updateCourseById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const course = yield course_services_1.CourseServices.updateCourseById(courseId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Course updated successfully",
        data: course,
    });
}));
const getCourseByIdWithReviews = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params;
    const { course, reviews } = yield course_services_1.CourseServices.getCourseByIdWithReviews(courseId);
    if (!course) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Course not found",
            data: null,
        });
    }
    if (reviews.length === 0) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: "Reviews not found for the course",
            data: null,
        });
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Course and Reviews retrieved successfully",
        data: { course, reviews },
    });
}));
const getBestCourse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const reviewsWithAverageRating = yield review_model_1.ReviewModel.aggregate([
        {
            $group: {
                _id: "$courseId",
                averageRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 },
            },
        },
        { $sort: { averageRating: -1 } },
        { $limit: 1 },
    ]);
    const course = yield course_services_1.CourseServices.getCourseById((_a = reviewsWithAverageRating[0]) === null || _a === void 0 ? void 0 : _a._id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Best course retrieved successfully",
        data: {
            course,
            averageRating: (_b = reviewsWithAverageRating[0]) === null || _b === void 0 ? void 0 : _b.averageRating,
            reviewCount: (_c = reviewsWithAverageRating[0]) === null || _c === void 0 ? void 0 : _c.totalReviews,
        },
    });
}));
exports.CourseControllers = {
    createCourse,
    getAllCourses,
    updateCourseById,
    getCourseByIdWithReviews,
    getBestCourse,
};
