import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    itemCount,
    subtotal,
    tax,
    total,
  } = useCart();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeCart}
      />

      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-xl transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-medium">Your cart is empty</h3>
              <p className="mb-6 text-sm text-muted-foreground">
                Looks like you haven't added any items yet.
              </p>
              <Button variant="outline" onClick={closeCart} asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="flex gap-4 rounded-xl bg-secondary/50 p-3"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium leading-tight">
                          {item.product.name}
                        </h4>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                          {item.selectedSize && (
                            <span>Size: {item.selectedSize}</span>
                          )}
                          {item.selectedColor && (
                            <span>Color: {item.selectedColor}</span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <span className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-base font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <Button variant="outline" size="lg" asChild onClick={closeCart}>
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" onClick={closeCart} asChild>
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
