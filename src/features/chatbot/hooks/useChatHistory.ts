import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "../api/chat.api";
import { ChatHistoryResponse } from "../types/chat.type";
import { useAuth } from "@/features/auth/context/AuthContext";

export function useChatHistory() {
  const { isAuthenticated, user } = useAuth();

  return useQuery<ChatHistoryResponse>({
    queryKey: ["chat-history", user?.id],
    queryFn: () => getChatHistory(),
    enabled: isAuthenticated,
  });
}
