import { formatR, type Product } from "../data/products";

interface Props {
  product: Product;
  accent: string;
  qty: number;
  onAdd: () => void;
  onInc: () => void;
  onDec: () => void;
}

export default function ProductCard({ product, accent, qty, onAdd, onInc, onDec }: Props) {
  const selected = qty > 0;
  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        selected
          ? "border-teal-brand/60 ring-2 ring-teal-brand/25 shadow-teal-brand/10"
          : "border-slate-200/80 hover:border-slate-300"
      }`}
    >
      {/* accent bar */}
      <span
        className={`absolute inset-x-4 top-0 h-1 rounded-b-full bg-gradient-to-r ${accent} opacity-70 transition-opacity group-hover:opacity-100`}
      />

      <div className="mb-3 flex items-start justify-between gap-2 pt-1">
        <h3 className="text-[15px] font-semibold leading-snug text-slate-800">
          {product.name}
        </h3>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {product.pack && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-slate-600">
              {product.pack}
            </span>
          )}
          {selected && (
            <span className="animate-pop inline-flex items-center gap-1 rounded-full bg-teal-brand px-2 py-0.5 text-[10px] font-extrabold text-white">
              <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              In basket
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="font-display text-lg font-bold text-navy-900">
          {formatR(product.price)}
        </span>

        {!selected ? (
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 rounded-xl bg-navy-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-teal-brand active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add
          </button>
        ) : (
          <div className="animate-pop flex items-center gap-1 rounded-xl bg-teal-brand/10 p-1">
            <button
              onClick={onDec}
              aria-label={`Decrease quantity of ${product.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-navy-900 shadow-sm transition hover:bg-slate-50 active:scale-90"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                <path d="M5 12h14" />
              </svg>
            </button>
            <span className="w-8 text-center text-sm font-bold text-navy-900">{qty}</span>
            <button
              onClick={onInc}
              aria-label={`Increase quantity of ${product.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-brand text-white shadow-sm transition hover:brightness-110 active:scale-90"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
