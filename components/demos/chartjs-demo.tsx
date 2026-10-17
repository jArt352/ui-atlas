"use client";

// Origen: Chart.js (https://www.chartjs.org) con el adaptador react-chartjs-2.
// Instalado con: npm install chart.js react-chartjs-2
// Chart.js dibuja en <canvas> y exige registrar solo lo que usas (así pesa menos).

import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useChartTheme } from "@/components/atlas/use-chart-theme";
import { monthly } from "@/lib/data";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export function ChartJsLine() {
  const t = useChartTheme();
  return (
    <div className="h-64 w-full">
      <Line
        data={{
          labels: monthly.map((m) => m.month),
          datasets: [
            {
              label: "Visitas",
              data: monthly.map((m) => m.visitas),
              borderColor: t.palette[3],
              backgroundColor: "rgba(16,185,129,0.18)",
              fill: true,
              tension: 0.4,
              pointRadius: 3,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: t.text } },
            y: { grid: { color: t.grid }, ticks: { color: t.text }, border: { display: false } },
          },
        }}
      />
    </div>
  );
}

// Medio donut convertido en medidor: circumference 180 y rotation -90
export function ChartJsHalfGauge({ value = 68 }: { value?: number }) {
  const t = useChartTheme();
  return (
    <div className="relative mx-auto h-40 w-full max-w-xs">
      <Doughnut
        data={{
          labels: ["Logrado", "Falta"],
          datasets: [{ data: [value, 100 - value], backgroundColor: [t.palette[0], t.empty], borderWidth: 0 }],
        }}
        options={{
          maintainAspectRatio: false,
          rotation: -90,
          circumference: 180,
          cutout: "78%",
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center">
        <div className="text-3xl font-semibold tabular-nums">{value}%</div>
        <div className="text-xs text-muted-foreground">satisfacción</div>
      </div>
    </div>
  );
}
