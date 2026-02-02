import { httpClient } from "@/lib/httpClient";
import type {
  ProductQueryParams,
  ProductsResponse,
  ProductResponse,
} from "../types/product.type";

export async function getProducts(
  params?: ProductQueryParams,
): Promise<ProductsResponse> {
  const queryParams = new URLSearchParams();
  if (params) {
    if (params.page !== undefined)
      queryParams.append("page", params.page.toString());
    if (params.limit !== undefined)
      queryParams.append("limit", params.limit.toString());
    if (params.keyword !== undefined)
      queryParams.append("keyword", params.keyword);
    if (params.categoryId !== undefined)
      queryParams.append("categoryId", params.categoryId.toString());
    if (params.putOnHighlight !== undefined)
      queryParams.append("putOnHighlight", params.putOnHighlight.toString());
    if (params.paginate !== undefined)
      queryParams.append("paginate", params.paginate.toString());
    if (params.minPrice !== undefined)
      queryParams.append("minPrice", params.minPrice.toString());
    if (params.maxPrice !== undefined)
      queryParams.append("maxPrice", params.maxPrice.toString());
    if (params.sortBy !== undefined)
      queryParams.append("sortBy", params.sortBy);
  }

  const queryString = queryParams.toString();
  const url = `/products${queryString ? `?${queryString}` : ""}`;

  return httpClient.get<ProductsResponse>(url, { withAuth: false });
}

export async function getProductById(
  id: number | string,
): Promise<ProductResponse> {
  return httpClient.get<ProductResponse>(`/products/${id}`, {
    withAuth: false,
  });
}
