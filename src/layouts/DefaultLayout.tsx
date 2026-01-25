import { type ReactNode } from "react";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/partials/Header";
import { Footer } from "@/components/partials/Footer";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
