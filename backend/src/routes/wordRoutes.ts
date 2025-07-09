import { Router } from "express";
import { WordController } from "../controllers/wordController";

const router = Router();

/**
 * Word Routes
 * Base path: /api/words
 */

// GET /api/words - Get all available words
router.get("/", WordController.getAllWords);

// GET /api/words/:word - Get details for a specific word
router.get("/:word", WordController.getWordDetails);

// GET /api/words/:word/exists - Check if word exists in database
router.get("/:word/exists", WordController.checkWordExists);

export default router;
