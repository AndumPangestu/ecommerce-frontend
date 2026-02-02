import { Truck, Package, Globe, Clock } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";

const Shipping = () => {
  const shippingMethods = [
    {
      name: "Standard Shipping",
      time: "3-5 business days",
      price: "Free on orders over IDR 500,000",
      description: "Reliable delivery for non-urgent orders",
    },
    {
      name: "Express Shipping",
      time: "1-2 business days",
      price: "IDR 50,000",
      description: "Fast delivery for urgent orders",
    },
    {
      name: "Same Day Delivery",
      time: "Same day (order before 12 PM)",
      price: "IDR 100,000",
      description: "Available in Jakarta area only",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-main py-12 md:py-16">
        <h1 className="font-serif text-3xl md:text-4xl text-foreground text-center mb-4">
          Shipping Information
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          We're committed to delivering your orders safely and promptly. Here's everything you need to know about our shipping policies.
        </p>

        {/* Shipping Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <Truck className="h-8 w-8 mx-auto mb-3 text-secondary" />
            <h3 className="font-medium text-foreground mb-1">Free Shipping</h3>
            <p className="text-sm text-muted-foreground">On orders over IDR 500K</p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <Package className="h-8 w-8 mx-auto mb-3 text-secondary" />
            <h3 className="font-medium text-foreground mb-1">Secure Packaging</h3>
            <p className="text-sm text-muted-foreground">Carefully wrapped items</p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <Globe className="h-8 w-8 mx-auto mb-3 text-secondary" />
            <h3 className="font-medium text-foreground mb-1">Nationwide Delivery</h3>
            <p className="text-sm text-muted-foreground">We ship across Indonesia</p>
          </div>
          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <Clock className="h-8 w-8 mx-auto mb-3 text-secondary" />
            <h3 className="font-medium text-foreground mb-1">Order Tracking</h3>
            <p className="text-sm text-muted-foreground">Real-time updates</p>
          </div>
        </div>

        {/* Shipping Methods */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-foreground mb-6">Shipping Methods</h2>
          <div className="space-y-4">
            {shippingMethods.map((method) => (
              <div key={method.name} className="bg-card border border-border rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-foreground">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="font-medium text-foreground">{method.time}</p>
                    <p className="text-sm text-secondary">{method.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Info */}
        <section className="prose prose-sm max-w-none">
          <h2 className="font-serif text-2xl text-foreground mb-6">Additional Information</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-3">Processing Time</h3>
              <p className="text-muted-foreground text-sm">
                Orders are processed within 1-2 business days. You'll receive a confirmation email once your order has been shipped with tracking information.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-medium text-foreground mb-3">Delivery Areas</h3>
              <p className="text-muted-foreground text-sm">
                We currently ship to all regions in Indonesia. Remote areas may require additional delivery time. International shipping coming soon.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shipping;