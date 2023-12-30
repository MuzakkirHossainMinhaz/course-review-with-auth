/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
import { Server } from "http";

dotenv.config();

let server: Server;
const PORT = process.env.PORT || 5000;

async function main() {
    try {
        // listen for requests
        server = app.listen(PORT, () => {
            console.log(`🌐 Server is running on http://localhost:${PORT}`);
        });

        // connect to database
        await mongoose.connect(`${process.env.DATABASE_URL}`).then(() => {
            console.log("⚡️ Successfully connected to the database");
        });
    } catch (err) {
        // console.log(err);
    }
}

main();

process.on("unhandledRejection", () => {
    console.log(`🚫 Unhandled Rejection detected , shutting down ...`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("uncaughtException", () => {
    console.log(`🚫 Uncaught Exception detected , shutting down ...`);
    process.exit(1);
});
