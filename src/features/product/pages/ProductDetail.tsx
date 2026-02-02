import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Heart, Truck, RotateCcw, Shield } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import ImageGallery from "@/features/product/components/ImageGallery";
import SizeSelector from "@/features/product/components/SizeSelector";
import ColorSelector from "@/shared/components/ColorSelector";
import RelatedProducts from "@/features/product/components/RelatedProducts";
import ProductReviews from "@/features/product/components/ProductReviews";
import StarRating from "@/shared/components/StarRating";
import { Button } from "@/shared/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { getRelatedProducts } from "@/features/product/data/products";
import { useProduct } from "@/features/product/hooks/useProduct";
import {
  getReviewsByProductId,
  getAverageRating,
} from "@/features/product/data/reviews";
import { useCart } from "@/features/cart/context/CartContext";
import { toast } from "@/shared/hooks/use-toast";
import SEO from "@/shared/components/SEO";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { t, language } = useLanguage();
  const localizedPath = useLocalizedPath();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-main py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="aspect-square bg-muted animate-pulse rounded-lg" />
            <div className="space-y-6">
              <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-6 w-1/4 bg-muted animate-pulse rounded" />
              <div className="h-24 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-main py-20 text-center">
          <h1 className="font-serif text-2xl mb-4">
            {language === "id" ? "Produk Tidak Ditemukan" : "Product Not Found"}
          </h1>
          <Link
            to={localizedPath("/")}
            className="text-secondary hover:underline"
          >
            {t.common.backToHome}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id, product.category);
  const productReviews = getReviewsByProductId(product.id);
  const averageRating = getAverageRating(product.id);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: t.productDetail.selectSize,
        description: t.productDetail.selectSizeDesc,
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: t.productDetail.selectColor,
        description: t.productDetail.selectColorDesc,
        variant: "destructive",
      });
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    toast({
      title: t.productDetail.addedToBag,
      description: `${product.name} (${selectedSize}, ${selectedColor}) ${t.productDetail.addedToBagDesc}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={product.name}
        description={product.description}
        canonicalUrl={`https://andelevate.com/${language}/product/${product.id}`}
        product={{
          name: product.name,
          price: product.price,
          currency: "IDR",
          availability: "InStock",
          brand: "Andelevate",
          sku: `ALP-${product.id}`,
          image: product.images[0],
          description: product.description,
        }}
        breadcrumbs={[
          {
            name: t.productDetail.home,
            url: `https://andelevate.com/${language}`,
          },
          {
            name: product.category,
            url: `https://andelevate.com/${language}/shop`,
          },
          {
            name: product.name,
            url: `https://andelevate.com/${language}/product/${product.id}`,
          },
        ]}
      />
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav className="container-main py-4">
          <ol className="flex items-center text-sm text-muted-foreground">
            <li>
              <Link
                to={localizedPath("/")}
                className="hover:text-foreground transition-colors"
              >
                {t.productDetail.home}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 mx-2" />
            <li>
              <span className="capitalize">{product.category}</span>
            </li>
            <ChevronRight className="h-4 w-4 mx-2" />
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        {/* Product Section */}
        <section className="container-main pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Product Info */}
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && (
                  <span className="bg-primary text-primary-foreground text-xs font-sans tracking-wider px-3 py-1">
                    {t.productDetail.new}
                  </span>
                )}
                {product.isSale && (
                  <span className="bg-secondary text-secondary-foreground text-xs font-sans tracking-wider px-3 py-1">
                    {t.productDetail.sale}
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="font-serif text-2xl lg:text-3xl text-foreground mb-2">
                  {product.name}
                </h1>
                {productReviews.length > 0 && (
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={averageRating} size="sm" />
                    <span className="text-sm text-muted-foreground">
                      ({productReviews.length}{" "}
                      {productReviews.length === 1
                        ? t.productDetail.review
                        : t.productDetail.reviews}
                      )
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={`font-sans text-xl ${
                      product.isSale ? "text-price-sale" : "text-price"
                    }`}
                  >
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-price-old line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Color Selector */}
              <ColorSelector
                colors={product.colors}
                selectedColor={selectedColor}
                onSelectColor={setSelectedColor}
              />

              {/* Size Selector */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
              />

              {/* Add to Cart */}
              <div className="flex gap-3">
                <Button onClick={handleAddToCart} className="flex-1" size="lg">
                  {t.productDetail.addToBag}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label={
                    isWishlisted
                      ? t.products.removeFromWishlist
                      : t.products.addToWishlist
                  }
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isWishlisted ? "fill-secondary text-secondary" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-border">
                <div className="text-center">
                  <Truck className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {t.productDetail.freeShipping}
                  </p>
                </div>
                <div className="text-center">
                  <RotateCcw className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {t.productDetail.easyReturns}
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">
                    {t.productDetail.securePayment}
                  </p>
                </div>
              </div>

              {/* Accordions */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger className="font-sans text-sm tracking-wide uppercase">
                    {t.productDetail.productDetails}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-muted-foreground">
                      {product.details.map((detail, index) => (
                        <li key={index}>• {detail}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger className="font-sans text-sm tracking-wide uppercase">
                    {t.productDetail.shippingReturns}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-muted-foreground">
                      <p>{t.productDetail.shippingInfo}</p>
                      <p>{t.productDetail.returnInfo}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Product Reviews */}
        <ProductReviews reviews={productReviews} productId={product.id} />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
