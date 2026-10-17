"use client";

// Origen: Apache ECharts (https://echarts.apache.org) con el adaptador echarts-for-react.
// Instalado con: npm install echarts echarts-for-react
// Se configura con un objeto "option" (no con componentes). Se carga con ssr:false porque usa canvas.

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { useChartTheme } from "@/components/atlas/use-chart-theme";

const ReactECharts = dynamic(() => import("echarts-for-react"), {
  ssr: false,
  loading: () => <Skeleton className="h-60 w-full" />,
});

// Rueda de progreso (gauge con barra)
export function EchartsProgressGauge({ value = 72 }: { value?: number }) {
  const t = useChartTheme();
  return (
    <ReactECharts
      style={{ height: 240 }}
      option={{
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: { show: false },
            progress: { show: true, overlap: false, roundCap: true, clip: false, itemStyle: { color: t.palette[0] } },
            axisLine: { lineStyle: { width: 18, color: [[1, t.empty]] } },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            data: [{ value }],
            detail: { valueAnimation: true, formatter: "{value}%", fontSize: 34, fontWeight: 600, color: t.strong, offsetCenter: [0, 0] },
          },
        ],
      }}
    />
  );
}

// Velocímetro con zonas de color y aguja
export function EchartsSpeedometer({ value = 64 }: { value?: number }) {
  const t = useChartTheme();
  return (
    <ReactECharts
      style={{ height: 240 }}
      option={{
        series: [
          {
            type: "gauge",
            min: 0,
            max: 100,
            splitNumber: 5,
            radius: "92%",
            axisLine: { lineStyle: { width: 14, color: [[0.3, "#f43f5e"], [0.7, "#f59e0b"], [1, "#10b981"]] } },
            pointer: { icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z", length: "55%", width: 10, itemStyle: { color: t.strong } },
            axisTick: { distance: -14, length: 5, lineStyle: { color: t.surface, width: 1 } },
            splitLine: { distance: -14, length: 14, lineStyle: { color: t.surface, width: 3 } },
            axisLabel: { color: t.text, distance: 22, fontSize: 11 },
            detail: { valueAnimation: true, formatter: "{value} pts", color: t.strong, fontSize: 22, offsetCenter: [0, "70%"] },
            data: [{ value }],
          },
        ],
      }}
    />
  );
}
