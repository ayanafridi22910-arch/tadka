"use client";

/** Confirm dialog — "Pakka delete karna hai?" wala modal. */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button aria-label="Close" className="absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={onCancel} />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-sm rounded-card border border-line bg-white p-6 shadow-card"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-2xl" aria-hidden>
          🗑️
        </div>
        <h3 className="mt-4 text-lg font-bold">{title}</h3>
        <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{message}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
          <button
            type="button"
            onClick={onConfirm}
            className="h-12 flex-1 rounded-btn bg-error px-5 text-[15px] font-semibold text-white transition hover:bg-error/90 active:scale-[0.98]"
          >
            {confirmLabel}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="h-12 flex-1 rounded-btn border border-line bg-white px-5 text-[15px] font-semibold text-ink transition hover:bg-surface active:scale-[0.98]"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
