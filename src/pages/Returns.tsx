import { RotateCcw, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";

const Returns = () => {
  const returnSteps = [
    {
      step: 1,
      title: "Contact Us",
      description: "Email us at returns@andelevate.com with your order number",
    },
    {
      step: 2,
      title: "Get Approval",
      description: "We'll review your request and send a return label",
    },
    {
      step: 3,
      title: "Ship Item",
      description: "Pack the item securely and drop it off at the courier",
    },
    {
      step: 4,
      title: "Receive Refund",
      description: "Refund processed within 5-7 business days",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-main py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          Returns & Exchanges
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          We want you to love your purchase. If something isn't quite right,
          we're here to help make it right.
        </p>

        {/* Return Policy Highlights */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="h-6 w-6 text-secondary" />
            <h2 className="font-serif text-xl text-foreground">
              Our Return Policy
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-serif text-secondary mb-2">14</p>
              <p className="text-sm text-muted-foreground">Days to return</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif text-secondary mb-2">Free</p>
              <p className="text-sm text-muted-foreground">Return shipping</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif text-secondary mb-2">100%</p>
              <p className="text-sm text-muted-foreground">
                Money back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* How to Return */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-foreground mb-6">
            How to Return
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {returnSteps.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-card border border-border rounded-lg p-6 h-full">
                  <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-medium mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-medium text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {index < returnSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 h-5 w-5 text-muted-foreground/50 -translate-y-1/2 z-10" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Eligible & Non-Eligible */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-foreground">
                Eligible for Return
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Items in original condition with tags attached</li>
              <li>• Unworn, unwashed, and unaltered items</li>
              <li>• Items in original packaging</li>
              <li>• Items returned within 14 days of delivery</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="h-5 w-5 text-red-500" />
              <h3 className="font-medium text-foreground">
                Not Eligible for Return
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Final sale items</li>
              <li>• Intimates and swimwear (for hygiene reasons)</li>
              <li>• Items that have been altered or tailored</li>
              <li>• Items with missing tags or damaged packaging</li>
            </ul>
          </div>
        </div>

        {/* Exchanges */}
        <section className="bg-muted/50 rounded-lg p-8">
          <h2 className="font-serif text-2xl text-foreground mb-4">
            Exchanges
          </h2>
          <p className="text-muted-foreground mb-4">
            Need a different size or color? We're happy to exchange your item
            for another. Simply follow the return process and note that you'd
            like an exchange. We'll ship your new item as soon as we receive the
            original.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Exchanges are subject to availability. If
            your desired item is out of stock, we'll process a full refund
            instead.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
