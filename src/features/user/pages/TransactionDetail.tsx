import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Package, MapPin, CreditCard, Truck } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { useAuth } from "@/features/auth/context/AuthContext";
import { dummyTransactions } from "@/features/user/data/transactions";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const TransactionDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const transaction = dummyTransactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl text-foreground mb-4">
              Transaction Not Found
            </h1>
            <Link to="/transactions" className="text-primary hover:underline">
              Back to Transactions
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/transactions"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Transactions
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-foreground">
                {transaction.id}
              </h1>
              <p className="text-muted-foreground">
                {new Date(transaction.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Badge className={`${statusColors[transaction.status]} text-sm px-4 py-1`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items
                </h2>
                <div className="space-y-4">
                  {transaction.items.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.size} • Color: {item.color}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </h2>
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground">{transaction.shippingAddress.name}</p>
                  <p>{transaction.shippingAddress.address}</p>
                  <p>
                    {transaction.shippingAddress.city}, {transaction.shippingAddress.province} {transaction.shippingAddress.zipCode}
                  </p>
                  <p>{transaction.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Tracking */}
              {transaction.trackingNumber && (
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Tracking Information
                  </h2>
                  <p className="text-muted-foreground">
                    Tracking Number:{" "}
                    <span className="font-medium text-foreground">{transaction.trackingNumber}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 sticky top-32">
                <h2 className="font-serif text-xl text-foreground mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${transaction.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{transaction.shipping === 0 ? "Free" : `$${transaction.shipping.toFixed(2)}`}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-foreground text-lg">
                    <span>Total</span>
                    <span>${transaction.total.toFixed(2)}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <p className="text-sm text-muted-foreground">
                  Payment Method: <span className="text-foreground">{transaction.paymentMethod}</span>
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

export default TransactionDetail;
