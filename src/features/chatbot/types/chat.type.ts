import { Product } from "@/features/product/types/product.type";

export interface ChatMessage {
  id: number;
  type: "human" | "ai";
  content: string;
  intent: string | null;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  createdAt: string;
  messages: ChatMessage[];
}

export interface ChatHistoryResponse {
  status: number;
  success: boolean;
  message: string;
  data: ChatSession[];
}

export interface SendMessagePayload {
  message: string;
}

export interface ChatResponse {
  message: string;
  data?: Product[];
  suggestionQuestions?: string[];
  intent?: string;
}
