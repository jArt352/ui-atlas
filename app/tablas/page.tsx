import { PageHeader } from "@/components/atlas/app-shell";
import { Showcase } from "@/components/atlas/showcase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AgGridDemo } from "@/components/demos/aggrid-demo";
import { ShadcnTable } from "@/components/demos/shadcn-table";
import { TanstackTable } from "@/components/demos/tanstack-table";
import { REFS } from "@/lib/refs";

export default function TablasPage() {
  return (
    <>
      <PageHeader
        title="Tablas"
        description="Tres niveles de complejidad con los mismos datos: una tabla estática, una tabla headless con lógica y una cuadrícula completa."
      />

      <Showcase
        title="1 · Tabla estática (shadcn/ui)"
        description="Solo HTML con estilo. Ideal para listas cortas y resúmenes."
        lib="shadcn"
        refs={REFS.shadcnTable}
        install="npx shadcn@latest add table badge"
        file="components/demos/shadcn-table.tsx"
        steps={[
          "Abre la página Table en ui.shadcn.com/docs/components/table.",
          "Instala table con la CLI de shadcn.",
          "Usa Table, TableHeader, TableBody, TableRow, TableHead y TableCell.",
          "Combina con Badge para estados.",
          "Si necesitas ordenar o filtrar, pasa al nivel 2.",
        ]}
      >
        <ShadcnTable />
      </Showcase>

      <Showcase
        title="2 · Tabla con lógica (TanStack Table)"
        description="Haz clic en los encabezados para ordenar, escribe para filtrar y navega por páginas."
        lib="tanstack"
        refs={REFS.tanstackTable}
        file="components/demos/tanstack-table.tsx"
        steps={[
          "Instala @tanstack/react-table (versión 9) y lee el Quick Start de React.",
          "Registra las funciones con tableFeatures: rowSortingFeature, globalFilteringFeature, rowPaginationFeature y sus row models (guías Sorting, Global Filtering y Pagination).",
          "Define columnas con createColumnHelper y arma la tabla con useTable.",
          "Dibuja el HTML con las piezas de shadcn: la librería no trae estilos.",
          "Si usas un agente, TanStack incluye guías para agentes dentro del paquete (carpeta skills).",
        ]}
      >
        <TanstackTable />
      </Showcase>

      <Showcase
        title="3 · Cuadrícula completa (AG Grid)"
        description="Orden, filtros por columna, paginación y redimensionado ya incluidos."
        lib="aggrid"
        refs={REFS.aggrid}
        file="components/demos/aggrid-inner.tsx y aggrid-demo.tsx"
        steps={[
          "Instala ag-grid-community y ag-grid-react.",
          "Registra los módulos (página AG Grid Modules). Este proyecto usa ModuleRegistry.registerModules([AllCommunityModule]); la página actual muestra también AgGridProvider.",
          "Dale a la cuadrícula un contenedor con altura y pásale rowData y columnDefs.",
          "Activa pagination y paginationPageSize (página Row Pagination).",
          "Para el modo oscuro usa themeQuartz.withPart(colorSchemeDark) (página Theming: Colours & Dark Mode).",
          "Cárgala con next/dynamic y ssr: false.",
        ]}
      >
        <AgGridDemo />
      </Showcase>

      <Card>
        <CardHeader>
          <CardTitle>Cómo elegir</CardTitle>
          <CardDescription>Empieza por el nivel más simple que resuelva el problema.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Menos de 15 filas y sin interacción: tabla estática.</li>
            <li>Necesitas orden, búsqueda o páginas con tu propio diseño: TanStack Table.</li>
            <li>Necesitas edición, miles de filas o filtros avanzados rápido: AG Grid (revisa qué funciones son Enterprise).</li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
