"use client";

// Origen: AG Grid Community (https://www.ag-grid.com). Instalado con: npm install ag-grid-community ag-grid-react
// Trae su propia interfaz (columnas, filtros, paginación, redimensionar). Hay que registrar los módulos
// y darle un contenedor con altura. El tema se cambia con themeQuartz.withPart(...).

import { useMemo } from "react";
import { AllCommunityModule, ModuleRegistry, colorSchemeDark, colorSchemeLight, themeQuartz, type ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useChartTheme } from "@/components/atlas/use-chart-theme";
import { orders, usd, type Order } from "@/lib/data";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgGridInner() {
  const t = useChartTheme();

  const theme = useMemo(
    () =>
      themeQuartz
        .withPart(t.dark ? colorSchemeDark : colorSchemeLight)
        .withParams({ accentColor: "#6366f1", borderRadius: 10, wrapperBorderRadius: 10, fontFamily: "inherit" }),
    [t.dark]
  );

  const columnDefs = useMemo<ColDef<Order>[]>(
    () => [
      { field: "id", headerName: "Pedido", width: 120 },
      { field: "cliente", headerName: "Cliente", flex: 1, minWidth: 140 },
      { field: "producto", headerName: "Producto", flex: 1, minWidth: 160 },
      { field: "categoria", headerName: "Categoría", width: 130 },
      { field: "pais", headerName: "País", width: 120 },
      { field: "estado", headerName: "Estado", width: 140 },
      {
        field: "monto",
        headerName: "Monto",
        width: 130,
        type: "numericColumn",
        valueFormatter: (p) => usd.format(p.value),
      },
    ],
    []
  );

  return (
    <div className="h-[420px] w-full">
      <AgGridReact<Order>
        theme={theme}
        rowData={orders}
        columnDefs={columnDefs}
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
        pagination
        paginationPageSize={8}
        paginationPageSizeSelector={[8, 16, 40]}
      />
    </div>
  );
}
