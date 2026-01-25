import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { getFeaturedProducts } from "@/constants/mockData";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="bg-secondary/30 py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <span className="text-sm font-medium text-accent">
              Trending Now
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Products
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="stagger-children grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
