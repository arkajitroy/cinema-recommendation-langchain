import { Router } from "express";
import { RecommendationController } from "../_module/recommendations/recommendation.controller";
import { RecommendationService } from "../_module/recommendations/recommendation.service";

export const recommendationsRouter = Router();
const recommendationController = new RecommendationController(new RecommendationService());

// routes
recommendationsRouter.post("/", recommendationController.recommend);
