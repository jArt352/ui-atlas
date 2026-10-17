"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Check, Copy, Download, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MIN_ITEMS, clearCart, removeItem, useCart } from "@/lib/cart";
import { buildCommands, buildDocs, buildPrompt } from "@/lib/cart-export";
import { cn } from "@/lib/utils";

async function copy(text: string, what: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${what} copiado`);
  } catch {
    toast.error("No se pudo copiar. Selecciona el texto y cópialo a mano.");
  }
}

function download(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  toast.success(`${filename} descargado`);
}

function Output({
  text,
  what,
  hint,
  filename,
}: {
  text: string;
  what: string;
  hint: string;
  filename?: string;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{hint}</p>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => copy(text, what)}>
          <Copy />
          Copiar {what.toLowerCase()}
        </Button>
        {filename && (
          <Button size="sm" variant="outline" onClick={() => download(text, filename)}>
            <Download />
            Descargar {filename}
          </Button>
        )}
      </div>
      <pre className="max-h-[28rem] overflow-auto rounded-lg border bg-muted/40 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
        {text}
      </pre>
    </div>
  );
}

const NEXT_STEPS = [
  "Elige al menos 5 piezas en las páginas de gráficos, ruedas, tablas e interfaz.",
  "Crea un proyecto nuevo con los comandos de la pestaña “Comandos” (o deja que el agente lo haga).",
  "Pega el prompt en tu agente (Copilot, OpenCode, Antigravity u otro): con él crea el dashboard aparte, con tus piezas.",
  "Revisa el diff y corre npm run lint y npm run build antes de aceptar nada.",
  "Guarda la documentación como README del proyecto y súbelo a GitHub.",
];

export function CartView() {
  const items = useCart();
  const count = items.length;
  const ready = count >= MIN_ITEMS;

  const prompt = useMemo(() => buildPrompt(items), [items]);
  const docs = useMemo(() => buildDocs(items), [items]);
  const commands = useMemo(() => buildCommands(items), [items]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tu progreso</CardTitle>
          <CardDescription>Elige como mínimo {MIN_ITEMS} piezas para armar tu dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">
              {count} de {MIN_ITEMS} {count === 1 ? "pieza" : "piezas"}
            </span>
            <span className={cn("text-muted-foreground", ready && "font-medium text-emerald-600 dark:text-emerald-400")}>
              {ready ? "Listo: ya puedes generar tu prompt y tu documentación." : `Te faltan ${MIN_ITEMS - count}.`}
            </span>
          </div>
          <Progress value={Math.min(100, (count / MIN_ITEMS) * 100)} />
        </CardContent>
      </Card>

      {count === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-14 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingCart className="size-6" />
            </div>
            <div>
              <p className="font-medium">Aún no elegiste ninguna pieza</p>
              <p className="text-sm text-muted-foreground">En cada tarjeta pulsa “Elegir”. Aquí aparecerán tus piezas.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                ["/graficos", "Gráficos"],
                ["/ruedas", "Ruedas"],
                ["/tablas", "Tablas"],
                ["/interfaz", "Interfaz"],
              ].map(([href, label]) => (
                <Link key={href} href={href} className={buttonVariants({ variant: "outline", size: "sm" })}>
                  {label}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Piezas elegidas ({count})</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {items.map((it, i) => (
                  <li key={it.key} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{it.title}</p>
                      <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                        <Badge variant="secondary">{it.libName}</Badge>
                        <span>{it.kind}</span>
                        <code className="truncate">{it.file}</code>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon-sm" aria-label={`Quitar ${it.title}`} onClick={() => removeItem(it.key)}>
                      <Trash2 />
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => clearCart()}>
                  Vaciar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lo que te llevas</CardTitle>
              <CardDescription>
                El prompt es lo que pegas en tu agente, en un proyecto nuevo, para que cree el dashboard con estas piezas. La documentación es lo que entregas junto al dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!ready && (
                <p className="mb-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm">
                  Todavía tienes menos de {MIN_ITEMS} piezas. Puedes generar los textos, pero la entrega pide al menos {MIN_ITEMS}.
                </p>
              )}
              <Tabs defaultValue="prompt">
                <TabsList>
                  <TabsTrigger value="prompt">Prompt para el agente</TabsTrigger>
                  <TabsTrigger value="docs">Documentación (README)</TabsTrigger>
                  <TabsTrigger value="cmd">Comandos</TabsTrigger>
                </TabsList>
                <TabsContent value="prompt" className="pt-3">
                  <Output
                    text={prompt}
                    what="Prompt"
                    hint="Pégalo en tu agente dentro de un proyecto nuevo y vacío. Se basta solo: trae las tecnologías, cada componente con su librería, el ejemplo exacto y cómo se instala, el diseño y los criterios de aceptación. No necesitas tener UI Atlas abierto."
                  />
                </TabsContent>
                <TabsContent value="docs" className="pt-3">
                  <Output
                    text={docs}
                    what="Documentación"
                    filename="COMPONENTES.md"
                    hint="Una tabla de fuentes y el detalle de cada pieza: origen, licencia, instalación, enlace exacto y pasos. Guárdala como README o COMPONENTES.md en tu proyecto."
                  />
                </TabsContent>
                <TabsContent value="cmd" className="pt-3">
                  <Output
                    text={commands}
                    what="Comandos"
                    hint="Crea el proyecto y trae todas tus piezas. Los comandos repetidos se unieron en uno solo."
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Qué sigue</CardTitle>
          <CardDescription>El camino completo, de elegir a entregar.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2">
            {NEXT_STEPS.map((s, i) => (
              <li key={s} className="flex items-start gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {i + 1 === NEXT_STEPS.length && ready ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
