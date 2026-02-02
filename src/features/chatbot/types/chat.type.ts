import { Product } from "@/features/product/types/product.type";

export interface ChatbotCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  putOnHighlight: boolean;
  createdAt: string;
  updatedAt: string;
}

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
  data?: {
    items: Product[] | ChatbotCategory[];
  };
  suggestionQuestions?: string[];
  intent?: string;
}
