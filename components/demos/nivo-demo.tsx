"use client";

// Origen: Nivo (https://nivo.rocks). Cada tipo de gráfico es un paquete aparte.
// Instalado con: npm install @nivo/core @nivo/calendar @nivo/sankey
// Los componentes Responsive* ocupan el ancho de su contenedor; el contenedor necesita altura.

import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveSankey } from "@nivo/sankey";
import { useMemo } from "react";
import { useChartTheme } from "@/components/atlas/use-chart-theme";
import { activityCalendar, sankey } from "@/lib/data";

// Fechas locales (no texto): con "2026-01-01" Nivo lo toma como UTC y, en zonas horarias
// al oeste de Greenwich, el calendario empezaba el 31 de diciembre de 2025 y dibujaba un año de más.
const FROM = new Date(2026, 0, 1);
const TO = new Date(2026, 9, 17);

export function NivoCalendar() {
  const t = useChartTheme();
  const data = useMemo(() => activityCalendar(), []);
  return (
    <div className="h-48 w-full">
      <ResponsiveCalendar
        data={data}
        from={FROM}
        to={TO}
        emptyColor={t.empty}
        colors={["#c7d2fe", "#a5b4fc", "#818cf8", "#6366f1", "#4338ca"]}
        margin={{ top: 20, right: 10, bottom: 0, left: 24 }}
        yearSpacing={40}
        monthBorderColor={t.surface}
        daySpacing={2}
        dayBorderWidth={0}
        theme={{
          text: { fill: t.text, fontSize: 11 },
          tooltip: { container: { background: t.surface, color: t.strong } },
        }}
      />
    </div>
  );
}

export function NivoSankey() {
  const t = useChartTheme();
  return (
    <div className="h-72 w-full">
      <ResponsiveSankey
        data={sankey}
        margin={{ top: 8, right: 100, bottom: 8, left: 8 }}
        align="justify"
        colors={t.palette}
        nodeOpacity={1}
        nodeThickness={14}
        nodeSpacing={18}
        linkOpacity={0.4}
        linkContract={2}
        enableLinkGradient
        labelPosition="outside"
        labelPadding={12}
        theme={{
          text: { fill: t.text, fontSize: 12 },
          tooltip: { container: { background: t.surface, color: t.strong } },
        }}
      />
    </div>
  );
}
