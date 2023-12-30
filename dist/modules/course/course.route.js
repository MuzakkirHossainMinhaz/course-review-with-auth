"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseRoutes = void 0;
const express_1 = require("express");
const checkValidation_1 = __importDefault(require("../../middlewares/checkValidation"));
const course_controller_1 = require("./course.controller");
const course_validation_1 = require("./course.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post("/", (0, checkValidation_1.default)(course_validation_1.courseValidationSchemas.createCourseSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseControllers.createCourse);
router.get("/", course_controller_1.CourseControllers.getAllCourses);
router.put("/:courseId", (0, checkValidation_1.default)(course_validation_1.courseValidationSchemas.updateCourseSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), course_controller_1.CourseControllers.updateCourseById);
router.get("/:courseId/reviews", course_controller_1.CourseControllers.getCourseByIdWithReviews);
// router.get("/course/best", CourseControllers.getBestCourse);
exports.CourseRoutes = router;
