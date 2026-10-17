"use client";

// Origen: react-circular-progressbar (https://github.com/kevinsqi/react-circular-progressbar).
// Instalado con: npm install react-circular-progressbar
// Una librería pequeña que hace una sola cosa. Hay que importar su CSS.

import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { useChartTheme } from "@/components/atlas/use-chart-theme";

const RINGS = [
  { label: "Tareas", value: 82, color: 0 },
  { label: "Calidad", value: 64, color: 3 },
  { label: "Plazos", value: 41, color: 4 },
];

export function ProgressRings() {
  const t = useChartTheme();
  return (
    <div className="grid grid-cols-3 gap-4">
      {RINGS.map((r) => (
        <div key={r.label} className="mx-auto w-full max-w-28 text-center">
          <CircularProgressbarWithChildren
            value={r.value}
            strokeWidth={9}
            styles={buildStyles({ pathColor: t.palette[r.color], trailColor: t.empty, strokeLinecap: "round" })}
          >
            <span className="text-xl font-semibold tabular-nums">{r.value}%</span>
          </CircularProgressbarWithChildren>
          <p className="mt-2 text-xs text-muted-foreground">{r.label}</p>
        </div>
      ))}
    </div>
  );
}
