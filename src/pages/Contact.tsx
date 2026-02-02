import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { toast } from "@/shared/hooks/use-toast";
import SEO from "@/shared/components/SEO";
import { useLanguage } from "@/shared/i18n/LanguageContext";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, language } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: t.contact.sent,
        description: t.contact.sentDesc,
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t.contact.title}
        description={t.contact.metaDescription}
        canonicalUrl={`https://andelevate.com/${language}/contact`}
      />
      <Header />
      <main className="container-main py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          {t.contact.title}
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          {t.contact.subtitle}
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="font-serif text-xl text-foreground mb-6">
              {t.contact.sendMessage}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">{t.contact.name}</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="email">{t.contact.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    maxLength={255}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">{t.contact.subject}</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  maxLength={200}
                />
              </div>
              <div>
                <Label htmlFor="message">{t.contact.message}</Label>
                <Textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  maxLength={1000}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? t.contact.sending : t.contact.sendMessage}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="font-serif text-xl text-foreground mb-6">
              {t.contact.contactInfo}
            </h2>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {t.contact.emailUs}
                </h3>
                <p className="text-muted-foreground">support@andelevate.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {t.contact.callUs}
                </h3>
                <p className="text-muted-foreground">+62 21 1234 5678</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {t.contact.visitUs}
                </h3>
                <p className="text-muted-foreground">
                  Jl. Sudirman No. 123
                  <br />
                  Jakarta 10220, Indonesia
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {t.contact.businessHours}
                </h3>
                <p className="text-muted-foreground">
                  {t.contact.weekdays}
                  <br />
                  {t.contact.weekends}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

