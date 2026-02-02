export interface Transaction {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: {
    productId: number;
    name: string;
    image: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    province: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  trackingNumber?: string;
}

export const dummyTransactions: Transaction[] = [
  {
    id: "TRX-2026-001",
    date: "2026-01-05",
    status: "delivered",
    items: [
      {
        productId: 1,
        name: "Silk Essence Blouse",
        image: "/src/assets/product-1.jpg",
        size: "M",
        color: "Ivory",
        quantity: 1,
        price: 189,
      },
      {
        productId: 2,
        name: "Tailored Wide-Leg Trousers",
        image: "/src/assets/product-2.jpg",
        size: "S",
        color: "Black",
        quantity: 1,
        price: 245,
      },
    ],
    subtotal: 434,
    shipping: 15,
    total: 449,
    shippingAddress: {
      name: "Jane Doe",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      zipCode: "12190",
      phone: "+62 812 3456 7890",
    },
    paymentMethod: "Credit Card",
    trackingNumber: "JNE123456789",
  },
  {
    id: "TRX-2026-002",
    date: "2026-01-07",
    status: "processing",
    items: [
      {
        productId: 3,
        name: "Cashmere Wrap Cardigan",
        image: "/src/assets/product-3.jpg",
        size: "L",
        color: "Camel",
        quantity: 2,
        price: 325,
      },
    ],
    subtotal: 650,
    shipping: 0,
    total: 650,
    shippingAddress: {
      name: "Jane Doe",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      zipCode: "12190",
      phone: "+62 812 3456 7890",
    },
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TRX-2026-003",
    date: "2026-01-08",
    status: "pending",
    items: [
      {
        productId: 5,
        name: "Structured Blazer",
        image: "/src/assets/product-5.jpg",
        size: "M",
        color: "Navy",
        quantity: 1,
        price: 395,
      },
    ],
    subtotal: 395,
    shipping: 15,
    total: 410,
    shippingAddress: {
      name: "Jane Doe",
      address: "Jl. Sudirman No. 123",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      zipCode: "12190",
      phone: "+62 812 3456 7890",
    },
    paymentMethod: "E-Wallet",
  },
];
