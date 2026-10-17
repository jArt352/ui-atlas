# UI Atlas

Dashboard de ejemplo con gráficos, ruedas, tablas y componentes de interfaz hechos con piezas de **distintas librerías**. Cada tarjeta indica de dónde viene la pieza, bajo qué licencia, cómo se trae al proyecto y en qué archivo está implementada.

Se creó para la clase 6 del bootcamp de Desarrollo Web Full Stack + IA: cómo buscar, evaluar, traer y maquetar componentes.

## Cómo correrlo

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

| Ruta | Qué muestra |
|---|---|
| `/` | Panel completo: indicadores animados, áreas, donut, velocímetro y tabla. |
| `/graficos` | Seis librerías de gráficos dibujando datos parecidos. |
| `/ruedas` | Donuts, ruedas de progreso y velocímetros. |
| `/tablas` | Tabla estática, tabla con lógica y cuadrícula completa. |
| `/interfaz` | Bento, marquesina, calendario, avisos, panel inferior, menú de comandos y acordeón. |
| `/fuentes` | Dónde buscar, método de cuatro pasos y lista de evaluación de librerías. |
| `/carrito` | Mi dashboard: las piezas que elegiste, con su prompt, documentación y comandos. |

## Elegir piezas y armar tu dashboard

Cada tarjeta tiene un botón **Elegir**. Las piezas elegidas quedan guardadas en tu navegador y se ven en **Mi dashboard** (`/carrito`), con un mínimo de 5. Con ellas se generan tres cosas:

| Qué | Para qué sirve |
|---|---|
| **Prompt para el agente** | Lo pegas en tu agente (Copilot, OpenCode, Antigravity u otro) dentro de un proyecto nuevo, para crear el dashboard aparte. Se basta solo: trae las tecnologías, cada componente con su librería, el ejemplo exacto, la instalación y cómo se implementa, más el diseño, las restricciones y los criterios de aceptación. |
| **Documentación (`COMPONENTES.md`)** | La tabla de fuentes y el detalle de cada pieza: origen, licencia, instalación, enlace exacto y pasos. Se descarga y se entrega junto al dashboard como README. |
| **Comandos** | Crear el proyecto y traer todas las piezas elegidas, con los comandos repetidos unidos. |

El código está en `lib/cart.ts` (estado), `lib/cart-export.ts` (generación de los textos) y `components/atlas/cart-view.tsx` (página).

## Librerías usadas

| Librería | Origen | Licencia |
|---|---|---|
| [shadcn/ui](https://ui.shadcn.com) (gráficos, tabla, calendario, Sonner, Command, Drawer, Accordion) | Registro de shadcn (CLI) | MIT |
| [Recharts](https://recharts.org) | npm | MIT |
| [Chart.js](https://www.chartjs.org) y react-chartjs-2 | npm | MIT |
| [Nivo](https://nivo.rocks) | npm | MIT |
| [ApexCharts](https://apexcharts.com) y react-apexcharts | npm | Doble: gratis para organizaciones con menos de US$ 2 M de ingresos |
| [Apache ECharts](https://echarts.apache.org) y echarts-for-react | npm | Apache-2.0 |
| [Magic UI](https://magicui.design) | Registro de shadcn por URL | MIT |
| [react-circular-progressbar](https://github.com/kevinsqi/react-circular-progressbar) | npm | MIT |
| [TanStack Table](https://tanstack.com/table) v9 | npm | MIT |
| [AG Grid Community](https://www.ag-grid.com) | npm | MIT |

El catálogo completo, con el comando de instalación de cada una, está en [`lib/sources.ts`](lib/sources.ts). Cada demo vive en [`components/demos`](components/demos) y se envuelve con [`components/atlas/showcase.tsx`](components/atlas/showcase.tsx).

## Cómo documentar una pieza nueva

1. Agrega la librería a `lib/sources.ts`.
2. Crea tu demo en `components/demos`.
3. Envuélvela con `Showcase`:

```tsx
<Showcase
  title="Donut con total"
  lib="shadcn"
  install="npx shadcn@latest add chart"
  file="components/demos/shadcn-charts.tsx → ShadcnDonut"
  steps={["Usa PieChart con innerRadius."]}
>
  <ShadcnDonut />
</Showcase>
```

## Notas técnicas

- Next.js 16 con Cache Components: no se puede leer la fecha actual al pre-renderizar, por eso el calendario se dibuja solo en el navegador.
- Las librerías que usan `window` (ApexCharts, ECharts, AG Grid) se cargan con `next/dynamic` y `ssr: false`.
- Los colores de las librerías que no leen variables CSS salen del hook `useChartTheme`, que sigue el tema claro u oscuro.
- La fuente Geist viene del paquete `geist` (local), sin depender de internet.
