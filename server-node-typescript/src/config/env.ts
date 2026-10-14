import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().int().min(1).max(65535).default(3000),
    CORS_ORIGINS: z
        .string()
        .default("http://localhost:3000,http://localhost:5173")
        .transform((val) => val.split(",").map((s) => s.trim()))
        .pipe(z.array(z.string().url())),

    DATABASE_URL: z.string().url().optional(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    GOOGLE_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);
