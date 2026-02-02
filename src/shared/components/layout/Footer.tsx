import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/andelevate-logo.png";
import { useLanguage, useLocalizedPath } from "@/shared/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const localizedPath = useLocalizedPath();

  const footerLinks = {
    shop: [
      { name: t.footer.newArrivals, href: localizedPath("/shop") },
      { name: t.footer.bestSellers, href: localizedPath("/shop") },
      { name: t.footer.tops, href: localizedPath("/shop") },
      { name: t.footer.bottoms, href: localizedPath("/shop") },
      { name: t.footer.dresses, href: localizedPath("/shop") },
    ],
    help: [
      { name: t.footer.contactUs, href: localizedPath("/contact") },
      { name: t.footer.shippingInfo, href: localizedPath("/shipping") },
      { name: t.footer.returnsExchanges, href: localizedPath("/returns") },
      { name: t.footer.sizeGuide, href: localizedPath("/size-guide") },
      { name: t.footer.faqs, href: localizedPath("/faq") },
    ],
    about: [
      { name: t.footer.ourStory, href: localizedPath("/our-story") },
      { name: t.footer.sustainability, href: localizedPath("/sustainability") },
      { name: t.footer.careers, href: localizedPath("/careers") },
      { name: t.footer.press, href: localizedPath("/press") },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={logo}
              alt="Andelevate"
              className="h-6 mb-4 brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/70 font-sans mb-6 max-w-xs">
              {t.footer.brandDescription}
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans text-sm tracking-widest uppercase mb-4">
              {t.footer.shop}
            </h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-sans text-sm tracking-widest uppercase mb-4">
              {t.footer.help}
            </h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-sans text-sm tracking-widest uppercase mb-4">
              {t.footer.aboutUs}
            </h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50 font-sans">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/50 font-sans">
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              {t.footer.privacyPolicy}
            </a>
            <a
              href="#"
              className="hover:text-primary-foreground transition-colors"
            >
              {t.footer.termsOfService}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

