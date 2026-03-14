"use client";

import { useEffect, useState } from "react";
import type { SandboxStatus } from "@/lib/types";

export default function ConnectionStatus() {
  const [status, setStatus] = useState<SandboxStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  const checkStatus = async () => {
    try {
      const res = await fetch("/api/sandbox?endpoint=/status");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStatus(data);
      setError(null);
    } catch (err) {
      setStatus(null);
      setError(err instanceof Error ? err.message : "Connection failed");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    void checkStatus();
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const connected = status !== null;

  return (
    <section className="surface-card p-6">
      <div className="panel-header">
        <div>
          <div className="data-label">Sandbox</div>
          <h2 className="mt-2 text-3xl leading-none">Connection state</h2>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-white/72 px-4 py-2">
          <span className={`status-dot ${connected ? "status-dot--live" : "status-dot--down"}`} />
          <span className="text-sm font-semibold">
            {checking ? "Checking..." : connected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {checking ? (
          <div className="rounded-[22px] border border-dashed border-[var(--border-strong)] px-5 py-8 md:col-span-2">
            <p className="body-copy">Checking the remote sandbox status.</p>
          </div>
        ) : connected ? (
          <>
            <div className="rounded-[22px] border border-[var(--border)] bg-white/72 p-5">
              <div className="data-label">Environment</div>
              <p className="mt-3 text-lg font-semibold">macOS {status.macos_version}</p>
              <p className="body-copy mt-2">{status.xcode.split("\n")[0]}</p>
            </div>
            <div className="rounded-[22px] border border-[var(--border)] bg-white/72 p-5">
              <div className="data-label">Simulator</div>
              <p className="mt-3 text-lg font-semibold">
                {status.booted_simulators.length > 0
                  ? status.booted_simulators.map((simulator) => simulator.name).join(", ")
                  : "No booted simulator"}
              </p>
              <p className="body-copy mt-2">Disk: {status.disk}</p>
            </div>
            <div className="rounded-[22px] border border-[var(--border)] bg-white/72 p-5 md:col-span-2">
              <div className="data-label">Project root</div>
              <p className="mono-inline mt-3 break-all">{status.project_root}</p>
            </div>
          </>
        ) : (
          <div className="rounded-[22px] border border-[rgba(199,70,47,0.2)] bg-red-50/70 px-5 py-8 md:col-span-2">
            <p className="text-sm font-semibold text-red-700">Sandbox unreachable</p>
            <p className="body-copy mt-2">{error}</p>
          </div>
        )}
      </div>

      <button
        onClick={() => {
          setChecking(true);
          void checkStatus();
        }}
        className="button-secondary mt-5"
      >
        Refresh status
      </button>
    </section>
  );
}
