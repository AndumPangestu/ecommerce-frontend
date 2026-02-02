import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { toast } from "@/shared/hooks/use-toast";

interface ReviewFormProps {
  productId: number;
  onSubmit: (review: {
    rating: number;
    title: string;
    content: string;
    author: string;
  }) => void;
}

const ReviewForm = ({ productId, onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Click on the stars to rate this product",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Please add a title",
        description: "Give your review a title",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Please add your review",
        description: "Share your thoughts about this product",
        variant: "destructive",
      });
      return;
    }

    if (!author.trim()) {
      toast({
        title: "Please add your name",
        description: "Let others know who wrote this review",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      onSubmit({ rating, title, content, author });
      setRating(0);
      setTitle("");
      setContent("");
      setAuthor("");
      setIsSubmitting(false);
      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your feedback",
      });
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-lg">
      <h3 className="font-serif text-xl text-foreground mb-6">Write a Review</h3>

      {/* Star Rating Input */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-2 block">Your Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5 transition-transform hover:scale-110"
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  star <= (hoverRating || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Author Name */}
      <div className="mb-4">
        <Label htmlFor="author" className="text-sm font-medium mb-2 block">
          Your Name
        </Label>
        <Input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter your name"
          maxLength={50}
        />
      </div>

      {/* Review Title */}
      <div className="mb-4">
        <Label htmlFor="title" className="text-sm font-medium mb-2 block">
          Review Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          maxLength={100}
        />
      </div>

      {/* Review Content */}
      <div className="mb-6">
        <Label htmlFor="content" className="text-sm font-medium mb-2 block">
          Your Review
        </Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts about this product..."
          rows={4}
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {content.length}/500 characters
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
};

export default ReviewForm;
