import type { ApiResponse } from "@/features/auth/types/auth.type";

export type ProductCategory = {
  id: number;
  link: string | null;
  name: string;
  description: string;
  image: string;
};

export type HighlightedProductCategoriesResponse = ApiResponse<ProductCategory[]>;

