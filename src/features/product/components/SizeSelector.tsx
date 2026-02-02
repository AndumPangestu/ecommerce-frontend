import { Sizes } from "@/features/product/types/product.type";

interface SizeSelectorProps {
  sizes: Sizes[];
  selectedSize: string | null;
  onSelectSize: (size: string) => void;
}

const SizeSelector = ({
  sizes,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-sans tracking-wide uppercase">Size</span>
        <button className="text-xs text-muted-foreground hover:text-foreground underline">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((size) => (
            <button
              key={size.id}
              onClick={() => onSelectSize(size.name)}
              className={`min-w-[48px] h-12 px-4 border text-sm font-sans tracking-wide transition-colors ${
                selectedSize === size.name
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              {size.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SizeSelector;
