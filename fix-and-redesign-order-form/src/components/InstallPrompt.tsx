import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "vsr-install-dismissed";

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as unknown as { standalone?: boolean }).standalone === true;

const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) &&
  !/crios|fxios/i.test(navigator.userAgent);

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    if (isStandalone() || sessionStorage.getItem(DISMISS_KEY)) return;

    if (isIOS()) {
      setIos(true);
      const t = setTimeout(() => setShowBanner(true), 2500);
      return () => clearTimeout(t);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    setShowBanner(false);
    setShowIOSHelp(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  const install = async () => {
    if (ios) {
      setShowIOSHelp(true);
      return;
    }
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") setShowBanner(false);
    setDeferred(null);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Install banner */}
      <div className="animate-float-up fixed inset-x-0 top-[68px] z-50 px-4 pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-white/10 bg-navy-900/95 p-3 shadow-2xl shadow-navy-950/50 backdrop-blur-md">
          <img src="/icons/icon.svg" alt="" className="h-11 w-11 rounded-xl" />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-sm font-bold text-white">Get the Vertex Stream app</p>
            <p className="text-[11px] text-slate-400">
              Free, instant & works offline
            </p>
          </div>
          <button
            onClick={install}
            className="shrink-0 rounded-xl bg-gradient-to-r from-teal-brand to-emerald-500 px-4 py-2 text-xs font-extrabold text-white shadow-lg shadow-teal-brand/30 transition active:scale-95"
          >
            Install
          </button>
          <button
            onClick={dismiss}
            aria-label="Dismiss install banner"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* iOS how-to sheet */}
      {showIOSHelp && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div
            className="animate-fade-in absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={dismiss}
          />
          <div className="animate-drawer-in relative w-full max-w-md rounded-t-3xl bg-white p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-slate-200" />
            <div className="mb-5 flex items-center gap-3">
              <img src="/icons/icon.svg" alt="" className="h-12 w-12 rounded-2xl shadow-md" />
              <div>
                <p className="font-display text-base font-bold text-navy-900">
                  Install Vertex Stream
                </p>
                <p className="text-xs text-slate-500">Add to your iPhone Home Screen</p>
              </div>
            </div>
            <ol className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-brand/10 text-sm font-extrabold text-teal-brand">1</span>
                <p className="text-sm text-slate-700">
                  Tap the <strong>Share</strong> button{" "}
                  <svg className="inline h-4 w-4 -translate-y-0.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                  </svg>{" "}
                  in Safari's toolbar
                </p>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-brand/10 text-sm font-extrabold text-teal-brand">2</span>
                <p className="text-sm text-slate-700">
                  Scroll down and tap <strong>Add to Home Screen</strong>{" "}
                  <svg className="inline h-4 w-4 -translate-y-0.5 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="4" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                </p>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-brand/10 text-sm font-extrabold text-teal-brand">3</span>
                <p className="text-sm text-slate-700">
                  Tap <strong>Add</strong> - the app appears on your Home Screen 🎉
                </p>
              </li>
            </ol>
            <button
              onClick={dismiss}
              className="mt-6 w-full rounded-2xl bg-navy-900 py-3.5 text-sm font-bold text-white transition active:scale-[0.98]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
