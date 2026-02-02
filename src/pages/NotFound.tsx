import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";
import SEO from "@/shared/components/SEO";
import { FileQuestion, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const localizedPath = useLocalizedPath();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO
        title={t.notFound.title}
        description={t.notFound.message}
        noIndex={true}
      />
      <div className="text-center px-4">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-muted-foreground/10 p-6">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>
        <h1 className="mb-4 text-6xl font-serif font-bold text-foreground">
          {t.notFound.code}
        </h1>
        <h2 className="mb-4 text-2xl font-serif text-foreground">
          {t.notFound.title}
        </h2>
        <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
          {t.notFound.message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={localizedPath("/")}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-sans text-sm tracking-wide hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.notFound.backToHome}
          </Link>
          <Link
            to={localizedPath("/shop")}
            className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 font-sans text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
            {t.notFound.browseProducts}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

