import { getCollection, type CollectionEntry } from 'astro:content';
import { isoWeek } from './format';

export type Thema = CollectionEntry<'themata'>;

export async function allThemata() {
  const items = await getCollection('themata');
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** The current issue: the lead piece's ISO week, lead first, then newest first. */
export async function currentIssue() {
  const items = await allThemata();
  const lead = items.find((t) => t.data.lead) ?? items[0];
  if (!lead) return { lead: undefined, pieces: [], week: undefined, items };
  const week = isoWeek(lead.data.date);
  const pieces = [lead, ...items.filter((t) => t !== lead && isoWeek(t.data.date).week === week.week
    && t.data.date.getUTCFullYear() === lead.data.date.getUTCFullYear())];
  return { lead, pieces, week, items };
}

export const href = (t: Thema) => `/themata/${t.id}/`;
