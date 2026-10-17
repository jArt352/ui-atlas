import { PageHeader } from "@/components/atlas/app-shell";
import { Showcase } from "@/components/atlas/showcase";
import { EchartsSpeedometer } from "@/components/demos/echarts-demo";
import { MagicKpis } from "@/components/demos/magicui-demo";
import { ShadcnArea, ShadcnDonut } from "@/components/demos/shadcn-charts";
import { TanstackTable } from "@/components/demos/tanstack-table";
import { REFS } from "@/lib/refs";

export default function Home() {
  return (
    <>
      <PageHeader
        title="Panel completo"
        description="Un dashboard armado con piezas de cuatro librerías distintas. Abre “Cómo se implementa” en cada tarjeta para ver de dónde vino, el enlace exacto del ejemplo y cómo se trae a tu proyecto."
      />

      <Showcase
        title="Indicadores animados"
        description="Números que suben hasta su valor al aparecer en pantalla."
        lib="magicui"
        refs={REFS.magicNumberTicker}
        install="npx shadcn@latest add https://magicui.design/r/number-ticker.json"
        file="components/demos/magicui-demo.tsx → MagicKpis"
        steps={[
          "Abre la página Number Ticker de Magic UI (docs/components/number-ticker).",
          "Copia el comando de instalación (pestaña CLI); la CLI de shadcn descarga el archivo a components/ui/number-ticker.tsx.",
          "Importa NumberTicker y pásale value y decimalPlaces.",
          "Si usas un tema oscuro propio, cambia sus clases de color por text-foreground.",
        ]}
      >
        <MagicKpis />
      </Showcase>

      <div className="grid gap-6 lg:grid-cols-3">
        <Showcase
          className="lg:col-span-2"
          title="Ingresos y gastos"
          description="Áreas apiladas con los colores del tema."
          lib="shadcn"
          refs={REFS.shadcnAreaStacked}
          install="npx shadcn@latest add chart"
          file="components/demos/shadcn-charts.tsx → ShadcnArea"
          steps={[
            "Entra a ui.shadcn.com/charts/area y busca el ejemplo “Area Chart - Stacked”; pulsa View Code.",
            "Instala la base con npx shadcn@latest add chart (trae Recharts y components/ui/chart.tsx).",
            "Define un ChartConfig con una etiqueta y un color por serie, por ejemplo var(--chart-1).",
            "Envuelve el AreaChart de Recharts con ChartContainer y agrega ChartTooltip.",
          ]}
        >
          <ShadcnArea />
        </Showcase>

        <Showcase
          title="Visitas por canal"
          description="Donut con el total en el centro."
          lib="shadcn"
          refs={REFS.shadcnDonut}
          install="npx shadcn@latest add chart"
          file="components/demos/shadcn-charts.tsx → ShadcnDonut"
          steps={[
            "Entra a ui.shadcn.com/charts/pie. Los 11 ejemplos se llaman solo “Pie Chart”: busca el anillo con un número en el centro (“Pie Chart - Donut with Text”) y pulsa Copy o View Code.",
            "Instala la base con la CLI: npx shadcn@latest add chart.",
            "Cada dato lleva fill: var(--color-<clave>) para tomar el color del ChartConfig.",
            "innerRadius convierte el pastel en donut.",
            "El texto central sale de un <Label content={...}> dentro de <Pie>.",
          ]}
        >
          <ShadcnDonut />
        </Showcase>

        <Showcase
          title="Calidad del servicio"
          description="Velocímetro con zonas de color."
          lib="echarts"
          refs={REFS.echartsSpeedometer}
          file="components/demos/echarts-demo.tsx → EchartsSpeedometer"
          steps={[
            "Abre los ejemplos “Stage Speed Gauge” y “Grade Gauge” en echarts.apache.org/examples (categoría Gauge).",
            "Instala echarts y echarts-for-react.",
            "Importa ReactECharts con next/dynamic y ssr: false, porque usa canvas.",
            "Pega el objeto option del ejemplo y cambia colores y datos; los colores de texto vienen de useChartTheme.",
          ]}
        >
          <EchartsSpeedometer />
        </Showcase>

        <Showcase
          className="lg:col-span-2"
          title="Pedidos"
          description="Tabla con orden, búsqueda y paginación."
          lib="tanstack"
          refs={REFS.tanstackTable}
          file="components/demos/tanstack-table.tsx"
          steps={[
            "Lee el Quick Start de React en tanstack.com/table y las guías Sorting, Global Filtering y Pagination.",
            "Registra las funciones que usarás con tableFeatures: orden, filtro global y paginación.",
            "Define las columnas con createColumnHelper y llama a useTable({ features, columns, data }).",
            "Dibuja el HTML tú mismo; aquí se reutilizan las piezas de Table de shadcn.",
          ]}
        >
          <TanstackTable />
        </Showcase>
      </div>
    </>
  );
}
