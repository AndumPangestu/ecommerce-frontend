import type { ApiResponse } from "@/features/auth/types/auth.type";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  isNew?: boolean;
  isSale?: boolean;
  category: string;
  sizes: Sizes[];
  colors: Colors[];
  description: string;
  details: string[];
}

export type Sizes = {
  id: number;
  name: string;
  displayOrder: number;
};

export type Colors = {
  id: number;
  name: string;
  hexCode: string | null;
};

export type ProductsResponse = ApiResponse<Product[]> & {
  pagination?: {
    current_page: number;
    total_page: number;
    size: number;
  };
};

export type ProductResponse = ApiResponse<Product>;

export type ProductQueryParams = {
  page?: number;
  limit?: number;
  keyword?: string;
  categoryId?: number;
  putOnHighlight?: boolean;
  paginate?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
};
