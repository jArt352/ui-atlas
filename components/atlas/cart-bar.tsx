"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MIN_ITEMS, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

// Barra flotante: recuerda cuántas piezas llevas y lleva a "Mi dashboard".
export function CartBar() {
  const items = useCart();
  const pathname = usePathname();
  const count = items.length;

  if (count === 0 || pathname === "/carrito") return null;

  const ready = count >= MIN_ITEMS;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 md:pl-60">
      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border bg-card px-4 py-2.5 shadow-lg">
        <ShoppingCart className="size-4 text-primary" />
        <div className="text-sm">
          <span className="font-medium">
            {count} {count === 1 ? "pieza" : "piezas"}
          </span>
          <span className={cn("ml-2 text-xs text-muted-foreground", ready && "text-emerald-600 dark:text-emerald-400")}>
            {ready ? "lista para armar" : `faltan ${MIN_ITEMS - count}`}
          </span>
        </div>
        <Link href="/carrito" className={buttonVariants({ size: "sm" })}>
          Ver mi dashboard
        </Link>
      </div>
    </div>
  );
}
