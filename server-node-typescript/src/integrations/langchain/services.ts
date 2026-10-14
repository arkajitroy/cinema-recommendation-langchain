import { RecommendationSchemaType } from "../../_module/recommendations/recommendation.schema";
import { LLMConnector } from "./model";
import { promptTemplate } from "./template";

export async function getCinemaRecommendation(payload: RecommendationSchemaType) {
    const promptChain = promptTemplate.pipe(LLMConnector);

    // .pip(model) is a method that allows you to chain the prompt template with the LLM model. It takes the input variables and generates a response based on the defined prompt template.
    // input -> promptTemplate -> LLMConnector -> output

    const response = await promptChain.invoke({
        userPrompt: payload.userPrompt,
        genre: payload.genre,
        language: payload.language,
        year: payload.year,
        count: payload.count,
    });

    console.log("LLM Response :", response.text);
    return response;
}
