# Project Minutes

Date: 2026-02-06
Project: TSport Swim booking platform demo + branding/positioning prototype
Repo: git@github.com:klever-engineering/tsport-branding-and-positioning-strategy.git

## Summary
We iteratively built a multi-page swim booking demo site (TSport Swim) with a premium, safety-first brand, rich visuals, interactive UI, and a full offer/strategy narrative. We made the prototype clickable end-to-end, ensured navigation cohesion, improved mobile behavior, added strong trust indicators, and layered in an onboarding wizard. Later we added an Offer page with strategy, pricing, timeline, and an interactive ROI calculator. We unified footer attribution and ensured links/anchors resolve correctly.

## Major Requirements + Decisions
- Brand: TSport Swim only (remove ToniSport/Wassermeloni). Keep premium yet playful swim tone.
- Site is a clickable demo; add professional disclaimers in footer.
- Visual system: gradient teal-to-pink, high-contrast card-based layout, consistent typography, CTA system, rounded cards.
- Navigation: multi-level dropdowns, sticky header, active state underline. Offer should be highlighted.
- Images: use free images where applicable; later replaced with SVG fitness/swim themes and kept premium visuals. Avoid placeholders.
- Functionality: all CTAs must do something (navigate, open modal, animate, highlight).
- Maintain: conventional commits; commit+push after changes.

## Pages Added/Expanded (high level)
- Landing (index.html): premium hero, trust rail, key differentiators, social proof, interactive search, booking CTA, and new "Launch Your Own Swim Marketplace" section.
- Audience pages: families, venues, corporate, clubs.
- Strategy + Resources: strategy narrative, positioning, UI kit documentation, assets.
- Offer: pricing, comparison, itemized value, timeline, guarantees, process clarity, FAQ, ROI calculator.
- Dashboard: showcase preview of member experience with achievements, milestones, credits, actions.
- Legal: privacy, terms, support, status sections.
- Roadmap + Timeline: visual plan and delivery sequence.

## Key Iterations / Corrections
1. Images not visible: switched to reliable sources + SVG illustrations; ensured consistent heights.
2. Branding confusion: removed "ToniSport x Wassermeloni"; moved to TSport Swim.
3. Nav issues: dropdown clickability, collapsed mobile nav height, sticky header behavior.
4. Hero imagery: tried real photos, then replaced with SVG; later aligned with swim theme.
5. Strategy/Offer: added richer content, guarantees, process clarity, and new comparison tables.
6. Accessibility: added alt text, button labels, keyboard-focus improvements.
7. Wizard: fixed overlay z-index so tooltips remain on top.
8. Link audit: fixed broken anchor (#terms) in legal page.
9. Footer credit: added GitHub link for Klever Engineering with arrow indicator.
10. Dashboard: improved alignment with sidebar profile card and top banner.

## Interactions + Prompts (high-level)
- “Make everything clickable” -> added modal interactions and CTA animations.
- “Use swim-specific visuals” -> replaced with swim-themed SVGs and photos.
- “Add onboarding wizard” -> implemented guided tour + toggle button.
- “Offer page needs more value” -> added itemized values, timeline, guarantees, comparison.
- “Need audience pages” -> built /families, /venues, /corporate, /clubs.
- “Audit links” -> validated anchors and fixed legal terms anchor.
- “Add ROI calculator” -> interactive card with sliders + payback timeline.

## Notable Features Implemented
- Multi-tab navigation with dropdowns and sticky shrink on scroll.
- Trust indicators: certification seals, safety ratios, verified facility stamps, ratings.
- Visual KPIs, funnels, timeline, roadmap.
- Booking flows: mock interactions, modal confirmations, toast notifications.
- Search filtering with live results on discovery page.
- Onboarding wizard: "Take a tour" button + highlight overlays.
- Offer page sections: value breakdown, comparison, guarantees, FAQ, ROI calculator.
- Dashboard preview: progress milestones, calendars, credits, quick actions.

## Code/Files Touched (representative)
- HTML: index.html, offer.html, dashboard.html, legal.html, marketing.html, resources.html, timeline.html, roadmap.html, families.html, venues.html, corporate.html, clubs.html, etc.
- CSS: styles.css (global style system, CTA types, cards, timelines, callouts, ROI card, etc.)
- JS: app.js, dashboard.js, resources.js, onboarding.js, nav.js

## Git Notes
- Conventional commits used.
- Pushes done to main.
- One push failed due to SSH; resolved later.
- Removed sensitive requirements file request was discussed; README created afterward.

## Known Open Items / Follow-ups
- Verify external image licensing if moving to production.
- Consider consolidating image credits into a single visible section if needed.
- If Android nav still misbehaves, re-check mobile Safari/Chrome specific CSS.

## Style Trend (agreed summary)
- "Soft‑Neumorphic Editorial Minimalism": clean layout + subtle depth + premium typography.

## Lessons / Learnings
- Keep navigation consistent and always reachable; highlight business-critical pages like Offer and Strategy.
- Avoid ambiguous brand naming or dual-brand marks; ensure clarity and trust.
- CTAs must be contextual and functional; no placeholders.
- Visual consistency in cards is key (alignment, icon sizes, heights).
- Always validate anchors after large changes.

