import { env } from "../../config/env.js";
import { ChatGroq } from "@langchain/groq";

// export const LLMConnector = new ChatGoogle({
//     ...(env.GOOGLE_API_KEY ? { apiKey: env.GOOGLE_API_KEY } : {}),
//     model: "gemini-3.7-flash",
//     temperature: 0.7, // 0.3 to 0.7 is a good range for temperature
//     maxOutputTokens: 1024, // Adjust based on your needs
// });

export const LLM = new ChatGroq({
    ...(env.GROQ_API_KEY ? { apiKey: env.GROQ_API_KEY } : {}),
    model: "qwen/qwen3.8-27b",
    temperature: 0.6,
});
