"use client";

import { useState } from "react";
import { Check, ChevronDown, Copy, ExternalLink, Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cartCount, toggleItem, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { KIND_LABEL, LIBS, type LibId } from "@/lib/sources";

export type Ref = {
  /** Nombre exacto del ejemplo o de la página, tal como aparece en el sitio */
  label: string;
  /** Dirección exacta de esa página */
  url: string;
  /** Aclaración corta (por ejemplo, el nombre interno del ejemplo) */
  note?: string;
};

type Props = {
  title: string;
  description?: string;
  /** Clave de la librería en lib/sources.ts */
  lib: LibId;
  /** Dónde encontrar exactamente esta pieza en el sitio de origen */
  refs?: Ref[];
  /** Archivo de este proyecto donde está la implementación */
  file: string;
  /** Pasos para llevar esta pieza a tu proyecto */
  steps: string[];
  /** Comando de instalación propio de esta pieza (si difiere del de la librería) */
  install?: string;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
};

function CopyLine({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
      <code className="min-w-0 flex-1 overflow-x-auto font-mono text-xs whitespace-nowrap">{text}</code>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Copiar"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success("Comando copiado");
            setTimeout(() => setCopied(false), 1500);
          } catch {
            toast.error("No se pudo copiar");
          }
        }}
      >
        {copied ? <Check /> : <Copy />}
      </Button>
    </div>
  );
}

export function Showcase({ title, description, lib, refs, file, steps, install, className, bodyClassName, children }: Props) {
  const [open, setOpen] = useState(false);
  const meta = LIBS[lib];
  const cart = useCart();
  const inCart = cart.some((i) => i.key === file);

  function handleToggle() {
    const added = toggleItem({
      key: file,
      title,
      description,
      libName: meta.name,
      libUrl: meta.url,
      license: meta.license,
      kind: KIND_LABEL[meta.kind],
      install: install ?? meta.install,
      file,
      steps,
      refs: refs ?? [],
    });
    const n = cartCount();
    toast(added ? `Agregada a tu dashboard: ${title}` : `Quitada de tu dashboard: ${title}`, {
      description: `Llevas ${n} ${n === 1 ? "pieza" : "piezas"}.`,
    });
  }

  return (
    <Card className={cn("min-w-0", className)}>
      <CardHeader>
        <CardAction>
          <Button
            size="sm"
            variant={inCart ? "default" : "outline"}
            aria-pressed={inCart}
            aria-label={`${inCart ? "Quitar" : "Agregar"} ${title} ${inCart ? "de" : "a"} mi dashboard`}
            onClick={handleToggle}
          >
            {inCart ? <Check /> : <Plus />}
            {inCart ? "Elegida" : "Elegir"}
          </Button>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <a
            href={meta.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-5 items-center gap-1 rounded-4xl bg-primary/10 px-2 text-xs font-medium text-primary hover:bg-primary/20"
          >
            {meta.name}
            <ExternalLink className="size-3" />
          </a>
          <Badge variant="secondary">{KIND_LABEL[meta.kind]}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={cn("min-w-0", bodyClassName)}>{children}</div>

        <div className="border-t pt-3">
          <Button variant="ghost" size="sm" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            Cómo se implementa
            <ChevronDown className={cn("transition-transform", open && "rotate-180")} />
          </Button>

          {open && (
            <div className="mt-3 space-y-4 text-sm">
              <section>
                <h4 className="mb-1 font-medium">1. De dónde viene</h4>
                <p className="text-muted-foreground">{meta.summary}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Licencia: {meta.license} ·{" "}
                  <a href={meta.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    {meta.url.replace("https://", "")}
                  </a>
                </p>
                {refs && refs.length > 0 && (
                  <div className="mt-2 rounded-lg border bg-muted/40 p-3">
                    <p className="mb-1.5 text-xs font-medium">Dónde encontrarlo exactamente</p>
                    <ul className="space-y-1.5">
                      {refs.map((r) => (
                        <li key={r.url} className="text-xs">
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline"
                          >
                            {r.label}
                            <ExternalLink className="size-3" />
                          </a>
                          {r.note && <span className="text-muted-foreground"> · {r.note}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              <section className="space-y-1.5">
                <h4 className="font-medium">2. Cómo se trae al proyecto</h4>
                <CopyLine text={install ?? meta.install} />
              </section>

              <section>
                <h4 className="mb-1 font-medium">3. Pasos</h4>
                <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
                  {steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </section>

              <section className="space-y-1.5">
                <h4 className="font-medium">4. Dónde está en este proyecto</h4>
                <CopyLine text={file} />
              </section>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
