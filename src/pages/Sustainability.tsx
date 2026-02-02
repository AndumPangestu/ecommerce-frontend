import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Leaf, Recycle, Heart, Droplets } from "lucide-react";

const Sustainability = () => {
  const initiatives = [
    {
      icon: Leaf,
      title: "Eco-Friendly Materials",
      description:
        "We prioritize organic cotton, recycled fabrics, and sustainable materials in all our collections.",
    },
    {
      icon: Recycle,
      title: "Circular Fashion",
      description:
        "Our recycling program gives old garments new life, reducing waste and environmental impact.",
    },
    {
      icon: Heart,
      title: "Ethical Production",
      description:
        "Fair wages and safe working conditions for every person involved in creating our pieces.",
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      description:
        "Our dyeing processes use 50% less water than traditional methods.",
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
              Sustainability
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Fashion that respects our planet and the people who make it
              possible.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Our Commitment
              </h2>
              <p className="text-muted-foreground text-lg">
                At Andelevate, sustainability isn't just a buzzword—it's woven
                into every decision we make. From sourcing materials to
                packaging and shipping, we're constantly working to minimize our
                environmental footprint while maximizing positive impact.
              </p>
            </div>

            {/* Initiatives Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {initiatives.map((initiative, index) => (
                <div key={index} className="bg-muted/50 rounded-lg p-8">
                  <initiative.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-serif text-xl mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {initiative.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl text-center mb-8">
                Our Progress
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <p className="text-4xl md:text-5xl font-serif mb-2">80%</p>
                  <p className="text-sm text-primary-foreground/70">
                    Sustainable Materials
                  </p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-serif mb-2">100%</p>
                  <p className="text-sm text-primary-foreground/70">
                    Recyclable Packaging
                  </p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-serif mb-2">50%</p>
                  <p className="text-sm text-primary-foreground/70">
                    Less Water Usage
                  </p>
                </div>
                <div>
                  <p className="text-4xl md:text-5xl font-serif mb-2">0</p>
                  <p className="text-sm text-primary-foreground/70">
                    Carbon Neutral Goal
                  </p>
                </div>
              </div>
            </div>

            {/* Future Goals */}
            <div className="mt-16 text-center">
              <h2 className="font-serif text-3xl md:text-4xl mb-6">
                Looking Ahead
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                By 2030, we aim to achieve carbon neutrality across our entire
                supply chain and use 100% sustainable materials in all our
                products. Join us on this journey.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sustainability;
