// Share images (1200x630) in the Marble style: wordmark, headline with the key figure in cinnabar, source line.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const font = (f: string) => readFileSync(join(process.cwd(), 'src/og/fonts', `${f}.ttf`));
const fonts = [
  { name: 'Noto Serif Display', data: font('noto-serif-display-all-600-normal'), weight: 600 as const },
  { name: 'IBM Plex Sans', data: font('ibm-plex-sans-all-400-normal'), weight: 400 as const },
  { name: 'JetBrains Mono', data: font('jetbrains-mono-all-500-normal'), weight: 500 as const },
];
// Greek capitals drop their accents (ΑΝΑΛΥΣΗ, not ΑΝΆΛΥΣΗ).
const caps = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().normalize('NFC');

const C = { marble: '#E8E6DF', ink: '#0F1419', cinnabar: '#B5301B', slate: '#5A6068' };
const eye = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="${C.ink}" fill-rule="evenodd" d="M0 50 A50 50 0 1 0 100 50 A50 50 0 1 0 0 50 Z M24 50 A26 38 0 1 1 76 50 A26 38 0 1 1 24 50 Z"/><circle cx="50" cy="50" r="11" fill="${C.cinnabar}"/></svg>`)}`;

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node =>
  ({ type, props: { style: { display: 'flex', ...style }, children, ...extra } });

export interface Card { title: string; keyFigure?: string; meta: string; source?: string }

function headline(title: string, figure?: string) {
  const i = figure ? title.indexOf(figure) : -1;
  const parts = i < 0 ? [{ t: title }] : [{ t: title.slice(0, i) }, { t: figure!, c: true }, { t: title.slice(i + figure!.length) }];
  // satori wraps words inside a flex-wrap row; split into words so wrapping stays natural
  const words = parts.flatMap((p) => p.t.split(/(\s+)/).filter(Boolean).map((w) => ({ w, c: p.c })));
  const size = title.length > 60 ? 60 : title.length > 36 ? 72 : 88;
  return h('div', { flexWrap: 'wrap', fontFamily: 'Noto Serif Display', fontWeight: 600, fontSize: size, lineHeight: 1.06, letterSpacing: '-0.015em', color: C.ink },
    words.map(({ w, c }) => h('span', { color: c ? C.cinnabar : C.ink, whiteSpace: 'pre' }, w)));
}

export async function renderCard(card: Card) {
  const tree = h('div', { width: 1200, height: 630, background: C.marble, flexDirection: 'column', padding: '56px 72px 52px' }, [
    h('div', { alignItems: 'center', justifyContent: 'space-between' }, [
      h('div', { alignItems: 'center', fontFamily: 'Noto Serif Display', fontWeight: 600, fontSize: 44, letterSpacing: '0.05em', color: C.ink }, [
        h('img', { width: 33, height: 33, marginRight: 3 }, undefined, { src: eye, width: 33, height: 33 }),
        h('span', {}, 'ΨΙΣ'),
      ]),
      h('span', { fontFamily: 'JetBrains Mono', fontWeight: 500, fontSize: 18, letterSpacing: '0.32em', color: C.slate }, 'ΚΑΘΑΡΗ ΜΑΤΙΑ'),
    ]),
    h('div', { flexGrow: 1, alignItems: 'center', paddingTop: 12 }, [headline(card.title, card.keyFigure)]),
    h('div', { borderTop: `2px solid ${C.ink}`, paddingTop: 18, justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontWeight: 500, fontSize: 19, letterSpacing: '0.1em', color: C.slate }, [
      h('span', { color: C.ink }, caps(card.meta)),
      h('span', {}, caps(card.source ? `Πηγή: ${card.source}` : 'opsismedia.gr')),
    ]),
  ]);
  const svg = await satori(tree as any, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
