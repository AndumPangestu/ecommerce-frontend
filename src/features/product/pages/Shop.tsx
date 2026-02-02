import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import ProductCard from "@/features/product/components/ProductCard";
import ProductSearch from "@/features/product/components/ProductSearch";
import QuickViewModal from "@/features/product/components/QuickViewModal";
import {
  DesktopFilters,
  MobileFilters,
  FilterOption,
} from "@/features/product/components/ShopFilters";
import { priceRanges } from "@/features/product/data/products";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import SEO from "@/shared/components/SEO";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";
import { Product } from "../types/product.type";
import { useProducts } from "../hooks/useProducts";
import { useProductCategories } from "../hooks/useProductCategories";
import { AppPagination } from "@/shared/components/AppPagination";

interface Filters {
  categories: number[];
  priceRanges: number[];
}

const emptyFilters: Filters = {
  categories: [],
  priceRanges: [],
};

const Shop = () => {
  const { t, language } = useLanguage();
  const localizedPath = useLocalizedPath();

  const pageSizeOptions = [
    { value: "1", label: `1 ${t.shop.perPage}` },
    { value: "8", label: `8 ${t.shop.perPage}` },
    { value: "12", label: `12 ${t.shop.perPage}` },
    { value: "24", label: `24 ${t.shop.perPage}` },
    { value: "48", label: `48 ${t.shop.perPage}` },
  ];

  const sortOptions = [
    { value: "newest", label: t.shop.newest },
    { value: "price-low", label: t.shop.priceLowHigh },
    { value: "price-high", label: t.shop.priceHighLow },
    { value: "name-az", label: t.shop.nameAZ },
  ];

  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  // Calculate min and max price from selected ranges
  const { minPrice, maxPrice } = useMemo(() => {
    let min: number | undefined = undefined;
    let max: number | undefined = undefined;

    if (filters.priceRanges.length > 0) {
      const selectedRanges = filters.priceRanges.map(
        (index) => priceRanges[index],
      );
      min = Math.min(...selectedRanges.map((r) => r.min));
      max = Math.max(...selectedRanges.map((r) => r.max));
      if (max === Infinity) max = undefined;
    }
    return { minPrice: min, maxPrice: max };
  }, [filters.priceRanges]);

  const categoryId =
    filters.categories.length > 0 ? filters.categories[0] : undefined;

  // Use custom hooks
  const { data: categoriesData } = useProductCategories();
  const { data: productsData, isLoading } = useProducts({
    page: currentPage,
    limit: pageSize,
    keyword: searchQuery || undefined,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    paginate: true,
  });

  const products = productsData?.data || [];

  const categoryOptions: FilterOption[] = useMemo(() => {
    if (!categoriesData?.data) return [];
    return categoriesData.data.map((cat) => ({
      value: cat.id,
      label: cat.name,
    }));
  }, [categoriesData]);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(emptyFilters);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: string) => {
    setPageSize(Number(size));
    setCurrentPage(1);
  };

  const activeFiltersCount =
    filters.categories.length + filters.priceRanges.length;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t.shop.title}
        description={
          language === "id"
            ? "Jelajahi koleksi lengkap fashion Andelevate. Temukan atasan, bawahan, gaun, dan lainnya dengan kualitas premium."
            : "Browse the complete Andelevate fashion collection. Discover tops, bottoms, dresses, and more with premium quality."
        }
        canonicalUrl={`https://andelevate.com/${language}/shop`}
      />
      <Header />
      <main className="py-8 lg:py-12">
        <div className="container-main">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-3">
              {t.shop.title}
            </h1>
            <p className="text-muted-foreground">
              {products.length} {t.shop.products}
              {activeFiltersCount > 0 &&
                ` (${activeFiltersCount} ${t.shop.filtersApplied})`}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <ProductSearch onSearch={handleSearch} />
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <DesktopFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              categoryOptions={categoryOptions}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter + Sort Bar */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-6 border-b border-border">
                <MobileFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  categoryOptions={categoryOptions}
                />

                <div className="flex items-center gap-3">
                  <Select
                    value={pageSize.toString()}
                    onValueChange={handlePageSizeChange}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder={t.shop.perPage} />
                    </SelectTrigger>
                    <SelectContent>
                      {pageSizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t.shop.sortBy} />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-[400px] bg-muted animate-pulse rounded-md"
                    />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      to={localizedPath(`/product/${product.id}`)}
                    >
                      <ProductCard
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        image={product.images[0]}
                        isNew={product.isNew}
                        isSale={product.isSale}
                        onQuickAdd={() => setQuickViewProduct(product)}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">
                    {t.shop.noProducts}
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    {t.shop.clearFilters}
                  </Button>
                </div>
              )}

              {/* Pagination */}
              <AppPagination
                currentPage={currentPage}
                totalPages={productsData?.pagination?.total_page || 1}
                onPageChange={setCurrentPage}
                className="mt-12"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default Shop;
