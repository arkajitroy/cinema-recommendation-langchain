import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";

export function globalErrorHandler(
    err: { status?: number; name?: string; message?: string; stack?: string },
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const statusCode = err.status || 500;
    const isProduction = env.NODE_ENV === "production";

    res.status(statusCode).json({
        error: err.name || "InternalServerError",
        message: err.message || "An unexpected error occurred",
        ...(isProduction ? {} : { stack: err.stack }),
    });
}

export function notFoundHandler(req: Request, res: Response) {
    res.status(404).json({
        error: "NotFound",
        message: `Route ${req.method} ${req.originalUrl} not found`,
    });
}
