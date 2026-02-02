import { httpClient } from "@/lib/httpClient";
import type { HighlightedProductCategoriesResponse } from "@/features/product/types/productCategory.type";

export async function getHighlightedProductCategories(): Promise<HighlightedProductCategoriesResponse> {
  return httpClient.get<HighlightedProductCategoriesResponse>(
    "/categories?paginate=false&limit=6&putOnHighlight=true",
    {
      withAuth: false,
    },
  );
}

export async function getProductCategories(): Promise<HighlightedProductCategoriesResponse> {
  return httpClient.get<HighlightedProductCategoriesResponse>(
    "/categories?paginate=false",
    {
      withAuth: false,
    },
  );
}
