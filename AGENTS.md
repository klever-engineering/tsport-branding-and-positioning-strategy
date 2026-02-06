# AGENTS.md

This repository contains a static, demo-grade frontend for a premium swim booking platform. Use these guidelines to keep the work consistent, modern, and AI‑ready.

## Objectives
- Deliver a premium, trust‑centric experience for families, venues, and organizations.
- Keep the product demo fully clickable with visible feedback for interactions.
- Maintain a clean, modern visual system with gradient accents and rich SVGs.
- Ensure the site remains self‑contained and runnable offline (no external images or heavy tooling).

## Brand & Content Principles
- Use a **single, clear brand name** throughout the UI. Avoid dual‑brand or collab naming patterns.
- Emphasize **safety, quality, and trust** in core messaging. Speed is secondary.
- Keep the tone **professional, reassuring, and premium**.
- Avoid placeholders like “CTA here.” Replace with real intent‑based copy.
- Include a professional footer disclaimer that the site is a clickable prototype and subject to revision.

## Visual System
- Accent palette: teal → pink gradients with light mint / coral supports.
- Use **SVG illustrations** for all visuals (self‑hosted in `assets/`).
- Prefer **premium cards**, soft shadows, and rounded corners.
- Trust indicators should look official: seals, stamps, checkmarks, ratio icons.
- Rating displays should use star icons, not plain text.

## IA & Navigation
- Primary nav uses dropdowns grouped by audience (Families, Venues, Organizations, About).
- Secondary nav contains: Dashboard (logged‑in only), Search, Log In, Start Free.
- Do not auto‑open the onboarding wizard. It must be user‑initiated.
- The nav should be consistent across all pages.

## Interaction Guidelines
- Every click should do something (navigate, open modal, toast, or update UI).
- Tours should be triggered only via “Take a tour” and never auto‑start.
- Use subtle motion: hover glow, pulse on click, and smooth scroll.

## Page‑Specific Requirements
### Landing
- Hero must include: safety‑led headline, “Swim with Confidence” tagline, 3 trust signals, social proof, and a value‑prop subtitle.
- Include a “How it Works” section with 3 steps and connector line.
- Add trust rail with certification seal, safety ratio, insurance verification, partner logos, and verified facility stamps.

### Venue Detail
- Show premium trust UI: certification badge, safety ratio, instructor spotlight, parent reviews, progress tracking.
- Style it like a premium listing experience.

### Dashboard
- Must emphasize progress and achievement:
  - “Your Swim Journey”
  - “Family Progress” cards
  - “Recommended for You”
  - prominent Corporate Credits widget
  - quick actions

### Strategy & Resources
- Provide visual KPIs, funnel indicators, and resource tiles.
- Link to timeline and offer pages.

## Data & Assets
- Prefer local SVGs in `assets/`.
- Avoid external image dependencies.
- Keep data in `data/venues.json` aligned to swim programs.

## Accessibility & UX
- Ensure dropdowns are keyboard accessible (focus‑within).
- Keep text contrast high against gradients.
- Use descriptive `alt` text for SVGs.

## File Structure Tips
- `index.html`: landing + primary funnel sections.
- `venue.html`: premium venue listing.
- `dashboard.html`: logged‑in experience.
- `marketing.html`, `resources.html`: strategy + resources.
- `timeline.html`, `offer.html`: delivery + offer.
- `styles.css`: single source of truth for styles.
- `app.js`, `venue.js`, `dashboard.js`: page behaviors.

## AI‑Ready Frontend Practices
- Structure content with semantic sections for easy extraction.
- Keep component classes consistent for future AI‑driven personalization.
- Use data attributes for UI actions and tours.
- Avoid hardcoded external links unless explicitly requested.

## Do Not
- Do not mention real client names or external brands.
- Do not introduce dual‑brand naming or “collab” phrasing.
- Do not add placeholder text or blank links.
- Do not auto‑launch onboarding tours.

## Git Practices
- Use **Conventional Commits** for all changes (e.g., `feat: ...`, `fix: ...`, `docs: ...`). 
