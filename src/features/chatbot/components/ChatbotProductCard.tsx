import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useCart } from "@/features/cart/context/CartContext";
import { useWishlist } from "@/features/wishlist/context/WishlistContext";
import { toast } from "@/shared/hooks/use-toast";
import { Product } from "@/features/product/types/product.type";
import ColorSelector from "@/shared/components/ColorSelector";

interface ChatbotProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ChatbotProductCard: React.FC<ChatbotProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0]?.name || "",
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || "",
  );
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor);
    toast({
      title: "Added to bag",
      description: `${product.name} has been added to your bag`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 dark:border-gray-700"
      onClick={() => onViewDetails(product)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-900">
        <motion.img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-primary text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wider uppercase"
            >
              New
            </motion.span>
          )}
          {product.isSale && discountPercentage > 0 && (
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wider"
            >
              -{discountPercentage}%
            </motion.span>
          )}
        </div>

        {/* Wishlist Button */}
        <motion.button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-gray-300",
            )}
          />
        </motion.button>

        {/* Quick Action Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/10 backdrop-blur-[1px] flex items-end justify-center pb-6"
            >
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(product);
                }}
                className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-5 py-2.5 rounded-full font-medium text-xs shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-3.5 h-3.5" />
                Quick View
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-5">
        <div>
          {/* Title */}
          <h3 className="font-medium text-gray-900 dark:text-white text-2xl leading-snug line-clamp-2 mb-1.5">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through decoration-gray-300">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Color Selector */}
        <div onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Color
            </span>
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
              {selectedColor}
            </span>
          </div>
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            size="sm"
            showLabel={false}
          />
        </div>

        {/* Size Selector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Size
            </span>
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
              {selectedSize}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size) => (
              <motion.button
                key={size.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size.name);
                }}
                className={cn(
                  "w-9 h-9 flex items-center justify-center text-xs font-medium rounded-xl border transition-all",
                  selectedSize === size.name
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-transparent text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {size.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all mt-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Bag
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatbotProductCard;
