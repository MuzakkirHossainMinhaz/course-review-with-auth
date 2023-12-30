import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import checkValidation from "../../middlewares/checkValidation";
import { authValidationSchemas } from "./auth.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.use(
    "/login",
    checkValidation(authValidationSchemas.authLoginValidationSchema),
    AuthControllers.loginUser,
);
router.use(
    "/change-password",
    checkValidation(authValidationSchemas.changePasswordValidationSchema),
    auth(USER_ROLE.user, USER_ROLE.admin),
    AuthControllers.changePassword,
);

export const AuthRoutes = router;
