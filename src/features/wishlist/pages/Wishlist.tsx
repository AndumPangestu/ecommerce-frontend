import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import ProductCard from "@/features/product/components/ProductCard";
import QuickViewModal from "@/features/product/components/QuickViewModal";
import { useWishlist } from "@/features/wishlist/context/WishlistContext";
import { products, Product } from "@/features/product/data/products";
import SEO from "@/shared/components/SEO";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const { t, language } = useLanguage();
  const localizedPath = useLocalizedPath();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t.wishlist.title}
        description={t.wishlist.metaDescription}
        canonicalUrl={`https://andelevate.com/${language}/wishlist`}
      />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8">
            {t.wishlist.title}
          </h1>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-serif text-2xl text-foreground mb-4">
                {t.wishlist.empty}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.wishlist.emptyDesc}
              </p>
              <Link
                to={localizedPath("/shop")}
                className="inline-block bg-primary text-primary-foreground px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-accent transition-colors"
              >
                {t.wishlist.startShopping}
              </Link>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-8">
                {wishlistProducts.length}{" "}
                {wishlistProducts.length !== 1
                  ? t.transactions.items
                  : t.transactions.item}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {wishlistProducts.map((product) => (
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
            </>
          )}
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

export default Wishlist;

