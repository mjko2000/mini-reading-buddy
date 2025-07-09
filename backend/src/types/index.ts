// Word API Types
export interface WordTranslation {
  type: string;
  text: string;
}

export interface WordDetails {
  word: string;
  phonetic: string;
  translations: WordTranslation[];
  stress: string;
}

export interface WordApiResponse {
  success: boolean;
  data?: WordDetails;
  error?: string;
}

// Chat API Types
export interface ChatRequest {
  message: string;
  conversationId?: string;
}

export interface ChatQuestion {
  question: string;
  answer: string;
  options: string[];
}

export interface ChatResponse {
  content: string;
  questions: string[];
}

export interface ChatApiResponse {
  success: boolean;
  data?: ChatResponse;
  error?: string;
  conversationId?: string;
}

// General API Types
export interface ApiError {
  success: false;
  error: string;
  code?: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
