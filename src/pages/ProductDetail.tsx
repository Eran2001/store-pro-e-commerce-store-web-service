import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  Minus,
  Plus,
  Check,
} from "lucide-react";

import { DefaultLayout } from "@/layouts/DefaultLayout";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

import { getProductById, products } from "@/constants/mockData";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

const features = [
  { icon: Truck, text: "Free shipping on orders over $99" },
  { icon: Shield, text: "2-year warranty included" },
  { icon: RefreshCw, text: "30-day money-back guarantee" },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const product = getProductById(id || "");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]?.name,
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0],
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <DefaultLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-2 text-muted-foreground">
            The product you're looking for doesn't exist.
          </p>
          <Button variant="default" className="mt-6" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </DefaultLayout>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
  };

  const relatedProducts = products
    .filter(
      (p) => p.categorySlug === product.categorySlug && p.id !== product.id,
    )
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <DefaultLayout>
      <div className="container py-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-foreground">
            Products
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${product.categorySlug}`}
            className="hover:text-foreground"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <Button
          variant="ghost"
          size="sm"
          className="mb-4 lg:hidden"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {product.isSale && discount > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-accent-foreground">
                  -{discount}%
                </span>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative h-20 w-20 shrink-0 overflow-hidden rounded-xl",
                      selectedImage === index
                        ? "ring-2 ring-accent ring-offset-2"
                        : "opacity-60 hover:opacity-100",
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <Link
              to={`/products?category=${product.categorySlug}`}
              className="text-sm font-medium text-accent hover:underline"
            >
              {product.category}
            </Link>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-sm font-medium text-accent">
                  Save {discount}%
                </span>
              )}
            </div>

            <p className="mt-6 text-muted-foreground">{product.description}</p>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Color</span>
                  <span className="text-sm text-muted-foreground">
                    {selectedColor}
                  </span>
                </div>
                <div className="mt-3 flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        "relative h-10 w-10 rounded-full border-2 transition-all",
                        selectedColor === color.name
                          ? "border-foreground"
                          : "border-transparent hover:scale-110",
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.name && (
                        <Check
                          className={cn(
                            "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2",
                            color.hex === "#FFFFFF" || color.hex === "#f5f5f5"
                              ? "text-foreground"
                              : "text-white",
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Size</span>
                  <button className="text-sm text-accent hover:underline">
                    Size Guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-all",
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground",
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <div className="flex items-center gap-3 rounded-lg border p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="default"
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>

              <Button variant="outline" size="lg" className="sm:px-4">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-4">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1.5 text-sm text-success">
                  <Check className="h-4 w-4" />
                  In Stock - Ready to Ship
                </span>
              ) : (
                <span className="text-sm text-destructive">Out of Stock</span>
              )}
            </div>

            <div className="mt-8 space-y-3 rounded-xl bg-secondary/50 p-4">
              {features.map((feature) => (
                <div
                  key={feature.text}
                  className="flex items-center gap-3 text-sm"
                >
                  <feature.icon className="h-5 w-5 text-muted-foreground" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </DefaultLayout>
  );
}
