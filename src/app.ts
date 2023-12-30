import express, { Application, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import ErrorHandler from "./middlewares/ErrorHandler";
import router from "./routes";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api", router);

// default route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome to The Course Review server!",
    });
});

// 404 route
app.all("*", (req: Request, res: Response) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "404! This Route Not Found.",
    });
});

// global error handler
app.use(ErrorHandler);

export default app;
