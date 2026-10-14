import cors from "cors";
import express from "express";
import { corsOptions } from "./config/cors.js";
import { globalErrorHandler, notFoundHandler } from "./utils/error.js";
import { recommendationsRouter } from "./routes/recommendations.route.js";
import { healthRouter } from "./routes/health.routes.js";

// Application Configuration
const app = express();
app.use(cors(corsOptions));

// Body Parsers with payload size limits to guard against DoS
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Routes
app.use("/health-check", healthRouter);
app.use("/api/v1/recommendations", recommendationsRouter);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
