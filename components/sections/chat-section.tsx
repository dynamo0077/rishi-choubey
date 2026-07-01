import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/chat/chat-interface";

const suggestions = [
  "Tell me about your accessibility work.",
  "What's your biggest project impact?",
  "Why should we hire you for a senior React role?",
  "What's your Next.js experience?",
];

export function ChatSection() {
  return (
    <section
      id="chat"
      aria-labelledby="chat-heading"
      className="border-b border-border/40 py-20 sm:py-24"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2
              id="chat-heading"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wider text-primary"
            >
              <Sparkles className="size-4" aria-hidden /> Talk to my AI stand-in
            </h2>
            <p className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Ask anything a recruiter would ask.
            </p>
            <p className="mt-4 text-muted-foreground">
              This isn't a chatbot with scripted answers. It's a small LLM with my résumé,
              voice, and quirks baked into the system prompt — so the answers feel like me,
              not like a brochure. Be specific; it works best that way.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {suggestions.map((s) => (
                <li key={s}>
                  <Link
                    href={`/chat?q=${encodeURIComponent(s)}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    → {s}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/chat">
                  Open full chat <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>

          <div className="md:sticky md:top-24">
            <ChatInterface embedded />
          </div>
        </div>
      </div>
    </section>
  );
}