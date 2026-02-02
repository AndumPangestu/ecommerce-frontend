import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Button } from "@/shared/components/ui/button";
import { Mail, Download } from "lucide-react";

const Press = () => {
  const pressFeatures = [
    {
      publication: "Vogue",
      title: "Andelevate: The New Standard in Sustainable Luxury",
      date: "December 2024",
    },
    {
      publication: "Elle",
      title: "10 Emerging Brands Redefining Modern Fashion",
      date: "November 2024",
    },
    {
      publication: "Harper's Bazaar",
      title: "How Andelevate is Making Sustainability Stylish",
      date: "October 2024",
    },
    {
      publication: "WWD",
      title: "Andelevate Launches Innovative Recycling Program",
      date: "September 2024",
    },
    {
      publication: "Forbes",
      title: "Fashion Forward: The Business of Conscious Style",
      date: "August 2024",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container-main text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Press
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Media resources, press releases, and featured coverage of
              Andelevate.
            </p>
          </div>
        </section>

        {/* Press Contact */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-muted/50 rounded-lg p-8">
                <h2 className="font-serif text-2xl mb-4">Press Inquiries</h2>
                <p className="text-muted-foreground mb-6">
                  For press inquiries, interview requests, or media
                  partnerships, please reach out to our communications team.
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Mail className="h-5 w-5" />
                  <a
                    href="mailto:press@andelevate.com"
                    className="hover:underline"
                  >
                    press@andelevate.com
                  </a>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-8">
                <h2 className="font-serif text-2xl mb-4">Media Kit</h2>
                <p className="text-muted-foreground mb-6">
                  Download our media kit for brand assets, logos, product
                  images, and company information.
                </p>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Media Kit
                </Button>
              </div>
            </div>

            {/* Press Features */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-center mb-8">
                Featured In
              </h2>
              <div className="space-y-4">
                {pressFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {feature.publication}
                      </p>
                      <h3 className="font-serif text-lg md:text-xl">
                        {feature.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {feature.date}
                      </span>
                      <Button variant="outline" size="sm">
                        Read Article
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Story */}
            <div className="mt-16 bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="font-serif text-2xl md:text-3xl mb-4">
                  About Andelevate
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  Founded in 2020, Andelevate is a contemporary fashion brand
                  dedicated to creating timeless, sustainable pieces that
                  empower women to look and feel their best. With a commitment
                  to ethical production and eco-conscious materials, Andelevate
                  is redefining what it means to dress beautifully and
                  responsibly.
                </p>
                <p className="text-sm text-primary-foreground/60">
                  For the full brand story, please refer to our media kit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Press;
