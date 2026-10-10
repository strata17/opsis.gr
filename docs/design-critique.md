## Design Critique: Opsis starter (homepage + article)

Stage: first build for review. Screenshots: `.impeccable/review/`.

### Overall Impression
It reads as Opsis immediately: the ΟΨΙΣ mark, marble ground and serif headline carry the video brand onto the web without photos or decoration, and every headline has its source directly beneath it. The biggest opportunity is the mobile first screen, where the sample notice and the stacked masthead push the lead headline about a third of the way down.

### Usability
| Finding | Severity | Recommendation |
|---------|----------|----------------|
| Register rows highlight on hover as a whole row, but only the title is a link | 🟡 Moderate | Stretch the title link over the row (`::after` inset 0) so the click target matches the hover |
| On mobile, the sample notice wraps to three lines above the masthead | 🟡 Moderate | Shorter notice on small screens ("Δείγμα · δοκιμαστικές ημερομηνίες"), full text on desktop |
| The data band repeats a piece already listed in this week's contents (03) | 🟢 Minor | Fine while there are few pieces; later, feature the newest data piece outside the current issue |
| Footer "TikTok · Instagram" are not links yet | 🟢 Minor | Add the real profile URLs |
| Lead "Διάβασε την ανάλυση" sits below a five-row table, far down on mobile | 🟢 Minor | Acceptable: the headline is the primary link. Keep the table, or cap it at three rows on the homepage |

### Visual Hierarchy
- **What draws the eye first**: the lead headline. Correct.
- **Reading flow**: headline → dek → source line → the facts table → contents list on the right, then the grey data band, then the register. On desktop the scroll varies density well: open lead, dense list, quiet figure, dense register.
- **Emphasis**: cinnabar is used only for the highlighted bar, the contents numerals, the active nav and «Σχόλιο». That restraint is right and makes the highlighted value read as the point.

### Consistency
| Element | Issue | Recommendation |
|---------|-------|----------------|
| Mono source lines | Tracking at 0.12em wraps long source lists to three lines on mobile | Tighten to about 0.08em below 640px |
| Headline weights | Lead and article titles use 600, list titles use 500 | Intentional: 600 for the piece you are on, 500 for lists. Keep it and document it |
| Method page rules | Uses static borders while other lists use drawn rules | Switch to the shared `.rule-top` class for one motion grammar |

### Accessibility
- **Color contrast**: ink on marble 14.8:1, slate on marble 5.1:1, slate on the deeper data band about 4.6:1 (passes AA for body text, check after any palette change), cinnabar on marble 4.9:1. Marble and ash on the ink footer pass.
- **Touch targets**: nav links are at least 44px tall on mobile; contents rows are full-width links. Register titles need the stretched link above.
- **Text readability**: 17px body, line-height 1.6, measure capped at 68ch in articles. Uppercase mono labels are 12px, which is the floor; don't go smaller.
- **Semantics**: the register and charts are real tables with captions, so screen readers get the values, not just bars. There is a skip link, `lang="el"`, and a visible focus ring in cinnabar.

### What Works Well
- The source line under every headline makes the product's promise visible without a word of marketing.
- The issue plus register combination answers both "what's new this week" and "what has Opsis covered" on one page.
- Charts are real data drawn from the content files, so editors change numbers in Markdown, not in code.
- No cards, shadows or stock imagery; hairline rules do all the structuring, in line with the brand kit.

### Priority Recommendations
1. **Shorten the mobile sample notice** so the lead headline sits in the first screen at 390px.
2. **Make whole register rows clickable** to match the hover state and enlarge touch targets.
3. **Tighten mono tracking on mobile** so source lines fit in two lines.
