import { useSyncExternalStore } from "react";

// Carrito de piezas: cada participante elige las que usará en su dashboard.
// Vive en el navegador (localStorage) y se comparte entre todas las páginas.

export type CartRef = { label: string; url: string; note?: string };

export type CartItem = {
  /** Identificador: el archivo de la pieza, así no se repite aunque aparezca en dos páginas */
  key: string;
  title: string;
  description?: string;
  libName: string;
  libUrl: string;
  license: string;
  kind: string;
  install: string;
  file: string;
  steps: string[];
  refs: CartRef[];
};

export const MIN_ITEMS = 5;

const STORAGE_KEY = "ui-atlas-carrito";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (typeof window === "undefined") return;
  items = EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) items = parsed as CartItem[];
    }
  } catch {
    // Sin almacenamiento disponible: el carrito funciona solo mientras la página esté abierta.
  }
}

function ensureLoaded() {
  if (loaded) return;
  loaded = true;
  load();
}

function save() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignorar: ver comentario en load()
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      load(); // otra pestaña cambió el carrito
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  ensureLoaded();
  return items;
}

function getServerSnapshot() {
  return EMPTY;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Agrega la pieza si no está y la quita si ya estaba. Devuelve true si quedó agregada. */
export function toggleItem(item: CartItem): boolean {
  ensureLoaded();
  const exists = items.some((i) => i.key === item.key);
  items = exists ? items.filter((i) => i.key !== item.key) : [...items, item];
  save();
  emit();
  return !exists;
}

export function removeItem(key: string) {
  ensureLoaded();
  items = items.filter((i) => i.key !== key);
  save();
  emit();
}

export function clearCart() {
  items = EMPTY;
  save();
  emit();
}

export function cartCount() {
  ensureLoaded();
  return items.length;
}
