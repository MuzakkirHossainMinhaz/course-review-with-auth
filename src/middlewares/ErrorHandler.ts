/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import ZodErrorHanlder from "../errors/ZodErrorHandler";
import ValidationErrorHandler from "../errors/ValidationErrorHandler";
import CastErrorHandler from "../errors/CastErrorHandler";
import DuplicateErrorHandler from "../errors/DuplicateErrorHandler";
import AppError from "../errors/AppError";

const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = "Internal Server Error";
    let errorMessage: string = "";
    let errorDetails: any;

    if (error instanceof ZodError) {
        const simplifiedError = ZodErrorHanlder(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessage = simplifiedError?.errorMessage;
        errorDetails = simplifiedError?.errorDetails;
    } else if (error?.name === "ValidationError") {
        const simplifiedError = ValidationErrorHandler(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessage = simplifiedError?.errorMessage;
        errorDetails = simplifiedError?.errorDetails;
    } else if (error?.name === "CastError") {
        const simplifiedError = CastErrorHandler(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessage = simplifiedError?.errorMessage;
        errorDetails = simplifiedError?.errorDetails;
    } else if (error?.code === 11000) {
        const simplifiedError = DuplicateErrorHandler(error);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessage = simplifiedError?.errorMessage;
        errorDetails = simplifiedError?.errorDetails;
    } else if (error instanceof AppError) {
        if (error.message === "Unauthorized Access") {
            statusCode = error?.statusCode;
            message = error.message;
            errorMessage =
                "You do not have the necessary permissions to access this resource.";
            errorDetails = null;
        } else {
            statusCode = error?.statusCode;
            message = error.message;
        }
    } else if (error instanceof Error) {
        message = error.message;
    }

    // return custom error response
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        errorDetails,
        stack:
            message === "Unauthorized Access"
                ? null
                : process.env.NODE_ENV === "DEVELOPMENT"
                  ? error?.stack
                  : null,
    });
};

export default ErrorHandler;
