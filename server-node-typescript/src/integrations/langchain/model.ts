import { ChatGoogle } from "@langchain/google";
import { env } from "../../config/env";

export const LLMConnector = new ChatGoogle({
    apiKey: env.GOOGLE_API_KEY!,
    model: "gemini-3.7-flash",
    temperature: 0.7, // 0.3 to 0.7 is a good range for temperature
    maxOutputTokens: 1024, // Adjust based on your needs
});
