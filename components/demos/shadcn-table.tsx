"use client";

// Origen: shadcn/ui (https://ui.shadcn.com/docs/components/table). Instalado con: npx shadcn@latest add table badge
// Es una tabla HTML con estilo, sin lógica. Sirve para listas cortas y resúmenes.

import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { orders, usd, type Order } from "@/lib/data";

export const ESTADO_STYLE: Record<Order["estado"], string> = {
  Pagado: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Pendiente: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Reembolsado: "bg-red-500/10 text-red-700 dark:text-red-300",
};

export function ShadcnTable({ rows = 6 }: { rows?: number }) {
  const data = orders.slice(0, rows);
  return (
    <Table>
      <TableCaption>Últimos {rows} pedidos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Pedido</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead className="hidden sm:table-cell">Producto</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Monto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((o) => (
          <TableRow key={o.id}>
            <TableCell className="font-medium">{o.id}</TableCell>
            <TableCell>{o.cliente}</TableCell>
            <TableCell className="hidden sm:table-cell">{o.producto}</TableCell>
            <TableCell>
              <Badge className={cn(ESTADO_STYLE[o.estado])}>{o.estado}</Badge>
            </TableCell>
            <TableCell className="text-right tabular-nums">{usd.format(o.monto)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
