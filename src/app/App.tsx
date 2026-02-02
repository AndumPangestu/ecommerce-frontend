import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "@/shared/components/ui/sonner";
import ScrollToTop from "@/shared/components/ScrollToTop";
import CartDrawer from "@/features/cart/components/CartDrawer";
import Chatbot from "@/features/chatbot/components/Chatbot";
import { AppProviders } from "./providers";
import { AppRoutes } from "./routes";

const App = () => (
  <AppProviders>
    <Toaster />
    <Sonner />
    <ScrollToTop />
    <CartDrawer />
    <Chatbot />
    <AppRoutes />
  </AppProviders>
);

export default App;
