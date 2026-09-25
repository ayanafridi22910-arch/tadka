"use client";

/**
 * Add/Edit product — /dashboard/product/new aur /dashboard/product/:id.
 * Form: title, description, price ₹, cover image (file input → base64
 * preview), product file (naam store hota hai), Drop toggle → start/end
 * datetime + max qty. Save → localStorage → dashboard + storefront pe live.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useLang } from "@/components/language-provider";
import LangToggle from "@/components/lang-toggle";
import { useDemoDB, showToast } from "@/lib/store";
import { pageStrings } from "@/lib/i18n-pages";
import { makeId, toLocalInputValue } from "@/lib/utils";
import type { Product } from "@/lib/mock";

type FormState = {
  title: string;
  description: string;
  price: string;
  coverUrl: string | null;
  fileName: string | null;
  isDrop: boolean;
  dropStartsAt: string;
  dropEndsAt: string;
  maxQty: string;
  status: "published" | "draft";
};

const emptyForm: FormState = {
  title: "",
  description: "",
  price: "",
  coverUrl: null,
  fileName: null,
  isDrop: false,
  dropStartsAt: "",
  dropEndsAt: "",
  maxQty: "",
  status: "published",
};

export default function ProductFormPage() {
  const { lang } = useLang();
  const t = pageStrings[lang];
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const isNew = params.id === "new";
  const { db, mutate, ready } = useDemoDB();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<string[]>([]);
  const [loadedId, setLoadedId] = useState<string | null>(null);

  // Existing product load (edit mode) — ek hi baar
  useEffect(() => {
    if (!ready || !db || isNew || loadedId === params.id) return;
    const p = db.products.find((x) => x.id === params.id);
    if (p) {
      setForm({
        title: p.title,
        description: p.description,
        price: String(p.price),
        coverUrl: p.coverUrl,
        fileName: p.fileName,
        isDrop: p.isDrop,
        dropStartsAt: p.dropStartsAt ? toLocalInputValue(new Date(p.dropStartsAt)) : "",
        dropEndsAt: p.dropEndsAt ? toLocalInputValue(new Date(p.dropEndsAt)) : "",
        maxQty: p.maxQty ? String(p.maxQty) : "",
        status: p.status,
      });
    }
    setLoadedId(params.id);
  }, [ready, db, isNew, params.id, loadedId]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onCoverChange = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set("coverUrl", String(reader.result));
    reader.readAsDataURL(file);
  };

  const onFileChange = (file: File | undefined) => {
    if (!file) return;
    set("fileName", file.name);
  };

  const validate = (status: "published" | "draft"): string[] => {
    const errs: string[] = [];
    if (form.title.trim().length < 3) errs.push(t.form.errTitle);
    if (status === "published" && (!Number(form.price) || Number(form.price) < 1)) errs.push(t.form.errPrice);
    if (form.isDrop && form.dropStartsAt && form.dropEndsAt && new Date(form.dropEndsAt) <= new Date(form.dropStartsAt)) {
      errs.push(t.form.errDates);
    }
    return errs;
  };

  const save = (status: "published" | "draft") => {
    const errs = validate(status);
    if (errs.length) {
      setErrors(errs);
      showToast("error", errs[0]);
      return;
    }
    setErrors([]);

    mutate((draft) => {
      if (isNew) {
        const product: Product = {
          id: "p-" + makeId().slice(4),
          creatorId: "c-ayan",
          title: form.title.trim(),
          description: form.description.trim() || "—",
          price: Number(form.price) || 0,
          coverUrl: form.coverUrl,
          fileName: form.fileName ?? "sample.pdf",
          isDrop: form.isDrop,
          dropStartsAt: form.isDrop && form.dropStartsAt ? new Date(form.dropStartsAt).toISOString() : null,
          dropEndsAt: form.isDrop && form.dropEndsAt ? new Date(form.dropEndsAt).toISOString() : null,
          maxQty: form.isDrop && form.maxQty ? Number(form.maxQty) : null,
          soldQty: 0,
          views: 0,
          status,
          createdAt: new Date().toISOString(),
        };
        draft.products.unshift(product);
      } else {
        const p = draft.products.find((x) => x.id === params.id);
        if (p) {
          p.title = form.title.trim();
          p.description = form.description.trim() || "—";
          p.price = Number(form.price) || p.price;
          p.coverUrl = form.coverUrl;
          p.fileName = form.fileName ?? p.fileName;
          p.isDrop = form.isDrop;
          p.dropStartsAt = form.isDrop && form.dropStartsAt ? new Date(form.dropStartsAt).toISOString() : null;
          p.dropEndsAt = form.isDrop && form.dropEndsAt ? new Date(form.dropEndsAt).toISOString() : null;
          p.maxQty = form.isDrop && form.maxQty ? Number(form.maxQty) : null;
          p.status = status;
        }
      }
      return draft;
    });

    showToast("success", isNew
      ? status === "published" ? t.form.savedToast : t.form.draftSavedToast
      : t.form.updatedToast);
    router.push("/dashboard");
  };

  const heading = useMemo(() => (isNew ? t.form.newTitle : t.form.editTitle), [isNew, t.form.newTitle, t.form.editTitle]);

  if (!ready || !db) {
    return <div className="flex min-h-screen items-center justify-center text-muted">…</div>;
  }

  const inputCls =
    "h-12 w-full rounded-btn border border-line bg-white px-4 text-[15px] outline-none transition focus:border-primary";
  const labelCls = "text-sm font-semibold";

  return (
    <main className="min-h-screen bg-surface pb-20">
      {/* Topbar */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/dashboard" className="flex items-center gap-2 text-[15px] font-semibold text-muted transition hover:text-ink">
            {t.common.back}
          </Link>
          <LangToggle />
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="text-[20px] font-bold md:text-[24px]">{heading}</h1>

        <div className="mt-6 space-y-5 rounded-card border border-line bg-white p-5 shadow-soft sm:p-6">
          {/* Title */}
          <div>
            <label htmlFor="p-title" className={labelCls}>{t.form.title} *</label>
            <input
              id="p-title"
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder={t.form.titlePh}
              className={`${inputCls} mt-1.5`}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="p-desc" className={labelCls}>{t.form.desc}</label>
            <textarea
              id="p-desc"
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={t.form.descPh}
              className="mt-1.5 w-full rounded-card border border-line bg-white px-4 py-3 text-[15px] outline-none transition focus:border-primary"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="p-price" className={labelCls}>{t.form.price} *</label>
            <input
              id="p-price"
              type="number"
              min={1}
              inputMode="numeric"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder={t.form.pricePh}
              className={`${inputCls} mt-1.5`}
            />
            <p className="mt-1 text-[13px] text-muted">{t.form.priceNote}</p>
          </div>

          {/* Cover image upload + preview */}
          <div>
            <span className={labelCls}>{t.form.cover}</span>
            <label
              htmlFor="p-cover"
              className="mt-1.5 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-btn border border-dashed border-line bg-surface text-[15px] font-semibold text-primary transition hover:bg-primary/5"
            >
              🖼️ {form.coverUrl ? (lang === "hi" ? "Image badlo" : "Change image") : lang === "hi" ? "Image chuno" : "Choose image"}
            </label>
            <input id="p-cover" type="file" accept="image/*" className="hidden" onChange={(e) => onCoverChange(e.target.files?.[0])} />
            <p className="mt-1 text-[13px] text-muted">{t.form.coverHint}</p>
            {form.coverUrl && (
              <div className="mt-3 flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.coverUrl} alt="Preview" className="h-28 w-44 rounded-card border border-line object-cover" />
                <button type="button" onClick={() => set("coverUrl", null)} className="text-[13px] font-semibold text-error transition hover:underline">
                  {t.form.removeCover}
                </button>
              </div>
            )}
          </div>

          {/* Product file */}
          <div>
            <span className={labelCls}>{t.form.file}</span>
            <label
              htmlFor="p-file"
              className="mt-1.5 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-btn border border-dashed border-line bg-surface text-[15px] font-semibold text-primary transition hover:bg-primary/5"
            >
              📄 {form.fileName ?? (lang === "hi" ? "File chuno" : "Choose file")}
            </label>
            <input id="p-file" type="file" className="hidden" onChange={(e) => onFileChange(e.target.files?.[0])} />
            <p className="mt-1 text-[13px] text-muted">{t.form.fileHint}</p>
          </div>

          {/* Drop settings */}
          <div className="rounded-card border border-accent/30 bg-accent/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[15px] font-bold">{t.form.dropTitle}</h2>
                <p className="mt-0.5 text-[13px] text-muted">{t.form.dropHint}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.isDrop}
                onClick={() => set("isDrop", !form.isDrop)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${form.isDrop ? "bg-accent" : "bg-line"}`}
              >
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${form.isDrop ? "left-6" : "left-1"}`} />
              </button>
            </div>

            {form.isDrop && (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor="d-start" className="text-[13px] font-semibold">{t.form.dropStart}</label>
                  <input
                    id="d-start" type="datetime-local" value={form.dropStartsAt}
                    onChange={(e) => set("dropStartsAt", e.target.value)}
                    className={`${inputCls} mt-1 px-2 text-[13px]`}
                  />
                </div>
                <div>
                  <label htmlFor="d-end" className="text-[13px] font-semibold">{t.form.dropEnd}</label>
                  <input
                    id="d-end" type="datetime-local" value={form.dropEndsAt}
                    onChange={(e) => set("dropEndsAt", e.target.value)}
                    className={`${inputCls} mt-1 px-2 text-[13px]`}
                  />
                </div>
                <div>
                  <label htmlFor="d-qty" className="text-[13px] font-semibold">{t.form.maxQty}</label>
                  <input
                    id="d-qty" type="number" min={1} placeholder="50" value={form.maxQty}
                    onChange={(e) => set("maxQty", e.target.value)}
                    className={`${inputCls} mt-1 px-2 text-[13px]`}
                  />
                  <p className="mt-1 text-[12px] text-muted">{t.form.maxQtyHint}</p>
                </div>
              </div>
            )}
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div className="rounded-btn border border-error/30 bg-error/5 p-3 text-[13px] font-semibold text-error">
              {errors.map((e) => <p key={e}>❌ {e}</p>)}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => save("draft")} className="h-12 flex-1 rounded-btn border border-primary bg-white px-5 text-[15px] font-semibold text-primary transition hover:bg-primary/5">
              {t.form.saveDraft}
            </button>
            <button type="button" onClick={() => save("published")} className="h-12 flex-1 rounded-btn bg-primary px-5 text-[15px] font-semibold text-white shadow-btn transition hover:bg-primary-dark active:scale-[0.98]">
              {isNew || form.status === "draft" ? t.form.publish : t.form.update}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
