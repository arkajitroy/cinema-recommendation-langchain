import { promptTemplate } from "./template.js";
import {
    MovieRecommendationSchema,
    type UserInputSchemaType,
} from "../../_module/recommendations/recommendation.schema.js";
import { LLM } from "./model.js";

const structuredModel = LLM.withStructuredOutput(MovieRecommendationSchema);

export async function getCinemaRecommendation(payload: UserInputSchemaType) {
    // const promptChain = promptTemplate.pipe(LLMConnector);
    const promptChain = promptTemplate.pipe(structuredModel);

    // .pip(model) is a method that allows you to chain the prompt template with the LLM model. It takes the input variables and generates a response based on the defined prompt template.
    // input -> promptTemplate -> LLMConnector -> output

    const response = await promptChain.invoke({
        userPrompt: payload.userPrompt,
        genre: payload.genre,
        language: payload.language,
        year: payload.year,
        count: payload.count,
    });

    return response;
}
