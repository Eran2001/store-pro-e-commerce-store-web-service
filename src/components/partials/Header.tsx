import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, User, Menu, X, Sun, Moon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { label: "Shop All", href: "/products" },
  { label: "Electronics", href: "/products?category=electronics" },
  { label: "Fashion", href: "/products?category=fashion" },
  { label: "Home", href: "/products?category=home-living" },
  { label: "Sports", href: "/products?category=sports" },
];

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleCart, itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">
                S
              </span>
            </div>
            <span className="hidden text-xl font-bold tracking-tight sm:inline-block">
              StorePro
            </span>
          </Link>

          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="link-underline px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden sm:block">
              <div
                className={cn(
                  "flex items-center overflow-hidden transition-all duration-300",
                  isSearchOpen ? "w-64" : "w-10",
                )}
              >
                {isSearchOpen && (
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="border-none bg-secondary pr-10"
                    autoFocus
                  />
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("shrink-0", isSearchOpen && "absolute right-0")}
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="sm:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Link to={isAuthenticated ? "/account" : "/login"}>
              <Button variant="ghost" size="icon">
                {isAuthenticated && user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isMobileMenuOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="container flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
