"use client";

import { useEffect, useRef } from "react";
import type { ToolCall } from "@/lib/types";

interface Props {
  toolCalls: ToolCall[];
}

const TOOL_ICONS: Record<string, string> = {
  create_file: "WRITE",
  read_file: "READ",
  list_files: "LIST",
  execute_command: "EXEC",
  get_screenshot: "SHOT",
  get_sandbox_status: "STAT",
  create_xcode_project: "INIT",
};

export default function AgentActivity({ toolCalls }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [toolCalls]);

  return (
    <section className="surface-card p-6">
      <div className="panel-header">
        <div>
          <div className="data-label">Activity</div>
          <h2 className="mt-2 text-3xl leading-none">Agent timeline</h2>
        </div>
        {toolCalls.length > 0 && (
          <span className="data-label">{toolCalls.length} tool calls</span>
        )}
      </div>

      <div ref={containerRef} className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {toolCalls.length === 0 ? (
          <div className="rounded-[22px] border border-dashed border-[var(--border-strong)] px-5 py-10 text-center">
            <p className="body-copy">Tool calls from the active sandbox session show up here.</p>
          </div>
        ) : (
          toolCalls.map((tc) => (
            <div
              key={tc.id}
              className="rounded-[22px] border border-[var(--border)] bg-white/76 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="mono-inline text-[11px] tracking-[0.18em] text-[var(--muted)]">
                  {TOOL_ICONS[tc.name] || "TOOL"}
                </span>
                <span className="text-sm font-semibold">{tc.name}</span>
                <span
                  className={`ml-auto rounded-full px-3 py-1 text-[11px] font-semibold ${
                    tc.status === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : tc.status === "error"
                        ? "bg-red-50 text-red-700"
                      : tc.status === "running"
                        ? "bg-orange-50 text-orange-700"
                        : "bg-stone-100 text-[var(--muted)]"
                  }`}
                >
                  {tc.status}
                </span>
              </div>
              <div className="body-copy mt-3 truncate text-sm">
                {tc.name === "create_file" && (tc.args as { path?: string }).path}
                {tc.name === "read_file" && (tc.args as { path?: string }).path}
                {tc.name === "execute_command" && (
                  <span className="mono-inline">
                    $ {((tc.args as { command?: string }).command || "").slice(0, 80)}
                  </span>
                )}
                {tc.name === "create_xcode_project" && (tc.args as { name?: string }).name}
                {tc.name === "list_files" && ((tc.args as { path?: string }).path || ".")}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
