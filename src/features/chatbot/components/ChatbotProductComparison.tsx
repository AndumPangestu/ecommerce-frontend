import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/features/product/types/product.type";
import { cn } from "@/lib/utils";
import { ArrowRight, Maximize2, Star } from "lucide-react";
import { useCart } from "@/features/cart/context/CartContext";
import { toast } from "@/shared/hooks/use-toast";
import ColorSelector from "@/shared/components/ColorSelector";

interface ChatbotProductComparisonProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
}

const ChatbotProductComparison: React.FC<ChatbotProductComparisonProps> = ({
  products,
  onViewDetails,
}) => {
  const { addToCart } = useCart();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedAttribute, setSelectedAttribute] = useState<string | null>(
    null,
  );
  const [selectedColors, setSelectedColors] = useState<Record<number, string>>(
    {},
  );

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(
      product,
      product.sizes[0]?.name || "",
      selectedColors[product.id] || product.colors[0]?.name || "",
    );
    toast({
      title: "Added to bag",
      description: `${product.name} has been added to your bag`,
    });
  };

  // Find best value (lowest price for similar category)
  const findBestValue = () => {
    const minPrice = Math.min(...products.map((p) => p.price));
    return products.find((p) => p.price === minPrice)?.id;
  };

  const bestValueId = findBestValue();

  // Calculate value score for visual indicator
  const getValueScore = (product: Product) => {
    const maxPrice = Math.max(...products.map((p) => p.price));
    const minPrice = Math.min(...products.map((p) => p.price));
    const range = maxPrice - minPrice;
    if (range === 0) return 5;

    // Inverse score: lower price = higher score
    return Math.round(5 - ((product.price - minPrice) / range) * 4);
  };

  return (
    <div className="w-full">
      {/* Header with comparison count */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Comparing {products.length} Products
          </h3>
          <div className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
            Side by Side
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Scroll to view more →
        </div>
      </div>

      <div className="relative">
        {/* Scroll container with gradient indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none" />

        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
          <div className="inline-flex gap-4 min-w-full px-1">
            {/* Attribute Labels Column (Enhanced Sticky) */}
            <div className="w-24 flex-shrink-0 flex flex-col pt-[220px] space-y-6 text-[11px] font-semibold text-gray-500 dark:text-gray-400 tracking-wide sticky left-0 z-20 bg-gray-50/98 dark:bg-gray-900/98 backdrop-blur-md">
              <motion.div
                className={cn(
                  "h-10 flex items-center transition-all cursor-pointer",
                  selectedAttribute === "price" && "text-primary scale-105",
                )}
                onClick={() =>
                  setSelectedAttribute(
                    selectedAttribute === "price" ? null : "price",
                  )
                }
                whileHover={{ x: 2 }}
              >
                💰 Price
              </motion.div>

              <motion.div
                className={cn(
                  "h-10 flex items-center transition-all cursor-pointer",
                  selectedAttribute === "value" && "text-primary scale-105",
                )}
                onClick={() =>
                  setSelectedAttribute(
                    selectedAttribute === "value" ? null : "value",
                  )
                }
                whileHover={{ x: 2 }}
              >
                ⭐ Value
              </motion.div>

              <motion.div
                className={cn(
                  "h-10 flex items-center transition-all cursor-pointer",
                  selectedAttribute === "category" && "text-primary scale-105",
                )}
                onClick={() =>
                  setSelectedAttribute(
                    selectedAttribute === "category" ? null : "category",
                  )
                }
                whileHover={{ x: 2 }}
              >
                🏷️ Category
              </motion.div>

              <motion.div
                className={cn(
                  "h-10 flex items-center transition-all cursor-pointer",
                  selectedAttribute === "colors" && "text-primary scale-105",
                )}
                onClick={() =>
                  setSelectedAttribute(
                    selectedAttribute === "colors" ? null : "colors",
                  )
                }
                whileHover={{ x: 2 }}
              >
                🎨 Colors
              </motion.div>

              <motion.div
                className={cn(
                  "h-auto min-h-[40px] flex items-center transition-all cursor-pointer",
                  selectedAttribute === "sizes" && "text-primary scale-105",
                )}
                onClick={() =>
                  setSelectedAttribute(
                    selectedAttribute === "sizes" ? null : "sizes",
                  )
                }
                whileHover={{ x: 2 }}
              >
                📏 Sizes
              </motion.div>

              <motion.div
                className={cn(
                  "h-auto min-h-[70px] flex items-start pt-1 transition-all cursor-pointer",
                  selectedAttribute === "details" && "text-primary scale-105",
                )}
                onClick={() =>
                  setSelectedAttribute(
                    selectedAttribute === "details" ? null : "details",
                  )
                }
                whileHover={{ x: 2 }}
              >
                📋 Details
              </motion.div>
            </div>

            {/* Product Columns */}
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 100,
                }}
                className={cn(
                  "w-[200px] flex-shrink-0 bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border-2 flex flex-col relative transition-all duration-300",
                  hoveredProduct === product.id
                    ? "border-primary shadow-xl scale-[1.02] z-10"
                    : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600",
                )}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Badges */}
                <div className="absolute -top-3 left-0 right-0 flex justify-center gap-2 z-20">
                  {/* {product.isSale && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg"
                    >
                      🔥 SALE
                    </motion.div>
                  )} */}
                  {product.id === bestValueId && !product.isSale && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg"
                    >
                      💎 BEST VALUE
                    </motion.div>
                  )}
                </div>

                {/* Image & Header */}
                <div
                  className="h-[170px] mb-5 relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 group cursor-pointer"
                  onClick={() => onViewDetails(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Hover overlay with quick view */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-xs font-semibold">
                      <Maximize2 className="w-3 h-3" />
                      Quick View
                    </div>
                  </motion.div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="text-white text-sm font-bold line-clamp-2 leading-tight drop-shadow-lg">
                      {product.name}
                    </h4>
                  </div>
                </div>

                {/* Attributes Grid with enhanced highlighting */}
                <div className="flex flex-col space-y-6 text-sm flex-grow">
                  {/* Price */}
                  <motion.div
                    className={cn(
                      "h-10 flex flex-col justify-center transition-all rounded-lg px-2 -mx-2",
                      selectedAttribute === "price" && "bg-primary/5 scale-105",
                    )}
                    animate={{
                      backgroundColor:
                        selectedAttribute === "price"
                          ? "rgba(var(--primary-rgb), 0.05)"
                          : "transparent",
                    }}
                  >
                    <div className="text-lg font-bold text-primary">
                      {formatPrice(product.price)}
                    </div>
                    {product.isSale && (
                      <div className="text-[10px] text-gray-400 line-through">
                        {formatPrice(product.price * 1.3)}
                      </div>
                    )}
                  </motion.div>

                  {/* Value Score */}
                  <motion.div
                    className={cn(
                      "h-10 flex items-center gap-1 transition-all rounded-lg px-2 -mx-2",
                      selectedAttribute === "value" && "bg-primary/5 scale-105",
                    )}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3.5 h-3.5",
                            i < getValueScore(product)
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600",
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 ml-1">
                      ({getValueScore(product)}/5)
                    </span>
                  </motion.div>

                  {/* Category */}
                  <motion.div
                    className={cn(
                      "h-10 flex items-center transition-all rounded-lg px-2 -mx-2",
                      selectedAttribute === "category" &&
                        "bg-primary/5 scale-105",
                    )}
                  >
                    <span className="capitalize text-gray-700 dark:text-gray-200 font-medium">
                      {product.category}
                    </span>
                  </motion.div>

                  {/* Colors */}
                  <motion.div
                    className={cn(
                      "h-auto min-h-[40px] flex items-center gap-1.5 transition-all rounded-lg px-2 -mx-2 py-1",
                      selectedAttribute === "colors" &&
                        "bg-primary/5 scale-105",
                    )}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ColorSelector
                      colors={product.colors}
                      selectedColor={selectedColors[product.id] || null}
                      onSelectColor={(color) =>
                        setSelectedColors((prev) => ({
                          ...prev,
                          [product.id]: color,
                        }))
                      }
                      size="sm"
                      showLabel={false}
                    />
                  </motion.div>

                  {/* Sizes */}
                  <motion.div
                    className={cn(
                      "h-auto min-h-[40px] flex items-center flex-wrap gap-1.5 transition-all rounded-lg px-2 -mx-2",
                      selectedAttribute === "sizes" && "bg-primary/5 scale-105",
                    )}
                  >
                    {product.sizes.slice(0, 5).map((size) => (
                      <motion.span
                        key={size.id}
                        whileHover={{ scale: 1.1 }}
                        className="text-[11px] px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-700 dark:text-gray-200 font-medium cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {size.name}
                      </motion.span>
                    ))}
                    {product.sizes.length > 5 && (
                      <span className="text-[10px] text-gray-400 font-medium">
                        +{product.sizes.length - 5} more
                      </span>
                    )}
                  </motion.div>

                  {/* Details */}
                  <motion.div
                    className={cn(
                      "h-auto min-h-[70px] text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4 transition-all rounded-lg px-2 -mx-2",
                      selectedAttribute === "details" &&
                        "bg-primary/5 scale-105",
                    )}
                  >
                    {product.details?.[0] || "No details available"}
                  </motion.div>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-5 border-t border-gray-100 dark:border-gray-700 space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => handleAddToCart(e, product)}
                    className={cn(
                      "w-full py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm",
                      hoveredProduct === product.id
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-primary/10 text-primary hover:bg-primary hover:text-white",
                    )}
                  >
                    Add to Cart
                  </motion.button>

                  <button
                    onClick={() => onViewDetails(product)}
                    className="w-full text-xs text-gray-500 hover:text-primary flex items-center justify-center gap-1.5 transition-colors font-medium group"
                  >
                    View Full Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Comparison highlight indicator */}
                <AnimatePresence>
                  {hoveredProduct === product.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 border-2 border-primary rounded-2xl pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Helper text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          💡 Tip: Hover over products or click attribute labels to compare
          specific features
        </p>
      </div>
    </div>
  );
};

export default ChatbotProductComparison;
