"use client";

// Origen: TanStack Table v9 (https://tanstack.com/table). Instalado con: npm install @tanstack/react-table
// Es "headless": la librería calcula orden, filtro y páginas; el HTML y los estilos son tuyos
// (aquí reutilizamos las piezas de tabla de shadcn).
// En v9 hay que registrar solo las funciones que usas con tableFeatures({...}).

import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_basic,
  sortFn_text,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { orders, usd, type Order } from "@/lib/data";
import { ESTADO_STYLE } from "@/components/demos/shadcn-table";

// Se definen fuera del componente para que sean estables entre renders.
const features = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  sortedRowModel: createSortedRowModel(),
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text, basic: sortFn_basic },
  filterFns: { includesString: filterFn_includesString },
});

const helper = createColumnHelper<typeof features, Order>();

const columns = helper.columns([
  helper.accessor("id", { header: "Pedido" }),
  helper.accessor("cliente", { header: "Cliente" }),
  helper.accessor("producto", { header: "Producto" }),
  helper.accessor("estado", {
    header: "Estado",
    cell: (info) => <Badge className={cn(ESTADO_STYLE[info.getValue()])}>{info.getValue()}</Badge>,
  }),
  helper.accessor("monto", {
    header: "Monto",
    cell: (info) => <span className="tabular-nums">{usd.format(info.getValue())}</span>,
  }),
]);

export function TanstackTable() {
  const [query, setQuery] = useState("");
  const table = useTable({
    features,
    columns,
    data: orders,
    initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
    globalFilterFn: "includesString",
  });

  const { pageIndex } = table.state.pagination;
  const pageCount = table.getPageCount();

  return (
    <div className="space-y-3">
      <div className="relative max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Buscar en todas las columnas"
          aria-label="Buscar en la tabla"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            table.setGlobalFilter(e.target.value);
          }}
        />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted();
                return (
                  <TableHead key={header.id}>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                      {sorted === "asc" ? <ArrowUp className="size-3.5" /> : sorted === "desc" ? <ArrowDown className="size-3.5" /> : <ArrowUpDown className="size-3.5 opacity-40" />}
                    </button>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
                Sin resultados para “{query}”
              </TableCell>
            </TableRow>
          )}
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Página {pageCount === 0 ? 0 : pageIndex + 1} de {pageCount}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft />
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Siguiente
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
