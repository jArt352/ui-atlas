"use client";

// Origen: shadcn/ui (https://ui.shadcn.com/charts). Instalado con: npx shadcn@latest add chart
// Por debajo es Recharts; shadcn solo agrega ChartContainer, ChartTooltip y ChartConfig
// para que los colores salgan de variables CSS (--chart-1 ... --chart-5).

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, Pie, PieChart, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { channels, monthly } from "@/lib/data";

const areaConfig = {
  ingresos: { label: "Ingresos", color: "var(--chart-1)" },
  gastos: { label: "Gastos", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function ShadcnArea() {
  return (
    <ChartContainer config={areaConfig} className="aspect-auto h-64 w-full">
      <AreaChart data={monthly} margin={{ left: 4, right: 12, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="gastos" type="natural" fill="var(--color-gastos)" fillOpacity={0.25} stroke="var(--color-gastos)" stackId="a" />
        <Area dataKey="ingresos" type="natural" fill="var(--color-ingresos)" fillOpacity={0.3} stroke="var(--color-ingresos)" stackId="a" />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}

const barConfig = {
  visitas: { label: "Visitas", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ShadcnBar() {
  return (
    <ChartContainer config={barConfig} className="aspect-auto h-64 w-full">
      <BarChart data={monthly} margin={{ left: 4, right: 12, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={{ fillOpacity: 0.1 }} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="visitas" fill="var(--color-visitas)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

const donutConfig = {
  value: { label: "Visitas" },
  organico: { label: "Orgánico", color: "var(--chart-1)" },
  directo: { label: "Directo", color: "var(--chart-2)" },
  social: { label: "Redes sociales", color: "var(--chart-3)" },
  correo: { label: "Correo", color: "var(--chart-4)" },
  pago: { label: "Anuncios", color: "var(--chart-5)" },
} satisfies ChartConfig;

const donutData = channels.map((c) => ({ ...c, fill: `var(--color-${c.key})` }));
const donutTotal = channels.reduce((sum, c) => sum + c.value, 0);

export function ShadcnDonut() {
  return (
    <ChartContainer config={donutConfig} className="mx-auto aspect-auto size-64 max-w-full">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={donutData} dataKey="value" nameKey="key" innerRadius={62} strokeWidth={4}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                      {donutTotal.toLocaleString("en-US")}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 24} className="fill-muted-foreground text-xs">
                      visitas
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

const radialConfig = {
  meta: { label: "Meta", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ShadcnRadial({ value = 72 }: { value?: number }) {
  const data = [{ name: "meta", value, fill: "var(--color-meta)" }];
  return (
    <ChartContainer config={radialConfig} className="mx-auto aspect-auto size-64 max-w-full">
      <RadialBarChart data={data} startAngle={90} endAngle={90 - (value / 100) * 360} innerRadius={80} outerRadius={110}>
        <PolarGrid gridType="circle" radialLines={false} stroke="none" className="first:fill-muted last:fill-background" polarRadius={[86, 74]} />
        <RadialBar dataKey="value" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                      {value}%
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 26} className="fill-muted-foreground text-xs">
                      de la meta
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
