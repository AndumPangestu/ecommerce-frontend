import { Link } from "react-router-dom";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import SEO from "@/shared/components/SEO";
import { Button } from "@/shared/components/ui/button";
import { useFaqs } from "@/shared/hooks/useFaqs";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";
import { getErrorMessage } from "@/shared/utils/errorMessage";

const FAQ = () => {
  const { t, language } = useLanguage();
  const localizedPath = useLocalizedPath();
  const faqsQuery = useFaqs();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t.faq.title}
        description={t.faq.subtitle}
        canonicalUrl={`https://andelevate.com/${language}/faq`}
      />
      <Header />
      <main className="container-main py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          {t.faq.title}
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          {t.faq.subtitle}
        </p>

        <div className="max-w-3xl mx-auto space-y-8">
          {faqsQuery.isPending ? (
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, categoryIndex) => (
                <section key={categoryIndex}>
                  <div className="h-6 w-48 rounded bg-muted animate-pulse mb-4" />
                  <div className="w-full border rounded-md overflow-hidden">
                    {Array.from({ length: 4 }).map((__, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="border-b last:border-b-0 p-4"
                      >
                        <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : faqsQuery.isError ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {getErrorMessage(faqsQuery.error, {
                  fallback:
                    language === "id"
                      ? "Gagal memuat FAQ."
                      : "Failed to load FAQs.",
                })}
              </p>
              <Button variant="outline" onClick={() => faqsQuery.refetch()}>
                {t.common.tryAgain}
              </Button>
            </div>
          ) : (
            faqsQuery.data?.map((category) => (
              <section key={category.category}>
                <h2 className="font-serif text-xl text-foreground mb-4">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq) => (
                    <AccordionItem
                      key={faq.id}
                      value={`${category.category}-${faq.id}`}
                    >
                      <AccordionTrigger className="text-left font-sans text-sm">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))
          )}
        </div>

        <section className="mt-16 text-center bg-muted/50 rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="font-serif text-xl text-foreground mb-3">
            {t.faq.stillHaveQuestions}
          </h2>
          <p className="text-muted-foreground mb-4">{t.faq.contactUs}</p>
          <Link
            to={localizedPath("/contact")}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t.faq.getInTouch}
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;

