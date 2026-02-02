import { useState } from "react";
import { Link } from "react-router-dom";
import { useHighlightedProducts } from "@/features/product/hooks/useHighlightedProducts";
import type { Product } from "@/features/product/types/product.type";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";

const ProductGrid = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { t } = useLanguage();
  const localizedPath = useLocalizedPath();
  const { data: products = [], isLoading } = useHighlightedProducts();

  return (
    <section id="new-arrivals" className="py-16 lg:py-24 bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground mb-4">
            {t.products.newArrivals}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t.products.newArrivalsDesc}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-[3/4] bg-muted animate-pulse rounded-lg"
                />
              ))
            : products.map((product) => (
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

        <div className="text-center mt-12">
          <Link
            to={localizedPath("/shop")}
            className="inline-block border-2 border-primary text-primary px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {t.products.viewAll}
          </Link>
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};

export default ProductGrid;

