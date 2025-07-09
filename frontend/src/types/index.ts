export interface Question {
  question: string;
  answer: string;
  options: string[];
}

export interface Translation {
  [key: string]: string;
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  showClickableWords?: boolean;
  questions?: Question[];
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}

export interface AppState {
  inputText: string;
  processedText: string;
  hoveredWord: string | null;
  questions: Question[];
  answers: { [key: number]: string };
  checkedAnswers: { [key: number]: boolean };
}
