import { Router } from "express";
import checkValidation from "../../middlewares/checkValidation";
import { CourseControllers } from "./course.controller";
import { courseValidationSchemas } from "./course.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
    "/",
    checkValidation(courseValidationSchemas.createCourseSchema),
    auth(USER_ROLE.admin),
    CourseControllers.createCourse,
);
router.get("/", CourseControllers.getAllCourses);
router.put(
    "/:courseId",
    checkValidation(courseValidationSchemas.updateCourseSchema),
    auth(USER_ROLE.admin),
    CourseControllers.updateCourseById,
);
router.get("/:courseId/reviews", CourseControllers.getCourseByIdWithReviews);
// router.get("/course/best", CourseControllers.getBestCourse);

export const CourseRoutes = router;
