import app from "./app.js";
import { env } from "./config/env.js";

const PORT = env.PORT;

const server = app.listen(PORT, () => {
    console.log(`[INFO] Server running on port ${PORT} in ${env.NODE_ENV} mode`);
});

// Graceful Shutdown Handler
function gracefulShutdown(signal: string) {
    console.log(`\n[INFO] Received ${signal}. Closing HTTP server...`);

    server.close((err) => {
        if (err) {
            console.error("[ERROR] Error during server shutdown:", err);
            process.exit(1);
        }

        // Close database pools, Redis connections, or worker queues here
        console.log("[INFO] Server gracefully closed. Exiting process.");
        process.exit(0);
    });

    // Force close if connections hang past 10 seconds
    setTimeout(() => {
        console.error("[ERROR] Forcing shutdown: connection drain timed out.");
        process.exit(1);
    }, 10000).unref();
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Uncaught Exception / Promise Rejection Fallbacks
process.on("unhandledRejection", (reason) => {
    console.error("[FATAL] Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
});

process.on("uncaughtException", (error) => {
    console.error("[FATAL] Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
});
