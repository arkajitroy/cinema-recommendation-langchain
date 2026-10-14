import { getCinemaRecommendation } from "../../integrations/langchain/services.js";
import type { UserInputSchemaType } from "./recommendation.schema.js";

export class RecommendationService {
    async recommend(body: UserInputSchemaType) {
        const response = await getCinemaRecommendation(body);
        return response;
    }
}
