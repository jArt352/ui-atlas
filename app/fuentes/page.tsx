import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/atlas/app-shell";
import { Evaluator } from "@/components/atlas/evaluator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DIRECTORY, KIND_LABEL, LIBS } from "@/lib/sources";

const METHOD = [
  { n: "1", title: "Buscar", text: "Describe lo que necesitas con una palabra de diseño (“radial chart”, “data table”, “bento grid”) y busca en los catálogos de abajo." },
  { n: "2", title: "Evaluar", text: "Revisa descargas, última publicación, licencia, peso y soporte de tu versión de React con la lista de la derecha." },
  { n: "3", title: "Traer", text: "Tres caminos: instalar un paquete (npm), usar la CLI de shadcn con un registro o copiar y pegar el código." },
  { n: "4", title: "Maquetar", text: "Ubícalo en una grilla responsive, conecta tus datos, adapta los colores al tema y prueba en móvil y en modo oscuro." },
];

export default function FuentesPage() {
  return (
    <>
      <PageHeader
        title="Dónde buscar"
        description="El método de esta clase: buscar, evaluar, traer y maquetar. Aquí están los sitios, la lista de evaluación y las librerías que usa este proyecto."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Método">
        {METHOD.map((m) => (
          <Card key={m.n} size="sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{m.n}</span>
                <CardTitle>{m.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{m.text}</CardContent>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {DIRECTORY.map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="divide-y">
                  {group.sites.map((s) => (
                    <li key={s.url} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[12rem_1fr]">
                      <a href={s.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline">
                        {s.name}
                        <ExternalLink className="size-3.5" />
                      </a>
                      <div className="text-sm">
                        <p className="text-muted-foreground">{s.what}</p>
                        <code className="mt-1 block overflow-x-auto rounded bg-muted px-2 py-1 font-mono text-xs whitespace-nowrap">{s.how}</code>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evalúa una librería</CardTitle>
              <CardDescription>Marca lo que cumple y mira el puntaje.</CardDescription>
            </CardHeader>
            <CardContent>
              <Evaluator />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lo que usa este proyecto</CardTitle>
              <CardDescription>Cada una con su licencia y su forma de instalación.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {Object.values(LIBS).map((l) => (
                  <li key={l.name} className="text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <a href={l.url} target="_blank" rel="noreferrer" className="font-medium text-primary underline-offset-2 hover:underline">
                        {l.name}
                      </a>
                      <Badge variant="secondary">{KIND_LABEL[l.kind]}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{l.license}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
