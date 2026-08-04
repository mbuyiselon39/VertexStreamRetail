import { useMemo, useState } from "react";
import {
  CATEGORIES,
  DELIVERY_OPTIONS,
  formatR,
  PHONE_NUMBER,
  WHATSAPP_NUMBER,
} from "./data/products";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import InstallPrompt from "./components/InstallPrompt";

export default function App() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [deliveryIdx, setDeliveryIdx] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);

  const setQty = (id: string, qty: number) =>
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const priceById = useMemo(() => {
    const m = new Map<string, number>();
    CATEGORIES.forEach((c) => c.items.forEach((p) => m.set(p.id, p.price)));
    return m;
  }, []);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let sub = 0;
    for (const [id, q] of Object.entries(cart)) {
      count += q;
      sub += q * (priceById.get(id) ?? 0);
    }
    return { itemCount: count, subtotal: sub };
  }, [cart, priceById]);

  const fee = itemCount > 0 ? DELIVERY_OPTIONS[deliveryIdx].fee : 0;
  const total = subtotal + fee;

  const q = query.trim().toLowerCase();
  const visibleCategories = useMemo(() => {
    if (!q) return CATEGORIES;
    return CATEGORIES.map((c) => ({
      ...c,
      items: c.items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.pack.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q)
      ),
    })).filter((c) => c.items.length > 0);
  }, [q]);

  const scrollToCat = (id: string) => {
    setActiveCat(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen pb-32">
      {/* ── Top bar ─────────────────────────────────────── */}
      <InstallPrompt />
      <header className="pt-safe sticky top-0 z-40 border-b border-white/10 bg-navy-900/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-brand to-emerald-600 font-display text-lg font-extrabold text-white shadow-lg shadow-teal-brand/30">
              V
            </div>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-bold text-white sm:text-base">
                Vertex Stream Retail
              </p>
              <p className="text-[11px] font-medium text-teal-300">
                Pay less. Live more.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="hidden items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-white/10 sm:inline-flex"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call us
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-3.5 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:brightness-105"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-950">
        <img
          src="/images/hero.jpg"
          alt="Wholesale groceries"
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/80 to-navy-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div className="animate-float-up max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-brand/40 bg-teal-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-teal-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300" />
              Wholesale prices · Order on WhatsApp
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">
              Stock up for less with{" "}
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-gold-brand bg-clip-text text-transparent">
                Vertex Stream
              </span>
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg">
              Browse our catalogue, build your basket, and confirm your whole
              order in one WhatsApp message. Now delivering up to 60&nbsp;km.
            </p>
            <div className="mt-8 flex flex-wrap items-stretch gap-3">
              <div className="flex items-center gap-3 rounded-2xl border-2 border-gold-brand/60 bg-gradient-to-r from-gold-brand/20 to-orange-brand/10 px-5 py-3 backdrop-blur-sm">
                <span className="text-2xl">🎉</span>
                <div className="leading-tight">
                  <p className="font-display text-base font-extrabold text-gold-brand">
                    FREE DELIVERY
                  </p>
                  <p className="text-[11px] font-semibold text-amber-100">
                    within 25 km of the store
                  </p>
                </div>
              </div>
              {[
                { d: "25.5 - 30 km", f: "R15" },
                { d: "30.5 - 40 km", f: "R20" },
                { d: "40.5 - 60 km", f: "R50" },
              ].map((x) => (
                <div
                  key={x.d}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm"
                >
                  <span className="text-lg">🚚</span>
                  <div className="leading-tight">
                    <p className="text-[11px] font-medium text-slate-400">{x.d}</p>
                    <p className="text-sm font-bold text-gold-brand">{x.f} delivery</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Category nav + search ────────────────────────── */}
      <div className="sticky top-[calc(65px+env(safe-area-inset-top))] z-30 border-b border-slate-200/70 bg-white/90 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:max-w-xs">
              <svg
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                inputMode="search"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-base font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-brand focus:bg-white focus:ring-2 focus:ring-teal-brand/20 sm:text-sm"
              />
            </div>
            <div className="no-scrollbar hidden flex-1 gap-2 overflow-x-auto sm:flex">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => scrollToCat(c.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                    activeCat === c.id
                      ? "bg-navy-900 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c.emoji} {c.title}
                </button>
              ))}
            </div>
          </div>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto sm:hidden">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => scrollToCat(c.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                  activeCat === c.id
                    ? "bg-navy-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {c.emoji} {c.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Catalogue ────────────────────────────────────── */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        {visibleCategories.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <span className="text-5xl">🔍</span>
            <p className="font-display text-lg font-bold text-slate-700">
              No products match “{query}”
            </p>
            <button
              onClick={() => setQuery("")}
              className="rounded-xl bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-brand"
            >
              Clear search
            </button>
          </div>
        )}

        {visibleCategories.map((cat) => (
          <section key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-40 pb-12">
            <div className="mb-5 flex items-center gap-3">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.accent} text-xl shadow-md`}
              >
                {cat.emoji}
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-navy-900 sm:text-2xl">
                  {cat.title}
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  {cat.items.length} product{cat.items.length === 1 ? "" : "s"}
                </p>
              </div>
              <span className="ml-2 h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  accent={cat.accent}
                  qty={cart[prod.id] ?? 0}
                  onAdd={() => setQty(prod.id, 1)}
                  onInc={() => setQty(prod.id, (cart[prod.id] ?? 0) + 1)}
                  onDec={() => setQty(prod.id, (cart[prod.id] ?? 0) - 1)}
                />
              ))}
            </div>
          </section>
        ))}

        {/* footer */}
        <footer className="mt-4 rounded-3xl bg-navy-900 p-8 text-center sm:p-10">
          <p className="font-display text-lg font-bold text-white">
            Vertex Stream Retail
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
            Deliveries: <span className="font-bold text-gold-brand">FREE within 25 km</span> ·
            R15 for 25.5-30 km · R20 for 30.5-40 km · R50 for 40.5-60 km. Or
            collect in store.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              📞 +27 67 840 3363
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-105"
            >
              💬 +27 71 063 8878
            </a>
          </div>
        </footer>
      </main>

      {/* ── Sticky cart bar ──────────────────────────────── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ${
          itemCount > 0 ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex w-full items-center justify-between gap-4 rounded-2xl bg-navy-900 px-5 py-4 text-white shadow-2xl shadow-navy-950/40 ring-1 ring-white/10 transition hover:bg-navy-800 active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-teal-brand/20 text-xl">
                🛒
                <span className="animate-pop absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-brand px-1 text-[11px] font-extrabold">
                  {itemCount}
                </span>
              </span>
              <div className="text-left leading-tight">
                <p className="text-[11px] font-medium text-slate-400">
                  {itemCount} item{itemCount === 1 ? "" : "s"} ·{" "}
                  {fee === 0 ? (
                    <span className="font-bold text-gold-brand">FREE delivery 🎉</span>
                  ) : (
                    <>delivery {formatR(fee)}</>
                  )}
                </p>
                <p className="font-display text-lg font-bold">{formatR(total)}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] px-4 py-2.5 text-sm font-bold shadow-lg shadow-emerald-500/25 sm:px-6">
              Review & Send
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <CartDrawer
        open={drawerOpen}
        cart={cart}
        deliveryIdx={deliveryIdx}
        onDeliveryChange={setDeliveryIdx}
        onClose={() => setDrawerOpen(false)}
        onInc={(id) => setQty(id, (cart[id] ?? 0) + 1)}
        onDec={(id) => setQty(id, (cart[id] ?? 0) - 1)}
        onRemove={(id) => setQty(id, 0)}
        onClear={() => setCart({})}
      />
    </div>
  );
}
