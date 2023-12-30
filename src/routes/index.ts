import { Router } from "express";
import { CourseRoutes } from "../modules/course/course.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CourseControllers } from "../modules/course/course.controller";

const router = Router();

router.use("/auth", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/courses", CourseRoutes);
router.use("/course/best", CourseControllers.getBestCourse);
router.use("/categories", CategoryRoutes);
router.use("/reviews", ReviewRoutes);

export default router;
