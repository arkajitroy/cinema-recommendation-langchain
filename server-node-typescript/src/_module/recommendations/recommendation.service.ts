import { getCinemaRecommendation } from "../../integrations/langchain/services";
import { RecommendationSchemaType } from "./recommendation.schema";

export class RecommendationService {
    async recommend(body: RecommendationSchemaType) {
        const response = await getCinemaRecommendation(body);
        return response.text;
    }
}
