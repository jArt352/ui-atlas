"use client";

// Origen: Magic UI (https://magicui.design). Cada componente se instala con la CLI de shadcn
// desde una URL de registro, por ejemplo:
//   npx shadcn@latest add https://magicui.design/r/number-ticker.json
// El código queda en components/ui/ y es tuyo. Magic UI usa la librería "motion" para animar.

import { BarChart3, Brain, CalendarDays, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCircularProgressBar } from "@/components/ui/animated-circular-progress-bar";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { useChartTheme } from "@/components/atlas/use-chart-theme";

const KPIS = [
  { label: "Ingresos del mes", value: 42100, prefix: "$", decimals: 0 },
  { label: "Clientes activos", value: 1284, decimals: 0 },
  { label: "Tasa de conversión", value: 4.8, suffix: "%", decimals: 1 },
  { label: "Satisfacción", value: 96, suffix: "%", decimals: 0 },
];

export function MagicKpis() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {KPIS.map((k) => (
        <Card key={k.label} size="sm">
          <CardContent>
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="mt-1 flex items-baseline text-3xl font-semibold">
              {k.prefix}
              <NumberTicker value={k.value} decimalPlaces={k.decimals} className="tracking-tight text-foreground dark:text-foreground" />
              {k.suffix}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function MagicCircular() {
  const t = useChartTheme();
  const [value, setValue] = useState(64);
  return (
    <div className="flex flex-col items-center gap-4">
      <AnimatedCircularProgressBar value={value} gaugePrimaryColor={t.palette[0]} gaugeSecondaryColor={t.empty} />
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setValue((v) => Math.max(0, v - 15))}>
          −15
        </Button>
        <Button variant="outline" size="sm" onClick={() => setValue((v) => Math.min(100, v + 15))}>
          +15
        </Button>
      </div>
    </div>
  );
}

const ITEMS = [
  { name: "Gráficos", description: "Seis librerías, una al lado de otra, con el mismo dato.", Icon: BarChart3, className: "md:col-span-2", cta: "Ver gráficos", href: "/graficos" },
  { name: "Tablas", description: "De una tabla simple a una cuadrícula con miles de filas.", Icon: CalendarDays, className: "md:col-span-1", cta: "Ver tablas", href: "/tablas" },
  { name: "Evaluar", description: "Cómo decidir si una librería merece entrar a tu proyecto.", Icon: ShieldCheck, className: "md:col-span-1", cta: "Ver lista", href: "/fuentes" },
  { name: "Con IA", description: "Pide a un agente que traiga y adapte componentes.", Icon: Brain, className: "md:col-span-2", cta: "Ver método", href: "/fuentes" },
];

export function MagicBento() {
  return (
    <BentoGrid className="auto-rows-[11rem] grid-cols-1 md:grid-cols-3">
      {ITEMS.map((item) => (
        <BentoCard
          key={item.name}
          {...item}
          background={<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />}
        />
      ))}
    </BentoGrid>
  );
}

const TECH = ["Recharts", "Chart.js", "Nivo", "ApexCharts", "ECharts", "TanStack Table", "AG Grid", "Sonner", "cmdk", "Motion"];

export function MagicMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-2">
      <Marquee pauseOnHover className="[--duration:24s]">
        {TECH.map((n) => (
          <span key={n} className="mx-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm font-medium">
            {n}
          </span>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-card" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-card" />
    </div>
  );
}
