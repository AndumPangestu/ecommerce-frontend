import { useState } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/features/wishlist/context/WishlistContext";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  onQuickAdd?: () => void;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  isNew,
  isSale,
  onQuickAdd,
}: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = isInWishlist(id);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickAdd?.();
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-primary text-primary-foreground text-xs font-sans tracking-wider px-3 py-1">
              NEW
            </span>
          )}
          {isSale && (
            <span className="bg-secondary text-secondary-foreground text-xs font-sans tracking-wider px-3 py-1">
              SALE
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(id);
          }}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted ? "fill-secondary text-secondary" : "text-foreground"
            }`}
          />
        </button>

        {/* Quick Add Button */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full bg-primary text-primary-foreground py-3 text-sm font-sans tracking-widest uppercase hover:bg-accent transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-serif text-lg text-foreground group-hover:text-muted-foreground transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-3">
          <span className={`font-sans ${isSale ? "text-price-sale" : "text-price"}`}>
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="font-sans text-price-old line-through text-sm">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
