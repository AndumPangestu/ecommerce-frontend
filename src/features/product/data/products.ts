import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import type { Product } from "@/features/product/types/product.type";

export const allSizes = ["XS", "S", "M", "L", "XL"];
export const allColors = ["Black", "White", "Beige", "Green", "Pink", "Navy"];
export const priceRanges = [
  { label: "Under Rp 300K", min: 0, max: 300000 },
  { label: "Rp 300K - 500K", min: 300000, max: 500000 },
  { label: "Rp 500K - 1M", min: 500000, max: 1000000 },
  { label: "Over Rp 1M", min: 1000000, max: Infinity },
];

const sizeMap = {
  XS: { id: 1, name: "XS", displayOrder: 1 },
  S: { id: 2, name: "S", displayOrder: 2 },
  M: { id: 3, name: "M", displayOrder: 3 },
  L: { id: 4, name: "L", displayOrder: 4 },
  XL: { id: 5, name: "XL", displayOrder: 5 },
  "One Size": { id: 6, name: "One Size", displayOrder: 6 },
  One: { id: 6, name: "One Size", displayOrder: 6 },
};

const colorMap = {
  Black: { id: 1, name: "Black", hexCode: "#111827" },
  White: { id: 2, name: "White", hexCode: "#FFFFFF" },
  Beige: { id: 3, name: "Beige", hexCode: "#D4B896" },
  Green: { id: 4, name: "Green", hexCode: "#356A5A" },
  Pink: { id: 5, name: "Pink", hexCode: "#E2A9A0" },
  Navy: { id: 6, name: "Navy", hexCode: "#1E3A5F" },
  Grey: { id: 7, name: "Grey", hexCode: "#6B7280" },
  Camel: { id: 8, name: "Camel", hexCode: "#C4A57B" },
  Olive: { id: 9, name: "Olive", hexCode: "#708238" },
};

function getSizes(sizes: string[]) {
  return sizes.map(
    (s) =>
      sizeMap[s as keyof typeof sizeMap] || {
        id: 99,
        name: s,
        displayOrder: 99,
      },
  );
}

function getColors(colors: string[]) {
  return colors.map(
    (c) =>
      colorMap[c as keyof typeof colorMap] || {
        id: 99,
        name: c,
        hexCode: null,
      },
  );
}

export const products: Product[] = [
  {
    id: 1,
    name: "Silk Wrap Blouse",
    price: 450000,
    images: [product1, product2, product3],
    isNew: true,
    category: "tops",
    sizes: getSizes(["XS", "S", "M", "L", "XL"]),
    colors: getColors(["White", "Beige", "Pink"]),
    description:
      "Elevate your wardrobe with this luxurious silk wrap blouse. Crafted from premium mulberry silk, it drapes beautifully and feels incredibly soft against the skin.",
    details: [
      "100% Mulberry Silk",
      "Wrap-style closure",
      "Relaxed fit",
      "Dry clean only",
      "Made in Indonesia",
    ],
  },
  {
    id: 2,
    name: "Linen Wide Pants",
    price: 380000,
    originalPrice: 520000,
    images: [product2, product1, product4],
    isSale: true,
    category: "bottoms",
    sizes: getSizes(["XS", "S", "M", "L"]),
    colors: getColors(["Beige", "Black", "Navy"]),
    description:
      "These linen wide-leg pants offer both comfort and sophistication. Perfect for warm days or dressed up for evening occasions.",
    details: [
      "100% European Linen",
      "High-rise waist",
      "Wide leg silhouette",
      "Side pockets",
      "Machine washable",
    ],
  },
  {
    id: 3,
    name: "Midi Slip Dress",
    price: 650000,
    images: [product3, product1, product2],
    isNew: true,
    category: "dresses",
    sizes: getSizes(["XS", "S", "M", "L", "XL"]),
    colors: getColors(["Black", "Green", "Pink"]),
    description:
      "A timeless slip dress that transitions seamlessly from day to night. The midi length and adjustable straps ensure a flattering fit.",
    details: [
      "Satin blend fabric",
      "Adjustable spaghetti straps",
      "V-neckline",
      "Midi length",
      "Lined",
    ],
  },
  {
    id: 4,
    name: "Cotton Basics Tee",
    price: 180000,
    originalPrice: 250000,
    images: [product4, product1, product3],
    isSale: true,
    category: "tops",
    sizes: getSizes(["XS", "S", "M", "L", "XL"]),
    colors: getColors(["White", "Black", "Beige"]),
    description:
      "The perfect everyday essential. Our cotton basics tee is made from organic cotton for ultimate comfort and sustainability.",
    details: [
      "100% Organic Cotton",
      "Crew neck",
      "Relaxed fit",
      "Pre-shrunk",
      "Ethically made",
    ],
  },
  {
    id: 5,
    name: "Wool Blend Coat",
    price: 1250000,
    images: [product5, product1, product2],
    isNew: true,
    category: "outerwear",
    sizes: getSizes(["XS", "S", "M", "L"]),
    colors: getColors(["Black", "Beige", "Navy"]),
    description:
      "A sophisticated wool blend coat that keeps you warm while looking effortlessly chic. The perfect investment piece for your wardrobe.",
    details: [
      "70% Wool, 30% Polyester",
      "Double-breasted closure",
      "Notch lapel",
      "Fully lined",
      "Side pockets",
    ],
  },
  {
    id: 6,
    name: "Leather Crossbody Bag",
    price: 890000,
    images: [product6, product7, product5],
    category: "accessories",
    sizes: getSizes(["One Size"]),
    colors: getColors(["Black", "Beige"]),
    description:
      "Crafted from genuine leather, this crossbody bag combines functionality with timeless style. Perfect for everyday use.",
    details: [
      "100% Genuine Leather",
      "Adjustable strap",
      "Gold-tone hardware",
      "Interior zip pocket",
      "Magnetic closure",
    ],
  },
  {
    id: 7,
    name: "Silk Print Scarf",
    price: 320000,
    originalPrice: 450000,
    images: [product7, product6, product3],
    isSale: true,
    category: "accessories",
    sizes: getSizes(["One"]),
    colors: getColors(["Green", "Pink", "Beige"]),
    description:
      "Add a touch of elegance to any outfit with this beautiful silk print scarf. Versatile enough to wear multiple ways.",
    details: [
      "100% Silk",
      "Hand-rolled edges",
      "90cm x 90cm",
      "Exclusive print",
      "Dry clean only",
    ],
  },
  {
    id: 8,
    name: "Cashmere Knit Sweater",
    price: 980000,
    images: [product8, product5, product4],
    isNew: true,
    category: "tops",
    sizes: getSizes(["XS", "S", "M", "L", "XL"]),
    colors: getColors(["Beige", "White", "Green"]),
    description:
      "Luxuriously soft cashmere sweater in a classic knit. A wardrobe staple that gets better with every wear.",
    details: [
      "100% Mongolian Cashmere",
      "Ribbed trim",
      "Relaxed fit",
      "Hand wash recommended",
      "Made in Indonesia",
    ],
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getRelatedProducts = (
  productId: number,
  category: string,
): Product[] => {
  return products
    .filter((p) => p.id !== productId && p.category === category)
    .slice(0, 4);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
};
