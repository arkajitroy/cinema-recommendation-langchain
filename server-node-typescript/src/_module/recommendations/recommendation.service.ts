import { getCinemaRecommendation } from "../../integrations/langchain/services.js";
import type { RecommendationSchemaType } from "./recommendation.schema.js";

export class RecommendationService {
    async recommend(body: RecommendationSchemaType) {
        const response = await getCinemaRecommendation(body);
        return response.text;
    }
}
