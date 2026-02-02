import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import SizeSelector from "@/features/product/components/SizeSelector";
import ColorSelector from "@/shared/components/ColorSelector";
import type { Product } from "@/features/product/types/product.type";
import { useCart } from "@/features/cart/context/CartContext";
import { useWishlist } from "@/features/wishlist/context/WishlistContext";
import { toast } from "@/shared/hooks/use-toast";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

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
        title: "Please select a size",
        description: "Choose your size before adding to bag",
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        description: "Choose your color before adding to bag",
        variant: "destructive",
      });
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    toast({
      title: "Added to bag",
      description: `${product.name} (${selectedSize}, ${selectedColor}) has been added to your bag`,
    });
    onClose();
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      setSelectedSize(null);
      setSelectedColor(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">{product.name} - Quick View</DialogTitle>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors rounded-sm"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-[3/4] bg-muted">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 space-y-5 overflow-y-auto max-h-[80vh]">
            {/* Badges */}
            <div className="flex gap-2">
              {product.isNew && (
                <span className="bg-primary text-primary-foreground text-xs font-sans tracking-wider px-3 py-1">
                  NEW
                </span>
              )}
              {product.isSale && (
                <span className="bg-secondary text-secondary-foreground text-xs font-sans tracking-wider px-3 py-1">
                  SALE
                </span>
              )}
            </div>

            {/* Title & Price */}
            <div>
              <h2 className="font-serif text-xl lg:text-2xl text-foreground mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-3">
                <span
                  className={`font-sans text-lg ${
                    product.isSale ? "text-price-sale" : "text-price"
                  }`}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-price-old line-through text-sm">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
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

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button onClick={handleAddToCart} className="flex-1" size="lg">
                Add to Bag
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isWishlisted ? "fill-secondary text-secondary" : ""
                  }`}
                />
              </Button>
            </div>

            {/* View Full Details Link */}
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="block text-center text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
