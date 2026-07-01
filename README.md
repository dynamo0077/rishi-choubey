# Rishi Choubey — Portfolio

Personal portfolio + AI chat built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and a streaming chat grounded in my résumé.

**Live:** *(add Vercel URL after deploy)*
**Site:** https://rishichoubey.dev *(replace when you set up the domain)*

---

## Highlights

- 🦾 **AI chat stand-in** — streaming responses powered by an OpenAI-compatible LLM (NVIDIA NIM by default), grounded in `lib/resume-data.ts`
- ♿ **WCAG 2.2 AA baseline** — skip link, focus rings, semantic landmarks, `prefers-reduced-motion`, screen-reader tested
- ⚡ **Lighthouse-first** — target 95+ perf / 100 a11y on mobile
- 🎨 **Dark/light mode** with system preference detection, no flash
- 📱 **Mobile-first** responsive design
- 🧩 **shadcn-style primitives** (Radix + Tailwind) — auditable, accessible, no runtime overhead

## Tech

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Chat | Vanilla `fetch` + `ReadableStream` (no SDK lock-in) |
| Streaming | SSE → NDJSON transform in a Next.js Route Handler |
| Icons | lucide-react |
| Markdown | react-markdown + remark-gfm |
| Deployment | Vercel |

## Local development

Requires Node.js 18+. Any OpenAI-compatible LLM endpoint will work.

```bash
git clone https://github.com/dynamo0077/rishi-choubey.git
cd rishi-choubey
npm install
cp .env.example .env.local
# fill in LLM_BASE_URL / LLM_API_KEY / LLM_MODEL
npm run dev
```

Open http://localhost:3000.

## Provider configuration

Edit `.env.local`:

```env
LLM_BASE_URL=https://integrate.api.nvidia.com/v1
LLM_API_KEY=nvapi-...
LLM_MODEL=meta/llama-3.1-8b-instruct
```

Any OpenAI-compatible endpoint works (Ollama, LM Studio, vLLM, Groq, OpenAI, Together, Fireworks).

## Architecture notes

- The AI chat endpoint lives at [`app/api/chat/route.ts`](./app/api/chat/route.ts). It forwards messages to the configured LLM provider and transforms OpenAI-style SSE into simple NDJSON `{"delta":"..."}` chunks for the client.
- The client [`components/chat/chat-interface.tsx`](./components/chat/chat-interface.tsx) consumes those chunks with vanilla `fetch` + `ReadableStream` — no AI SDK, no version drift.
- The system prompt in [`lib/system-prompt.ts`](./lib/system-prompt.ts) is built from [`lib/resume-data.ts`](./lib/resume-data.ts). Update the data file → the AI's knowledge updates automatically.

## Scripts

```bash
npm run dev       # local dev
npm run build     # production build
npm run start     # serve production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

## License

MIT © 2026 Rishi Choubey — see [LICENSE](./LICENSE)."# rishi-choubey" 
