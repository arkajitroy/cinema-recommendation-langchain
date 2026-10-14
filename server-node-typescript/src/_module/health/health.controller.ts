import { Request, Response } from "express";
import { env } from "../../config/env.js";

export function healthCheck(req: Request, res: Response) {
    try {
        res.status(200).json({
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: `${process.uptime().toFixed(2)}s`,
            environment: env.NODE_ENV,
            memoryUsage: process.memoryUsage(),
        });
    } catch (error) {
        console.error("[ERROR] Health check failed:", error);
        res.status(500).json({
            status: "error",
            message: "Health check failed",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}
