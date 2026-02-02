import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";
import { scrollToElement } from "@/shared/hooks/useScrollToHash";

import heroImage0 from "@/assets/hero-image-0.jpg";
import heroImage1 from "@/assets/hero-image-1.png";
import heroImage2 from "@/assets/hero-image-2.png";
import heroImage3 from "@/assets/hero-image-3.png";
import heroImage4 from "@/assets/hero-image-4.png";

const heroImages = [heroImage0, heroImage1, heroImage2, heroImage3, heroImage4];

const HeroSection = () => {
  const { t } = useLanguage();
  const localizedPath = useLocalizedPath();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleScrollToCollections = () => {
    scrollToElement("collections");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-neutral-100">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImageIndex}
            src={heroImages[currentImageIndex]}
            alt="Andelevate Collection"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container-main flex items-center">
        <div className="max-w-xl space-y-6 animate-fade-in-up z-10">
          <p className="text-secondary font-sans text-sm tracking-[0.3em] uppercase">
            {t.hero.tagline}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary-foreground leading-tight">
            {t.hero.title1}
            <br />
            <span className="text-secondary">{t.hero.title2}</span>
          </h1>
          <p className="text-primary-foreground/90 font-sans text-base md:text-lg max-w-md">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to={localizedPath("/shop")}
              className="btn-primary text-center"
            >
              {t.hero.shopNow}
            </Link>
            <button
              onClick={handleScrollToCollections}
              className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-center"
            >
              {t.hero.viewCollections}
            </button>
          </div>
        </div>

        {/* Branding Overlay Text */}
        <div className="absolute right-0 bottom-20 md:bottom-0 pointer-events-none opacity-20 select-none hidden md:block">
          <h2 className="text-[9rem] leading-none font-serif text-white mix-blend-overlay tracking-tighter">
            ANDELEVATE
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

