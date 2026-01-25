import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Lock, ChevronLeft, Check, Truck } from "lucide-react";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

type CheckoutStep = "shipping" | "payment" | "confirmation";

const shippingMethods = [
  { id: "standard", name: "Standard Shipping", price: 0, days: "5-7" },
  { id: "express", name: "Express Shipping", price: 9.99, days: "2-3" },
  { id: "overnight", name: "Overnight Shipping", price: 19.99, days: "1" },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, tax, total, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    expiry: "",
    cvc: "",
    cardName: "",
  });

  const selectedShipping = shippingMethods.find((m) => m.id === shippingMethod);
  const shippingCost = selectedShipping?.price || 0;
  const grandTotal = total + shippingCost;

  if (items.length === 0 && step !== "confirmation") {
    return (
      <DefaultLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Add some products before checking out.
          </p>
          <Button variant="accent" className="mt-6" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </DefaultLayout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    setIsProcessing(false);
    setStep("confirmation");
  };

  const steps = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "confirmation", label: "Confirmation" },
  ];

  return (
    <DefaultLayout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <h1 className="mt-4 text-3xl font-bold">Checkout</h1>
        </div>

        {/* Steps Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    step === s.id
                      ? "bg-accent text-accent-foreground"
                      : steps.indexOf(steps.find((x) => x.id === step)!) > index
                        ? "bg-success text-success-foreground"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {steps.indexOf(steps.find((x) => x.id === step)!) > index ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "hidden text-sm font-medium sm:block",
                    step === s.id ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
                {index < steps.length - 1 && (
                  <div className="h-px w-8 bg-border sm:w-16" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <h2 className="mb-6 text-lg font-semibold">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-6">
                  <h2 className="mb-6 text-lg font-semibold">
                    Shipping Address
                  </h2>
                  <div className="grid gap-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          required
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-6">
                  <h2 className="mb-6 text-lg font-semibold">
                    Shipping Method
                  </h2>
                  <div className="space-y-3">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors",
                          shippingMethod === method.id
                            ? "border-accent bg-accent/5"
                            : "hover:bg-secondary/50",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method.id}
                            checked={shippingMethod === method.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="h-4 w-4 accent-accent"
                          />
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {method.days} business days
                            </div>
                          </div>
                        </div>
                        <span className="font-medium">
                          {method.price === 0
                            ? "Free"
                            : `$${method.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  variant="accent"
                  size="lg"
                  type="submit"
                  className="w-full"
                >
                  Continue to Payment
                </Button>
              </form>
            )}

            {step === "payment" && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="rounded-xl border bg-card p-6">
                  <div className="mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <h2 className="text-lg font-semibold">Payment Details</h2>
                  </div>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        required
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        required
                        placeholder="4242 4242 4242 4242"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          required
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          required
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    Your payment information is secure and encrypted
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => setStep("shipping")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="accent"
                    size="lg"
                    type="submit"
                    className="flex-1"
                    disabled={isProcessing}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Pay $${grandTotal.toFixed(2)}`}
                  </Button>
                </div>
              </form>
            )}

            {step === "confirmation" && (
              <div className="rounded-xl border bg-card p-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                  <Check className="h-8 w-8 text-success" />
                </div>
                <h2 className="text-2xl font-bold">Order Confirmed!</h2>
                <p className="mt-2 text-muted-foreground">
                  Thank you for your purchase. Your order has been placed
                  successfully.
                </p>
                <p className="mt-4 text-sm">
                  Order confirmation has been sent to{" "}
                  <strong>{formData.email || "your email"}</strong>
                </p>

                <div className="mt-8 rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Truck className="h-4 w-4" />
                    <span>Estimated delivery: 5-7 business days</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button variant="accent" asChild>
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/">Go to Homepage</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {step !== "confirmation" && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-xl border bg-card p-6">
                <h2 className="mb-6 text-lg font-semibold">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t pt-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-base font-semibold">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
