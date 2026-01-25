import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, LayoutList, X } from "lucide-react";

import { DefaultLayout } from "@/layouts/DefaultLayout";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { products, categories } from "@/constants/mockData";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "0-50", label: "Under $50" },
  { value: "50-100", label: "$50 - $100" },
  { value: "100-200", label: "$100 - $200" },
  { value: "200+", label: "Over $200" },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort") || "featured";
  const priceParam = searchParams.get("price") || "all";
  const searchQuery = searchParams.get("q") || "";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryParam) {
      result = result.filter((p) => p.categorySlug === categoryParam);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }

    if (priceParam !== "all") {
      const [min, max] = priceParam.split("-").map(Number);
      if (priceParam.includes("+")) {
        result = result.filter((p) => p.price >= min);
      } else {
        result = result.filter((p) => p.price >= min && p.price <= max);
      }
    }

    switch (sortParam) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      default:
        result.sort((a, b) =>
          a.featured === b.featured ? 0 : a.featured ? -1 : 1,
        );
    }

    return result;
  }, [categoryParam, sortParam, priceParam, searchQuery]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount = [
    categoryParam,
    priceParam !== "all" ? priceParam : null,
    searchQuery,
  ].filter(Boolean).length;

  const currentCategory = categories.find((c) => c.slug === categoryParam);

  return (
    <DefaultLayout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {currentCategory ? currentCategory.name : "All Products"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {currentCategory
              ? currentCategory.description
              : "Discover our complete collection of premium products"}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            <span className="text-sm text-muted-foreground">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Select
              value={sortParam}
              onValueChange={(value) => updateFilter("sort", value)}
            >
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="hidden items-center gap-1 sm:flex">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <aside
            className={cn(
              "hidden w-64 shrink-0 lg:block",
              showFilters &&
                "fixed inset-0 z-50 block bg-background p-6 lg:static lg:p-0",
            )}
          >
            {showFilters && (
              <div className="mb-4 flex items-center justify-between lg:hidden">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold">Search</h3>
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => updateFilter("q", e.target.value)}
                />
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => updateFilter("category", "")}
                    className={cn(
                      "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      !categoryParam
                        ? "bg-secondary font-medium"
                        : "hover:bg-secondary/50",
                    )}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => updateFilter("category", category.slug)}
                      className={cn(
                        "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        categoryParam === category.slug
                          ? "bg-secondary font-medium"
                          : "hover:bg-secondary/50",
                      )}
                    >
                      {category.name}
                      <span className="ml-2 text-muted-foreground">
                        ({category.productCount})
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.value}
                      onClick={() => updateFilter("price", range.value)}
                      className={cn(
                        "block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                        priceParam === range.value
                          ? "bg-secondary font-medium"
                          : "hover:bg-secondary/50",
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-secondary/50 py-16 text-center">
                <h3 className="mb-2 text-lg font-medium">No products found</h3>
                <p className="mb-6 text-sm text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1",
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
