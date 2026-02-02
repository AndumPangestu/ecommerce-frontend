import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";
import { useHighlightedProductCategories } from "@/features/product/hooks/useHighlightedProductCategories";
import { Sparkles } from "lucide-react";
import categoryTops from "@/assets/category-tops.jpg";

const CategoryGrid = () => {
  const { t } = useLanguage();
  const localizedPath = useLocalizedPath();
  const highlightedCategoriesQuery = useHighlightedProductCategories();

  const categories = (highlightedCategoriesQuery.data ?? []).map(
    (category) => ({
      id: category.id,
      name: category.name,
      image: category.image || categoryTops,
      href: category.link || localizedPath("/shop?categoryId=" + category.id),
      isExternal:
        typeof category.link === "string" && /^https?:\/\//.test(category.link),
    }),
  );

  return (
    <section id="collections" className="py-16 md:py-24 bg-background">
      <div className="container-main">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
            {t.categories.title}
          </h2>
          <p className="text-muted-foreground font-sans max-w-md mx-auto">
            {t.categories.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {highlightedCategoriesQuery.isPending
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] overflow-hidden bg-muted animate-pulse"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-muted-foreground/20 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <div className="h-7 w-2/3 mx-auto rounded bg-muted-foreground/20 mb-3" />
                    <div className="h-3 w-1/3 mx-auto rounded bg-muted-foreground/20" />
                  </div>
                </div>
              ))
            : null}

          {!highlightedCategoriesQuery.isPending &&
          !highlightedCategoriesQuery.isError &&
          categories.length === 0 ? (
            <div className="md:col-span-3">
              <div className="relative overflow-hidden rounded-xl bg-muted/30 p-8 text-center">
                <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative mx-auto flex max-w-md flex-col items-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-2">
                    {t.categories.emptyTitle}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t.categories.emptyDescription}
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {categories.map((category, index) =>
            category.isExternal ? (
              <a
                key={category.id}
                href={category.href}
                className="group relative aspect-[3/4] overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-serif text-primary-foreground mb-3">
                    {category.name}
                  </h3>
                  <span className="inline-block text-xs font-sans tracking-widest uppercase text-primary-foreground border-b border-primary-foreground pb-1 transition-all group-hover:pb-2">
                    {t.categories.shopNow}
                  </span>
                </div>
              </a>
            ) : (
              <Link
                key={category.id}
                to={category.href}
                className="group relative aspect-[3/4] overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-2xl font-serif text-primary-foreground mb-3">
                    {category.name}
                  </h3>
                  <span className="inline-block text-xs font-sans tracking-widest uppercase text-primary-foreground border-b border-primary-foreground pb-1 transition-all group-hover:pb-2">
                    {t.categories.shopNow}
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
