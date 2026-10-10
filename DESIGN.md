---
name: Opsis
description: Καθαρή ματιά. A Greek, non-partisan political explainer set as a weekly issue on top of a public register.
colors:
  pentelic-marble: "#E8E6DF"
  ink: "#0F1419"
  cinnabar: "#B5301B"
  cinnabar-lift: "#E0553A"
  slate: "#5A6068"
  ash: "#A5AAB1"
  marble-deep: "#DEDBD2"
  ink-soft: "#2B3038"
  rule: "#C4C0B5"
typography:
  display:
    fontFamily: "'Noto Serif Display', 'Times New Roman', serif"
    fontSize: "clamp(2.5rem, 1.75rem + 3.1vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Noto Serif Display', 'Times New Roman', serif"
    fontSize: "clamp(2.125rem, 1.6rem + 2.2vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "'Noto Serif Display', 'Times New Roman', serif"
    fontSize: "clamp(1.5rem, 1.3rem + 0.8vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
  headline-sm:
    fontFamily: "'Noto Serif Display', 'Times New Roman', serif"
    fontSize: "clamp(1.1875rem, 1.08rem + 0.45vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.2
  dek:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  body-small:
    fontFamily: "'IBM Plex Sans', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.12em"
    fontFeature: "tnum"
  numeral:
    fontFamily: "'JetBrains Mono', ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    fontFeature: "tnum"
spacing:
  s-1: "0.25rem"
  s-2: "0.5rem"
  s-3: "0.75rem"
  s-4: "1rem"
  s-5: "1.5rem"
  s-6: "2rem"
  s-7: "3rem"
  s-8: "4rem"
  s-9: "6rem"
  gutter: "clamp(1rem, 4vw, 3.5rem)"
  measure: "68ch"
  page-max: "90rem"
components:
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body-small}"
    padding: "0.5rem 0"
  source-line:
    textColor: "{colors.slate}"
    typography: "{typography.label}"
  key-figure:
    textColor: "{colors.cinnabar}"
  index-numeral:
    textColor: "{colors.cinnabar}"
    typography: "{typography.numeral}"
  bar:
    backgroundColor: "{colors.ink}"
    height: "0.875rem"
  bar-highlight:
    backgroundColor: "{colors.cinnabar}"
    height: "0.875rem"
  bar-reference:
    backgroundColor: "{colors.ash}"
    height: "0.875rem"
  register-row-hover:
    backgroundColor: "{colors.marble-deep}"
  sample-notice:
    backgroundColor: "{colors.marble-deep}"
    textColor: "{colors.ink-soft}"
    padding: "0.5rem clamp(1rem, 4vw, 3.5rem)"
  data-band:
    backgroundColor: "{colors.marble-deep}"
    textColor: "{colors.ink}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.pentelic-marble}"
---

# Design System: Opsis

## Overview

**Creative North Star: "The Ruled Register"**

Opsis reads like a printed weekly issue bound on top of a public ledger. Pentelic marble is the page, ink is the type and the lines, and cinnabar appears only where the reader must look: the one number a piece rests on. Every surface is built from text and 1px hairlines; there are no photographs, cards, shadows or rounded corners on the index pages. The page earns trust by showing its working: every headline carries a mono source line directly beneath it, and the archive is a real table sorted by date with sources aligned right.

Density is editorial rather than dashboard: a large serif lead opened at display size, a narrow contents column, then a full-width dated register. Hierarchy comes from the serif/sans/mono split and from hairline weight (ink for section breaks, warm grey for rows), not from boxes. The one signature motion is the hairlines drawing left to right once on load, joined by the chart bars growing from their baseline, both switched off under reduced motion.

The world extends the Marble Edition brand kit (`03_brand_kit/opsis-brand-kit.html`) to the web without changing its palette or faces. Its rejection of the hero-image-plus-card-grid news front page is a confirmed choice, not a phase.

**Key Characteristics:**
- Marble ground, ink type, cinnabar only for the key figure and index marks.
- Three faces with fixed jobs: serif headlines, sans reading text, mono for sources, dates and counts.
- Structure from hairlines only; tonal marble-deep fills for bands and notices.
- Square everything; zero radius, zero elevation.
- One load gesture: lines and bars draw left to right.

## Colors

A warm stone ground with near-black ink and a single oxide-red accent, all taken unchanged from the brand kit, plus three quiet derivatives for fills, long text and row rules.

### Primary
- **Cinnabar** (#B5301B): the accent on marble, 4.9:1. Marks the piece's one key figure inside its headline, the highlighted bar and its value in a chart, the numerals of ordered indexes (issue contents, article sources, method list), the active nav underline, the focus ring, the text caret, and hover underlines on headline and read links. Also the pupil of the wordmark's eye.
- **Cinnabar Lift** (#E0553A): cinnabar's form on ink. Used only inside the ink footer (link hover underline, wordmark pupil).

### Neutral
- **Pentelic Marble** (#E8E6DF): the page ground everywhere, and the text colour on the ink footer and selection.
- **Ink** (#0F1419): all primary text, strong hairlines (masthead base, section top rules, register header rule), chart bars, the footer ground, and the selection fill.
- **Ink Soft** (#2B3038): deks, fact values, source details and sample-notice text; long secondary prose that must stay quiet but highly legible.
- **Slate** (#5A6068): mono source lines, dates, the tagline and muted empty states, 5.1:1 on marble.
- **Ash** (#A5AAB1): comparison and reference bars in charts, and secondary text on ink.
- **Marble Deep** (#DEDBD2): tonal fills only: the data band, the sample notice, the commentary note, and register-row hover.
- **Rule** (#C4C0B5): the 1px hairlines between rows in tables, contents and lists.

### Named Rules
**The One Number Rule.** Cinnabar marks the single figure a piece rests on (its `keyFigure`), set inside the headline by the Headline component, and the matching highlighted bar and value. Never colour body text, labels, or a second number in a piece.

**The Index Mark Rule.** Beyond the key figure, cinnabar is reserved for navigation signals: index numerals, the active nav item, focus and hover underlines. It is a pointer, never decoration or emphasis.

## Typography

**Display Font:** Noto Serif Display (with Times New Roman, serif)
**Body Font:** IBM Plex Sans (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** A high-contrast Greek display serif carries the claim; a neutral grotesque carries the explanation; a monospace carries the evidence. All three are self-hosted with Greek and Latin subsets.

### Hierarchy
- **Display** (600, clamp 40 to 68px, 1.04, -0.015em): the week's lead headline only.
- **Title** (600, clamp 34 to 56px, 1.08, -0.015em): article and standalone page h1.
- **Headline** (600, clamp 24 to 32px, 1.2): section heads (Αρχείο), the data band headline, in-prose h2.
- **Headline Small** (600, clamp 19 to 24px, 1.2): contents titles, register titles, apparatus heads, method items.
- **Dek** (400, clamp 17 to 20px, 1.55): the standfirst under every headline, in Ink Soft, capped near 38em.
- **Body** (400, 17px, 1.6): reading text, max measure 68ch. Medium (500) for row headers, nav and action links; 600 only for chart captions and highlighted rows.
- **Small** (400, 15px): nav, chart rows, apparatus text, footer.
- **Label** (mono 400, 12px, 0.12em, uppercase, tabular): source lines, dates, counts; 0.07em below 640px. The masthead tagline uses the same face at 0.32em (0.24em mobile).
- **Numeral** (mono 400, 13px, tabular): chart values, index numerals.

### Named Rules
**The Three Jobs Rule.** Serif states the claim, sans explains it, mono proves it. Mono is only for source lines (including their type and date meta), dates, counts, numerals and the tagline. Sentences are never set in mono.

**The Six Hundred Rule.** Every serif headline is weight 600, matching the brand kit. Lighter serif weights are not part of the ramp.

## Layout

Single content column constrained to 90rem with a fluid gutter (16 to 56px). The front page is an issue spread: lead piece in roughly the left 1.4fr with a 68ch-ish measure, contents list in the right 1fr behind a 1px ink rule, separated by a 64px column gap. Below 960px the spread stacks, the contents rule drops, and the lead disappears from the contents list. Below 720px fact rows and register rows reflow into stacked grid blocks (label and date on one line, value or title beneath, source last). Articles and the method page sit in a single 46rem column plus gutters.

Spacing follows a 4px-based scale (4, 8, 12, 16, 24, 32, 48, 64, 96px). Space above a heading is larger than below it; bands use 48px block padding; the footer sits 96px below content. Sections are separated by hairlines or by the marble-deep band, never by gaps alone.

## Elevation & Depth

Flat. Nothing is lifted. Depth is conveyed by two hairline weights (ink for section and header boundaries, Rule grey for rows) and by one tonal step (Marble Deep) for bands and notices. The ink footer is the only full inversion.

Closing hairlines at the foot of tables and lists are drawn with a 1px inset box-shadow (`inset 0 -1px 0 <rule colour>`) and top rules with a 1px background-image so they can animate. These are line-drawing techniques, not shadows, and are the sanctioned way to draw a rule in this system.

### Named Rules
**The Hairline Rule.** Structure comes from 1px rules only. No drop shadows, no glows, no elevation on hover.

## Shapes

Square. No border radius anywhere; bars, fills, focus rings and bands are all hard-edged rectangles. Borders exist only as single hairlines on one side of an element (top, bottom, or the contents column's left), never as an enclosing box. The only curved geometry is the wordmark's eye; links use an authored SVG hairline arrow (1.25 stroke, square caps) rather than arrow glyphs.

## Components

### Navigation (Masthead)
Wordmark, mono tagline, three text links on a 1px ink base rule.
- **Links:** 15px Plex 500, ink, 8px block padding, 1.5px transparent bottom border.
- **Hover:** border turns ink (160ms). **Current:** border turns cinnabar via `aria-current`.
- **Mobile (below 640px):** stacks wordmark over links, 12px link padding for touch.

### Source Line
The signature. A mono label line directly under every headline: type · date · ΠΗΓΗ / ΠΗΓΕΣ: **source** · ΕΠΕΞΕΡΓΑΣΙΑ: OPSIS. Slate, with the source name and the meta in ink weight 500. Also used as the chart figcaption.

### Headline with Key Figure
Serif 600 headline links with no underline at rest; hover adds a 2px cinnabar underline. The key figure inside the headline is set upright in cinnabar.

### Links and Actions
No buttons exist. Actions are text links: Plex 500 with a 1px underline offset 0.2em, followed by the hairline arrow. Hover turns the underline cinnabar and nudges the arrow 3px right. Focus is a 2px cinnabar outline offset 3px on every interactive element.

### Facts Table
Short ruled table under the lead: medium-weight label, value (Ink Soft on the front page), mono date right-aligned. Rule-grey hairline above each row and a closing hairline below the last.

### Contents List
Ordered issue index: cinnabar mono numerals (01, 02) in a 2.5rem column, serif 600 title, mono type and source beneath. Rule-grey hairlines between items.

### Register
A real table: mono column heads over a 1px ink rule, rows of mono date, mono type, serif title, mono source aligned right. The whole row is clickable through the title link and fills Marble Deep on hover (desktop only).

### Bar Figure
Charts are accessible tables with a caption. Bars are 14px solid rectangles: ink by default, Ash for reference rows, cinnabar for the one highlighted row, whose label and value also go to 600 and cinnabar. Values are mono tabular, right-aligned. Source in a mono figcaption.

### Sample Notice and Commentary Note
Full-width Marble Deep strip with centred 13px Ink Soft text (short copy below 640px). The commentary note in articles uses the same fill with Plex 500 text and 16/24px padding.

### Footer
Ink ground, marble text, wordmark in marble tone with cinnabar-lift pupil, Ash secondary text.

### Motion
On load, hairline rules draw from 0 to 100% width over 900ms (`cubic-bezier(0.16, 1, 0.3, 1)`), staggered 45ms per row after a 120ms start; chart bars grow from the left on the same curve. Both run once and only under `prefers-reduced-motion: no-preference`. Hover transitions are 160ms ease-out.

## Do's and Don'ts

### Do:
- **Do** put a mono source line directly under every headline that makes a claim.
- **Do** set the piece's one key figure in cinnabar through the Headline component, and highlight at most one bar per chart.
- **Do** build structure with 1px hairlines: ink for section boundaries, Rule grey (#C4C0B5) between rows.
- **Do** use Marble Deep (#DEDBD2) as the only fill for bands, notices and row hover.
- **Do** set every serif headline at weight 600.
- **Do** present data and archives as real tables with captions and row headers.
- **Do** gate every load animation behind `prefers-reduced-motion: no-preference`.

### Don't:
- **Don't** use cinnabar for body text, labels, decorative accents, or a second number in the same piece.
- **Don't** set sentences, headings or deks in JetBrains Mono.
- **Don't** add cards, enclosing borders, drop shadows or border radius.
- **Don't** put photographs or hero images on index pages.
- **Don't** add a kicker or eyebrow label above a headline; type and date belong in the source line below it. (The page-level mono issue bar is not a kicker.)
- **Don't** use Unicode arrow glyphs in links; use the hairline SVG arrow.
