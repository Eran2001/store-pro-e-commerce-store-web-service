import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Package, label: "My Orders", href: "/account/orders", count: 3 },
  { icon: Heart, label: "Wishlist", href: "/account/wishlist", count: 5 },
  { icon: MapPin, label: "Addresses", href: "/account/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "/account/payment" },
  { icon: Settings, label: "Account Settings", href: "/account/settings" },
];

const recentOrders = [
  {
    id: "ORD-001",
    date: "Jan 15, 2024",
    total: 299.99,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-002",
    date: "Jan 10, 2024",
    total: 159.99,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-003",
    date: "Jan 5, 2024",
    total: 89.99,
    status: "Processing",
    items: 3,
  },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-success/10 text-success",
  Shipped: "bg-accent/10 text-accent",
  Processing: "bg-amber-500/10 text-amber-600",
};

export default function Account() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DefaultLayout>
      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="mb-6 rounded-xl bg-card p-6 shadow-sm">
              <div className="flex items-center gap-4">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <h2 className="font-semibold">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm transition-colors hover:bg-secondary"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                        {item.count}
                      </span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-destructive transition-colors hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Banner */}
            <div
              className="mb-8 rounded-2xl p-8 text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              <h1 className="text-2xl font-bold">
                Welcome back, {user?.name?.split(" ")[0]}!
              </h1>
              <p className="mt-2 text-primary-foreground/70">
                Manage your account, track orders, and discover new products.
              </p>
              <Button
                className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Package className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">
                      Total Orders
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <Heart className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-sm text-muted-foreground">
                      Wishlist Items
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-muted-foreground">
                      Saved Cards
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-xl border bg-card">
              <div className="flex items-center justify-between border-b p-6">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <Link
                  to="/account/orders"
                  className="text-sm text-accent hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">{order.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.date} · {order.items} items
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${order.total.toFixed(2)}
                      </div>
                      <span
                        className={cn(
                          "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                          statusColors[order.status],
                        )}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
