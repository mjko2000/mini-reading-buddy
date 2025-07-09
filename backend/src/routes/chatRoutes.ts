import { Router } from "express";
import { ChatController } from "../controllers/chatController";

const router = Router();

/**
 * Chat Routes
 * Base path: /api/chat
 */

// POST /api/chat - Send a message and get AI response
router.post("/", ChatController.sendMessage);

// GET /api/chat/categories - Get available response categories
router.get("/categories", ChatController.getCategories);

// POST /api/chat/extract-answer - Extract answer from question format
router.post("/extract-answer", ChatController.extractAnswer);

// GET /api/chat/health - Health check for chat service
router.get("/health", ChatController.healthCheck);

export default router;
