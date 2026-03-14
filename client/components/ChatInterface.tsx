"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage, ToolCall } from "@/lib/types";
import CiderIcon from "./CiderIcon";

interface Props {
  onToolCall?: (toolCall: ToolCall) => void;
  onBuildOutput?: (line: string) => void;
}

export default function ChatInterface({ onToolCall, onBuildOutput }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendPrompt = async () => {
    const prompt = input.trim();
    if (!prompt || isRunning) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsRunning(true);

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Agent error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));
            handleEvent(event);
          } catch {
            // skip malformed events
          }
        }
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "system",
        content: `Error: ${err instanceof Error ? err.message : String(err)}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsRunning(false);
    }
  };

  const handleEvent = (event: { type: string; data: Record<string, unknown> }) => {
    switch (event.type) {
      case "message": {
        const msg = event.data as unknown as ChatMessage;
        setMessages((prev) => [...prev, msg]);
        break;
      }
      case "tool_call": {
        const tc = event.data as unknown as ToolCall;
        onToolCall?.(tc);
        // If it's a build command, stream to build log
        if (tc.name === "execute_command") {
          const cmd = (tc.args as { command?: string }).command || "";
          if (cmd.includes("xcodebuild")) {
            onBuildOutput?.(`$ ${cmd}`);
          }
        }
        break;
      }
      case "tool_result": {
        const tc = event.data as unknown as ToolCall;
        onToolCall?.(tc);
        // Stream build output
        if (tc.name === "execute_command" && tc.result) {
          try {
            const parsed = JSON.parse(tc.result);
            if (parsed.stdout) onBuildOutput?.(parsed.stdout);
            if (parsed.stderr) onBuildOutput?.(parsed.stderr);
          } catch {
            // skip
          }
        }
        break;
      }
      case "error": {
        const errMsg: ChatMessage = {
          id: `err-${Date.now()}`,
          role: "system",
          content: `Agent error: ${(event.data as { message?: string }).message}`,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, errMsg]);
        break;
      }
      case "done": {
        const doneData = event.data as { finalMessage?: string };
        if (doneData.finalMessage) {
          const finalMsg: ChatMessage = {
            id: `done-${Date.now()}`,
            role: "assistant",
            content: doneData.finalMessage,
            timestamp: Date.now(),
          };
          // Avoid duplicate if already added via "message" event
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.content === doneData.finalMessage) return prev;
            return [...prev, finalMsg];
          });
        }
        break;
      }
    }
  };

  return (
    <section className="surface-card p-6">
      <div className="panel-header">
        <div className="flex items-center gap-3">
          <CiderIcon size={32} />
          <div>
            <div className="data-label">Prompt</div>
            <h2 className="mt-2 text-3xl leading-none">Build with Cider</h2>
          </div>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
            isRunning ? "bg-orange-50 text-orange-700" : "bg-stone-100 text-[var(--muted)]"
          }`}
        >
          {isRunning ? "running" : "idle"}
        </span>
      </div>

      <div className="space-y-3">
        {messages.length === 0 && (
          <div className="rounded-[22px] border border-dashed border-[var(--border-strong)] px-5 py-8">
            <p className="body-copy">
              Describe the app you want the sandbox to build. The dashboard will stream
              tool calls, build output, and the simulator capture beside it.
            </p>
          </div>
        )}
        <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-card text-sm ${
                msg.role === "user"
                  ? "message-card--user"
                  : msg.role === "system"
                    ? "message-card--system"
                    : "message-card--assistant"
              }`}
            >
              <p className="data-label mb-2">
                {msg.role === "user" ? "You" : msg.role === "assistant" ? "Cider" : "System"}
              </p>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          ))}
          {isRunning && (
            <div className="rounded-[18px] bg-orange-50 px-4 py-3 text-sm text-orange-700">
              Agent is working in the sandbox.
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <label className="data-label" htmlFor="build-request">
          Build request
        </label>
        <textarea
          id="build-request"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              void sendPrompt();
            }
          }}
          placeholder="Build a simple counter app for iPhone with a large number display, plus and minus buttons, and a reset button."
          disabled={isRunning}
          className="form-area"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="body-copy text-sm">Submit with the button or press Ctrl/Cmd + Enter.</p>
          <button
            onClick={() => {
              void sendPrompt();
            }}
            disabled={isRunning || !input.trim()}
            className="button-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send to sandbox
          </button>
        </div>
      </div>
    </section>
  );
}
