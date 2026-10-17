import { PageHeader } from "@/components/atlas/app-shell";
import { Showcase } from "@/components/atlas/showcase";
import { ApexCandles, ApexHeatmap } from "@/components/demos/apex-demo";
import { ChartJsLine } from "@/components/demos/chartjs-demo";
import { NivoCalendar, NivoSankey } from "@/components/demos/nivo-demo";
import { RechartsComposed, RechartsRadar } from "@/components/demos/recharts-raw";
import { ShadcnArea, ShadcnBar } from "@/components/demos/shadcn-charts";

export default function GraficosPage() {
  return (
    <>
      <PageHeader
        title="Gráficos"
        description="Seis librerías dibujando datos parecidos. Compara cómo se escribe cada una, cuánto peso trae y qué tipos de gráfico son su especialidad."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Showcase
          title="Barras con shadcn"
          description="Estilo del tema listo, tooltip incluido."
          lib="shadcn"
          install="npx shadcn@latest add chart"
          file="components/demos/shadcn-charts.tsx → ShadcnBar"
          steps={[
            "Elige un gráfico de barras en ui.shadcn.com/charts.",
            "Instala chart con la CLI.",
            "Declara el ChartConfig y usa ChartContainer con className “aspect-auto h-64 w-full”.",
            "Usa radius en <Bar> para esquinas redondeadas.",
          ]}
        >
          <ShadcnBar />
        </Showcase>

        <Showcase
          title="Área con shadcn"
          description="El mismo componente chart con otra forma."
          lib="shadcn"
          install="npx shadcn@latest add chart"
          file="components/demos/shadcn-charts.tsx → ShadcnArea"
          steps={[
            "Reutiliza el mismo ChartContainer: solo cambias AreaChart y Area.",
            "stackId apila las áreas.",
            "ChartLegend con ChartLegendContent muestra la leyenda con los colores del config.",
          ]}
        >
          <ShadcnArea />
        </Showcase>

        <Showcase
          title="Compuesto con Recharts"
          description="Barras y línea en un mismo gráfico, sin envoltorio."
          lib="recharts"
          file="components/demos/recharts-raw.tsx → RechartsComposed"
          steps={[
            "Busca “ComposedChart” en recharts.org/en-US/examples.",
            "Instala recharts.",
            "Envuelve el gráfico en ResponsiveContainer dentro de un div con altura fija.",
            "Pasa los colores como valores (useChartTheme) o usa variables CSS.",
          ]}
        >
          <RechartsComposed />
        </Showcase>

        <Showcase
          title="Radar con Recharts"
          description="Compara dos conjuntos de datos en varias áreas."
          lib="recharts"
          file="components/demos/recharts-raw.tsx → RechartsRadar"
          steps={[
            "Usa RadarChart con PolarGrid, PolarAngleAxis y una o más <Radar>.",
            "domain={[0, 100]} fija la escala para que sea comparable.",
            "fillOpacity baja deja ver las dos áreas superpuestas.",
          ]}
        >
          <RechartsRadar />
        </Showcase>

        <Showcase
          title="Línea con Chart.js"
          description="Gráfico en canvas, con degradado de relleno."
          lib="chartjs"
          file="components/demos/chartjs-demo.tsx → ChartJsLine"
          steps={[
            "Instala chart.js y react-chartjs-2.",
            "Registra con ChartJS.register(...) solo los elementos que uses (escalas, línea, puntos, relleno).",
            "Usa el componente <Line data options />.",
            "maintainAspectRatio: false permite controlar la altura desde el contenedor.",
          ]}
        >
          <ChartJsLine />
        </Showcase>

        <Showcase
          title="Velas con ApexCharts"
          description="Gráfico financiero de apertura, máximo, mínimo y cierre."
          lib="apexcharts"
          file="components/demos/apex-demo.tsx → ApexCandles"
          steps={[
            "Instala apexcharts y react-apexcharts.",
            "Impórtalo con next/dynamic y ssr: false: necesita window.",
            "Usa type=\"candlestick\" con datos { x, y: [apertura, máximo, mínimo, cierre] }.",
            "Revisa la licencia: es gratis solo para organizaciones con menos de US$ 2 M de ingresos.",
          ]}
        >
          <ApexCandles />
        </Showcase>

        <Showcase
          title="Mapa de calor con ApexCharts"
          description="Visitas por día de la semana y hora."
          lib="apexcharts"
          file="components/demos/apex-demo.tsx → ApexHeatmap"
          steps={[
            "Misma instalación y mismo import dinámico que las velas.",
            "Cada serie es una fila; cada punto es { x: columna, y: valor }.",
            "stroke con el color de la superficie separa las celdas.",
          ]}
        >
          <ApexHeatmap />
        </Showcase>

        <Showcase
          title="Calendario de actividad con Nivo"
          description="Estilo de contribuciones de GitHub."
          lib="nivo"
          install="npm install @nivo/core @nivo/calendar"
          file="components/demos/nivo-demo.tsx → NivoCalendar"
          steps={[
            "Entra a nivo.rocks y busca “Calendar”.",
            "Instala @nivo/core y el paquete del gráfico (@nivo/calendar).",
            "Pasa data como [{ day: \"2026-01-01\", value: 5 }], más from y to.",
            "El contenedor necesita altura: Responsive* ocupa todo el espacio disponible.",
          ]}
        >
          <NivoCalendar />
        </Showcase>

        <Showcase
          className="lg:col-span-2"
          title="Flujo de usuarios con Nivo (Sankey)"
          description="De dónde vienen y adónde van los usuarios."
          lib="nivo"
          install="npm install @nivo/core @nivo/sankey"
          file="components/demos/nivo-demo.tsx → NivoSankey"
          steps={[
            "Instala @nivo/sankey.",
            "Los datos son { nodes: [{ id }], links: [{ source, target, value }] }.",
            "labelPosition=\"outside\" y un margen derecho evitan que se corten los textos.",
          ]}
        >
          <NivoSankey />
        </Showcase>
      </div>
    </>
  );
}
