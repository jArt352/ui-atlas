import { PageHeader } from "@/components/atlas/app-shell";
import { Showcase } from "@/components/atlas/showcase";
import { ApexRadialBar } from "@/components/demos/apex-demo";
import { ChartJsHalfGauge } from "@/components/demos/chartjs-demo";
import { EchartsProgressGauge, EchartsSpeedometer } from "@/components/demos/echarts-demo";
import { MagicCircular } from "@/components/demos/magicui-demo";
import { ProgressRings } from "@/components/demos/progressbar-demo";
import { ShadcnDonut, ShadcnRadial } from "@/components/demos/shadcn-charts";
import { REFS } from "@/lib/refs";

export default function RuedasPage() {
  return (
    <>
      <PageHeader
        title="Ruedas y medidores"
        description="Donuts, ruedas de progreso y velocímetros. Son la forma más rápida de mostrar “cuánto falta” o “cómo vamos” en un dashboard."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Showcase
          title="Donut con total"
          description="Reparto por categoría."
          lib="shadcn"
          refs={REFS.shadcnDonut}
          install="npx shadcn@latest add chart"
          file="components/demos/shadcn-charts.tsx → ShadcnDonut"
          steps={[
            "Entra a ui.shadcn.com/charts/pie. Los 11 ejemplos se llaman solo “Pie Chart”: busca el anillo con un número en el centro (“Pie Chart - Donut with Text”) y pulsa Copy o View Code.",
            "Instala la base con la CLI: npx shadcn@latest add chart.",
            "Usa PieChart con Pie y innerRadius.",
            "Los colores salen del ChartConfig (var(--chart-N)).",
            "El total del centro es un Label con content personalizado.",
          ]}
        >
          <ShadcnDonut />
        </Showcase>

        <Showcase
          title="Rueda de meta"
          description="Una sola barra radial con el porcentaje al centro."
          lib="shadcn"
          refs={REFS.shadcnRadial}
          install="npx shadcn@latest add chart"
          file="components/demos/shadcn-charts.tsx → ShadcnRadial"
          steps={[
            "Entra a ui.shadcn.com/charts/radial y busca el ejemplo “Radial Chart - Text”; pulsa View Code.",
            "Usa RadialBarChart con un solo dato y endAngle calculado desde el porcentaje.",
            "PolarGrid dibuja el anillo de fondo.",
            "El texto del centro va en un Label dentro de PolarRadiusAxis.",
          ]}
        >
          <ShadcnRadial />
        </Showcase>

        <Showcase
          title="Progreso animado"
          description="Rueda con transición suave; prueba los botones."
          lib="magicui"
          refs={REFS.magicCircular}
          install="npx shadcn@latest add https://magicui.design/r/animated-circular-progress-bar.json"
          file="components/demos/magicui-demo.tsx → MagicCircular"
          steps={[
            "Abre “Animated Circular Progress Bar” en magicui.design/docs/components.",
            "Instala con la CLI de shadcn usando la URL del registro.",
            "Pasa value, gaugePrimaryColor y gaugeSecondaryColor (valores de color, no clases).",
            "Cambia value con estado de React y la rueda se anima sola.",
          ]}
        >
          <MagicCircular />
        </Showcase>

        <Showcase
          title="Anillos de progreso"
          description="Una librería diminuta que hace una sola cosa."
          lib="progressbar"
          refs={REFS.progressbar}
          file="components/demos/progressbar-demo.tsx → ProgressRings"
          steps={[
            "Abre el README de react-circular-progressbar en GitHub y su página de demos.",
            "Instala react-circular-progressbar.",
            "Importa su CSS: react-circular-progressbar/dist/styles.css.",
            "Usa CircularProgressbarWithChildren para poner tu propio texto al centro.",
            "buildStyles cambia colores y forma del trazo.",
          ]}
        >
          <ProgressRings />
        </Showcase>

        <Showcase
          title="Rueda con ECharts"
          description="Gauge de progreso con borde redondeado."
          lib="echarts"
          refs={REFS.echartsRing}
          file="components/demos/echarts-demo.tsx → EchartsProgressGauge"
          steps={[
            "Abre el ejemplo “Ring Gauge” en echarts.apache.org/examples (categoría Gauge); “Progress Gauge” es la versión en semicírculo.",
            "Instala echarts y echarts-for-react y cárgalo con ssr: false.",
            "Copia el option y ajusta startAngle, endAngle y el ancho del anillo.",
          ]}
        >
          <EchartsProgressGauge />
        </Showcase>

        <Showcase
          title="Velocímetro con ECharts"
          description="Zonas de color y aguja."
          lib="echarts"
          refs={REFS.echartsSpeedometer}
          file="components/demos/echarts-demo.tsx → EchartsSpeedometer"
          steps={[
            "Abre “Stage Speed Gauge” (zonas de color) y “Grade Gauge” (aguja) en echarts.apache.org/examples.",
            "Mismo import que la rueda de progreso.",
            "axisLine.lineStyle.color define las zonas: [[0.3, rojo], [0.7, ámbar], [1, verde]].",
            "pointer dibuja la aguja; detail muestra el valor numérico.",
          ]}
        >
          <EchartsSpeedometer />
        </Showcase>

        <Showcase
          title="Radiales con ApexCharts"
          description="Varias ruedas concéntricas con total."
          lib="apexcharts"
          refs={REFS.apexRadial}
          file="components/demos/apex-demo.tsx → ApexRadialBar"
          steps={[
            "Abre “Multiple Band” en apexcharts.com/react-chart-demos (familia RadialBar / Circle).",
            "Importa react-apexcharts con next/dynamic y ssr: false.",
            "type=\"radialBar\" con una lista de porcentajes en series.",
            "plotOptions.radialBar.dataLabels.total muestra el promedio al centro.",
          ]}
        >
          <ApexRadialBar />
        </Showcase>

        <Showcase
          title="Medio donut con Chart.js"
          description="Un donut convertido en medidor semicircular."
          lib="chartjs"
          refs={REFS.chartjsHalfDoughnut}
          file="components/demos/chartjs-demo.tsx → ChartJsHalfGauge"
          steps={[
            "Abre “Doughnut and Pie Charts” en la documentación de Chart.js: las opciones circumference y rotation están en su tabla de opciones.",
            "Registra ArcElement, Tooltip y Legend en Chart.js.",
            "Usa <Doughnut> con rotation: -90 y circumference: 180 para dibujar solo la mitad.",
            "El texto del centro es un div superpuesto con posición absoluta (no viene del ejemplo).",
          ]}
        >
          <ChartJsHalfGauge />
        </Showcase>
      </div>
    </>
  );
}
