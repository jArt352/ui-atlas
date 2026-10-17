import type { Ref } from "@/components/atlas/showcase";

// Dónde encontrar cada pieza exactamente en el sitio de origen.
// Cada dirección se comprobó el 17/10/2026. Los nombres son los que muestra el sitio.

const SHADCN_CHART_DOCS: Ref = {
  label: "Documentación de Chart · shadcn/ui",
  url: "https://ui.shadcn.com/docs/components/chart",
  note: "instalación y ChartConfig",
};

export const REFS = {
  // ---- shadcn/ui ----
  shadcnAreaStacked: [
    {
      label: "Area Chart - Stacked",
      url: "https://ui.shadcn.com/charts/area",
      note: "nombre interno chart-area-stacked; pulsa View Code",
    },
    SHADCN_CHART_DOCS,
  ],
  shadcnBarDefault: [
    {
      label: "Bar Chart",
      url: "https://ui.shadcn.com/charts/bar",
      note: "nombre interno chart-bar-default; pulsa View Code",
    },
    SHADCN_CHART_DOCS,
  ],
  shadcnDonut: [
    {
      label: "Pie Chart - Donut with Text",
      url: "https://ui.shadcn.com/charts/pie",
      note: "nombre interno chart-pie-donut-text; en la página todos se ven como “Pie Chart”: es el anillo con el número al centro",
    },
    SHADCN_CHART_DOCS,
  ],
  shadcnRadial: [
    {
      label: "Radial Chart - Text",
      url: "https://ui.shadcn.com/charts/radial",
      note: "nombre interno chart-radial-text; pulsa View Code",
    },
    SHADCN_CHART_DOCS,
  ],
  shadcnTable: [{ label: "Table · shadcn/ui", url: "https://ui.shadcn.com/docs/components/table" }],
  shadcnCalendar: [
    { label: "Calendar · shadcn/ui", url: "https://ui.shadcn.com/docs/components/calendar" },
    { label: "Selection modes · React Day Picker", url: "https://daypicker.dev/docs/selection-modes" },
    { label: "Localization · React Day Picker", url: "https://daypicker.dev/docs/localization", note: "para poner el calendario en español" },
  ],
  shadcnSonner: [
    { label: "Sonner · shadcn/ui", url: "https://ui.shadcn.com/docs/components/sonner" },
    { label: "Sonner · sitio oficial", url: "https://sonner.emilkowal.ski" },
  ],
  shadcnDrawer: [
    { label: "Drawer · shadcn/ui", url: "https://ui.shadcn.com/docs/components/drawer" },
    { label: "Drawer · Base UI", url: "https://base-ui.com/react/components/drawer" },
  ],
  shadcnCommand: [
    { label: "Command · shadcn/ui", url: "https://ui.shadcn.com/docs/components/command" },
    { label: "cmdk · sitio oficial", url: "https://cmdk.paco.me" },
  ],
  shadcnAccordion: [
    { label: "Accordion · shadcn/ui", url: "https://ui.shadcn.com/docs/components/accordion" },
    { label: "Accordion · Base UI", url: "https://base-ui.com/react/components/accordion" },
  ],

  // ---- Recharts ----
  rechartsComposed: [
    {
      label: "Line Bar Area Composed Chart",
      url: "https://recharts.github.io/en-US/examples/LineBarAreaComposedChart/",
      note: "sección Composed Charts de Examples",
    },
  ],
  rechartsRadar: [
    { label: "Simple Radar Chart", url: "https://recharts.github.io/en-US/examples/SimpleRadarChart/", note: "sección Radar Charts" },
    {
      label: "Specified Domain Radar Chart",
      url: "https://recharts.github.io/en-US/examples/SpecifiedDomainRadarChart/",
      note: "de aquí sale domain={[0, 100]}",
    },
  ],

  // ---- Chart.js ----
  chartjsLine: [
    { label: "Line Chart · Chart.js", url: "https://www.chartjs.org/docs/latest/samples/line/line.html" },
    { label: "Area Charts · Chart.js", url: "https://www.chartjs.org/docs/latest/charts/area.html", note: "para el relleno (fill)" },
    { label: "Line Chart · react-chartjs-2", url: "https://react-chartjs-2.js.org/examples/line-chart/", note: "cómo se escribe en React" },
  ],
  chartjsHalfDoughnut: [
    {
      label: "Doughnut and Pie Charts · Chart.js",
      url: "https://www.chartjs.org/docs/latest/charts/doughnut.html",
      note: "opciones circumference y rotation para dibujar solo la mitad",
    },
    { label: "Doughnut Chart · react-chartjs-2", url: "https://react-chartjs-2.js.org/examples/doughnut-chart/" },
  ],

  // ---- Nivo ----
  nivoCalendar: [{ label: "Calendar · Nivo", url: "https://nivo.rocks/calendar/" }],
  nivoSankey: [{ label: "Sankey · Nivo", url: "https://nivo.rocks/sankey/" }],

  // ---- ApexCharts ----
  apexCandles: [
    { label: "Basic Candlestick", url: "https://apexcharts.com/react-chart-demos/candlestick-charts/basic/", note: "familia Candlestick Charts" },
  ],
  apexHeatmap: [
    { label: "Basic Heatmap", url: "https://apexcharts.com/react-chart-demos/heatmap-charts/basic/", note: "familia Heatmap Charts" },
  ],
  apexRadial: [
    {
      label: "Multiple Band (RadialBar)",
      url: "https://apexcharts.com/react-chart-demos/radialbar-charts/multiple-radialbars/",
      note: "familia RadialBar / Circle",
    },
  ],

  // ---- ECharts ----
  echartsRing: [
    {
      label: "Ring Gauge",
      url: "https://echarts.apache.org/examples/en/editor.html?c=gauge-ring",
      note: "nombre interno gauge-ring: de aquí salen startAngle, endAngle y roundCap",
    },
    {
      label: "Progress Gauge",
      url: "https://echarts.apache.org/examples/en/editor.html?c=gauge-progress",
      note: "alternativa en semicírculo",
    },
  ],
  echartsSpeedometer: [
    {
      label: "Stage Speed Gauge",
      url: "https://echarts.apache.org/examples/en/editor.html?c=gauge-stage",
      note: "de aquí salen las zonas de color",
    },
    {
      label: "Grade Gauge",
      url: "https://echarts.apache.org/examples/en/editor.html?c=gauge-grade",
      note: "de aquí sale la aguja en forma de triángulo",
    },
  ],

  // ---- Magic UI ----
  magicNumberTicker: [{ label: "Number Ticker", url: "https://magicui.design/docs/components/number-ticker" }],
  magicCircular: [{ label: "Animated Circular Progress Bar", url: "https://magicui.design/docs/components/animated-circular-progress-bar" }],
  magicBento: [{ label: "Bento Grid", url: "https://magicui.design/docs/components/bento-grid" }],
  magicMarquee: [{ label: "Marquee", url: "https://magicui.design/docs/components/marquee" }],

  // ---- react-circular-progressbar ----
  progressbar: [
    { label: "react-circular-progressbar · README", url: "https://github.com/kevinsqi/react-circular-progressbar", note: "instalación y estilos" },
    { label: "react-circular-progressbar · demos", url: "https://www.kevinqi.com/react-circular-progressbar/", note: "busca el ejemplo con contenido en el centro" },
  ],

  // ---- TanStack Table ----
  tanstackTable: [
    { label: "Quick Start · React", url: "https://tanstack.com/table/latest/docs/framework/react/quick-start" },
    { label: "Sorting · guía", url: "https://tanstack.com/table/latest/docs/framework/react/guide/sorting" },
    { label: "Global Filtering · guía", url: "https://tanstack.com/table/latest/docs/framework/react/guide/global-filtering" },
    { label: "Pagination · guía", url: "https://tanstack.com/table/latest/docs/framework/react/guide/pagination" },
    { label: "Ejemplo sorting (código)", url: "https://github.com/TanStack/table/tree/main/examples/react/sorting" },
    { label: "Ejemplo pagination (código)", url: "https://github.com/TanStack/table/tree/main/examples/react/pagination" },
  ],

  // ---- AG Grid ----
  aggrid: [
    { label: "AG Grid Modules", url: "https://www.ag-grid.com/react-data-grid/modules/", note: "cómo registrar AllCommunityModule" },
    { label: "Row Pagination", url: "https://www.ag-grid.com/react-data-grid/row-pagination/", note: "pagination y paginationPageSize" },
    { label: "Theming: Colours & Dark Mode", url: "https://www.ag-grid.com/react-data-grid/theming-colors/", note: "colorSchemeDark" },
  ],
} satisfies Record<string, Ref[]>;
