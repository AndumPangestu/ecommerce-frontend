import { useQuery } from "@tanstack/react-query";
import { ApiError, type ApiErrorPayload } from "@/lib/httpClient";
import type { ProductCategory } from "@/features/product/types/productCategory.type";
import * as productCategoryApi from "@/features/product/api/productCategory.api";

import categoryTops from "@/assets/category-tops.jpg";
import categoryDresses from "@/assets/category-dresses.jpg";
import categoryBottoms from "@/assets/category-bottoms.jpg";

// Fallback categories for frontend development when API is unavailable
const fallbackCategories: ProductCategory[] = [
  {
    id: 1,
    name: "Tops",
    description: "Elegant tops for every occasion",
    image: categoryTops,
    link: "/shop?category=tops",
  },
  {
    id: 2,
    name: "Dresses",
    description: "Beautiful dresses for any event",
    image: categoryDresses,
    link: "/shop?category=dresses",
  },
  {
    id: 3,
    name: "Bottoms",
    description: "Stylish bottoms to complete your look",
    image: categoryBottoms,
    link: "/shop?category=bottoms",
  },
];

export function useHighlightedProductCategories() {
  return useQuery<ProductCategory[], ApiError<ApiErrorPayload>>({
    queryKey: ["product-categories", "highlighted"],
    queryFn: async () => {
      try {
        const response =
          await productCategoryApi.getHighlightedProductCategories();

        if (!response.success || !response.data?.length) {
          return fallbackCategories;
        }
        return response.data;
      } catch {
        // Return fallback data when API is unavailable
        return fallbackCategories;
      }
    },
    staleTime: 60_000,
  });
}
