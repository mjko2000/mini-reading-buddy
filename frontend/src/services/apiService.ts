// Backend API Types (matching backend types)
interface WordTranslation {
  type: string;
  text: string;
}

interface WordDetails {
  word: string;
  phonetic: string;
  translations: WordTranslation[];
  stress: string;
}

interface WordApiResponse {
  success: boolean;
  data?: WordDetails;
  error?: string;
}

interface ChatRequest {
  message: string;
  conversationId?: string;
}

interface ChatResponse {
  content: string;
  questions: string[];
}

interface ChatApiResponse {
  success: boolean;
  data?: ChatResponse;
  error?: string;
  conversationId?: string;
}

/**
 * API Service - Handles all backend API calls
 */
export class ApiService {
  private static readonly BASE_URL = import.meta.env.VITE_API_URL;

  /**
   * Generic fetch wrapper with error handling
   */
  private static async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success === false) {
        throw new Error(data.error || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  /**
   * Get word details from backend
   * @param word - The word to get details for
   * @returns Word details including phonetic, translations, and stress
   */
  public static async getWordDetails(word: string): Promise<WordDetails> {
    const response = await this.fetchWithErrorHandling<WordApiResponse>(
      `${this.BASE_URL}/words/${encodeURIComponent(word)}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to get word details");
    }

    return response.data;
  }

  /**
   * Get all available words from backend
   * @returns Array of available words
   */
  public static async getAllWords(): Promise<string[]> {
    const response = await this.fetchWithErrorHandling<{
      success: boolean;
      data: { words: string[]; count: number };
      error?: string;
    }>(`${this.BASE_URL}/words`);

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to get words list");
    }

    return response.data.words;
  }

  /**
   * Check if a word exists in backend database
   * @param word - The word to check
   * @returns True if word exists
   */
  public static async checkWordExists(word: string): Promise<boolean> {
    const response = await this.fetchWithErrorHandling<{
      success: boolean;
      data: { word: string; exists: boolean };
      error?: string;
    }>(`${this.BASE_URL}/words/${encodeURIComponent(word)}/exists`);

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to check word existence");
    }

    return response.data.exists;
  }

  /**
   * Send chat message to backend and get AI response
   * @param message - User message
   * @param conversationId - Optional conversation ID
   * @returns AI response with content and questions
   */
  public static async sendChatMessage(
    message: string,
    conversationId?: string
  ): Promise<{ response: ChatResponse; conversationId: string }> {
    const requestBody: ChatRequest = {
      message,
      conversationId,
    };

    const response = await this.fetchWithErrorHandling<ChatApiResponse>(
      `${this.BASE_URL}/chat`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to send chat message");
    }

    return {
      response: response.data,
      conversationId: response.conversationId || "",
    };
  }

  /**
   * Get available chat response categories
   * @returns Array of category names
   */
  public static async getChatCategories(): Promise<string[]> {
    const response = await this.fetchWithErrorHandling<{
      success: boolean;
      data: { categories: string[]; count: number };
      error?: string;
    }>(`${this.BASE_URL}/chat/categories`);

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to get chat categories");
    }

    return response.data.categories;
  }

  /**
   * Extract answer from question format
   * @param question - Question with braces format
   * @returns Extracted answer
   */
  public static async extractAnswer(question: string): Promise<string> {
    const response = await this.fetchWithErrorHandling<{
      success: boolean;
      data: { question: string; answer: string };
      error?: string;
    }>(`${this.BASE_URL}/chat/extract-answer`, {
      method: "POST",
      body: JSON.stringify({ question }),
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || "Failed to extract answer");
    }

    return response.data.answer;
  }

  /**
   * Check API health status
   * @returns Health status information
   */
  public static async checkApiHealth(): Promise<{
    status: string;
    message: string;
    timestamp: string;
  }> {
    const response = await this.fetchWithErrorHandling<{
      success: boolean;
      message: string;
      timestamp: string;
      version?: string;
      endpoints?: any;
    }>(`${this.BASE_URL}/health`);

    return {
      status: response.success ? "OK" : "ERROR",
      message: response.message,
      timestamp: response.timestamp,
    };
  }

  /**
   * Check chat service health
   * @returns Chat service health status
   */
  public static async checkChatHealth(): Promise<{
    status: string;
    message: string;
    timestamp: string;
  }> {
    const response = await this.fetchWithErrorHandling<{
      success: boolean;
      message: string;
      data: { timestamp: string; responseGenerated: boolean };
    }>(`${this.BASE_URL}/chat/health`);

    return {
      status: response.success ? "OK" : "ERROR",
      message: response.message,
      timestamp: response.data.timestamp,
    };
  }
}

// Export types for use in components
export type { WordDetails, WordTranslation, ChatResponse, ChatRequest };
