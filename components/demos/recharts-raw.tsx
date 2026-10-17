"use client";

// Origen: Recharts usado directamente (https://recharts.org/en-US/examples). Instalado con: npm install recharts
// Aquí no pasa por shadcn: tú controlas cada eje, leyenda y tooltip.

import { Bar, CartesianGrid, ComposedChart, Legend, Line, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useChartTheme } from "@/components/atlas/use-chart-theme";
import { monthly, skills } from "@/lib/data";

export function RechartsRadar() {
  const t = useChartTheme();
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={skills} outerRadius="75%">
          <PolarGrid stroke={t.grid} />
          <PolarAngleAxis dataKey="area" tick={{ fill: t.text, fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Equipo" dataKey="equipo" stroke={t.palette[0]} fill={t.palette[0]} fillOpacity={0.35} />
          <Radar name="Meta" dataKey="meta" stroke={t.palette[2]} fill={t.palette[2]} fillOpacity={0.15} />
          <Legend wrapperStyle={{ color: t.text, fontSize: 12 }} />
          <Tooltip contentStyle={{ background: t.surface, border: `1px solid ${t.grid}`, borderRadius: 8, color: t.strong }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RechartsComposed() {
  const t = useChartTheme();
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={monthly} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
          <CartesianGrid stroke={t.grid} vertical={false} />
          <XAxis dataKey="month" tick={{ fill: t.text, fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: t.text, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
          <Tooltip contentStyle={{ background: t.surface, border: `1px solid ${t.grid}`, borderRadius: 8, color: t.strong }} />
          <Legend wrapperStyle={{ color: t.text, fontSize: 12 }} />
          <Bar dataKey="gastos" name="Gastos" fill={t.palette[1]} radius={[4, 4, 0, 0]} />
          <Line type="monotone" dataKey="ingresos" name="Ingresos" stroke={t.palette[0]} strokeWidth={2.5} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
