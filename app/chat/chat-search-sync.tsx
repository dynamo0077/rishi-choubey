"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChatInterface } from "@/components/chat/chat-interface";

/**
 * Reads ?q= from the URL, then renders a chat that auto-sends that question.
 * Wrapped in <Suspense> at the page level (useSearchParams requires it in Next 15).
 */
export function ChatSearchSync() {
  const params = useSearchParams();
  const q = params.get("q") ?? undefined;
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (q) setKey((k) => k + 1);
  }, [q]);

  if (!q) return null;
  return <ChatInterface key={key} initialQuestion={q} />;
}