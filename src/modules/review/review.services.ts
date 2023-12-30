import { JwtPayload } from "jsonwebtoken";
import { IReview } from "./review.interface";
import { ReviewModel } from "./review.model";

const createReview = async (userData: JwtPayload, payload: IReview) => {
    payload.createdBy = userData._id;
    const review = (await ReviewModel.create(payload)).populate({
        path: "createdBy",
        select: "-createdAt -updatedAt",
    });
    return review;
};

export const ReviewServices = { createReview };
