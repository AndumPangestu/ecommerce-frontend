import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, ChevronRight } from "lucide-react";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { Badge } from "@/shared/components/ui/badge";
import { useAuth } from "@/features/auth/context/AuthContext";
import { dummyTransactions } from "@/features/user/data/transactions";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const Transactions = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
            My Transactions
          </h1>

          {dummyTransactions.length === 0 ? (
            <div className="text-center py-20">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-serif text-2xl text-foreground mb-4">
                No transactions yet
              </h2>
              <p className="text-muted-foreground mb-8">
                Start shopping to see your orders here
              </p>
              <Link
                to="/shop"
                className="inline-block bg-primary text-primary-foreground px-8 py-3 font-sans text-sm tracking-widest uppercase hover:bg-accent transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {dummyTransactions.map((transaction) => (
                <Link
                  key={transaction.id}
                  to={`/transactions/${transaction.id}`}
                  className="block bg-card rounded-lg border border-border hover:border-primary/50 transition-colors overflow-hidden"
                >
                  <div className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <p className="font-medium text-foreground">{transaction.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge className={statusColors[transaction.status]}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {transaction.items.slice(0, 3).map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover border-2 border-background"
                          />
                        ))}
                        {transaction.items.length > 3 && (
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center border-2 border-background">
                            <span className="text-xs text-muted-foreground">
                              +{transaction.items.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">
                          {transaction.items.length} item{transaction.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          ${transaction.total.toFixed(2)}
                        </p>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Transactions;
