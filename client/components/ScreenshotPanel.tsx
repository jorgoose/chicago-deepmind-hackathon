"use client";

import { useState, useCallback } from "react";

export default function ScreenshotPanel() {
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureScreenshot = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sandbox?endpoint=/screenshot");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("image/")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setScreenshotUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return url;
        });
      } else {
        const data = await res.json();
        throw new Error(data.error || "No screenshot available");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to capture");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <section className="surface-card p-6">
      <div className="panel-header">
        <div>
          <div className="data-label">Preview</div>
          <h2 className="mt-2 text-3xl leading-none">Simulator</h2>
        </div>
        <button
          onClick={captureScreenshot}
          disabled={loading}
          className="button-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Capturing..." : "Capture screenshot"}
        </button>
      </div>

      <div className="rounded-[28px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(243,222,205,0.55))] p-6">
        {screenshotUrl ? (
          <div className="mx-auto max-w-[300px] rounded-[36px] border border-[var(--border-strong)] bg-white p-3 shadow-[0_24px_80px_rgba(114,90,73,0.18)]">
            <div className="aspect-[9/19.5] overflow-hidden rounded-[28px] border border-[var(--border)] bg-stone-100">
              <img
                src={screenshotUrl}
                alt="iOS Simulator screenshot"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        ) : error ? (
          <div className="rounded-[22px] border border-[rgba(199,70,47,0.2)] bg-red-50/70 px-5 py-8 text-center">
            <p className="text-sm font-semibold text-red-700">{error}</p>
            <p className="body-copy mt-2">Make sure a simulator is booted before capturing.</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto flex max-w-[300px] items-center justify-center rounded-[36px] border border-dashed border-[var(--border-strong)] bg-white/74 p-3 shadow-[0_24px_80px_rgba(114,90,73,0.1)]">
              <div className="flex aspect-[9/19.5] w-full items-center justify-center rounded-[28px] border border-dashed border-[var(--border-strong)] bg-[var(--surface-muted)]">
                <span className="data-label">No screenshot yet</span>
              </div>
            </div>
            <p className="body-copy mt-4">
              Capture the current simulator once the app has been built and launched.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
