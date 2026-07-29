@AGENTS.md

# Project notes

**Stack**: Next.js 16.2.2 (App Router only, no `pages/` dir), React 19, Tailwind v4 (CSS-based `@theme` config lives in `app/globals.css` — no separate tailwind.config file), framer-motion, lucide-react.

**Key sections**:
- Navbar: `app/components/HomeComponents/NavBar.tsx`
- Hero: `app/components/HomeComponents/HeroSction.tsx`
- Homepage scrolling ticker/marquee: `app/page.tsx` (`tickerTexts` array) — separate from the clients marquee
- Clients marquee: `app/components/AboutComponents/ClientsCarousel.tsx` (About Us page) and `clientsList` in `app/page.tsx` (homepage) — both duplicate the same array across two scrolling tracks for a seamless loop
- Footer: `app/components/Footer.tsx`

**Styling conventions**: headings/wordmarks use `font-cond` (Poppins-backed display font, registered as `--font-display` via `next/font` in `app/layout.tsx`) with `font-black`/`font-bold`, `uppercase`, `tracking-widest`. Body copy uses `font-sans` (self-hosted Aileron, `@font-face` in `globals.css`). Brand colors are Tailwind theme tokens: `brand-navy`, `brand-navy-mid`, `brand-navy-light`, `brand-orange`, `brand-orange-light`.

**Manufacturing process**: the client uses **hand lay-up**, not vacuum infusion — don't reintroduce vacuum-infusion language in future copy or diagrams.
