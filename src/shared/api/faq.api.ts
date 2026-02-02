import { httpClient } from "@/lib/httpClient";
import { FaqCategory } from "@/shared/types/faq.type";

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  status: number;
}

export const getFaqs = async (): Promise<ApiResponse<FaqCategory[]>> => {
  // If we had a real backend:
  // return httpClient.get<ApiResponse<FaqCategory[]>>("/faqs");
  
  // Mock data for now to match what useFaqs expects
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        status: 200,
        data: [
          {
            title: "Shopping Information",
            items: [
              {
                id: "1",
                question: "Do you ship internationally?",
                answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
              },
              {
                id: "2",
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for all unworn items with original tags attached."
              }
            ]
          },
          {
            title: "Payment",
            items: [
              {
                id: "3",
                question: "What payment methods do you accept?",
                answer: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay."
              }
            ]
          },
          {
            title: "Orders",
            items: [
              {
                id: "4",
                question: "How can I track my order?",
                answer: "Once your order ships, you will receive a confirmation email with a tracking number."
              }
            ]
          }
        ]
      });
    }, 500);
  });
};
