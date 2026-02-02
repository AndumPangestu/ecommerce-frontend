import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useToast } from "@/shared/hooks/use-toast";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import SEO from "@/shared/components/SEO";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const localizedPath = useLocalizedPath();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email, password });
      toast({
        title: language === "id" ? "Selamat datang kembali!" : "Welcome back!",
        description:
          language === "id"
            ? "Anda berhasil masuk."
            : "You have successfully logged in.",
      });
      navigate(localizedPath("/profile"));
    } catch (error) {
      const message = getErrorMessage(error, {
        fallback:
          language === "id" ? "Terjadi kesalahan." : "Something went wrong.",
      });
      toast({
        title: language === "id" ? "Login gagal" : "Login failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t.auth.login}
        description={
          language === "id"
            ? "Masuk ke akun Andelevate Anda untuk melanjutkan belanja dan mengakses fitur eksklusif."
            : "Sign in to your Andelevate account to continue shopping and access exclusive features."
        }
        canonicalUrl={`https://andelevate.com/${language}/login`}
      />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              {t.auth.loginTitle}
            </h1>
            <p className="text-muted-foreground">{t.auth.loginSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  language === "id" ? "Masukkan email Anda" : "Enter your email"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    language === "id"
                      ? "Masukkan kata sandi"
                      : "Enter your password"
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to={localizedPath("/forgot-password")}
                className="text-sm text-primary hover:underline"
              >
                {t.auth.forgotPassword}
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? t.auth.signingIn : t.auth.signIn}
            </Button>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            {t.auth.noAccount}{" "}
            <Link
              to={localizedPath("/register")}
              className="text-primary hover:underline"
            >
              {t.auth.register}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;

