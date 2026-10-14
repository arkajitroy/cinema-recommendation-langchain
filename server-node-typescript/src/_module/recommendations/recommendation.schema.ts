import { z } from "zod";

export const UserInputSchema = z.object({
    userPrompt: z.string().min(1),
    genre: z.string().min(1),
    language: z.string().min(1),
    year: z.string().min(1),
    count: z.number().min(1),
});

export const MovieSchema = z.object({
    title: z.string().min(1).describe("The title of the movie"),
    year: z.string().min(1).describe("The year the movie was released"),
    genre: z.string().min(1).describe("The genre of the movie"),
    caste: z.string().min(1).describe("Top casts of the movie"),
    reason: z.string().min(1).describe("Reason for recommendation"),
    rating: z.number().min(1).max(10).describe("IMDB Rating of the movie"),
});

export const MovieRecommendationSchema = z.object({
    recommendations: z.array(MovieSchema).describe("List of recommended movies"),
});

export type UserInputSchemaType = z.infer<typeof UserInputSchema>;
export type MovieSchemaType = z.infer<typeof MovieSchema>;
export type MovieRecommendationSchemaType = z.infer<typeof MovieRecommendationSchema>;
