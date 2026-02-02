import { httpClient } from "@/lib/httpClient";
import {
  ChatHistoryResponse,
  ChatResponse,
  SendMessagePayload,
} from "../types/chat.type";

export async function getChatHistory(): Promise<ChatHistoryResponse> {
  return await httpClient.get<ChatHistoryResponse>("/chats");
}

export async function sendMessage(
  payload: SendMessagePayload,
): Promise<ChatResponse> {
  const chatbotUrl = import.meta.env.VITE_CHATBOT_URL;
  if (!chatbotUrl) {
    throw new Error("VITE_CHATBOT_URL is not set");
  }
  return await httpClient.post<ChatResponse>(`${chatbotUrl}/chat`, payload);
}
