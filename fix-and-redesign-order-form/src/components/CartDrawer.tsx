import {
  ALL_PRODUCTS,
  DELIVERY_OPTIONS,
  formatR,
  WHATSAPP_NUMBER,
} from "../data/products";

interface Props {
  open: boolean;
  cart: Record<string, number>;
  deliveryIdx: number;
  onDeliveryChange: (idx: number) => void;
  onClose: () => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const productById = new Map(ALL_PRODUCTS.map((p) => [p.id, p]));

export default function CartDrawer({
  open,
  cart,
  deliveryIdx,
  onDeliveryChange,
  onClose,
  onInc,
  onDec,
  onRemove,
  onClear,
}: Props) {
  if (!open) return null;

  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  const lines = entries.map(([id, q]) => {
    const p = productById.get(id)!;
    return { p, q, line: q * p.price };
  });
  const subtotal = lines.reduce((s, l) => s + l.line, 0);
  const fee = entries.length ? DELIVERY_OPTIONS[deliveryIdx].fee : 0;
  const total = subtotal + fee;

  const sendToWhatsApp = () => {
    if (!lines.length) return;
    const textLines = lines.map(
      ({ p, q, line }) =>
        `▪️ ${q} x ${p.name}${p.pack ? ` (${p.pack})` : ""} @ ${formatR(p.price)} = ${formatR(line)}`
    );
    const msg = [
      "🛒 *NEW ORDER - Vertex Stream Retail*",
      "",
      "Hi! I would like to place this order:",
      "",
      ...textLines,
      "",
      `Subtotal: ${formatR(subtotal)}`,
      `Delivery (${DELIVERY_OPTIONS[deliveryIdx].label}): ${fee === 0 ? "FREE 🎉" : formatR(fee)}`,
      `*Total: ${formatR(total)}*`,
      "",
      "Please confirm availability and payment details. Thank you! 🙏",
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="animate-fade-in absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="animate-drawer-in relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-navy-900">Your Order</h2>
            <p className="text-xs text-slate-500">
              {lines.reduce((s, l) => s + l.q, 0)} item
              {lines.reduce((s, l) => s + l.q, 0) === 1 ? "" : "s"} selected
            </p>
          </div>
          <div className="flex items-center gap-2">
            {lines.length > 0 && (
              <button
                onClick={onClear}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <span className="text-5xl">🛒</span>
              <p className="font-semibold text-slate-700">Your basket is empty</p>
              <p className="text-sm text-slate-500">
                Tap “Add” on any product to start your order.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map(({ p, q, line }) => (
                <li
                  key={p.id}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {p.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {p.pack && `${p.pack} · `}
                      {formatR(p.price)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-1 rounded-lg bg-white p-0.5 shadow-sm">
                    <button
                      onClick={() => onDec(p.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 active:scale-90"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-navy-900">{q}</span>
                    <button
                      onClick={() => onInc(p.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-slate-600 transition hover:bg-slate-100 active:scale-90"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-20 text-right text-sm font-bold text-navy-900">
                    {formatR(line)}
                  </span>
                  <button
                    onClick={() => onRemove(p.id)}
                    aria-label={`Remove ${p.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d="M3 6h18M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 bg-white px-6 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-5">
          <label className="mb-3 block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Delivery distance
            </span>
            <div className="grid grid-cols-2 gap-2">
              {DELIVERY_OPTIONS.map((opt, i) => (
                <button
                  key={opt.label}
                  onClick={() => onDeliveryChange(i)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${
                    i === 0 ? "col-span-2 border-2" : ""
                  } ${
                    deliveryIdx === i
                      ? i === 0
                        ? "border-gold-brand bg-gold-brand/10 text-navy-900 ring-1 ring-gold-brand/50"
                        : "border-teal-brand bg-teal-brand/10 text-navy-900 ring-1 ring-teal-brand/40"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {i === 0 ? (
                    <span className="flex items-center justify-between">
                      <span>{opt.label}</span>
                      <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-0.5 text-[11px] font-extrabold text-white shadow-sm">
                        {opt.note}
                      </span>
                    </span>
                  ) : (
                    <>
                      {opt.label}
                      <span className="block text-[11px] font-bold text-teal-brand">
                        {opt.note}
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </label>

          <div className="mb-4 space-y-1 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery fee</span>
              {fee === 0 ? (
                <span className="font-bold text-emerald-600">FREE 🎉</span>
              ) : (
                <span>{formatR(fee)}</span>
              )}
            </div>
            <div className="flex justify-between border-t border-dashed border-slate-200 pt-2 font-display text-lg font-bold text-navy-900">
              <span>Total</span>
              <span>{formatR(total)}</span>
            </div>
          </div>

          <button
            onClick={sendToWhatsApp}
            disabled={!lines.length}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-6 py-4 font-display text-[15px] font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Confirm Order on WhatsApp
          </button>
          <p className="mt-2.5 text-center text-[11px] leading-relaxed text-slate-400">
            WhatsApp opens with your order pre-typed - just tap Send.
          </p>
        </div>
      </div>
    </div>
  );
}
