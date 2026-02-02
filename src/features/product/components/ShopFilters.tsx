import { useState } from "react";
import { X, ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { priceRanges } from "@/features/product/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

interface Filters {
  categories: number[];
  priceRanges: number[];
}

export interface FilterOption {
  value: number;
  label: string;
}

interface ShopFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
  categoryOptions: FilterOption[];
}

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border pb-4 mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-medium text-foreground mb-3"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {isOpen && <div className="space-y-2">{children}</div>}
    </div>
  );
};

const FilterContent = ({
  filters,
  onFiltersChange,
  onClearFilters,
  categoryOptions,
}: ShopFiltersProps) => {
  const toggleFilter = (type: keyof Filters, value: number) => {
    const currentValues = filters[type];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFiltersChange({ ...filters, [type]: newValues });
  };

  const activeFiltersCount =
    filters.categories.length + filters.priceRanges.length;

  return (
    <div className="space-y-2">
      {activeFiltersCount > 0 && (
        <div className="pb-4 border-b border-border">
          <button
            onClick={onClearFilters}
            className="text-sm text-brand-secondary hover:text-brand-secondary/80 font-medium flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Clear all filters ({activeFiltersCount})
          </button>
        </div>
      )}

      {/* Category Filter */}
      <FilterSection title="Category">
        {categoryOptions.map((cat) => (
          <label
            key={cat.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Checkbox
              checked={filters.categories.includes(cat.value)}
              onCheckedChange={() => toggleFilter("categories", cat.value)}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {cat.label}
            </span>
          </label>
        ))}
      </FilterSection>

      {/* Price Filter */}
      <FilterSection title="Price">
        {priceRanges.map((range, index) => (
          <label
            key={index}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Checkbox
              checked={filters.priceRanges.includes(index)}
              onCheckedChange={() => toggleFilter("priceRanges", index)}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {range.label}
            </span>
          </label>
        ))}
      </FilterSection>
    </div>
  );
};

// Desktop Sidebar
export const DesktopFilters = (props: ShopFiltersProps) => {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <h2 className="font-serif text-lg text-foreground mb-6">Filters</h2>
      <FilterContent {...props} />
    </aside>
  );
};

// Mobile Filter Sheet
export const MobileFilters = (props: ShopFiltersProps) => {
  const activeFiltersCount =
    props.filters.categories.length + props.filters.priceRanges.length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-brand-secondary text-white text-xs px-1.5 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterContent {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default { DesktopFilters, MobileFilters };
