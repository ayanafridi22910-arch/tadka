"use client";

/**
 * Demo store — saara data localStorage mein.
 * demo-build-prompt rule #2: "Products created in dashboard must persist
 * after refresh (localStorage)." Koi backend nahi.
 */

import { useEffect, useState, useCallback } from "react";
import { seedData, type TadkaDB, type Product, type Creator, type Order, DEMO_CREATOR_ID } from "./mock";

const DB_KEY = "tadka-db-v1";
const SESSION_KEY = "tadka-session";

function readDb(): TadkaDB {
  try {
    const raw = window.localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw) as TadkaDB;
  } catch {
    /* corrupt ho to reseed */
  }
  const db = seedData();
  try {
    window.localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch {
    /* storage full — demo chal jayega bina persist ke */
  }
  return db;
}

function writeDb(db: TadkaDB) {
  try {
    window.localStorage.setItem(DB_KEY, JSON.stringify(db));
  } catch {
    /* quota — ignore in demo */
  }
}

/** Naya database object → localStorage save + re-render trigger. */
export function useDemoDB() {
  const [db, setDb] = useState<TadkaDB | null>(null);

  useEffect(() => {
    setDb(readDb());
  }, []);

  const mutate = useCallback((fn: (db: TadkaDB) => TadkaDB) => {
    setDb((prev) => {
      if (!prev) return prev;
      const next = fn(structuredClone(prev));
      writeDb(next);
      return next;
    });
  }, []);

  return { db, mutate, ready: db !== null };
}

/* ---------------- Session (demo login) ---------------- */

export function getSession(): Creator | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Creator) : null;
  } catch {
    return null;
  }
}

export function loginDemo(): Creator {
  const creator = readDb().creators.find((c) => c.id === DEMO_CREATOR_ID)!;
  window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(creator));
  return creator;
}

export function logoutDemo() {
  window.sessionStorage.removeItem(SESSION_KEY);
}

/** Login hua creator ya null — mount ke baad hi bharosa karo. */
export function useSession() {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setCreator(getSession());
    setLoaded(true);
  }, []);
  return { creator, loaded };
}

/* ---------------- Toasts ---------------- */

export type ToastKind = "success" | "error" | "info";
export type Toast = { id: number; kind: ToastKind; message: string };

/** Global toast bus — kahin se bhi showToast(kind, message) call karo. */
type Listener = (t: Toast) => void;
let toastListener: Listener | null = null;
let toastId = 0;

export function showToast(kind: ToastKind, message: string) {
  toastListener?.({ id: ++toastId, kind, message });
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    toastListener = (t) => {
      setToasts((prev) => [...prev, t]);
      setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== t.id)), 3200);
    };
    return () => {
      toastListener = null;
    };
  }, []);

  const styles: Record<ToastKind, string> = {
    success: "bg-success text-white",
    error: "bg-error text-white",
    info: "bg-ink text-white",
  };
  const icons: Record<ToastKind, string> = { success: "✅", error: "❌", info: "ℹ️" };

  return (
    <>
      {children}
      <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`animate-toast pointer-events-auto flex w-full max-w-sm items-center gap-2 rounded-btn px-4 py-3 text-[15px] font-semibold shadow-card ${styles[t.kind]}`}
          >
            <span aria-hidden>{icons[t.kind]}</span>
            <span>{t.message}</span>
          </div>
          ))}
      </div>
    </>
  );
}

/** Copy + toast confirm — referral link, share links waghera. */
export async function copyText(text: string, toastMsg: string) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("success", toastMsg);
  } catch {
    // Fallback for http://localhost — clipboard API sometimes restricted
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast("success", toastMsg);
  }
}
