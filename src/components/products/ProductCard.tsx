import { Link } from "react-router-dom";
import { Star, ShoppingBag, Heart } from "lucide-react";

import { type Product } from "@/constants/mockData";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn(
        "product-card group block rounded-2xl bg-card p-3",
        className,
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
              New
            </span>
          )}
          {product.isSale && discount > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full shadow-md"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            variant="default"
            className="w-full shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3 px-1">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        <h3 className="mt-1.5 line-clamp-2 text-sm font-medium leading-tight group-hover:text-accent">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Options Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <div
                key={color.name}
                className="h-4 w-4 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
