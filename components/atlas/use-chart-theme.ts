"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { PALETTE } from "@/lib/data";

// Las librerías que no leen variables CSS (Chart.js, ECharts, Apex, Nivo, AG Grid)
// necesitan los colores como valores. Este hook se los da según el tema activo.
// Hasta que el navegador termina de hidratar devuelve el tema claro, para que el HTML
// del servidor y el del cliente coincidan; luego cambia al tema real.
const subscribe = () => () => {};

export function useChartTheme() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  return {
    dark,
    text: dark ? "#a1a1aa" : "#52525b",
    strong: dark ? "#fafafa" : "#18181b",
    grid: dark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
    surface: dark ? "#18181b" : "#ffffff",
    empty: dark ? "#27272a" : "#e4e4e7",
    palette: PALETTE,
  };
}
