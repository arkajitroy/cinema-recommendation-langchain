import type { Request, Response, NextFunction } from "express";
import { RecommendationService } from "./recommendation.service.js";
import { RecommendationSchema } from "./recommendation.schema.js";

export class RecommendationController {
    constructor(private readonly recommendationService: RecommendationService) {}

    recommend = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const validatedBody = RecommendationSchema.parse(req.body);
            const response = await this.recommendationService.recommend(validatedBody);

            res.status(200).json({
                success: true,
                message: "Recommendation successful",
                data: response,
            });
        } catch (error) {
            next(error);
        }
    };
}
