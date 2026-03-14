"use client";

import { useEffect, useRef } from "react";

interface Props {
  lines: string[];
}

export default function BuildLog({ lines }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section className="surface-card p-6">
      <div className="panel-header">
        <div>
          <div className="data-label">Build</div>
          <h2 className="mt-2 text-3xl leading-none">Build output</h2>
        </div>
        {lines.length > 0 && (
          <span className="data-label">{lines.length} lines</span>
        )}
      </div>

      <div
        ref={containerRef}
        className="terminal-feed max-h-[420px] overflow-y-auto p-4"
      >
        {lines.length === 0 ? (
          <div className="rounded-[18px] border border-dashed border-[var(--border-strong)] px-5 py-10 text-center">
            <p className="body-copy">No output yet.</p>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap break-words text-[13px] text-[var(--text)]">
            {lines.map((line, i) => (
              <div
                key={i}
                className={
                  line.includes("error:") || line.includes("Error:")
                    ? "text-red-700"
                    : line.includes("warning:")
                      ? "text-amber-700"
                    : line.startsWith("$")
                      ? "text-[var(--accent-strong)]"
                    : line.includes("BUILD SUCCEEDED") || line.includes("Build Succeeded")
                      ? "font-bold text-emerald-700"
                      : ""
                }
              >
                {line}
              </div>
            ))}
          </pre>
        )}
      </div>
    </section>
  );
}
