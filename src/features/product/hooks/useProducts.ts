import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getProducts } from "../api/product.api";
import type { ProductQueryParams, ProductsResponse } from "../types/product.type";

export function useProducts(params: ProductQueryParams) {
  return useQuery<ProductsResponse>({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    placeholderData: keepPreviousData,
  });
}
