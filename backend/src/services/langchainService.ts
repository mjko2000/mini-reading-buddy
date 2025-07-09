import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "langchain/prompts";
import { ChatResponse, WordDetails } from "../types";

export class LangchainService {
  private llm: ChatOpenAI;

  constructor() {
    console.log("api", process.env.OPENAI_API_KEY);
    // Initialize OpenAI model
    this.llm = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4.1-mini-2025-04-14",
      temperature: 0.7,
    });
  }

  /**
   * Generate chat response using AI
   */
  async generateChatResponse(message: string): Promise<ChatResponse> {
    try {
      const prompt = `You are an English learning assistant. The user sent: "${message}". 

Please provide:
1. A helpful, encouraging response in English
2. 2 practice questions with words in curly braces like "I {love} reading books."

Format your response as JSON:
{
  "content": "Your helpful response here...",
  "questions": ["Practice question 1 with {word}.", "Practice question 2 with {word}."]
}`;

      const result = await this.llm.invoke(prompt);

      // Parse AI response
      try {
        const parsed = JSON.parse(result.content as string);
        return {
          content: parsed.content,
          questions: parsed.questions || [],
        };
      } catch (parseError) {
        console.error("Failed to parse AI chat response:", parseError);
        return this.getMockChatResponse(message);
      }
    } catch (error) {
      console.error("Error generating chat response:", error);
      return this.getMockChatResponse(message);
    }
  }

  /**
   * Get word details using AI
   */
  async getWordDetails(word: string): Promise<WordDetails> {
    try {
      const prompt = `Provide detailed information about the English word "${word}".

Format your response as JSON:
{
  "word": "${word}",
  "phonetic": "IPA phonetic transcription",
  "translations": [
    {"type": "noun", "text": "Vietnamese translation"},
    {"type": "verb", "text": "Vietnamese translation"}
  ],
  "stress": "Description of word stress pattern"
}
`;

      const result = await this.llm.invoke(prompt);
      const content = String(result.content)
        .replace("```json", "")
        .replace("```", "");

      try {
        const parsed = JSON.parse(content);
        return {
          word: parsed.word,
          phonetic: parsed.phonetic,
          translations: parsed.translations || [],
          stress: parsed.stress,
        };
      } catch (parseError) {
        console.error("Failed to parse AI word response:", parseError);
        return this.getMockWordDetails(word);
      }
    } catch (error) {
      console.error("Error getting word details:", error);
      return this.getMockWordDetails(word);
    }
  }

  /**
   * Generate fill-in-the-blank questions from text
   */
  async generateQuestions(text: string): Promise<any[]> {
    try {
      const prompt = `Create 2 fill-in-the-blank questions from the following English text.
Each question should test vocabulary or grammar understanding.

Text: ${text}

Format your response as JSON array:
[
  {
    "question": "The sentence with _____ for the blank",
    "answer": "correct_word",
    "options": ["correct_word", "wrong1", "wrong2"]
  }
]`;

      const result = await this.llm.invoke(prompt);
      const content = String(result.content)
        .replace("```json", "")
        .replace("```", "");
      // Parse the JSON response
      try {
        return JSON.parse(content);
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError);
        return this.getMockQuestions(); // Fallback to mock data
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      return this.getMockQuestions(); // Fallback to mock data
    }
  }

  /**
   * Get word translations (using AI)
   */
  async getTranslation(word: string): Promise<string | null> {
    try {
      const prompt = `Translate the English word "${word}" to Vietnamese. Provide only the Vietnamese translation, no explanation.`;

      const result = await this.llm.invoke(prompt);
      return (result.content as string).trim();
    } catch (error) {
      console.error("Error translating word:", error);
      return null;
    }
  }

  /**
   * Mock questions for fallback
   */
  private getMockQuestions() {
    return [
      {
        question:
          "It is a very _____ morning with sunshine and flowers in the garden.",
        answer: "beautiful",
        options: ["beautiful", "ugly", "dark"],
      },
      {
        question: "The _____ is very nice today.",
        answer: "weather",
        options: ["weather", "food", "music"],
      },
    ];
  }

  /**
   * Mock chat response for fallback
   */
  private getMockChatResponse(message: string): ChatResponse {
    return {
      content: `Thank you for your message: "${message}". Let's practice with some common English expressions!`,
      questions: [
        "I {like} learning English every day.",
        "The weather is {beautiful} today.",
      ],
    };
  }

  /**
   * Mock word details for fallback
   */
  private getMockWordDetails(word: string): WordDetails {
    return {
      word: word,
      phonetic: `/${word.toLowerCase()}/`,
      translations: [
        { type: "noun", text: "ví dụ (danh từ)" },
        { type: "verb", text: "ví dụ (động từ)" },
      ],
      stress: `Stress pattern for: ${word}`,
    };
  }
}

export const langchainService = new LangchainService();
