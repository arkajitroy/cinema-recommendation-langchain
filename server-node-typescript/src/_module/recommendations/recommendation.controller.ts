import { Request, Response } from "express";
import { RecommendationService } from "./recommendation.service";
import { RecommendationSchema } from "./recommendation.schema";

export class RecommendationController {
    constructor(private readonly recommendationService: RecommendationService) {}

    recommend = async (req: Request, res: Response): Promise<Response> => {
        try {
            const validatedBody = RecommendationSchema.parse(req.body);
            const response = await this.recommendationService.recommend(validatedBody);

            return res.status(200).json({
                message: "Recommendation successful",
                data: response,
            });
        } catch (error) {
            console.error("Recommendation error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
}
