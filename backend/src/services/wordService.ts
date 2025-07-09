import { WordDetails, WordTranslation } from "../types";
import { langchainService } from "./langchainService";

/**
 * Word Service - Handles word details retrieval
 * This can be extended to use real dictionary APIs like Oxford, Cambridge, etc.
 */
export class WordService {
  private static wordDatabase: { [key: string]: WordDetails } = {
    hello: {
      word: "hello",
      phonetic: "/həˈloʊ/",
      translations: [
        { type: "interjection", text: "xin chào" },
        { type: "noun", text: "lời chào" },
      ],
      stress: "Stress on second syllable: he-LLO",
    },
    today: {
      word: "today",
      phonetic: "/təˈdeɪ/",
      translations: [
        { type: "noun", text: "hôm nay" },
        { type: "adverb", text: "ngày hôm nay" },
      ],
      stress: "Stress on second syllable: to-DAY",
    },
    like: {
      word: "like",
      phonetic: "/laɪk/",
      translations: [
        { type: "verb", text: "thích" },
        { type: "preposition", text: "như, giống như" },
        { type: "noun", text: "sở thích" },
      ],
      stress: "Stress on single syllable: LIKE",
    },
    pizza: {
      word: "pizza",
      phonetic: "/ˈpiːtsə/",
      translations: [{ type: "noun", text: "bánh pizza" }],
      stress: "Stress on first syllable: PIZ-za",
    },
    weather: {
      word: "weather",
      phonetic: "/ˈweðər/",
      translations: [
        { type: "noun", text: "thời tiết" },
        { type: "verb", text: "chịu đựng (bão tố)" },
      ],
      stress: "Stress on first syllable: WEATH-er",
    },
    sunny: {
      word: "sunny",
      phonetic: "/ˈsʌni/",
      translations: [
        { type: "adjective", text: "có nắng" },
        { type: "adjective", text: "vui vẻ, tươi sáng" },
      ],
      stress: "Stress on first syllable: SUN-ny",
    },
    reading: {
      word: "reading",
      phonetic: "/ˈriːdɪŋ/",
      translations: [
        { type: "noun", text: "việc đọc" },
        { type: "noun", text: "bài đọc" },
        { type: "verb", text: "đang đọc" },
      ],
      stress: "Stress on first syllable: READ-ing",
    },
    playing: {
      word: "playing",
      phonetic: "/ˈpleɪɪŋ/",
      translations: [
        { type: "verb", text: "đang chơi" },
        { type: "noun", text: "việc chơi" },
      ],
      stress: "Stress on first syllable: PLAY-ing",
    },
    music: {
      word: "music",
      phonetic: "/ˈmjuːzɪk/",
      translations: [
        { type: "noun", text: "âm nhạc" },
        { type: "noun", text: "nhạc" },
      ],
      stress: "Stress on first syllable: MU-sic",
    },
    early: {
      word: "early",
      phonetic: "/ˈɜːrli/",
      translations: [
        { type: "adjective", text: "sớm" },
        { type: "adverb", text: "sớm" },
      ],
      stress: "Stress on first syllable: EAR-ly",
    },
    beautiful: {
      word: "beautiful",
      phonetic: "/ˈbjuːtɪfəl/",
      translations: [
        { type: "adjective", text: "đẹp" },
        { type: "adjective", text: "xinh đẹp" },
      ],
      stress: "Stress on first syllable: BEAU-ti-ful",
    },
    understand: {
      word: "understand",
      phonetic: "/ˌʌndərˈstænd/",
      translations: [
        { type: "verb", text: "hiểu" },
        { type: "verb", text: "thấu hiểu" },
      ],
      stress: "Stress on last syllable: un-der-STAND",
    },
    important: {
      word: "important",
      phonetic: "/ɪmˈpɔːrtənt/",
      translations: [
        { type: "adjective", text: "quan trọng" },
        { type: "adjective", text: "có ý nghĩa" },
      ],
      stress: "Stress on second syllable: im-POR-tant",
    },
    computer: {
      word: "computer",
      phonetic: "/kəmˈpjuːtər/",
      translations: [
        { type: "noun", text: "máy tính" },
        { type: "noun", text: "máy vi tính" },
      ],
      stress: "Stress on second syllable: com-PU-ter",
    },
    delicious: {
      word: "delicious",
      phonetic: "/dɪˈlɪʃəs/",
      translations: [
        { type: "adjective", text: "ngon" },
        { type: "adjective", text: "thơm ngon" },
      ],
      stress: "Stress on second syllable: de-LI-cious",
    },
  };

  /**
   * Get word details by word using AI or database fallback
   * @param word - The word to get details for
   * @returns Word details including phonetic, translations, and stress patterns
   */
  public static async getWordDetails(word: string): Promise<WordDetails> {
    const normalizedWord = word.toLowerCase().trim();

    // Check if word exists in our local database first
    if (this.wordDatabase[normalizedWord]) {
      return this.wordDatabase[normalizedWord];
    }

    try {
      // Use AI to get word details for unknown words
      const aiWordDetails = await langchainService.getWordDetails(
        normalizedWord
      );
      return aiWordDetails;
    } catch (error) {
      console.error("Error getting AI word details:", error);

      // Fallback to mock details if AI fails
      return this.generateMockWordDetails(normalizedWord);
    }
  }

  /**
   * Generate mock word details for words not in our database
   * @param word - The word to generate mock details for
   * @returns Mock word details
   */
  private static generateMockWordDetails(word: string): WordDetails {
    return {
      word: word,
      phonetic: `/${word
        .split("")
        .map((char) => char)
        .join("")}/`,
      translations: [
        { type: "noun", text: "ví dụ (danh từ)" },
        { type: "verb", text: "ví dụ (động từ)" },
        { type: "adjective", text: "ví dụ (tính từ)" },
      ],
      stress: `Stress on first syllable: ${word
        .charAt(0)
        .toUpperCase()}${word.slice(1)}`,
    };
  }

  /**
   * Check if a word exists in our database
   * @param word - The word to check
   * @returns True if word exists in database
   */
  public static hasWordInDatabase(word: string): boolean {
    return word.toLowerCase() in this.wordDatabase;
  }

  /**
   * Get all available words in the database
   * @returns Array of all available words
   */
  public static getAllAvailableWords(): string[] {
    return Object.keys(this.wordDatabase);
  }
}
