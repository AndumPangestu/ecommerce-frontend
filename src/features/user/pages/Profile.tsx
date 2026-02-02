import { Link, useNavigate } from "react-router-dom";
import { User, Heart, ShoppingBag, Lock, LogOut, ChevronRight } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      icon: User,
      label: "Edit Profile",
      href: "/profile/edit",
      description: "Update your personal information",
    },
    {
      icon: Heart,
      label: "Wishlist",
      href: "/wishlist",
      description: "View your saved items",
    },
    {
      icon: ShoppingBag,
      label: "My Transactions",
      href: "/transactions",
      description: "View your order history",
    },
    {
      icon: Lock,
      label: "Change Password",
      href: "/profile/change-password",
      description: "Update your password",
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Profile Header */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-serif text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl text-foreground mb-1">
              {user.name}
            </h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:border-destructive/50 transition-colors group w-full text-left"
            >
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <LogOut className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-destructive">Logout</h3>
                <p className="text-sm text-muted-foreground">Sign out of your account</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-destructive transition-colors" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
