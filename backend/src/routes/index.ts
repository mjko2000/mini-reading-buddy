import { Router } from "express";
import wordRoutes from "./wordRoutes";
import chatRoutes from "./chatRoutes";

const router = Router();

/**
 * Main API Routes
 * Base path: /api
 */

// Mount word routes at /api/words
router.use("/words", wordRoutes);

// Mount chat routes at /api/chat
router.use("/chat", chatRoutes);

// API health check
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Mini Reading Buddy API is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    endpoints: {
      words: "/api/words",
      chat: "/api/chat",
    },
  });
});

// API documentation endpoint
router.get("/docs", (req, res) => {
  res.json({
    success: true,
    message: "Mini Reading Buddy API Documentation",
    endpoints: {
      words: {
        "GET /api/words": "Get all available words",
        "GET /api/words/:word": "Get word details",
        "GET /api/words/:word/exists": "Check if word exists",
      },
      chat: {
        "POST /api/chat": "Send message and get AI response",
        "GET /api/chat/categories": "Get response categories",
        "POST /api/chat/extract-answer": "Extract answer from question",
        "GET /api/chat/health": "Chat service health check",
      },
      general: {
        "GET /api/health": "API health check",
        "GET /api/docs": "API documentation",
      },
    },
  });
});

export default router;
