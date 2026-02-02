import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/app/Index";
import Shop from "@/features/product/pages/Shop";
import ProductDetail from "@/features/product/pages/ProductDetail";
import Wishlist from "@/features/wishlist/pages/Wishlist";
import Checkout from "@/features/cart/pages/Checkout";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import ForgotPassword from "@/features/auth/pages/ForgotPassword";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import Profile from "@/features/user/pages/Profile";
import EditProfile from "@/features/user/pages/EditProfile";
import ChangePassword from "@/features/user/pages/ChangePassword";
import Transactions from "@/features/user/pages/Transactions";
import TransactionDetail from "@/features/user/pages/TransactionDetail";

// General pages
import Contact from "@/pages/Contact";
import Shipping from "@/pages/Shipping";
import Returns from "@/pages/Returns";
import SizeGuide from "@/pages/SizeGuide";
import FAQ from "@/pages/FAQ";
import OurStory from "@/pages/OurStory";
import Sustainability from "@/pages/Sustainability";
import Careers from "@/pages/Careers";
import Press from "@/pages/Press";
import NotFound from "@/pages/NotFound";
import ServerError from "@/pages/ServerError";
import Forbidden from "@/pages/Forbidden";

const LanguageRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/shop" element={<Shop />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/wishlist" element={<Wishlist />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/shipping" element={<Shipping />} />
    <Route path="/returns" element={<Returns />} />
    <Route path="/size-guide" element={<SizeGuide />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/our-story" element={<OurStory />} />
    <Route path="/sustainability" element={<Sustainability />} />
    <Route path="/careers" element={<Careers />} />
    <Route path="/press" element={<Press />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/profile/edit" element={<EditProfile />} />
    <Route path="/profile/change-password" element={<ChangePassword />} />
    <Route path="/transactions" element={<Transactions />} />
    <Route path="/transactions/:id" element={<TransactionDetail />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/error" element={<ServerError />} />
    <Route path="/forbidden" element={<Forbidden />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export const AppRoutes = () => (
  <Routes>
    {/* Redirect root to English */}
    <Route path="/" element={<Navigate to="/en" replace />} />

    {/* Language-prefixed routes - handle both /en and /en/* */}
    <Route path="/en" element={<Index />} />
    <Route path="/en/*" element={<LanguageRoutes />} />
    <Route path="/id" element={<Index />} />
    <Route path="/id/*" element={<LanguageRoutes />} />

    {/* Legacy routes redirect to English */}
    <Route path="/shop" element={<Navigate to="/en/shop" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
