"use client";

import { useState } from "react";
import AgentActivity from "@/components/AgentActivity";
import BuildLog from "@/components/BuildLog";
import ChatInterface from "@/components/ChatInterface";
import ConnectionStatus from "@/components/ConnectionStatus";
import ScreenshotPanel from "@/components/ScreenshotPanel";
import CiderIcon from "@/components/CiderIcon";
import type { ToolCall } from "@/lib/types";

const quickLinks = [
  "cider create",
  'cider create --repo "url"',
  "cider [ID] --emulator ios",
  "cider [ID] --google",
];

export default function DashboardShell() {
  const [toolCalls, setToolCalls] = useState<ToolCall[]>([]);
  const [buildLines, setBuildLines] = useState<string[]>([]);

  function handleToolCall(toolCall: ToolCall) {
    setToolCalls((previous) => {
      const index = previous.findIndex((entry) => entry.id === toolCall.id);
      if (index >= 0) {
        const updated = [...previous];
        updated[index] = toolCall;
        return updated;
      }

      return [...previous, toolCall];
    });
  }

  function handleBuildOutput(output: string) {
    const nextLines = output.split("\n").filter((line) => line.trim());
    setBuildLines((previous) => [...previous, ...nextLines]);
  }

  const successfulCalls = toolCalls.filter((toolCall) => toolCall.status === "success").length;

  return (
    <>
      <section className="mt-8 dashboard-grid">
        <div className="space-y-6">
          <div className="border-b border-[var(--border)] pb-8">
            <div className="flex items-center gap-3">
              <CiderIcon size={28} />
              <span className="eyebrow">Dashboard</span>
            </div>
            <h1 className="section-title mt-6 max-w-3xl">
              Simple visibility into sandbox state, build activity, and the simulator.
            </h1>
            <p className="body-copy mt-5 max-w-2xl text-lg">
              This is the operational surface behind the CLI. It stays focused on the few
              things that matter once a sandbox exists.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickLinks.map((command) => (
                <div key={command} className="border-t border-[var(--border)] pt-3">
                  <div className="data-label">CLI</div>
                  <div className="mono-inline mt-2">{command}</div>
                </div>
              ))}
            </div>
          </div>

          <ConnectionStatus />
          <ChatInterface onToolCall={handleToolCall} onBuildOutput={handleBuildOutput} />
        </div>

        <div className="space-y-6">
          <div className="surface-card p-6">
            <div className="data-label">Session</div>
            <h2 className="mt-3 text-3xl leading-none">At a glance</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[12px] border border-[var(--border)] p-5">
                <div className="data-label">Tool calls</div>
                <p className="mt-3 text-4xl leading-none">{toolCalls.length}</p>
              </div>
              <div className="rounded-[12px] border border-[var(--border)] p-5">
                <div className="data-label">Completed</div>
                <p className="mt-3 text-4xl leading-none">{successfulCalls}</p>
              </div>
              <div className="rounded-[12px] border border-[var(--border)] p-5 sm:col-span-2">
                <div className="data-label">Build lines streamed</div>
                <p className="mt-3 text-4xl leading-none">{buildLines.length}</p>
              </div>
            </div>
          </div>

          <ScreenshotPanel />
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <BuildLog lines={buildLines} />
        <AgentActivity toolCalls={toolCalls} />
      </section>
    </>
  );
}
