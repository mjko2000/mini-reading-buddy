import { ChatResponse } from "../types";
import { langchainService } from "./langchainService";

/**
 * Chat Service - Handles AI chat responses and conversation logic
 */
export class ChatService {
  private static aiResponses: { [key: string]: ChatResponse } = {
    pizza: {
      content:
        "Well done! Your sentence is clear and correct. If you want to say it in a slightly different way, you can also say, 'My pizza has cheese and pepperoni.' Would you like to learn how to describe your favorite drink next? For example, you can say, 'My favorite drink is orange juice.' What do you think?",
      questions: [
        "My pizza {has} cheese and pepperoni.",
        "My favorite drink is {orange} juice.",
      ],
    },

    hello: {
      content:
        "Hello! Great to meet you! Let's practice describing things you like. For example, you can say 'I like reading books' or 'I enjoy playing games.' Try to tell me about something you enjoy doing!",
      questions: ["I {like} reading books.", "I enjoy {playing} games."],
    },

    weather: {
      content:
        "Excellent! Talking about weather is very useful. You can describe today's weather or your favorite weather. For instance: 'Today is sunny and warm' or 'I love rainy days because they are peaceful.'",
      questions: ["Today is {sunny} and warm.", "I love {rainy} days."],
    },

    default: {
      content:
        "That's interesting! Let me help you practice with some common expressions. You can describe your daily activities like 'I wake up early every morning' or talk about your hobbies like 'I love listening to music.'",
      questions: [
        "I wake up {early} every morning.",
        "I love listening to {music}.",
      ],
    },

    food: {
      content:
        "Great! Food is always a fun topic. You can describe your favorite meals or cooking preferences. For example, 'I enjoy eating fresh vegetables' or 'My family loves cooking together on weekends.'",
      questions: [
        "I enjoy eating {fresh} vegetables.",
        "My family loves {cooking} together.",
      ],
    },

    hobby: {
      content:
        "Wonderful! Hobbies are a great way to express yourself. You can talk about activities you enjoy like 'I spend time reading novels' or 'I practice playing guitar every day.'",
      questions: [
        "I spend time {reading} novels.",
        "I practice {playing} guitar every day.",
      ],
    },

    // Additional responses for better coverage
    learn: {
      content:
        "Learning is fantastic! There are so many ways to learn new things. You can say 'I study English every day' or 'I watch educational videos online.' What's your favorite way to learn?",
      questions: [
        "I {study} English every day.",
        "I watch educational {videos} online.",
      ],
    },

    family: {
      content:
        "Family is very important! You can describe your family activities like 'We have dinner together every evening' or 'My sister helps me with homework.'",
      questions: [
        "We have {dinner} together every evening.",
        "My sister {helps} me with homework.",
      ],
    },

    work: {
      content:
        "Talking about work or school is useful! You can say 'I go to work by bus' or 'I finish my tasks before lunch.' These are great everyday expressions.",
      questions: [
        "I go to work by {bus}.",
        "I finish my {tasks} before lunch.",
      ],
    },
  };

  /**
   * Generate AI response based on user message using LangchainService
   * @param message - User's message
   * @param conversationId - Optional conversation ID for context
   * @returns AI response with content and questions
   */
  public static async generateResponse(
    message: string,
    conversationId?: string
  ): Promise<ChatResponse> {
    try {
      // Use AI to generate response
      const aiResponse = await langchainService.generateChatResponse(message);
      return aiResponse;
    } catch (error) {
      console.error("Error generating AI chat response:", error);

      // Fallback to mock response if AI fails
      return this.getFallbackResponse(message);
    }
  }

  /**
   * Fallback response when AI is unavailable
   * @param message - User's message
   * @returns Fallback chat response
   */
  private static getFallbackResponse(message: string): ChatResponse {
    const lowerMessage = message.toLowerCase();

    // Determine the appropriate response based on message content
    let responseKey = "default";

    if (
      lowerMessage.includes("pizza") ||
      lowerMessage.includes("cheese") ||
      lowerMessage.includes("pepperoni")
    ) {
      responseKey = "pizza";
    } else if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      responseKey = "hello";
    } else if (
      lowerMessage.includes("weather") ||
      lowerMessage.includes("sunny") ||
      lowerMessage.includes("rain") ||
      lowerMessage.includes("cloudy")
    ) {
      responseKey = "weather";
    } else if (
      lowerMessage.includes("food") ||
      lowerMessage.includes("eat") ||
      lowerMessage.includes("cook") ||
      lowerMessage.includes("meal")
    ) {
      responseKey = "food";
    } else if (
      lowerMessage.includes("hobby") ||
      lowerMessage.includes("play") ||
      lowerMessage.includes("read") ||
      lowerMessage.includes("game")
    ) {
      responseKey = "hobby";
    } else if (
      lowerMessage.includes("learn") ||
      lowerMessage.includes("study") ||
      lowerMessage.includes("education")
    ) {
      responseKey = "learn";
    } else if (
      lowerMessage.includes("family") ||
      lowerMessage.includes("parent") ||
      lowerMessage.includes("sister") ||
      lowerMessage.includes("brother")
    ) {
      responseKey = "family";
    } else if (
      lowerMessage.includes("work") ||
      lowerMessage.includes("job") ||
      lowerMessage.includes("office") ||
      lowerMessage.includes("task")
    ) {
      responseKey = "work";
    }

    return this.aiResponses[responseKey];
  }

  /**
   * Get all available response categories
   * @returns Array of response category keys
   */
  public static getResponseCategories(): string[] {
    return Object.keys(this.aiResponses);
  }

  /**
   * Add a new AI response template
   * @param key - Response category key
   * @param response - ChatResponse object
   */
  public static addResponse(key: string, response: ChatResponse): void {
    this.aiResponses[key] = response;
  }

  /**
   * Update an existing AI response template
   * @param key - Response category key
   * @param response - Updated ChatResponse object
   */
  public static updateResponse(key: string, response: ChatResponse): boolean {
    if (this.aiResponses[key]) {
      this.aiResponses[key] = response;
      return true;
    }
    return false;
  }

  /**
   * Extract answer from question with braces format
   * @param questionWithBraces - Question like "I {like} reading books."
   * @returns The text within braces
   */
  public static extractAnswer(questionWithBraces: string): string {
    const match = questionWithBraces.match(/\{([^}]+)\}/);
    return match ? match[1] : "";
  }

  /**
   * Validate message for appropriate response
   * @param message - User message to validate
   * @returns True if message is appropriate for language learning
   */
  public static validateMessage(message: string): boolean {
    // Basic validation - could be enhanced with profanity filter, etc.
    return message.trim().length > 0 && message.length <= 2000;
  }
}
