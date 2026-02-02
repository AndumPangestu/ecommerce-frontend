import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

    return (
      <div key={index} className="relative">
        <Star className={`${sizeClasses[size]} text-muted-foreground/30`} />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          <Star
            className={`${sizeClasses[size]} fill-amber-400 text-amber-400`}
          />
        </div>
      </div>
    );
  });

  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">{rating}</span>
      )}
    </div>
  );
};

export default StarRating;
