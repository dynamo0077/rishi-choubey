"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { ChatMessage, type ChatMessageShape } from "./chat-message";
import { ChatInput } from "./chat-input";
import { cn } from "@/lib/utils";

type Status = "ready" | "submitted" | "streaming" | "error";

interface ChatInterfaceProps {
  embedded?: boolean;
  initialQuestion?: string;
}

const WELCOME: ChatMessageShape = {
  id: "welcome",
  role: "assistant",
  content:
    "Hey — I'm Rishi's AI stand-in. Ask me about his work, projects, or experience. I'll answer in first person, as he would.",
};

export function ChatInterface({ embedded = false, initialQuestion }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessageShape[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("ready");
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom as new tokens arrive
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const ask = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || status === "streaming" || status === "submitted") return;

      setError(null);
      const userMsg: ChatMessageShape = {
        id: `u_${Date.now()}`,
        role: "user",
        content: trimmed,
      };
      const assistantId = `a_${Date.now()}`;
      const assistantMsg: ChatMessageShape = {
        id: assistantId,
        role: "assistant",
        content: "",
      };

      // Snapshot messages that we'll send (everything before this user msg)
      const history = messages.filter((m) => m.id !== "welcome");
      const outgoing = [...history, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setStatus("submitted");

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        setStatus("streaming");
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: outgoing }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          let detail = `Request failed (${res.status})`;
          try {
            const j = await res.json();
            if (j?.error) detail = j.error;
          } catch {}
          throw new Error(detail);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let nlIndex: number;
          while ((nlIndex = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nlIndex).trim();
            buffer = buffer.slice(nlIndex + 1);
            if (!line) continue;
            try {
              const parsed = JSON.parse(line);
              if (typeof parsed.delta === "string" && parsed.delta) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + parsed.delta }
                      : m,
                  ),
                );
              }
            } catch {
              /* ignore malformed line */
            }
          }
        }
        setStatus("ready");
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setStatus("ready");
          return;
        }
        console.error("[chat] error", err);
        setError((err as Error).message || "Something went wrong");
        setStatus("error");
        // Remove the empty assistant placeholder so the error is visible on its own
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
      } finally {
        abortRef.current = null;
      }
    },
    [messages, status],
  );

  // Auto-fire starter question from /chat?q=...
  const sentInitial = useRef(false);
  useEffect(() => {
    if (initialQuestion && !sentInitial.current && status === "ready") {
      sentInitial.current = true;
      ask(initialQuestion);
    }
  }, [initialQuestion, status, ask]);

  const isStreaming = status === "submitted" || status === "streaming";

  return (
    <div
      role="region"
      aria-label="Chat with Rishi AI"
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        embedded ? "h-[520px]" : "h-[640px]",
      )}
    >
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-2">
          <span aria-hidden className="relative inline-flex size-2 rounded-full bg-emerald-500">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-75" />
          </span>
          <p className="text-sm font-semibold">
            <Sparkles
              className="mr-1 inline size-3.5 align-text-bottom text-primary"
              aria-hidden
            />
            Rishi AI
          </p>
          <p className="text-xs text-muted-foreground">grounded in his résumé</p>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}

        {isStreaming && messages[messages.length - 1]?.content === "" && (
          <div
            role="status"
            aria-label="Rishi AI is typing"
            className="flex items-center gap-1.5 text-muted-foreground"
          >
            <span className="size-1.5 animate-pulse-dot rounded-full bg-muted-foreground [animation-delay:-0.32s]" />
            <span className="size-1.5 animate-pulse-dot rounded-full bg-muted-foreground [animation-delay:-0.16s]" />
            <span className="size-1.5 animate-pulse-dot rounded-full bg-muted-foreground" />
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm"
          >
            {error}
          </p>
        )}
      </div>

      <div className="border-t border-border bg-card p-3">
        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={ask}
          onStop={() => {
            abortRef.current?.abort();
          }}
          isStreaming={isStreaming}
        />
      </div>
    </div>
  );
}