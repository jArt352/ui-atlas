import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/atlas/app-shell";
import { ThemeProvider } from "@/components/atlas/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

// Fuente local (paquete "geist"): no depende de internet al compilar ni en clase.
export const metadata: Metadata = {
  title: "UI Atlas",
  description: "Dashboard de ejemplo con componentes de distintas librerías: de dónde vienen y cómo se implementan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" suppressHydrationWarning className={cn("font-sans", GeistSans.variable)}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <AppShell>{children}</AppShell>
          </TooltipProvider>
          <Toaster richColors closeButton position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
