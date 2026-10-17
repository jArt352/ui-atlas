import { PageHeader } from "@/components/atlas/app-shell";
import { Showcase } from "@/components/atlas/showcase";
import { ApexRadialBar } from "@/components/demos/apex-demo";
import { ChartJsHalfGauge } from "@/components/demos/chartjs-demo";
import { EchartsProgressGauge, EchartsSpeedometer } from "@/components/demos/echarts-demo";
import { MagicCircular } from "@/components/demos/magicui-demo";
import { ProgressRings } from "@/components/demos/progressbar-demo";
import { ShadcnDonut, ShadcnRadial } from "@/components/demos/shadcn-charts";

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
          install="npx shadcn@latest add chart"
          file="components/demos/shadcn-charts.tsx → ShadcnDonut"
          steps={[
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
          install="npx shadcn@latest add chart"
          file="components/demos/shadcn-charts.tsx → ShadcnRadial"
          steps={[
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
          install="npx shadcn@latest add https://magicui.design/r/animated-circular-progress-bar.json"
          file="components/demos/magicui-demo.tsx → MagicCircular"
          steps={[
            "Busca “Animated Circular Progress Bar” en magicui.design.",
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
          file="components/demos/progressbar-demo.tsx → ProgressRings"
          steps={[
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
          file="components/demos/echarts-demo.tsx → EchartsProgressGauge"
          steps={[
            "Busca “Ring Gauge” o “progress gauge” en echarts.apache.org/examples.",
            "Instala echarts y echarts-for-react y cárgalo con ssr: false.",
            "Copia el option, ajusta startAngle, endAngle y el ancho del anillo.",
          ]}
        >
          <EchartsProgressGauge />
        </Showcase>

        <Showcase
          title="Velocímetro con ECharts"
          description="Zonas de color y aguja."
          lib="echarts"
          file="components/demos/echarts-demo.tsx → EchartsSpeedometer"
          steps={[
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
          file="components/demos/apex-demo.tsx → ApexRadialBar"
          steps={[
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
          file="components/demos/chartjs-demo.tsx → ChartJsHalfGauge"
          steps={[
            "Registra ArcElement, Tooltip y Legend en Chart.js.",
            "Usa <Doughnut> con rotation: -90 y circumference: 180 para dibujar solo la mitad.",
            "El texto del centro es un div superpuesto con posición absoluta.",
          ]}
        >
          <ChartJsHalfGauge />
        </Showcase>
      </div>
    </>
  );
}
