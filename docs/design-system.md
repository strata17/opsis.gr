# Opsis web design system: tokens and components

This extends the brand kit (`03_brand_kit/opsis-brand-kit.html`, Marble Edition) to the website. Tokens live in `src/styles/tokens.css`; components in `src/components/`. The visual rules are recorded in `DESIGN.md`. This file is the component reference.

## Tokens

| Group | Tokens | Notes |
|---|---|---|
| Brand colour | `--c-marble` #E8E6DF, `--c-ink` #0F1419, `--c-cinnabar` #B5301B, `--c-cinnabar-lift` #E0553A, `--c-slate` #5A6068, `--c-ash` #A5AAB1 | From the brand kit, unchanged |
| Derived colour | `--c-marble-deep` #DEDBD2, `--c-ink-soft` #2B3038, `--c-rule` #C4C0B5 | Quiet fills, dek text, row hairlines |
| Roles | `--bg`, `--fg`, `--fg-soft`, `--fg-muted`, `--accent`, `--rule`, `--rule-strong` | Use roles in components, not brand names |
| Type | `--font-display` Noto Serif Display, `--font-text` IBM Plex Sans, `--font-mono` JetBrains Mono | Self-hosted Greek and Latin subsets in `public/fonts` |
| Scale | `--fs-display` 40–68px, `--fs-title` 34–56, `--fs-h2` 24–32, `--fs-h3` 19–24, `--fs-dek` 17–20, `--fs-body` 17, `--fs-small` 15, `--fs-label` 12 | Fluid between 390 and 1440px |
| Space | `--s-1` … `--s-9` (4 to 96px), `--gutter` 16–56px, `--measure` 68ch | More space above a heading than below |
| Themes | light (default), dark via `prefers-color-scheme` or the masthead toggle | Roles swap in `tokens.css`; components never use brand names |
| Motion | `--ease-out`, `--dur-draw` 900ms, `--dur-quick` 160ms | On load, rules draw and chart bars grow left to right; all gated by reduced motion |

### Colour rules
- Cinnabar marks **one number per piece** (`keyFigure`), the highlighted bar, contents numerals and the active nav item. Never body text or labels.
- Mono is for **source lines, dates and counts** only. Sentences are set in Plex Sans.
- No shadows, no rounded corners, no photos on index pages. Structure comes from hairlines.

## Components

| Component | File | Use | Key props |
|---|---|---|---|
| Wordmark | `Wordmark.astro` | ΟΨΙΣ with the eye mark | `size`, `tone: ink \| marble` |
| Masthead | `Masthead.astro` | Wordmark, tagline, primary nav | `current` (sets `aria-current`) |
| SourceLine | `SourceLine.astro` | The line under every headline: type · date · ΠΗΓΗ · ΕΠΕΞΕΡΓΑΣΙΑ | `text`, `label`, `meta`, `processed` |
| Headline | `Headline.astro` | Sets `keyFigure` in cinnabar inside a title | `title`, `figure` |
| BarFigure | `BarFigure.astro` | Horizontal bar chart as an accessible table | `title`, `rows[]`, `source`, `unit` |
| Arrow | `Arrow.astro` | Hairline SVG arrow for links | `dir: right \| left` |
| SampleNotice | `SampleNotice.astro` | Marks sample content; long and short copy | — |
| ThemeToggle | `ThemeToggle.astro` | Light/dark switch, remembers the choice | — |
| Footer | `Footer.astro` | Statement and social links on ink | — |

### Patterns
- **Issue spread** (`index.astro`): lead opened at display size with its facts table, contents list in the right third. Below 960px the contents list drops the lead.
- **Data band**: newest data piece with its BarFigure on `--c-marble-deep`.
- **Register**: a real `<table>` sorted by date, with sources right-aligned. Whole rows are clickable through a stretched title link. Below 720px each row becomes a three-line block.
- **Article apparatus** (`layouts/Article.astro`): Πηγές as a numbered list, Πώς το μετρήσαμε, Διορθώσεις with a dated list or the empty state.

### States
| Element | Hover | Focus | Current |
|---|---|---|---|
| Nav link | ink underline | cinnabar outline | cinnabar underline |
| Headline link | cinnabar underline, 2px | cinnabar outline | — |
| Register row | `--c-marble-deep` fill | outline on title link | — |
| Read link | underline turns cinnabar, arrow shifts 3px | cinnabar outline | — |

### Accessibility
- `lang="el"`, skip link, visible focus ring, `aria-current` on nav.
- Charts and the register are tables with captions and row headers; bars are `aria-hidden` and the value is text.
- Contrast: ink/marble 14.8:1, slate/marble 5.1:1, cinnabar/marble 4.9:1, slate on `--c-marble-deep` about 4.6:1.

## Adding a piece
Create `src/content/themata/<slug>.md` with `title`, `keyFigure` (optional), `dek`, `type`, `date`, `sourceLine`, `sources[]`, and optional `figure`, `facts`, `method` and `corrections`. Set `lead: true` on the week's lead. Remove `sample: true` when the piece is real.
