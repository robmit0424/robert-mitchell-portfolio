# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.

---

## Portfolio Owner

**Robert Mitchell** — Senior Software Engineer
Charleston, SC
Email: robertmitchell.biz@gmail.com
LinkedIn: https://www.linkedin.com/in/robert-mitchell-193aaa277/

### Summary

Senior Software Engineer with 3+ years of experience building and scaling consumer and B2B web applications. Specialized in React, React Native, and Next.js with a strong product mindset and a track record of shipping revenue-generating features used by 50,000+ monthly users. Experienced in owning features end-to-end, collaborating cross-functionally, and operating in fast-moving, data-driven teams.

### Skills

| Category | Technologies |
|----------|-------------|
| **Frontend** | React, React Native, Next.js, React Query, Redux |
| **Backend** | Node.js, Supabase, MySQL, Django |
| **Cloud & Infra** | AWS Services, Firebase, Cloudflare R2, Stripe API, Vercel |
| **Product & Analytics** | A/B Testing, Google Analytics, Monetization, Funnels |
| **Tools** | Git, Webflow, Microsoft PowerApps, SharePoint |
| **AI** | Generative AI Pipelines, LoRA Fine-Tuning, OpenAI API, Anthropic API |

### Professional Experience

**Lead Product Engineer** — Portraits.com (April 2025 – Present)
- Designed and shipped an AI-powered SaaS platform from MVP to production, enabling users to generate professional headshots and portraits at scale
- Built and maintained a production React + Next.js frontend with Supabase auth, Stripe billing, and Cloudflare R2 storage
- Integrated fine-tuned LoRA-based AI pipelines for image generation, supporting thousands of user uploads
- Implemented analytics, referral tracking, and pricing experiments that directly impacted conversion and revenue
- Owned UI/UX decisions, performance optimization, and deployment workflows in a remote-first environment

**Senior Frontend Engineer** — DUPR (March 2024 – April 2025)
- Sole frontend engineer for web and mobile platforms serving 50,000+ monthly active users
- Architected and maintained shared frontend systems using React and React Native
- Led the frontend launch of DUPR+, a paid subscription product that expanded platform monetization
- Integrated Google Ads and AppLovin to diversify revenue streams
- Implemented Firebase Remote Config and A/B testing to safely roll out features and optimize performance
- Ensured analytics accuracy, QA coverage, and consistent UX across all deployments

**Full Stack Engineer** — RBAC Management (November 2023 – April 2024)
- Built a case management system for an insurance services company, streamlining claim intake and review workflows
- Developed a mobile/web platform connecting tow operators and parking enforcement teams
- Owned architecture, database design, frontend development, and deployment

**Software Engineer** — Code/+/Trust (January 2023 – November 2023)
- Built and iterated on MVP features using React and React Query in collaboration with design and product teams
- Translated UX designs into scalable, production-ready frontend systems
- Used user feedback and analytics to guide feature prioritization and improvements

---

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 portfolio site using the App Router with TypeScript and Tailwind CSS 4.

**Stack:**
- Next.js 16 with App Router (`app/` directory)
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4 (via PostCSS)
- ESLint 9 with Next.js core-web-vitals and TypeScript configs

**Path Alias:** `@/*` maps to the project root

**Key Files:**
- `app/layout.tsx` - Root layout with Geist font configuration
- `app/page.tsx` - Home page component
- `app/globals.css` - Global styles and Tailwind imports

## Library References

### Anime.js

When answering questions about Anime.js animations, **always** use Context7 MCP to fetch up-to-date documentation:

- **Context7 Library ID:** `/websites/animejs` (8279 code snippets, comprehensive docs)
- **Alternative Library ID:** `/juliangarnier/anime` (official repo, v4.2.2)

**Quick Reference:**

```javascript
// Basic animation
anime({
  targets: '.element',      // CSS selector, DOM element, JS object, or array
  translateX: 250,          // CSS transform
  rotate: '1turn',          // With units
  scale: [0.5, 1],          // From/to values
  opacity: 0.5,
  duration: 1000,           // ms
  delay: 100,               // ms
  easing: 'easeOutElastic', // Easing function
  loop: true,               // or number
  alternate: true,          // Reverse on each loop
  autoplay: true            // Start automatically
});
```

**Targets:** CSS selectors, DOM elements, JS objects, arrays
**Properties:** CSS properties, transforms (translateX/Y, rotate, scale, skew), SVG attributes, object properties
**Values:** Numbers, strings with units, relative (`+=50`), colors, functions
**Callbacks:** `onBegin`, `onComplete`, `onUpdate`, `onLoop`, `onRender`, `onPause`
**Controls:** `play()`, `pause()`, `restart()`, `reverse()`, `seek(time)`, `reset()`
**Stagger:** `anime.stagger(100)` for sequential delays
**Timeline:** Chain animations with `timeline.add()`, use labels, sync multiple animations
