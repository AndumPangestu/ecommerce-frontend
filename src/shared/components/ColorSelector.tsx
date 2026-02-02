interface Color {
  id: number;
  name: string;
  hexCode: string | null;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: string | null;
  onSelectColor: (color: string) => void;
  size?: "sm" | "md";
  showLabel?: boolean;
}

const ColorSelector = ({
  colors,
  selectedColor,
  onSelectColor,
  size = "md",
  showLabel = true,
}: ColorSelectorProps) => {
  const sizeClasses = size === "sm" ? "w-6 h-6" : "w-10 h-10";

  return (
    <div className={size === "sm" ? "space-y-2" : "space-y-3"}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-sans tracking-wide uppercase">
            Color{selectedColor && `: ${selectedColor}`}
          </span>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onSelectColor(color.name)}
            className={`${sizeClasses} rounded-full border-2 transition-all ${
              !color.hexCode ? "bg-gray-200" : ""
            } ${
              selectedColor === color.name
                ? "ring-2 ring-offset-2 ring-primary"
                : "hover:ring-2 hover:ring-offset-2 hover:ring-muted-foreground"
            }`}
            style={
              color.hexCode ? { backgroundColor: color.hexCode } : undefined
            }
            aria-label={`Select ${color.name}`}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
