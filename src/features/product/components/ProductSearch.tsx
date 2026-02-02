import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface ProductSearchProps {
  onSearch?: (query: string) => void;
  className?: string;
}

const ProductSearch = ({ onSearch, className = "" }: ProductSearchProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-10 bg-muted/50 border-border focus:bg-background"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                onSearch?.("");
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductSearch;
