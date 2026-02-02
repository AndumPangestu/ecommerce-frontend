import { useState } from "react";
import { useLanguage } from "@/shared/i18n/LanguageContext";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            {t.newsletter.title}
          </h2>
          <p className="text-muted-foreground font-sans mb-8">
            {t.newsletter.description}
          </p>

          {isSubmitted ? (
            <div className="bg-primary/10 text-primary px-6 py-4 font-sans animate-scale-in">
              {t.newsletter.thankYou}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.newsletter.placeholder}
                className="flex-1 px-4 py-3 border border-border bg-background text-foreground font-sans text-sm focus:outline-none focus:border-primary transition-colors"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                {t.newsletter.subscribe}
              </button>
            </form>
          )}

          <p className="text-xs text-muted-foreground font-sans mt-4">
            {t.newsletter.privacy}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

