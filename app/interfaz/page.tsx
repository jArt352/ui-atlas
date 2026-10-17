import { PageHeader } from "@/components/atlas/app-shell";
import { Showcase } from "@/components/atlas/showcase";
import { MagicBento, MagicMarquee } from "@/components/demos/magicui-demo";
import { AccordionDemo, CalendarDemo, CommandDemo, DrawerDemo, ToastDemo } from "@/components/demos/ui-misc";

export default function InterfazPage() {
  return (
    <>
      <PageHeader
        title="Interfaz y feedback"
        description="Las piezas que rodean a los gráficos y las tablas: calendarios, avisos, paneles laterales, menús de comandos y bloques de maquetación."
      />

      <Showcase
        title="Bento: maquetar con una cuadrícula"
        description="Tarjetas de distinto tamaño sobre una grilla de 3 columnas."
        lib="magicui"
        install="npx shadcn@latest add https://magicui.design/r/bento-grid.json"
        file="components/demos/magicui-demo.tsx → MagicBento"
        steps={[
          "Instala bento-grid desde el registro de Magic UI.",
          "BentoGrid define la grilla; cada BentoCard recibe un className con col-span para ocupar más o menos columnas.",
          "En móvil todo se apila en una columna; en md pasa a tres.",
          "Es una buena base para maquetar tu propio dashboard.",
        ]}
      >
        <MagicBento />
      </Showcase>

      <Showcase
        title="Marquesina"
        description="Banda que se desplaza sola; se detiene al pasar el cursor."
        lib="magicui"
        install="npx shadcn@latest add https://magicui.design/r/marquee.json"
        file="components/demos/magicui-demo.tsx → MagicMarquee"
        steps={[
          "Instala marquee desde el registro de Magic UI.",
          "La velocidad se cambia con la variable CSS --duration.",
          "pauseOnHover la detiene al pasar el cursor.",
        ]}
      >
        <MagicMarquee />
      </Showcase>

      <div className="grid gap-6 lg:grid-cols-2">
        <Showcase
          title="Calendario"
          description="Elige una fecha: se muestra un aviso."
          lib="daypicker"
          install="npx shadcn@latest add calendar"
          file="components/demos/ui-misc.tsx → CalendarDemo"
          steps={[
            "Instala calendar con la CLI de shadcn (trae react-day-picker y date-fns).",
            "Usa mode=\"single\" con selected y onSelect.",
            "Para español importa el idioma: import { es } from \"react-day-picker/locale\".",
          ]}
        >
          <CalendarDemo />
        </Showcase>

        <div className="grid gap-6">
          <Showcase
            title="Avisos con Sonner"
            description="Pulsa cada botón."
            lib="sonner"
            install="npx shadcn@latest add sonner"
            file="components/demos/ui-misc.tsx → ToastDemo"
            steps={[
              "Instala sonner con la CLI de shadcn.",
              "Pon <Toaster /> una sola vez en app/layout.tsx.",
              "Llama a toast.success, toast.error, toast.promise o toast con una acción desde cualquier lugar.",
            ]}
          >
            <ToastDemo />
          </Showcase>

          <Showcase
            title="Panel inferior (Drawer)"
            description="Detalle de un registro sin cambiar de página."
            lib="baseui"
            install="npx shadcn@latest add drawer"
            file="components/demos/ui-misc.tsx → DrawerDemo"
            steps={[
              "Instala drawer con la CLI de shadcn.",
              "Con este estilo de shadcn el botón disparador se pasa con la propiedad render, no con asChild.",
              "DrawerClose cierra el panel; úsalo para el botón Cancelar.",
            ]}
          >
            <DrawerDemo />
          </Showcase>
        </div>

        <Showcase
          title="Menú de comandos"
          description="Escribe para filtrar; se usa igual en un diálogo con Ctrl+K."
          lib="cmdk"
          install="npx shadcn@latest add command"
          file="components/demos/ui-misc.tsx → CommandDemo"
          steps={[
            "Instala command con la CLI de shadcn (trae cmdk).",
            "Command, CommandInput, CommandList, CommandGroup y CommandItem forman el menú.",
            "Para abrirlo como diálogo usa CommandDialog y envuelve el contenido en <Command>.",
          ]}
        >
          <CommandDemo />
        </Showcase>

        <Showcase
          title="Preguntas frecuentes (Accordion)"
          description="Respuestas plegables para guiar la elección."
          lib="baseui"
          install="npx shadcn@latest add accordion"
          file="components/demos/ui-misc.tsx → AccordionDemo"
          steps={[
            "Instala accordion con la CLI de shadcn.",
            "Cada AccordionItem lleva un value único.",
            "defaultValue recibe una lista con los items abiertos al inicio.",
          ]}
        >
          <AccordionDemo />
        </Showcase>
      </div>
    </>
  );
}
