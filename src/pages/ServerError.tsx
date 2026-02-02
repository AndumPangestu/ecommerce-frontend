import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";
import SEO from "@/shared/components/SEO";
import { Link } from "react-router-dom";
import { ServerCrash, RefreshCw } from "lucide-react";

const ServerError = () => {
  const { t } = useLanguage();
  const localizedPath = useLocalizedPath();

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO
        title={t.serverError.title}
        description={t.serverError.message}
        noIndex={true}
      />
      <div className="text-center px-4">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <ServerCrash className="h-16 w-16 text-destructive" />
          </div>
        </div>
        <h1 className="mb-4 text-6xl font-serif font-bold text-foreground">
          {t.serverError.code}
        </h1>
        <h2 className="mb-4 text-2xl font-serif text-foreground">
          {t.serverError.title}
        </h2>
        <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
          {t.serverError.message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-sans text-sm tracking-wide hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            {t.serverError.tryAgain}
          </button>
          <Link
            to={localizedPath("/")}
            className="inline-flex items-center justify-center border-2 border-primary text-primary px-6 py-3 font-sans text-sm tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {t.serverError.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;

