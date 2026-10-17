import type { CartItem } from "@/lib/cart";

// Convierte las piezas elegidas en tres entregables:
//  - un prompt AUTOSUFICIENTE para crear el dashboard en un proyecto aparte,
//  - la documentación de fuentes (README),
//  - la lista de comandos de instalación.

export const REPO_URL = "https://github.com/jArt352/ui-atlas";

const FENCE = "```";

function unique<T>(list: T[]) {
  return [...new Set(list)];
}

/** Una librería por línea, aunque varias piezas la usen. */
function libraries(items: CartItem[]) {
  const map = new Map<string, { name: string; url: string; license: string; kind: string; installs: string[] }>();
  for (const it of items) {
    const entry = map.get(it.libName) ?? { name: it.libName, url: it.libUrl, license: it.license, kind: it.kind, installs: [] };
    entry.installs.push(it.install);
    map.set(it.libName, entry);
  }
  return [...map.values()].map((l) => ({ ...l, installs: unique(l.installs) }));
}

export function buildPrompt(items: CartItem[]): string {
  const libs = libraries(items);

  const stack = libs.map((l) => {
    const installs = l.installs.map((c) => `\`${c}\``).join(" y ");
    return `  - ${l.name} (${l.kind}, licencia ${l.license}): ${installs}`;
  });

  const pieces = items.map((it, i) => {
    const lines = [
      `${i + 1}. ${it.title}${it.description ? `: ${it.description}` : ""}`,
      `   - Librería: ${it.libName} (${it.kind})`,
    ];
    if (it.refs.length > 0) {
      lines.push("   - Dónde encontrarlo exactamente:");
      for (const r of it.refs) lines.push(`       · ${r.label}${r.note ? ` (${r.note})` : ""}: ${r.url}`);
    }
    lines.push(`   - Instalación: ${it.install}`);
    if (it.steps.length > 0) {
      lines.push("   - Cómo se implementa:");
      for (const s of it.steps) lines.push(`       · ${s}`);
    }
    return lines.join("\n");
  });

  const notes: string[] = [];
  if (items.some((i) => i.libName.includes("ApexCharts"))) {
    notes.push("- ApexCharts tiene licencia doble: es gratis solo para organizaciones con menos de US$ 2 millones de ingresos. Dímelo si puede ser un problema.");
  }
  if (items.some((i) => i.libName.includes("AG Grid"))) {
    notes.push("- De AG Grid usa solo la edición Community (MIT). No uses funciones Enterprise.");
  }

  return [
    "OBJETIVO",
    `Crea desde cero un dashboard web con estas ${items.length} piezas, cada una de su librería original. Debe ser una sola pantalla con sidebar, barra superior, grilla responsive y datos de ejemplo. Trabaja en un proyecto nuevo y vacío.`,
    "",
    "TECNOLOGÍAS",
    "- Base: Next.js (App Router) con TypeScript, Tailwind CSS y shadcn/ui. Iconos con lucide-react.",
    "- Modo claro y oscuro con next-themes.",
    "- Librerías de las piezas elegidas:",
    ...stack,
    "",
    "COMPONENTES ELEGIDOS",
    "Usa exactamente estas piezas, con la librería indicada (no las reemplaces por otras):",
    "",
    pieces.join("\n\n"),
    "",
    "DATOS",
    "- Inventa datos de ejemplo en lib/data.ts, con la forma que necesite cada pieza (series por mes, categorías con valores, filas de una tabla, fechas).",
    "- Los datos deben ser deterministas: sin Math.random ni Date.now al renderizar, para evitar errores de hidratación.",
    "",
    "DISEÑO Y MAQUETACIÓN",
    "- Sidebar fija en escritorio y menú en un Sheet en móvil; barra superior con el botón de tema.",
    "- Contenido centrado con ancho máximo. Indicadores arriba, gráficos y ruedas en el medio, tablas abajo.",
    "- Grilla responsive: columnas que cambian por tamaño de pantalla (por ejemplo grid-cols-2 en móvil y lg:grid-cols-4 en escritorio).",
    "- Cada pieza dentro de una tarjeta (Card de shadcn) con título y una descripción corta.",
    "- Todo gráfico necesita un contenedor con altura o tamaño definido.",
    "",
    "RESTRICCIONES",
    "- Instala solo lo necesario para estas piezas. Antes de instalar cualquier otra cosa, pregúntame.",
    "- No edites a mano los archivos que genera shadcn en components/ui.",
    "- Usa las variables del tema para los colores. Las librerías que no leen variables CSS (Chart.js, ECharts, ApexCharts, Nivo, AG Grid) reciben los colores desde un hook que siga el tema claro u oscuro.",
    "- Las librerías que usan window (ApexCharts, ECharts, AG Grid) se cargan con next/dynamic y ssr: false.",
    "- Revisa la licencia de cada librería y avísame si alguna tiene restricciones de uso.",
    ...notes,
    "",
    "CRITERIOS DE ACEPTACIÓN",
    "- npm run lint y npm run build terminan sin errores.",
    "- Se ve bien en 375 px y en 1280 px, en modo claro y en modo oscuro.",
    "- Cada pieza lleva un comentario con su origen: librería, enlace y comando de instalación.",
    "- Crea un README con la tabla de fuentes (pieza, librería, licencia, enlace e instalación).",
    "- Al terminar, explícame qué archivos creaste y por qué.",
    "",
    "REFERENCIA OPCIONAL",
    `Si te sirve, hay una implementación de cada pieza en ${REPO_URL}. Puedes leerla, pero el dashboard debe quedar en este proyecto nuevo.`,
    ...items.map((it) => `- ${it.title}: ${it.file}`),
  ].join("\n");
}

export function buildCommands(items: CartItem[]): string {
  const byCommand = new Map<string, string[]>();
  for (const it of items) {
    const list = byCommand.get(it.install) ?? [];
    list.push(it.title);
    byCommand.set(it.install, list);
  }

  const lines = [
    "# 1. Crear el proyecto (una sola vez)",
    'npx create-next-app@latest mi-dashboard --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm',
    "cd mi-dashboard",
    "npx shadcn@latest init -d",
    "",
    "# 2. Traer las piezas elegidas",
  ];
  for (const [command, titles] of byCommand) {
    lines.push(`# ${unique(titles).join(", ")}`, command, "");
  }
  lines.push("# 3. Comprobar", "npm run lint", "npm run build", "npm run dev");
  return lines.join("\n");
}

export function buildDocs(items: CartItem[]): string {
  const rows = items.map((it, i) => {
    const ref = it.refs[0];
    const example = ref ? `[${ref.label}](${ref.url})` : "—";
    return `| ${i + 1} | ${it.title} | [${it.libName}](${it.libUrl}) | ${it.license} | ${it.kind} | \`${it.install}\` | ${example} |`;
  });

  const detail = items.flatMap((it, i) => {
    const ref = it.refs.map((r) => `- [${r.label}](${r.url})${r.note ? `: ${r.note}` : ""}`);
    return [
      `### ${i + 1}. ${it.title}`,
      "",
      `- **Librería:** [${it.libName}](${it.libUrl}) · ${it.kind} · licencia ${it.license}`,
      `- **Referencia en UI Atlas:** \`${it.file}\``,
      "",
      ...(ref.length ? ["**Dónde encontrarlo exactamente**", "", ...ref, ""] : []),
      "**Instalación**",
      "",
      `${FENCE}bash`,
      it.install,
      FENCE,
      "",
      "**Pasos**",
      "",
      ...it.steps.map((s, n) => `${n + 1}. ${s}`),
      "",
    ];
  });

  const licenseNotes: string[] = [];
  if (items.some((i) => i.libName.includes("ApexCharts"))) {
    licenseNotes.push("- ApexCharts: licencia doble. Es gratis para organizaciones con menos de US$ 2 millones de ingresos; por encima necesita licencia comercial.");
  }
  if (items.some((i) => i.libName.includes("AG Grid"))) {
    licenseNotes.push("- AG Grid: la edición Community es MIT; las funciones Enterprise son de pago.");
  }

  return [
    "# Componentes de mi dashboard",
    "",
    `Piezas elegidas en [UI Atlas](${REPO_URL}), con su origen y cómo se implementan.`,
    "",
    "## Resumen",
    "",
    "| # | Pieza | Librería | Licencia | Origen | Instalación | Ejemplo exacto |",
    "|---|---|---|---|---|---|---|",
    ...rows,
    "",
    ...(licenseNotes.length ? ["## Licencias a tener en cuenta", "", ...licenseNotes, ""] : []),
    "## Detalle de cada pieza",
    "",
    ...detail,
  ].join("\n");
}
