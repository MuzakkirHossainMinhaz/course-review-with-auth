import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.services";

const createReview = catchAsync(async (req, res) => {
    const review = await ReviewServices.createReview(req.user, req.body);

    sendResponse(res, {
        success: true,
        statusCode: 201,
        message: "Review created successfully",
        data: review,
    });
});

export const ReviewControllers = { createReview };
