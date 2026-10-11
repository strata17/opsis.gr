import type { APIRoute } from 'astro';
import { allThemata } from '../../lib/themata';
import { renderCard, type Card } from '../../og/render';
import { copy } from '../../lib/copy';
import { shortDate } from '../../lib/format';

export async function getStaticPaths() {
  const items = await allThemata();
  return [
    { params: { slug: 'index' }, props: { card: { title: copy.issue.motto, meta: `Opsis · ${copy.tagline}` } } },
    ...items.map((t) => ({
      params: { slug: t.id },
      props: { card: { title: t.data.title, keyFigure: t.data.keyFigure, meta: `${copy.types[t.data.type]} · ${shortDate(t.data.date)}`, source: t.data.sourceLine } },
    })),
  ];
}

export const GET: APIRoute<{ card: Card }> = async ({ props }) =>
  new Response(await renderCard(props.card), { headers: { 'Content-Type': 'image/png' } });
