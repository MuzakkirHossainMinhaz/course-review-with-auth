import mongoose from "mongoose";
import { queryBuilder } from "../../builder/queryBuilder";
import { IQuery } from "../../interfaces";
import { ReviewModel } from "../review/review.model";
import { ICourse } from "./course.interface";
import { CourseModel } from "./course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const createCourse = async (userData: JwtPayload, payload: ICourse) => {
    payload.createdBy = userData._id;
    const course = await CourseModel.create(payload);
    return course;
};

const getAllCourses = async (queryParams: IQuery) => {
    const courses = await queryBuilder(queryParams, CourseModel)
        .populate({
            path: "createdBy",
            select: "-createdAt -updatedAt",
        })
        .exec();

    return courses;
};

const updateCourseById = async (
    courseId: string,
    payload: Partial<ICourse>,
) => {
    const { tags, details, ...remainingData } = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // update the primtive fields
        const updatedPrimitiveCourseInfo = await CourseModel.findByIdAndUpdate(
            courseId,
            remainingData,
            {
                new: true,
                runValidators: true,
                session,
            },
        );

        if (!updatedPrimitiveCourseInfo) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                "Failed to update. Please try again!",
            );
        }

        // update details info
        if (details) {
            const updatedDetails = await CourseModel.findByIdAndUpdate(
                courseId,
                {
                    $set: {
                        "details.level": details.level,
                        "details.description": details.description,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );

            if (!updatedDetails) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    "Failed to update. Please try again!",
                );
            }
        }

        // update tags
        if (tags && tags.length > 0) {
            // delete the deleted tags
            const deletedTags = tags
                .filter((tag) => tag.name && tag.isDeleted)
                .map((tag) => tag.name);

            const deletedAllTags = await CourseModel.findByIdAndUpdate(
                courseId,
                {
                    $pull: {
                        tags: { name: { $in: deletedTags } },
                    },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );

            if (!deletedAllTags) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    "Failed to update. Please try again!",
                );
            }

            // add new tags
            const newTags = tags?.filter((tag) => tag.name && !tag.isDeleted);

            const newAllTags = await CourseModel.findByIdAndUpdate(
                courseId,
                {
                    $addToSet: { tags: { $each: newTags } },
                },
                {
                    new: true,
                    runValidators: true,
                    session,
                },
            );

            if (!newAllTags) {
                throw new AppError(
                    httpStatus.BAD_REQUEST,
                    "Failed to update. Please try again!",
                );
            }
        }

        await session.commitTransaction();
        await session.endSession();

        // updated course return
        const result = await CourseModel.findById(courseId)
            .populate({
                path: "createdBy",
                select: "-createdAt -updatedAt",
            })
            .exec();

        return result;
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();

        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to update. Please try again!",
        );
    }
};

const getCourseByIdWithReviews = async (courseId: string) => {
    const course = await CourseModel.findById(courseId).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });
    const reviews = await ReviewModel.find({ courseId: courseId }).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });

    return { course, reviews };
};

const getCourseById = async (courseId: string) => {
    const course = await CourseModel.findById(courseId).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });
    return course;
};

export const CourseServices = {
    createCourse,
    getAllCourses,
    updateCourseById,
    getCourseByIdWithReviews,
    getCourseById,
};
