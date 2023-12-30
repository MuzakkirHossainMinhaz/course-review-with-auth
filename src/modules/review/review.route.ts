import { Router } from "express";
import checkValidation from "../../middlewares/checkValidation";
import reviewValidationSchema from "./review.validation";
import { ReviewControllers } from "./review.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
    "/",
    checkValidation(reviewValidationSchema),
    auth(USER_ROLE.user),
    ReviewControllers.createReview,
);

export const ReviewRoutes = router;
