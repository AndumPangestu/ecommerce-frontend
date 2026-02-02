import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/product.api";
import type { Product } from "../types/product.type";
import { products as fallbackProducts } from "../data/products";

export function useProduct(id: string | number) {
  return useQuery<Product | null>({
    queryKey: ["product", id],
    queryFn: async () => {
      try {
        const response = await getProductById(id);
        if (response.success && response.data) {
          return response.data;
        }
        // Fallback to local data if API returns success=false or no data
        // This is useful during development/migration
        const localProduct = fallbackProducts.find((p) => p.id === Number(id));
        return localProduct || null;
      } catch (error) {
        console.error(`Failed to fetch product ${id}:`, error);
        // Fallback to local data on error
        const localProduct = fallbackProducts.find((p) => p.id === Number(id));
        return localProduct || null;
      }
    },
    enabled: !!id,
  });
}
