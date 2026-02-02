import { Truck, RefreshCw, Shield, Sparkles } from "lucide-react";
import { useLanguage } from "@/shared/i18n/LanguageContext";

const FeaturesBanner = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Truck,
      title: t.features.freeShipping,
      description: t.features.freeShippingDesc,
    },
    {
      icon: RefreshCw,
      title: t.features.easyReturns,
      description: t.features.easyReturnsDesc,
    },
    {
      icon: Shield,
      title: t.features.securePayment,
      description: t.features.securePaymentDesc,
    },
    {
      icon: Sparkles,
      title: t.features.premiumQuality,
      description: t.features.premiumQualityDesc,
    },
  ];

  return (
    <section id="about" className="py-12 md:py-16 bg-primary">
      <div className="container-main">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <feature.icon className="h-8 w-8 mx-auto mb-4 text-secondary" />
              <h3 className="font-sans text-sm tracking-wide text-primary-foreground mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-primary-foreground/70 font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;

