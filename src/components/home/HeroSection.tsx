import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over $99",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% protected",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "30-day guarantee",
  },
];

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="container relative z-10 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="stagger-children text-center lg:text-left">
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-medium text-accent">
              New Collection 2024
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Discover Products That{" "}
              <span className="text-gradient">Define You</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/70 sm:text-xl">
              Shop the latest trends with confidence. Premium quality,
              unbeatable prices, and a seamless shopping experience await you.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button variant="outline" size="default" asChild>
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="default" asChild>
                <Link to="/products?featured=true">View Collection</Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-foreground">
                  50K+
                </div>
                <div className="text-sm text-primary-foreground/60">
                  Happy Customers
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-foreground">
                  10K+
                </div>
                <div className="text-sm text-primary-foreground/60">
                  Products
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-primary-foreground">
                  99%
                </div>
                <div className="text-sm text-primary-foreground/60">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-accent/20 to-transparent p-4">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                alt="Shopping"
                className="h-full w-full rounded-2xl object-cover shadow-2xl"
              />

              <div className="absolute -left-4 bottom-24 animate-pulse-soft rounded-2xl bg-card p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-success-foreground">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Secure Checkout</div>
                    <div className="text-xs text-muted-foreground">
                      256-bit SSL
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -right-4 top-24 animate-pulse-soft rounded-2xl bg-card p-4 shadow-xl"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Fast Delivery</div>
                    <div className="text-xs text-muted-foreground">
                      2-3 days
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 bg-primary-foreground/5">
        <div className="container py-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center justify-center gap-3 text-primary-foreground"
              >
                <feature.icon className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm font-medium">{feature.title}</div>
                  <div className="text-xs text-primary-foreground/60">
                    {feature.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 opacity-30">
        <div className="h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 opacity-20">
        <div className="h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>
    </section>
  );
}
