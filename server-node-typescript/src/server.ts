import app from "./app.js";
import { env } from "./config/env.js";
import { gracefulShutdown } from "./utils/misc.js";

const PORT = env.PORT;

const server = app.listen(PORT, () => {
    console.log(
        `[INFO] Server running on port ${PORT} in ${env.NODE_ENV} mode : http://localhost:${PORT}`,
    );
});

process.on("SIGTERM", () => gracefulShutdown("SIGTERM", server));
process.on("SIGINT", () => gracefulShutdown("SIGINT", server));

// Uncaught Exception / Promise Rejection Fallbacks
process.on("unhandledRejection", (reason) => {
    console.error("[FATAL] Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection", server);
});

process.on("uncaughtException", (error) => {
    console.error("[FATAL] Uncaught Exception:", error);
    gracefulShutdown("uncaughtException", server);
});
