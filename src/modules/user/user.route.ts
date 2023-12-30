import { Router } from "express";
import { UserControllers } from "./user.controller";
import checkValidation from "../../middlewares/checkValidation";
import userValidationSchema from "./user.validation";

const router = Router();

router.post(
    "/register",
    checkValidation(userValidationSchema),
    UserControllers.createUser,
);

export const UserRoutes = router;
