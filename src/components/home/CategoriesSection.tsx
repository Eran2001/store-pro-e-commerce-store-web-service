import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { categories } from "@/constants/mockData";

export function CategoriesSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="mb-3 text-sm font-medium text-accent">
            Browse Categories
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Find exactly what you're looking for with our curated categories
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-4/5 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="mt-1 text-sm text-primary-foreground/70">
                  {category.productCount} Products
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Explore</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
