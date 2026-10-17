"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// AG Grid usa window, así que se carga solo en el navegador.
export const AgGridDemo = dynamic(() => import("@/components/demos/aggrid-inner"), {
  ssr: false,
  loading: () => <Skeleton className="h-[420px] w-full" />,
});
