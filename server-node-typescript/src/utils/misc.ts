import { Server } from "node:http";

// Graceful Shutdown Handler
export function gracefulShutdown(signal: string, server: Server) {
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
