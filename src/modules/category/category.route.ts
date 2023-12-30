import { Router } from "express";
import checkValidation from "../../middlewares/checkValidation";
import categoryValidationSchema from "./category.validation";
import { CategoryControllers } from "./category.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
    "/",
    checkValidation(categoryValidationSchema),
    auth(USER_ROLE.admin),
    CategoryControllers.createCategory,
);
router.get("/", CategoryControllers.getAllCategories);

export const CategoryRoutes = router;
