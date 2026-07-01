"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

// v4 message shape: { id, role, content }
export type ChatMessageShape = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export function ChatMessage({ message }: { message: ChatMessageShape }) {
  const isUser = message.role === "user";
  const text = message.content;

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        isUser ? "flex-row-reverse text-right" : "flex-row text-left",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-foreground text-background" : "bg-primary/15 text-primary",
        )}
      >
        {isUser ? <User className="size-3.5" /> : <Sparkles className="size-3.5" />}
      </div>

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-foreground text-background rounded-tr-sm"
            : "rounded-tl-sm border border-border bg-background",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1.5 prose-ul:my-1.5 prose-ol:my-1.5 prose-li:my-0.5 prose-headings:my-2 prose-a:text-primary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}