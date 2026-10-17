// Datos de práctica. Todo es determinista (sin Math.random) para que el
// servidor y el navegador generen lo mismo y no haya errores de hidratación.

export const PALETTE = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981", "#f43f5e", "#a855f7"];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const monthly = [
  { month: "Ene", ingresos: 18600, gastos: 8000, visitas: 4200 },
  { month: "Feb", ingresos: 30500, gastos: 12000, visitas: 5100 },
  { month: "Mar", ingresos: 23700, gastos: 12000, visitas: 4800 },
  { month: "Abr", ingresos: 27300, gastos: 9000, visitas: 6300 },
  { month: "May", ingresos: 20900, gastos: 11000, visitas: 5900 },
  { month: "Jun", ingresos: 31400, gastos: 14000, visitas: 7200 },
  { month: "Jul", ingresos: 35800, gastos: 15500, visitas: 8100 },
  { month: "Ago", ingresos: 33200, gastos: 13800, visitas: 7700 },
  { month: "Sep", ingresos: 39600, gastos: 16200, visitas: 9400 },
  { month: "Oct", ingresos: 42100, gastos: 17000, visitas: 10300 },
];

export const channels = [
  { key: "organico", name: "Orgánico", value: 4120 },
  { key: "directo", name: "Directo", value: 2890 },
  { key: "social", name: "Redes sociales", value: 2140 },
  { key: "correo", name: "Correo", value: 1380 },
  { key: "pago", name: "Anuncios", value: 960 },
];

export const skills = [
  { area: "Diseño", equipo: 82, meta: 90 },
  { area: "Frontend", equipo: 91, meta: 85 },
  { area: "Backend", equipo: 74, meta: 85 },
  { area: "Datos", equipo: 68, meta: 80 },
  { area: "IA", equipo: 77, meta: 75 },
  { area: "DevOps", equipo: 59, meta: 70 },
];

export const sankey = {
  nodes: [
    { id: "Visitas" },
    { id: "Registro" },
    { id: "Abandono" },
    { id: "Prueba gratis" },
    { id: "Plan de pago" },
    { id: "Sin pago" },
  ],
  links: [
    { source: "Visitas", target: "Registro", value: 3200 },
    { source: "Visitas", target: "Abandono", value: 6800 },
    { source: "Registro", target: "Prueba gratis", value: 2100 },
    { source: "Registro", target: "Abandono", value: 1100 },
    { source: "Prueba gratis", target: "Plan de pago", value: 760 },
    { source: "Prueba gratis", target: "Sin pago", value: 1340 },
  ],
};

export function activityCalendar() {
  const rand = mulberry32(2026);
  const out: { day: string; value: number }[] = [];
  const start = new Date(Date.UTC(2026, 0, 1));
  const end = new Date(Date.UTC(2026, 9, 17));
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const weekday = d.getUTCDay();
    const base = weekday === 0 || weekday === 6 ? 0.25 : 0.8;
    const value = Math.round(rand() * 12 * base);
    out.push({ day: d.toISOString().slice(0, 10), value });
  }
  return out;
}

export function candles() {
  const rand = mulberry32(77);
  const out: { x: number; y: [number, number, number, number] }[] = [];
  let price = 120;
  const start = Date.UTC(2026, 8, 1);
  for (let i = 0; i < 35; i++) {
    const open = price;
    const close = Math.max(60, open + (rand() - 0.46) * 8);
    const high = Math.max(open, close) + rand() * 4;
    const low = Math.min(open, close) - rand() * 4;
    out.push({
      x: start + i * 86400000,
      y: [round(open), round(high), round(low), round(close)],
    });
    price = close;
  }
  return out;
}

export function trafficHeatmap() {
  const rand = mulberry32(5);
  const days = ["Dom", "Sáb", "Vie", "Jue", "Mié", "Mar", "Lun"];
  return days.map((name, d) => ({
    name,
    data: Array.from({ length: 12 }, (_, h) => {
      const peak = Math.exp(-Math.pow((h * 2 - 14) / 5, 2));
      const weekend = d < 2 ? 0.55 : 1;
      return { x: `${String(h * 2).padStart(2, "0")}h`, y: Math.round((20 + rand() * 25 + peak * 80) * weekend) };
    }),
  }));
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}

export type Order = {
  id: string;
  cliente: string;
  producto: string;
  categoria: "Software" | "Hardware" | "Servicios";
  monto: number;
  estado: "Pagado" | "Pendiente" | "Reembolsado";
  fecha: string;
  pais: string;
};

const clientes = ["Lucía Ramos", "Marco Quispe", "Ana Torres", "Diego Flores", "Rosa Medina", "Jorge Salas", "Camila Vega", "Pedro Luna", "Elena Cruz", "Tomás Rivas", "Valeria Paz", "Hugo Ortiz"];
const productos: [string, Order["categoria"]][] = [
  ["Licencia Pro", "Software"],
  ["Teclado mecánico", "Hardware"],
  ["Consultoría 4 h", "Servicios"],
  ["Monitor 27 pulgadas", "Hardware"],
  ["Suscripción anual", "Software"],
  ["Capacitación equipo", "Servicios"],
];
const paises = ["Perú", "Chile", "México", "Colombia", "Argentina"];
const estados: Order["estado"][] = ["Pagado", "Pagado", "Pagado", "Pendiente", "Reembolsado"];

export const orders: Order[] = (() => {
  const rand = mulberry32(99);
  return Array.from({ length: 42 }, (_, i) => {
    const [producto, categoria] = productos[Math.floor(rand() * productos.length)];
    const day = 1 + Math.floor(rand() * 17);
    return {
      id: `ORD-${String(1001 + i)}`,
      cliente: clientes[Math.floor(rand() * clientes.length)],
      producto,
      categoria,
      monto: Math.round((40 + rand() * 1460) * 100) / 100,
      estado: estados[Math.floor(rand() * estados.length)],
      fecha: `2026-10-${String(day).padStart(2, "0")}`,
      pais: paises[Math.floor(rand() * paises.length)],
    };
  });
})();

export const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
