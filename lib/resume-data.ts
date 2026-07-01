/**
 * Single source of truth for Rishi's professional facts.
 * Used by both the UI and the AI chat system prompt.
 * Update this file and the chat will stay in sync automatically.
 */

export const profile = {
  name: "Rishi Choubey",
  title: "Senior Frontend Engineer",
  location: "Jabalpur, Madhya Pradesh, India",
  yearsOfExperience: 4,
  email: "hello@rishichoubey.dev", // TODO: replace with real address
  socials: {
    github: "https://github.com/rishichoubey",
    linkedin: "https://linkedin.com/in/rishichoubey",
    twitter: "https://twitter.com/rishichoubey",
  },
  summary:
    "I build fast, accessible, and quietly delightful interfaces in React and Next.js. I care about the boring details — semantic HTML, keyboard support, real-world performance budgets — because they're what separate a demo from a product people rely on.",
} as const;

export const skills = {
  core: [
    "React 19",
    "Next.js (App Router, SSR / SSG / ISR)",
    "TypeScript",
    "Tailwind CSS",
    "Design Systems",
  ],
  frontend: ["JavaScript (ES2022+)", "HTML5 semantic markup", "CSS architecture", "Vite"],
  state: ["Zustand", "TanStack Query", "Redux Toolkit", "React Context"],
  accessibility: [
    "WCAG 2.1 / 2.2 AA",
    "ARIA authoring practices",
    "Screen reader testing (NVDA / VoiceOver)",
    "Keyboard-first design",
    "Automated audits (axe, Lighthouse)",
  ],
  performance: [
    "Core Web Vitals optimization",
    "Code splitting & lazy loading",
    "Image & font optimization",
    "Bundle analysis",
  ],
  tooling: ["Playwright", "Vitest / Jest", "Storybook", "GitHub Actions", "Vercel"],
  ai: ["Prompt engineering", "LLM UX patterns", "Streaming interfaces", "Vercel AI SDK"],
} as const;

export const experiences = [
  {
    company: "Your Company B",
    role: "Frontend Engineer",
    period: "2024 — Present",
    bullets: [
      "Rebuilt the customer dashboard in Next.js App Router; cut LCP from 3.8s → 1.2s and reduced JS bundle by 38%.",
      "Led accessibility remediation across 40+ surfaces, bringing the product to WCAG 2.2 AA conformance.",
      "Introduced a tokens-based design system adopted by 6 product teams.",
    ],
  },
  {
    company: "Your Company A",
    role: "Software Engineer",
    period: "2022 — 2024",
    bullets: [
      "Owned the migration from CRA to Next.js with incremental adoption, zero downtime.",
      "Built an accessible form library used across marketing & onboarding flows.",
      "Mentored 2 junior engineers on React fundamentals and code review hygiene.",
    ],
  },
  {
    company: "Earlier role",
    role: "Junior Frontend Developer",
    period: "2021 — 2022",
    bullets: [
      "Shipped pixel-perfect UI from Figma with strong attention to responsive & accessible behavior.",
      "Wrote end-to-end tests in Playwright that caught 3 production regressions in the first month.",
    ],
  },
] as const;

export const projects = [
  {
    slug: "accessible-design-system",
    title: "Accessible Design System",
    blurb:
      "A tokens-first React component library with WCAG 2.2 AA baselines, Storybook docs, and axe CI checks.",
    tags: ["React", "TypeScript", "Storybook", "axe-core"],
    impact: ["100% axe-clean on default CI run", "Used in 3 production apps"],
    link: "https://github.com/rishichoubey/accessible-design-system",
  },
  {
    slug: "edge-rss-aggregator",
    title: "Edge RSS Aggregator",
    blurb:
      "A personal-readership app using Next.js Route Handlers + edge caching, built around perceived speed.",
    tags: ["Next.js", "Edge Runtime", "ISR", "Tailwind"],
    impact: ["p95 response 180ms", "Zero CLS, 100 Lighthouse SEO"],
    link: "https://github.com/rishichoubey/edge-rss-aggregator",
  },
  {
    slug: "ai-portfolio-chat",
    title: "AI Portfolio Chat",
    blurb:
      "This very site — a streaming chat with a system prompt grounded in my actual résumé.",
    tags: ["Next.js", "Vercel AI SDK", "Streaming", "Accessibility"],
    impact: ["<200ms TTFT", "Keyboard-first, screen-reader tested"],
    link: "https://github.com/rishichoubey/rishi-choubey-portfolio",
  },
] as const;