import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "../api/chat.api";
import { ChatHistoryResponse } from "../types/chat.type";

export function useChatHistory() {
  return useQuery<ChatHistoryResponse>({
    queryKey: ["chat-history"],
    queryFn: () => getChatHistory(),
  });
}
