import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Heart,
  User,
  LogOut,
  Receipt,
} from "lucide-react";
import logo from "@/assets/andelevate-logo.png";
import logoIcon from "/favicon.png";
import { useCart } from "@/features/cart/context/CartContext";
import { useWishlist } from "@/features/wishlist/context/WishlistContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";
import SearchModal from "@/features/product/components/SearchModal";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import { scrollToElement } from "@/shared/hooks/useScrollToHash";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getTotalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const localizedPath = useLocalizedPath();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = getTotalItems();
  const wishlistCount = wishlist.length;

  const handleAnchorClick = (hash: string) => {
    const homePath = `/${language}`;
    const targetId = hash.replace("#", "");

    // If we're on the home page, just scroll
    if (
      location.pathname === homePath ||
      location.pathname === `${homePath}/`
    ) {
      scrollToElement(targetId);
    } else {
      // Navigate to home page with hash
      navigate(`${homePath}${hash}`);
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: t.nav.newArrivals, hash: "#new-arrivals" },
    { name: t.nav.shop, href: localizedPath("/shop") },
    { name: t.nav.collections, hash: "#collections" },
    { name: t.nav.about, hash: "#about" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate(localizedPath("/"));
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2.5 text-center">
        <p className="text-xs tracking-widest uppercase font-sans">
          {t.announcement.freeShipping}
        </p>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) =>
                link.hash ? (
                  <button
                    key={link.name}
                    onClick={() => handleAnchorClick(link.hash)}
                    className="text-sm font-sans tracking-wide text-foreground hover:text-muted-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href!}
                    className="text-sm font-sans tracking-wide text-foreground hover:text-muted-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                ),
              )}
            </nav>

            {/* Logo */}
            <Link
              to={localizedPath("/")}
              className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
            >
              <img
                src={logo}
                alt="Andelevate"
                className="hidden lg:block h-6 object-contain"
              />
              <img
                src={logoIcon}
                alt="Andelevate"
                className="block lg:hidden h-8 w-8 object-contain"
              />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Language Switcher */}
              <LanguageSwitcher variant="icon" />

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label={t.nav.search}
              >
                <Search className="h-5 w-5 text-foreground" />
              </button>
              <SearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />

              {/* Profile Icon with Dropdown */}
              <div className="hidden sm:block relative" ref={dropdownRef}>
                {user ? (
                  <>
                    <button
                      onClick={() =>
                        setIsProfileDropdownOpen(!isProfileDropdownOpen)
                      }
                      className="p-2 hover:opacity-70 transition-opacity"
                      aria-label="Profile menu"
                    >
                      <User className="h-5 w-5 text-foreground" />
                    </button>

                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                        <div className="py-2">
                          <Link
                            to={localizedPath("/profile")}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            {t.nav.myProfile}
                          </Link>
                          <Link
                            to={localizedPath("/transactions")}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            <Receipt className="h-4 w-4" />
                            {t.nav.transactions}
                          </Link>
                          <div className="border-t border-border my-1" />
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            {t.nav.logout}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={localizedPath("/login")}
                    className="p-2 hover:opacity-70 transition-opacity"
                    aria-label={t.nav.login}
                  >
                    <User className="h-5 w-5 text-foreground" />
                  </Link>
                )}
              </div>

              <Link
                to={localizedPath("/wishlist")}
                className="hidden sm:block p-2 hover:opacity-70 transition-opacity relative"
                aria-label={t.nav.wishlist}
              >
                <Heart className="h-5 w-5 text-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-sans">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 hover:opacity-70 transition-opacity relative"
                aria-label={t.nav.cart}
              >
                <ShoppingBag className="h-5 w-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <nav className="container-main py-6 space-y-4">
              {navLinks.map((link) =>
                link.hash ? (
                  <button
                    key={link.name}
                    onClick={() => handleAnchorClick(link.hash)}
                    className="block text-lg font-serif text-foreground hover:text-muted-foreground transition-colors text-left"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href!}
                    className="block text-lg font-serif text-foreground hover:text-muted-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ),
              )}

              {/* Mobile Profile Links */}
              <div className="border-t border-border pt-4 mt-4 space-y-4">
                {user ? (
                  <>
                    <Link
                      to={localizedPath("/profile")}
                      className="flex items-center gap-3 text-lg font-serif text-foreground hover:text-muted-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      {t.nav.myProfile}
                    </Link>
                    <Link
                      to={localizedPath("/transactions")}
                      className="flex items-center gap-3 text-lg font-serif text-foreground hover:text-muted-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Receipt className="h-5 w-5" />
                      {t.nav.transactions}
                    </Link>
                    <Link
                      to={localizedPath("/wishlist")}
                      className="flex items-center gap-3 text-lg font-serif text-foreground hover:text-muted-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart className="h-5 w-5" />
                      {t.nav.wishlist}
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 text-lg font-serif text-foreground hover:text-muted-foreground transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      {t.nav.logout}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to={localizedPath("/login")}
                      className="flex items-center gap-3 text-lg font-serif text-foreground hover:text-muted-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      {t.nav.login}
                    </Link>
                    <Link
                      to={localizedPath("/wishlist")}
                      className="flex items-center gap-3 text-lg font-serif text-foreground hover:text-muted-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Heart className="h-5 w-5" />
                      {t.nav.wishlist}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;

