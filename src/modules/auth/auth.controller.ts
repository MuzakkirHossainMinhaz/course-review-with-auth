import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
    const user = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User login successful",
        data: user,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const user = await AuthServices.changePassword(req.user, req.body);

    if (user?.username === false) {
        // convert utc to local date and time
        const date = new Date(user?.email as Date)
            .toLocaleDateString("en-US")
            .split("/")
            .reverse()
            .join("-");
        const time = new Date(user?.email as Date).toLocaleTimeString(
            "en-US",
        );

        // throw error if password is same as last 2 used
        return sendResponse(res, {
            success: false,
            statusCode: 400,
            message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${date} at ${time}).`,
            data: null,
        });
    }

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Password changed successfully",
        data: user,
    });
});

export const AuthControllers = { loginUser, changePassword };
