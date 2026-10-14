import z from "zod";

export const RecommendationSchema = z.object({
    userPrompt: z.string().min(1),
    genre: z.string().min(1),
    language: z.string().min(1),
    year: z.string().min(1),
    count: z.string().min(1),
});

export type RecommendationSchemaType = z.infer<typeof RecommendationSchema>;
