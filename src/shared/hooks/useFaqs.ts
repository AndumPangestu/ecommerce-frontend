import { useQuery } from "@tanstack/react-query";
import { ApiError, type ApiErrorPayload } from "@/lib/httpClient";
import type { FaqCategory } from "@/shared/types/faq.type";
import * as faqApi from "@/shared/api/faq.api";

export function useFaqs() {
  return useQuery<FaqCategory[], ApiError<ApiErrorPayload>>({
    queryKey: ["faqs"],
    queryFn: async () => {
      const response = await faqApi.getFaqs();
      if (!response.success) {
        throw new ApiError(response.message || "Failed to load FAQs", response.status, response);
      }
      return response.data;
    },
    staleTime: 60_000,
  });
}

