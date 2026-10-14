import { ChatPromptTemplate } from "@langchain/core/prompts";

export const promptTemplate = ChatPromptTemplate.fromMessages([
    // System message to set the behavior of the assistant
    [
        "system",
        "You are a movie recommendation assistant. Recommend movies based on user preferences and results should be concise and helpful. Make sure the recommendations are relevant and high-quality. Generate the given Response in proper Markdown format",
    ],
    // Human message with a placeholder for user input
    [
        "human",
        `User Request: {userPrompt}

        Preferences:
        - Genre: {genre}
        - Language: {language}
        - Year: {year}
        - count: {count}
        
        `,
    ],
]);
