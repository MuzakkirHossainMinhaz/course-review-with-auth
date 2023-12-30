import { ZodError, ZodIssue } from "zod";
import { IErrorResponse } from "../interfaces";

const ZodErrorHanlder = (error: ZodError): IErrorResponse => {
    let errorMessages: string = "";

    error.issues.forEach((issue: ZodIssue, index: number) => {
        errorMessages += `${index !== 0 ? " " : ""}${issue?.path[
            issue.path.length - 1
        ]} is required.`;
    });

    const statusCode = 400;

    return {
        statusCode,
        message: "Validation Error",
        errorMessage: errorMessages,
        errorDetails: error,
    };
};

export default ZodErrorHanlder;
