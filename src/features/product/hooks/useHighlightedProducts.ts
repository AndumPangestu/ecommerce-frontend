import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product.api";
import type { Product } from "../types/product.type";
import { products as fallbackProducts } from "../data/products";

export function useHighlightedProducts() {
  return useQuery<Product[]>({
    queryKey: ["products", "highlighted"],
    queryFn: async () => {
      try {
        const response = await getProducts({
          paginate: false,
          limit: 9,
          putOnHighlight: true,
        });
        
        if (response.success && response.data) {
          return response.data;
        }
        return fallbackProducts.slice(0, 9);
      } catch (error) {
        console.error("Failed to fetch highlighted products:", error);
        return fallbackProducts.slice(0, 9);
      }
    },
  });
}
