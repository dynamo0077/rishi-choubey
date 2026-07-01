"use client";

import { useRef, useEffect, type FormEvent } from "react";
import { Send, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (text: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  placeholder?: string;
}

const MAX = 800;

export function ChatInput({
  value,
  onChange,
  onSubmit,
  onStop,
  isStreaming,
  placeholder = "Ask about Rishi's work, skills, or projects…",
}: ChatInputProps) {
  const taRef = useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  }

  useEffect(autoResize, [value]);

  function submit(e?: FormEvent) {
    e?.preventDefault();
    const text = value.trim();
    if (!text || isStreaming) return;
    onSubmit(text);
    onChange("");
  }

  return (
    <form onSubmit={submit} className="relative">
      <label htmlFor="chat-input" className="sr-only">
        Message Rishi AI
      </label>
      <textarea
        id="chat-input"
        ref={taRef}
        value={value}
        rows={1}
        maxLength={MAX}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={placeholder}
        aria-describedby="chat-input-hint"
        className={cn(
          "block w-full resize-none rounded-lg border border-border bg-background px-3 py-3 pr-24 text-sm",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
        )}
      />
      <span id="chat-input-hint" className="sr-only">
        Press Enter to send, Shift+Enter for a new line.
      </span>
      <span className="pointer-events-none absolute bottom-3 right-14 text-[10px] text-muted-foreground">
        {value.length}/{MAX}
      </span>
      {isStreaming ? (
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop generating"
          className="absolute bottom-2.5 right-2.5 inline-flex size-8 items-center justify-center rounded-md bg-foreground text-background hover:opacity-90"
        >
          <Square className="size-3.5" aria-hidden />
        </button>
      ) : (
        <button
          type="submit"
          aria-label="Send message"
          disabled={!value.trim()}
          className="absolute bottom-2.5 right-2.5 inline-flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground disabled:opacity-40"
        >
          <Send className="size-3.5" aria-hidden />
        </button>
      )}
    </form>
  );
}