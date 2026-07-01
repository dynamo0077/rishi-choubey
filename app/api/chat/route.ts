import { buildSystemPrompt } from "@/lib/system-prompt";

export const runtime = "nodejs";
export const maxDuration = 60;

interface IncomingMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

function fail(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function POST(req: Request) {
  let payload: { messages?: IncomingMessage[] };
  try {
    payload = await req.json();
  } catch {
    return fail("Invalid JSON body");
  }

  const messages = payload.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return fail("messages array required");
  }
  if (messages.length > 40) {
    return fail("Too many messages (max 40)");
  }
  for (const m of messages) {
    if (!m || typeof m.content !== "string" || m.content.length === 0) {
      return fail("Each message must have non-empty string content");
    }
    if (m.content.length > 4000) {
      return fail("Message content too long (max 4000 chars)");
    }
    if (!["user", "assistant", "system"].includes(m.role)) {
      return fail("Invalid role");
    }
  }

  const baseURL = process.env.LLM_BASE_URL;
  const apiKey = process.env.LLM_API_KEY;
  const model = process.env.LLM_MODEL;
  if (!baseURL || !apiKey || !model) {
    return fail("Server missing LLM_BASE_URL / LLM_API_KEY / LLM_MODEL env vars", 503);
  }

  // Strip leading slash to avoid `https://...//chat/completions`
  const endpoint = `${baseURL.replace(/\/$/, "")}/chat/completions`;

  const openaiBody = {
    model,
    messages: [
      { role: "system", content: buildSystemPrompt() },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    temperature: 0.7,
    max_tokens: 2048,
    stream: true,
  };

  console.log(
    `[chat] POST ${new Date().toISOString()} model=${model} turns=${messages.length} ` +
      `lastUser="${messages[messages.length - 1].content.slice(0, 80)}"`,
  );

  let upstream: Response;
  try {
    upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "text/event-stream",
      },
      body: JSON.stringify(openaiBody),
      signal: req.signal,
    });
  } catch (err) {
    console.error("[chat] upstream fetch error", err);
    return fail("Could not reach LLM provider", 502);
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    console.error(`[chat] upstream ${upstream.status}`, text.slice(0, 500));
    return fail(`LLM provider error ${upstream.status}: ${text.slice(0, 200)}`, 502);
  }

  // Transform OpenAI-style SSE chunks (data: {...}\n\n) into a simple NDJSON
  // stream of { delta: "text" } objects. The client parses this incrementally.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by \n\n
          let sepIndex: number;
          while ((sepIndex = buffer.indexOf("\n\n")) !== -1) {
            const event = buffer.slice(0, sepIndex);
            buffer = buffer.slice(sepIndex + 2);

            // Each event may have several lines; we only care about data: lines
            for (const line of event.split("\n")) {
              if (!line.startsWith("data:")) continue;
              const payload = line.slice(5).trim();
              if (!payload || payload === "[DONE]") continue;
              try {
                const parsed = JSON.parse(payload);
                const delta =
                  parsed.choices?.[0]?.delta?.content ??
                  parsed.choices?.[0]?.message?.content ??
                  "";
                if (delta) {
                  controller.enqueue(
                    encoder.encode(JSON.stringify({ delta }) + "\n"),
                  );
                }
              } catch {
                console.warn("[chat] could not parse SSE chunk", payload.slice(0, 200));
              }
            }
          }
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      } finally {
        try {
          reader.releaseLock();
        } catch {}
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
