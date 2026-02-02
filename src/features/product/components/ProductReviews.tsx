import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import StarRating from "@/shared/components/StarRating";
import ReviewForm from "./ReviewForm";
import { Button } from "@/shared/components/ui/button";
import { Review, getAverageRating } from "@/features/product/data/reviews";

interface ProductReviewsProps {
  reviews: Review[];
  productId: number;
}

const ProductReviews = ({ reviews: initialReviews, productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const averageRating = getAverageRating(productId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleReviewSubmit = (newReview: {
    rating: number;
    title: string;
    content: string;
    author: string;
  }) => {
    const review: Review = {
      id: Date.now(),
      productId,
      author: newReview.author,
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      date: new Date().toISOString().split("T")[0],
      verified: false,
    };
    setReviews([review, ...reviews]);
    setShowForm(false);
  };

  return (
    <section className="container-main py-12 border-t border-border">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="font-serif text-2xl text-foreground">Customer Reviews</h2>
        <div className="flex items-center gap-4">
          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <StarRating rating={averageRating} size="lg" />
              <span className="text-lg font-medium text-foreground">
                {averageRating}
              </span>
              <span className="text-muted-foreground">
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
          <Button
            variant="outline"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Write a Review"}
          </Button>
        </div>
      </div>

      {/* Review Form */}
      {showForm && (
        <div className="mb-8">
          <ReviewForm productId={productId} onSubmit={handleReviewSubmit} />
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="bg-card border border-border p-6 rounded-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{review.author}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDate(review.date)}
                </span>
              </div>

              <StarRating rating={review.rating} size="sm" />

              <h3 className="font-medium text-foreground mt-3 mb-2">
                {review.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {review.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductReviews;
