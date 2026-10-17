"use client";

import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { CHECKLIST } from "@/lib/sources";
import { cn } from "@/lib/utils";

// Lista de evaluación interactiva: marca lo que cumple una librería y mira el puntaje.
export function Evaluator() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const total = CHECKLIST.length;
  const score = CHECKLIST.filter((c) => checked[c.id]).length;
  const verdict =
    score >= 7 ? "Adelante: es una buena candidata." : score >= 5 ? "Revisa los puntos que faltan antes de decidir." : "Busca otra opción o prepárate para trabajo extra.";

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {CHECKLIST.map((c) => (
          <li key={c.id}>
            <label className={cn("flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50", checked[c.id] && "border-primary/40 bg-primary/5")}>
              <input
                type="checkbox"
                className="mt-1 size-4 accent-[var(--primary)]"
                checked={!!checked[c.id]}
                onChange={(e) => setChecked((s) => ({ ...s, [c.id]: e.target.checked }))}
              />
              <span>
                <span className="block text-sm font-medium">{c.label}</span>
                <span className="block text-xs text-muted-foreground">{c.why}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            Puntaje: {score} de {total}
          </span>
          <span className="text-muted-foreground">{verdict}</span>
        </div>
        <Progress value={(score / total) * 100} />
      </div>
    </div>
  );
}
