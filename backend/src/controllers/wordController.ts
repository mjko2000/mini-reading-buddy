import { Request, Response } from "express";
import { WordService } from "../services/wordService";
import { WordApiResponse } from "../types";

/**
 * Word Controller - Handles word-related API endpoints
 */
export class WordController {
  /**
   * Get word details by word
   * GET /api/words/:word
   */
  public static async getWordDetails(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { word } = req.params;

      // Validate word parameter
      if (!word || typeof word !== "string") {
        const response: WordApiResponse = {
          success: false,
          error: "Word parameter is required and must be a string",
        };
        res.status(400).json(response);
        return;
      }

      // Validate word length and format
      const normalizedWord = word.trim();
      if (normalizedWord.length === 0) {
        const response: WordApiResponse = {
          success: false,
          error: "Word cannot be empty",
        };
        res.status(400).json(response);
        return;
      }

      if (normalizedWord.length > 50) {
        const response: WordApiResponse = {
          success: false,
          error: "Word is too long (maximum 50 characters)",
        };
        res.status(400).json(response);
        return;
      }

      // Basic word format validation (letters, hyphens, apostrophes)
      const wordRegex = /^[a-zA-Z'-]+$/;
      if (!wordRegex.test(normalizedWord)) {
        const response: WordApiResponse = {
          success: false,
          error:
            "Word contains invalid characters. Only letters, hyphens, and apostrophes are allowed.",
        };
        res.status(400).json(response);
        return;
      }

      // Get word details from service
      const wordDetails = await WordService.getWordDetails(normalizedWord);

      const response: WordApiResponse = {
        success: true,
        data: wordDetails,
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error in getWordDetails:", error);

      const response: WordApiResponse = {
        success: false,
        error: "Failed to retrieve word details",
      };

      res.status(500).json(response);
    }
  }

  /**
   * Get all available words in database
   * GET /api/words
   */
  public static async getAllWords(req: Request, res: Response): Promise<void> {
    try {
      const words = WordService.getAllAvailableWords();

      const response = {
        success: true,
        data: {
          words: words,
          count: words.length,
        },
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error in getAllWords:", error);

      const response = {
        success: false,
        error: "Failed to retrieve available words",
      };

      res.status(500).json(response);
    }
  }

  /**
   * Check if a word exists in database
   * GET /api/words/:word/exists
   */
  public static async checkWordExists(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { word } = req.params;

      if (!word || typeof word !== "string") {
        res.status(400).json({
          success: false,
          error: "Word parameter is required",
        });
        return;
      }

      const exists = WordService.hasWordInDatabase(word.trim());

      res.status(200).json({
        success: true,
        data: {
          word: word.trim(),
          exists: exists,
        },
      });
    } catch (error) {
      console.error("Error in checkWordExists:", error);

      res.status(500).json({
        success: false,
        error: "Failed to check word existence",
      });
    }
  }
}
