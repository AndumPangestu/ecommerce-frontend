import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useToast } from "@/shared/hooks/use-toast";
import { useRegister } from "@/features/auth/hooks/useRegister";
import { getErrorMessage } from "@/shared/utils/errorMessage";
import SEO from "@/shared/components/SEO";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const localizedPath = useLocalizedPath();
  const registerMutation = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: t.changePassword.passwordsNotMatch,
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: language === "id" ? "Error" : "Error",
        description: t.changePassword.passwordTooShort,
        variant: "destructive",
      });
      return;
    }

    try {
      await registerMutation.mutateAsync({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      toast({
        title: language === "id" ? "Akun berhasil dibuat!" : "Account created!",
        description:
          language === "id"
            ? "Silakan masuk dengan akun baru Anda."
            : "Please login with your new account.",
      });
      navigate(localizedPath("/login"));
    } catch (error) {
      const message = getErrorMessage(error, {
        fallback:
          language === "id" ? "Silakan coba lagi." : "Please try again.",
      });
      toast({
        title: language === "id" ? "Pendaftaran gagal" : "Registration failed",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t.auth.register}
        description={
          language === "id"
            ? "Buat akun Andelevate untuk penawaran eksklusif dan pengalaman belanja yang lebih baik."
            : "Create an Andelevate account for exclusive offers and a better shopping experience."
        }
        canonicalUrl={`https://andelevate.com/${language}/register`}
      />
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-2">
              {t.auth.registerTitle}
            </h1>
            <p className="text-muted-foreground">{t.auth.registerSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t.auth.name}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={
                  language === "id"
                    ? "Masukkan nama lengkap"
                    : "Enter your full name"
                }
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">{t.auth.username}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder={
                  language === "id" ? "Pilih username" : "Choose a username"
                }
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={
                  language === "id" ? "Masukkan email Anda" : "Enter your email"
                }
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={
                    language === "id" ? "Buat kata sandi" : "Create a password"
                  }
                  value={formData.password}
                  onChange={handleChange}
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={
                    language === "id"
                      ? "Konfirmasi kata sandi"
                      : "Confirm your password"
                  }
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending
                ? t.auth.creating
                : t.auth.createAccount}
            </Button>
          </form>

          <p className="text-center mt-6 text-muted-foreground">
            {t.auth.haveAccount}{" "}
            <Link
              to={localizedPath("/login")}
              className="text-primary hover:underline"
            >
              {t.auth.signIn}
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
