import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";

const OurStory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container-main text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Our Story
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Born from a passion for timeless elegance and modern simplicity.
            </p>
          </div>
        </section>

        {/* Story Content */}
        <section className="py-16 md:py-24">
          <div className="container-main">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl mb-6">
                  The Beginning
                </h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2026, Andelevate was born from a clear vision: to
                  design clothing that empowers every woman to feel confident,
                  elegant, and comfortable in her own skin.
                </p>
                <p className="text-muted-foreground">
                  What began as a thoughtfully curated line of wardrobe
                  essentials has since evolved into a complete lifestyle brand.
                  Yet, our commitment remains unchanged—delivering timeless
                  aesthetics, premium craftsmanship, and luxury that feels
                  within reach.
                </p>
              </div>
              <div className="bg-muted aspect-[4/3] rounded-lg"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
              <div className="bg-muted aspect-[4/3] rounded-lg order-2 md:order-1"></div>
              <div className="order-1 md:order-2">
                <h2 className="font-serif text-3xl md:text-4xl mb-6">
                  Our Philosophy
                </h2>
                <p className="text-muted-foreground mb-4">
                  We believe that fashion should be an extension of who you
                  are—not a costume. That's why every piece in our collection is
                  designed to be versatile, enduring, and effortlessly stylish.
                </p>
                <p className="text-muted-foreground">
                  From the boardroom to weekend brunch, our clothes transition
                  seamlessly through your life, becoming trusted companions in
                  your everyday adventures.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                What We Stand For
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our values guide everything we do, from design to delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-serif text-xl mb-2">Quality First</h3>
                <p className="text-muted-foreground text-sm">
                  Every stitch, every fabric, every detail is carefully
                  considered to ensure lasting quality you can feel.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="font-serif text-xl mb-2">Conscious Creation</h3>
                <p className="text-muted-foreground text-sm">
                  We're committed to sustainable practices and ethical
                  production at every step of our journey.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="font-serif text-xl mb-2">Customer Love</h3>
                <p className="text-muted-foreground text-sm">
                  You're at the heart of everything we do. Your satisfaction and
                  happiness is our ultimate measure of success.
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

export default OurStory;
