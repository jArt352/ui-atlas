"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChartPie, ChartSpline, Compass, LayoutDashboard, Menu, Table2, Blocks, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/atlas/theme-toggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Panel completo", icon: LayoutDashboard },
  { href: "/graficos", label: "Gráficos", icon: ChartSpline },
  { href: "/ruedas", label: "Ruedas y medidores", icon: ChartPie },
  { href: "/tablas", label: "Tablas", icon: Table2 },
  { href: "/interfaz", label: "Interfaz y feedback", icon: Blocks },
  { href: "/fuentes", label: "Dónde buscar", icon: Compass },
];

function Brand() {
  return (
    <div className="flex h-14 items-center gap-2 px-5">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Layers className="size-4" />
      </div>
      <span className="text-lg font-semibold tracking-tight">UI Atlas</span>
    </div>
  );
}

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 px-3 py-2" aria-label="Principal">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
              active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r bg-sidebar md:flex">
        <Brand />
        <Nav />
        <p className="mt-auto border-t p-4 text-xs text-muted-foreground">
          Cada tarjeta indica de qué librería viene y cómo se implementa.
        </p>
      </aside>

      <div className="md:pl-60">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur md:px-8">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú" />}>
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Menú</SheetTitle>
                <SheetDescription>Navegación principal</SheetDescription>
              </SheetHeader>
              <Brand />
              <Nav onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-medium text-muted-foreground">Catálogo vivo de componentes</span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="max-w-3xl text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
