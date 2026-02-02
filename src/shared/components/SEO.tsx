import { useEffect } from "react";
import { useLanguage } from "@/shared/i18n/LanguageContext";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: "website" | "article" | "product";
  canonicalUrl?: string;
  noIndex?: boolean;
  // Product-specific props
  product?: {
    name: string;
    price: number;
    currency?: string;
    availability?: "InStock" | "OutOfStock" | "PreOrder";
    brand?: string;
    sku?: string;
    image?: string;
    description?: string;
  };
  // Article-specific props
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
  };
  // Breadcrumb items for structured data
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const SEO = ({
  title,
  description,
  keywords,
  image = "https://lovable.dev/opengraph-image-p98pqg.png",
  type = "website",
  canonicalUrl,
  noIndex = false,
  product,
  article,
  breadcrumbs,
}: SEOProps) => {
  const { t, language } = useLanguage();

  const siteTitle = t.meta.siteName;
  const fullTitle = title ? `${title} | ${siteTitle}` : t.meta.defaultTitle;
  const metaDescription = description || t.meta.defaultDescription;
  const metaKeywords = keywords || t.meta.keywords;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMetaTag = (
      name: string,
      content: string,
      isProperty = false,
    ) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", name);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update or create link tag
    const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`;
      let element = document.querySelector(selector) as HTMLLinkElement;

      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        if (hreflang) {
          element.setAttribute("hreflang", hreflang);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Update HTML lang attribute
    document.documentElement.lang = language;

    // Basic meta tags
    updateMetaTag("description", metaDescription);
    updateMetaTag("keywords", metaKeywords);

    // Robots
    if (noIndex) {
      updateMetaTag("robots", "noindex, nofollow");
    } else {
      updateMetaTag("robots", "index, follow");
    }

    // Open Graph tags
    updateMetaTag("og:title", fullTitle, true);
    updateMetaTag("og:description", metaDescription, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:site_name", siteTitle, true);
    updateMetaTag("og:locale", language === "id" ? "id_ID" : "en_US", true);

    if (canonicalUrl) {
      updateMetaTag("og:url", canonicalUrl, true);
      updateLinkTag("canonical", canonicalUrl);
    }

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", metaDescription);
    updateMetaTag("twitter:image", image);
    updateMetaTag("twitter:site", "@Andelevate");

    // Article specific meta tags
    if (article) {
      if (article.publishedTime) {
        updateMetaTag("article:published_time", article.publishedTime, true);
      }
      if (article.modifiedTime) {
        updateMetaTag("article:modified_time", article.modifiedTime, true);
      }
      if (article.author) {
        updateMetaTag("article:author", article.author, true);
      }
      if (article.section) {
        updateMetaTag("article:section", article.section, true);
      }
    }

    // Alternate language links
    const currentPath = window.location.pathname.replace(/^\/(en|id)/, "");
    const baseUrl = window.location.origin;
    updateLinkTag("alternate", `${baseUrl}/en${currentPath}`, "en");
    updateLinkTag("alternate", `${baseUrl}/id${currentPath}`, "id");
    updateLinkTag("alternate", `${baseUrl}/en${currentPath}`, "x-default");

    // JSON-LD Structured Data
    const removeExistingJsonLd = () => {
      const existingScripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      existingScripts.forEach((script) => script.remove());
    };

    const addJsonLd = (data: object) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    removeExistingJsonLd();

    // Organization schema (always include)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Andelevate",
      url: "https://andelevate.com",
      logo: `${baseUrl}/favicon.png`,
      sameAs: [
        "https://instagram.com/andelevate",
        "https://facebook.com/andelevate",
        "https://twitter.com/andelevate",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+62-21-1234567",
        contactType: "customer service",
        availableLanguage: ["English", "Indonesian"],
      },
    };
    addJsonLd(organizationSchema);

    // Website schema with search action
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteTitle,
      url: baseUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${baseUrl}/${language}/shop?search={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    };
    addJsonLd(websiteSchema);

    // Product schema
    if (product) {
      const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description || metaDescription,
        image: product.image || image,
        brand: {
          "@type": "Brand",
          name: product.brand || "Andelevate",
        },
        sku: product.sku,
        offers: {
          "@type": "Offer",
          url: canonicalUrl || window.location.href,
          priceCurrency: product.currency || "IDR",
          price: product.price,
          availability: `https://schema.org/${product.availability || "InStock"}`,
          seller: {
            "@type": "Organization",
            name: "Andelevate",
          },
        },
      };
      addJsonLd(productSchema);
    }

    // Breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
      addJsonLd(breadcrumbSchema);
    }

    // Cleanup function
    return () => {
      // Don't remove meta tags on cleanup as it causes flashing
    };
  }, [
    fullTitle,
    metaDescription,
    metaKeywords,
    image,
    type,
    canonicalUrl,
    noIndex,
    language,
    product,
    article,
    breadcrumbs,
    siteTitle,
    t,
  ]);

  return null; // This component doesn't render anything
};

export default SEO;

