import express from "express";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import { healthCheck } from "./_module/health/health.controller.js";
import { globalErrorHandler, notFoundHandler } from "./utils/error.js";
import { recommendationsRouter } from "./routes/recommendations.route.js";

// Application Configuration
const app = express();
app.use(cors(corsOptions));

// Body Parsers with payload size limits to guard against DoS
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Error Handling Middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Routes
app.get("/health", healthCheck);
app.use("/api/v1/recommendations", recommendationsRouter);

export default app;
