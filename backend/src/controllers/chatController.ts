import { Request, Response } from "express";
import { ChatService } from "../services/chatService";
import { ChatRequest, ChatApiResponse } from "../types";
import { v4 as uuidv4 } from "uuid";

/**
 * Chat Controller - Handles chat-related API endpoints
 */
export class ChatController {
  /**
   * Send a chat message and get AI response
   * POST /api/chat
   */
  public static async sendMessage(req: Request, res: Response): Promise<void> {
    try {
      const { message, conversationId }: ChatRequest = req.body;

      // Validate message
      if (!message || typeof message !== "string") {
        const response: ChatApiResponse = {
          success: false,
          error: "Message is required and must be a string",
        };
        res.status(400).json(response);
        return;
      }

      // Validate message using chat service
      if (!ChatService.validateMessage(message)) {
        const response: ChatApiResponse = {
          success: false,
          error: "Message is invalid. Must be 1-2000 characters long.",
        };
        res.status(400).json(response);
        return;
      }

      // Generate or use existing conversation ID
      const currentConversationId = conversationId || uuidv4();

      // Get AI response from chat service
      const aiResponse = await ChatService.generateResponse(
        message,
        currentConversationId
      );

      const response: ChatApiResponse = {
        success: true,
        data: aiResponse,
        conversationId: currentConversationId,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error in sendMessage:", error);

      const response: ChatApiResponse = {
        success: false,
        error: "Failed to process chat message",
      };

      res.status(500).json(response);
    }
  }

  /**
   * Get available response categories
   * GET /api/chat/categories
   */
  public static async getCategories(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const categories = ChatService.getResponseCategories();

      const response = {
        success: true,
        data: {
          categories: categories,
          count: categories.length,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error in getCategories:", error);

      const response = {
        success: false,
        error: "Failed to retrieve categories",
      };

      res.status(500).json(response);
    }
  }

  /**
   * Extract answer from question format
   * POST /api/chat/extract-answer
   */
  public static async extractAnswer(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { question } = req.body;

      if (!question || typeof question !== "string") {
        res.status(400).json({
          success: false,
          error: "Question is required and must be a string",
        });
        return;
      }

      const answer = ChatService.extractAnswer(question);

      res.status(200).json({
        success: true,
        data: {
          question: question,
          answer: answer,
        },
      });
    } catch (error) {
      console.error("Error in extractAnswer:", error);

      res.status(500).json({
        success: false,
        error: "Failed to extract answer",
      });
    }
  }

  /**
   * Health check for chat service
   * GET /api/chat/health
   */
  public static async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      // Test basic functionality
      const testResponse = await ChatService.generateResponse("hello test");

      res.status(200).json({
        success: true,
        message: "Chat service is healthy",
        data: {
          timestamp: new Date().toISOString(),
          responseGenerated: !!testResponse,
        },
      });
    } catch (error) {
      console.error("Error in chat health check:", error);

      res.status(500).json({
        success: false,
        error: "Chat service health check failed",
      });
    }
  }
}
