"use client";

// Piezas de interfaz que suelen acompañar a un dashboard. Todas se instalan con la CLI de shadcn:
//   npx shadcn@latest add calendar sonner drawer command accordion

import { useState, useSyncExternalStore } from "react";
import { CalendarPlus, FileText, Settings, Users } from "lucide-react";
import { es } from "react-day-picker/locale";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date(2026, 9, 17));
  // react-day-picker lee la fecha de hoy al dibujarse; con Cache Components eso no se puede
  // hacer al pre-renderizar, así que se dibuja solo en el navegador.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  if (!mounted) return <Skeleton className="mx-auto h-72 w-72" />;
  return (
    <div className="flex justify-center">
      <Calendar
        mode="single"
        locale={es}
        selected={date}
        onSelect={(d) => {
          setDate(d);
          if (d) toast.info(`Fecha elegida: ${d.toLocaleDateString("es-PE", { dateStyle: "long" })}`);
        }}
        className="rounded-lg border"
      />
    </div>
  );
}

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success("Cambios guardados")}>
        Éxito
      </Button>
      <Button variant="outline" onClick={() => toast.error("No se pudo guardar", { description: "Revisa tu conexión e inténtalo de nuevo." })}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "Exportando reporte…",
            success: "Reporte listo",
            error: "Falló la exportación",
          })
        }
      >
        Promesa
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Reporte archivado", {
            action: { label: "Deshacer", onClick: () => toast.success("Reporte restaurado") },
          })
        }
      >
        Con acción
      </Button>
    </div>
  );
}

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Abrir detalle del pedido</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Pedido ORD-1001</DrawerTitle>
          <DrawerDescription>Resumen rápido sin salir del dashboard.</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-2 px-4 text-sm">
          <p>
            <span className="text-muted-foreground">Cliente:</span> Lucía Ramos
          </p>
          <p>
            <span className="text-muted-foreground">Producto:</span> Licencia Pro
          </p>
          <p>
            <span className="text-muted-foreground">Estado:</span> Pagado
          </p>
        </div>
        <DrawerFooter>
          <Button onClick={() => toast.success("Factura enviada")}>Enviar factura</Button>
          <DrawerClose render={<Button variant="outline" />}>Cerrar</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function CommandDemo() {
  return (
    <Command className="rounded-lg border">
      <CommandInput placeholder="Escribe un comando o busca…" />
      <CommandList>
        <CommandEmpty>Sin resultados.</CommandEmpty>
        <CommandGroup heading="Acciones">
          <CommandItem onSelect={() => toast.info("Nuevo evento")}>
            <CalendarPlus />
            Nuevo evento
          </CommandItem>
          <CommandItem onSelect={() => toast.info("Nuevo reporte")}>
            <FileText />
            Nuevo reporte
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Ir a">
          <CommandItem onSelect={() => toast.info("Equipo")}>
            <Users />
            Equipo
          </CommandItem>
          <CommandItem onSelect={() => toast.info("Ajustes")}>
            <Settings />
            Ajustes
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function AccordionDemo() {
  return (
    <Accordion defaultValue={["dos"]}>
      <AccordionItem value="uno">
        <AccordionTrigger>¿Paquete npm o copiar el código?</AccordionTrigger>
        <AccordionContent>
          Un paquete npm se actualiza con un comando pero no puedes tocar su interior. Copiar el código te da control total, pero el mantenimiento pasa a ser tuyo.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="dos">
        <AccordionTrigger>¿Cuántas librerías de gráficos conviene tener?</AccordionTrigger>
        <AccordionContent>
          Idealmente una. Cada una suma peso y estilos distintos. Aquí hay seis solo para comparar; en un producto real elige una según el tipo de gráfico que más necesites.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tres">
        <AccordionTrigger>¿Qué hago si un componente no se ve igual que en su web?</AccordionTrigger>
        <AccordionContent>
          Casi siempre falta importar su CSS, registrar un módulo o envolverlo en un proveedor. Lee la sección de instalación y compara con el código de este proyecto.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
