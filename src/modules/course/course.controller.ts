import httpStatus from "http-status";
import { IQuery } from "../../interfaces";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.services";
import { ReviewModel } from "../review/review.model";

const createCourse = catchAsync(async (req, res) => {
    const { startDate, endDate } = req.body;
    const durationInWeeks = calculateDurationWeeks(startDate, endDate);

    req.body.durationInWeeks = durationInWeeks;

    const course = await CourseServices.createCourse(req.user, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Course created successfully",
        data: course,
    });
});

function calculateDurationWeeks(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // difference in milliseconds
    const differenceInMilliseconds = end.getTime() - start.getTime();

    // calculating milliseconds to weeks
    const durationInWeeks = Math.ceil(
        differenceInMilliseconds / (7 * 24 * 60 * 60 * 1000),
    );

    return durationInWeeks;
}

const getAllCourses = catchAsync(async (req, res) => {
    const queryParams = req.query as IQuery;
    const { page, limit } = queryParams;

    const courses = await CourseServices.getAllCourses(queryParams);

    res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "Courses retrieved successfully",
        meta: {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            total: courses.length,
        },
        data: { courses },
    });
});

const updateCourseById = catchAsync(async (req, res) => {
    const { courseId } = req.params;

    const course = await CourseServices.updateCourseById(courseId, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Course updated successfully",
        data: course,
    });
});

const getCourseByIdWithReviews = catchAsync(async (req, res) => {
    const { courseId } = req.params;

    const { course, reviews } =
        await CourseServices.getCourseByIdWithReviews(courseId);

    if (!course) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "Course not found",
            data: null,
        });
    }

    if (reviews.length === 0) {
        return sendResponse(res, {
            success: false,
            statusCode: httpStatus.NOT_FOUND,
            message: "Reviews not found for the course",
            data: null,
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Course and Reviews retrieved successfully",
        data: { course, reviews },
    });
});

const getBestCourse = catchAsync(async (req, res) => {
    const reviewsWithAverageRating = await ReviewModel.aggregate([
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

    const course = await CourseServices.getCourseById(
        reviewsWithAverageRating[0]?._id,
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Best course retrieved successfully",
        data: {
            course,
            averageRating: reviewsWithAverageRating[0]?.averageRating,
            reviewCount: reviewsWithAverageRating[0]?.totalReviews,
        },
    });
});

export const CourseControllers = {
    createCourse,
    getAllCourses,
    updateCourseById,
    getCourseByIdWithReviews,
    getBestCourse,
};
