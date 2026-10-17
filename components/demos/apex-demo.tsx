"use client";

// Origen: ApexCharts (https://apexcharts.com) con el adaptador react-apexcharts.
// Instalado con: npm install apexcharts react-apexcharts
// Usa window, así que se carga con next/dynamic y ssr:false.
// Ojo con la licencia: es gratis para organizaciones con menos de US$ 2 M de ingresos.

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartTheme } from "@/components/atlas/use-chart-theme";
import { candles, trafficHeatmap } from "@/lib/data";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

function useBase(): ApexOptions {
  const t = useChartTheme();
  return {
    chart: { toolbar: { show: false }, background: "transparent", foreColor: t.text, fontFamily: "inherit" },
    theme: { mode: t.dark ? "dark" : "light" },
    grid: { borderColor: t.grid },
    tooltip: { theme: t.dark ? "dark" : "light" },
  };
}

export function ApexCandles() {
  const base = useBase();
  const series = useMemo(() => [{ name: "Precio", data: candles() }], []);
  const options: ApexOptions = {
    ...base,
    xaxis: { type: "datetime" },
    yaxis: { tooltip: { enabled: true } },
    plotOptions: { candlestick: { colors: { upward: "#10b981", downward: "#f43f5e" } } },
  };
  return <Chart type="candlestick" series={series} options={options} height={290} />;
}

export function ApexHeatmap() {
  const base = useBase();
  const t = useChartTheme();
  const series = useMemo(() => trafficHeatmap(), []);
  const options: ApexOptions = {
    ...base,
    dataLabels: { enabled: false },
    colors: ["#6366f1"],
    plotOptions: { heatmap: { radius: 3, shadeIntensity: 0.6 } },
    stroke: { width: 2, colors: [t.surface] },
    legend: { show: false },
  };
  return <Chart type="heatmap" series={series} options={options} height={290} />;
}

export function ApexRadialBar() {
  const base = useBase();
  const t = useChartTheme();
  const options: ApexOptions = {
    ...base,
    labels: ["Ventas", "Soporte", "Calidad"],
    colors: [t.palette[0], t.palette[1], t.palette[3]],
    plotOptions: {
      radialBar: {
        hollow: { size: "36%" },
        track: { background: t.empty },
        dataLabels: {
          name: { fontSize: "13px" },
          value: { fontSize: "22px", formatter: (v) => `${v}%` },
          total: { show: true, label: "Promedio", formatter: () => "58%" },
        },
      },
    },
  };
  return <Chart type="radialBar" series={[76, 58, 41]} options={options} height={290} />;
}
