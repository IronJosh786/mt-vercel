import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.set("trust proxy", 1);
app.use(express.json({ limit: "16kb" })); // from json
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // from url
app.use(cookieParser()); // for secure CRUD operations from server to browser

// importing routes
import userRouter from "./routes/user.route.js";
import transactionRouter from "./routes/transaction.route.js";
import healthRouter from "./routes/health.route.js";
// declaring routes
app.use("/api/v2/users", userRouter);
app.use("/api/v2/transactions", transactionRouter);
app.use("/api/v2/health", healthRouter);

export { app };
