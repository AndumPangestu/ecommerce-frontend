import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../api/chat.api";
import { ChatResponse, SendMessagePayload } from "../types/chat.type";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation<ChatResponse, Error, SendMessagePayload>({
    mutationFn: (payload) => sendMessage(payload),
    onSuccess: () => {
      // Invalidate chat history to fetch the latest messages
      queryClient.invalidateQueries({ queryKey: ["chat-history"] });
    },
  });
}
