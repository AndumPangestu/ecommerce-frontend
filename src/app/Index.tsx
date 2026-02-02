import Header from "@/shared/components/layout/Header";
import HeroSection from "@/shared/components/HeroSection";
import CategoryGrid from "@/features/product/components/CategoryGrid";
import ProductGrid from "@/features/product/components/ProductGrid";
import FeaturesBanner from "@/shared/components/FeaturesBanner";
import Newsletter from "@/shared/components/Newsletter";
import Footer from "@/shared/components/layout/Footer";
import SEO from "@/shared/components/SEO";
import { useLanguage } from "@/shared/i18n/LanguageContext";
import { useScrollToHash } from "@/shared/hooks/useScrollToHash";

const Index = () => {
  useScrollToHash();
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t.meta.defaultTitle.split(" | ")[0]}
        description={t.meta.defaultDescription}
        type="website"
        canonicalUrl={`https://andelevate.com/${language}`}
      />
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <ProductGrid />
        <FeaturesBanner />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

