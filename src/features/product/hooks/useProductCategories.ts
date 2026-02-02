import { useQuery } from "@tanstack/react-query";
import { getProductCategories } from "../api/productCategory.api";
import type { HighlightedProductCategoriesResponse } from "../types/productCategory.type";

export function useProductCategories() {
  return useQuery<HighlightedProductCategoriesResponse>({
    queryKey: ["product-categories"],
    queryFn: () => getProductCategories(),
  });
}
