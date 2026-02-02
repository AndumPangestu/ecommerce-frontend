export interface Review {
  id: number;
  productId: number;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    author: "Sarah M.",
    rating: 5,
    title: "Absolutely stunning!",
    content: "The silk quality is exceptional. Fits perfectly and looks even better in person. Will definitely order more colors.",
    date: "2024-01-15",
    verified: true,
  },
  {
    id: 2,
    productId: 1,
    author: "Emily R.",
    rating: 4,
    title: "Beautiful blouse",
    content: "Love the wrap style and the fabric feels luxurious. Runs slightly large, consider sizing down.",
    date: "2024-01-10",
    verified: true,
  },
  {
    id: 3,
    productId: 2,
    author: "Jessica L.",
    rating: 5,
    title: "Perfect summer pants",
    content: "So comfortable and breathable! The wide leg is very flattering. Great for both casual and dressed up occasions.",
    date: "2024-01-08",
    verified: true,
  },
  {
    id: 4,
    productId: 2,
    author: "Amanda K.",
    rating: 4,
    title: "Great quality linen",
    content: "Beautiful pants, excellent craftsmanship. The linen wrinkles a bit but that's expected with natural fabric.",
    date: "2024-01-05",
    verified: false,
  },
  {
    id: 5,
    productId: 3,
    author: "Michelle T.",
    rating: 5,
    title: "My new favorite dress",
    content: "This slip dress is everything! The satin drapes beautifully and the adjustable straps are a nice touch. Perfect for date night.",
    date: "2024-01-12",
    verified: true,
  },
  {
    id: 6,
    productId: 3,
    author: "Rachel W.",
    rating: 5,
    title: "Elegant and versatile",
    content: "Can be dressed up or down. The quality is amazing for the price. Already planning to get another color!",
    date: "2024-01-09",
    verified: true,
  },
  {
    id: 7,
    productId: 4,
    author: "Lisa P.",
    rating: 4,
    title: "Great basic tee",
    content: "Soft organic cotton, good fit. A wardrobe staple that goes with everything.",
    date: "2024-01-11",
    verified: true,
  },
  {
    id: 8,
    productId: 5,
    author: "Katherine H.",
    rating: 5,
    title: "Investment piece",
    content: "Worth every penny! The wool blend is warm but not too heavy. Classic style that will last for years.",
    date: "2024-01-14",
    verified: true,
  },
  {
    id: 9,
    productId: 6,
    author: "Diana S.",
    rating: 5,
    title: "Perfect everyday bag",
    content: "The leather is soft yet durable. Love the adjustable strap and the size is just right for essentials.",
    date: "2024-01-13",
    verified: true,
  },
  {
    id: 10,
    productId: 7,
    author: "Grace N.",
    rating: 4,
    title: "Beautiful print",
    content: "The silk is so soft and the print is even prettier in person. Hand-rolled edges are a nice detail.",
    date: "2024-01-07",
    verified: true,
  },
  {
    id: 11,
    productId: 8,
    author: "Victoria C.",
    rating: 5,
    title: "Luxuriously soft",
    content: "This cashmere sweater is heavenly! So soft and warm. The fit is relaxed but still flattering.",
    date: "2024-01-16",
    verified: true,
  },
  {
    id: 12,
    productId: 8,
    author: "Natalie B.",
    rating: 5,
    title: "Best sweater I own",
    content: "The quality of this cashmere is outstanding. Gets better with every wash. A must-have for any wardrobe.",
    date: "2024-01-06",
    verified: true,
  },
];

export const getReviewsByProductId = (productId: number): Review[] => {
  return reviews.filter((review) => review.productId === productId);
};

export const getAverageRating = (productId: number): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
};
