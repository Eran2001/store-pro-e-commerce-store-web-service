import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ background: "var(--gradient-accent)" }}
        >
          <div className="relative z-10 grid gap-8 p-8 lg:grid-cols-2 lg:items-center lg:p-16">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-foreground/20 px-4 py-1.5 text-sm font-medium text-accent-foreground">
                <Sparkles className="h-4 w-4" />
                Limited Time Offer
              </div>
              <h2 className="mt-6 text-3xl font-bold text-accent-foreground sm:text-4xl lg:text-5xl">
                Save Up to 40% Off
              </h2>
              <p className="mt-4 text-lg text-accent-foreground/80">
                Don't miss out on our biggest sale of the season. Shop premium
                products at unbeatable prices.
              </p>
              <Button
                size="lg"
                className="mt-8 bg-accent-foreground text-accent hover:bg-accent-foreground/90"
                asChild
              >
                <Link to="/products?sale=true">
                  Shop the Sale
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
                    alt="Headphones"
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"
                    alt="Watch"
                    className="h-32 w-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80"
                    alt="Shoes"
                    className="h-32 w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80"
                    alt="Backpack"
                    className="h-48 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 opacity-10">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1" cy="1" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
