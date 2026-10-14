import { CorsOptions } from "cors";
import { env } from "./env.js";

export const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || env.CORS_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Blocked by CORS policy"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
};
