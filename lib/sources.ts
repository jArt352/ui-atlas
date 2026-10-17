// Catálogo de las librerías usadas en este proyecto.
// Cada demo (<Showcase lib="...">) apunta a una entrada de aquí para mostrar
// de dónde vino, bajo qué licencia y cómo se trae al proyecto.

export type Kind = "npm" | "registro" | "copiar";

export const KIND_LABEL: Record<Kind, string> = {
  npm: "Paquete npm",
  registro: "Registro shadcn (CLI)",
  copiar: "Copiar y pegar",
};

export type Lib = {
  name: string;
  url: string;
  license: string;
  kind: Kind;
  install: string;
  summary: string;
};

export const LIBS = {
  shadcn: {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    license: "MIT",
    kind: "registro",
    install: "npx shadcn@latest add chart card table",
    summary: "Componentes que se copian a tu proyecto. Los gráficos son una capa de estilo sobre Recharts.",
  },
  recharts: {
    name: "Recharts",
    url: "https://recharts.org",
    license: "MIT",
    kind: "npm",
    install: "npm install recharts",
    summary: "Gráficos declarativos en SVG, hechos con componentes de React.",
  },
  chartjs: {
    name: "Chart.js + react-chartjs-2",
    url: "https://www.chartjs.org",
    license: "MIT",
    kind: "npm",
    install: "npm install chart.js react-chartjs-2",
    summary: "Gráficos en canvas, muy ligeros. react-chartjs-2 es el adaptador para React.",
  },
  nivo: {
    name: "Nivo",
    url: "https://nivo.rocks",
    license: "MIT",
    kind: "npm",
    install: "npm install @nivo/core @nivo/calendar @nivo/sankey",
    summary: "Gráficos con d3 y mucho diseño. Cada tipo de gráfico es un paquete aparte.",
  },
  apexcharts: {
    name: "ApexCharts + react-apexcharts",
    url: "https://apexcharts.com",
    license: "Doble: gratis para organizaciones con menos de US$ 2 M de ingresos",
    kind: "npm",
    install: "npm install apexcharts react-apexcharts",
    summary: "Gráficos interactivos listos para usar (velas, mapas de calor, radiales).",
  },
  echarts: {
    name: "Apache ECharts + echarts-for-react",
    url: "https://echarts.apache.org",
    license: "Apache-2.0",
    kind: "npm",
    install: "npm install echarts echarts-for-react",
    summary: "Motor de gráficos muy completo, famoso por sus velocímetros (gauge) y sus mapas.",
  },
  magicui: {
    name: "Magic UI",
    url: "https://magicui.design",
    license: "MIT",
    kind: "registro",
    install: "npx shadcn@latest add https://magicui.design/r/number-ticker.json",
    summary: "Componentes animados que se instalan con la CLI de shadcn desde una URL de registro.",
  },
  progressbar: {
    name: "react-circular-progressbar",
    url: "https://github.com/kevinsqi/react-circular-progressbar",
    license: "MIT",
    kind: "npm",
    install: "npm install react-circular-progressbar",
    summary: "Una sola cosa y bien hecha: rueda de progreso con SVG.",
  },
  tanstack: {
    name: "TanStack Table",
    url: "https://tanstack.com/table",
    license: "MIT",
    kind: "npm",
    install: "npm install @tanstack/react-table",
    summary: "Tabla headless: pone la lógica (orden, filtros, páginas) y tú pones el HTML y los estilos.",
  },
  aggrid: {
    name: "AG Grid Community",
    url: "https://www.ag-grid.com",
    license: "MIT (Community); las funciones Enterprise son de pago",
    kind: "npm",
    install: "npm install ag-grid-community ag-grid-react",
    summary: "Tabla de datos completa con su propio tema: columnas, filtros, paginación y miles de filas.",
  },
  daypicker: {
    name: "react-day-picker",
    url: "https://daypicker.dev",
    license: "MIT",
    kind: "registro",
    install: "npx shadcn@latest add calendar",
    summary: "Calendario accesible. shadcn lo trae ya estilizado.",
  },
  sonner: {
    name: "Sonner",
    url: "https://sonner.emilkowal.ski",
    license: "MIT",
    kind: "registro",
    install: "npx shadcn@latest add sonner",
    summary: "Notificaciones (toasts) con una sola función: toast().",
  },
  cmdk: {
    name: "cmdk",
    url: "https://cmdk.paco.me",
    license: "MIT",
    kind: "registro",
    install: "npx shadcn@latest add command",
    summary: "Menú de comandos con búsqueda difusa, la base del Ctrl+K.",
  },
  baseui: {
    name: "Base UI (Drawer, Accordion)",
    url: "https://base-ui.com",
    license: "MIT",
    kind: "registro",
    install: "npx shadcn@latest add drawer accordion",
    summary: "Primitivas sin estilo y accesibles. El shadcn actual las usa por debajo.",
  },
} as const satisfies Record<string, Lib>;

export type LibId = keyof typeof LIBS;

// Directorio "Dónde buscar" (página /fuentes)
export type Site = { name: string; url: string; what: string; how: string };
export type SiteGroup = { title: string; sites: Site[] };

export const DIRECTORY: SiteGroup[] = [
  {
    title: "Catálogos de componentes",
    sites: [
      { name: "shadcn/ui", url: "https://ui.shadcn.com", what: "Componentes base, bloques de dashboard y gráficos.", how: "npx shadcn@latest add <nombre>" },
      { name: "Directorio de registros shadcn", url: "https://ui.shadcn.com/docs/directory", what: "Lista de registros de terceros que se instalan con la CLI.", how: "npx shadcn@latest add @registro/<nombre>" },
      { name: "Magic UI", url: "https://magicui.design", what: "Animaciones: contadores, bento, marquesinas, efectos.", how: "npx shadcn@latest add <URL del componente>.json" },
      { name: "Aceternity UI", url: "https://ui.aceternity.com", what: "Efectos visuales llamativos para landings.", how: "Copiar el código o usar la CLI que indique cada componente" },
      { name: "21st.dev", url: "https://21st.dev", what: "Comunidad que publica componentes de shadcn listos para copiar.", how: "Copiar el código o el comando de la ficha" },
      { name: "Tremor", url: "https://tremor.so", what: "Bloques de dashboard y gráficos con Tailwind.", how: "Copiar el bloque o instalarlo según su documentación" },
    ],
  },
  {
    title: "Librerías de componentes completas",
    sites: [
      { name: "HeroUI", url: "https://www.heroui.com", what: "Sistema completo de componentes con Tailwind.", how: "npm install @heroui/react" },
      { name: "Mantine", url: "https://mantine.dev", what: "Más de 100 componentes, hooks y gráficos propios.", how: "npm install @mantine/core @mantine/hooks" },
      { name: "MUI", url: "https://mui.com", what: "Material UI, con tabla y gráficos avanzados (MUI X).", how: "npm install @mui/material @emotion/react @emotion/styled" },
      { name: "Ant Design", url: "https://ant.design", what: "Sistema empresarial con tablas y formularios potentes.", how: "npm install antd" },
      { name: "Flowbite", url: "https://flowbite.com", what: "Componentes con Tailwind en HTML puro o React.", how: "npm install flowbite flowbite-react" },
    ],
  },
  {
    title: "Primitivas sin estilo (accesibilidad resuelta)",
    sites: [
      { name: "Radix UI", url: "https://www.radix-ui.com", what: "Primitivas accesibles; la base del shadcn clásico.", how: "npm install radix-ui" },
      { name: "Base UI", url: "https://base-ui.com", what: "Primitivas del equipo de MUI; la base del shadcn actual.", how: "npm install @base-ui/react" },
      { name: "React Aria", url: "https://react-aria.adobe.com", what: "Hooks y componentes de accesibilidad de Adobe.", how: "npm install react-aria-components" },
      { name: "Headless UI", url: "https://headlessui.com", what: "Primitivas del equipo de Tailwind.", how: "npm install @headlessui/react" },
    ],
  },
  {
    title: "Iconos",
    sites: [
      { name: "Lucide", url: "https://lucide.dev", what: "Iconos de línea; los usa shadcn por defecto.", how: "npm install lucide-react" },
      { name: "Tabler Icons", url: "https://tabler.io/icons", what: "Más de 5 000 iconos de línea.", how: "npm install @tabler/icons-react" },
    ],
  },
  {
    title: "Buscar y evaluar paquetes",
    sites: [
      { name: "npm", url: "https://www.npmjs.com", what: "Descargas semanales, última versión, licencia, dependencias.", how: "Buscar por nombre y revisar la pestaña de versiones" },
      { name: "npm trends", url: "https://npmtrends.com", what: "Compara la popularidad de varias librerías en el tiempo.", how: "Escribir dos o tres paquetes y comparar" },
      { name: "Bundlephobia", url: "https://bundlephobia.com", what: "Cuánto pesa un paquete al llevarlo al navegador.", how: "Pegar el nombre del paquete" },
      { name: "GitHub", url: "https://github.com", what: "Estrellas, issues abiertos, fecha del último commit.", how: "Mirar la actividad reciente, no solo las estrellas" },
    ],
  },
  {
    title: "Inspiración y diseño",
    sites: [
      { name: "Dribbble", url: "https://dribbble.com", what: "Ideas de dashboards y paletas.", how: "Buscar 'dashboard' y 'analytics'" },
      { name: "Mobbin", url: "https://mobbin.com", what: "Capturas de apps reales por patrón de pantalla.", how: "Filtrar por plataforma y patrón" },
      { name: "Awwwards", url: "https://www.awwwards.com", what: "Sitios premiados para ver tendencias.", how: "Filtrar por categoría" },
    ],
  },
];

// Lista de evaluación antes de traer una librería (página /fuentes)
export const CHECKLIST = [
  { id: "activa", label: "Tiene publicaciones recientes (último año)", why: "Una librería abandonada rompe con la próxima versión de React." },
  { id: "react19", label: "Declara soporte para tu versión de React", why: "Se ve en peerDependencies de su package.json." },
  { id: "licencia", label: "Su licencia permite tu uso", why: "MIT y Apache-2.0 son libres; algunas son gratis solo para organizaciones pequeñas." },
  { id: "peso", label: "Su peso es razonable para lo que hace", why: "Bundlephobia muestra cuánto suma a tu página." },
  { id: "ssr", label: "Sabes si funciona en el servidor", why: "Si usa canvas o window, hay que cargarla con 'use client' o dynamic sin SSR." },
  { id: "docs", label: "Tiene ejemplos que se pueden copiar", why: "Con ejemplos, tú o tu agente la usan bien a la primera." },
  { id: "tipos", label: "Incluye tipos de TypeScript", why: "Evita errores y mejora las sugerencias del editor." },
  { id: "a11y", label: "Es usable con teclado y lector de pantalla", why: "Los componentes interactivos deben cumplir accesibilidad básica." },
] as const;
