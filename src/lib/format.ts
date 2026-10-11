const months = [
  'Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου',
  'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου',
];

const monthsNominative = [
  'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
  'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος',
];

const pad = (n: number) => String(n).padStart(2, '0');

/** 10.10.26, for the register. */
export const shortDate = (d: Date) =>
  `${pad(d.getUTCDate())}.${pad(d.getUTCMonth() + 1)}.${String(d.getUTCFullYear()).slice(2)}`;

/** 10 Οκτωβρίου 2026, for prose. */
export const longDate = (d: Date) => `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

/** Οκτώβριος 2026, for the issue bar. */
export const monthYear = (d: Date) => `${monthsNominative[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

/** ISO week number and its Monday–Sunday range. */
export function isoWeek(d: Date) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = t.getUTCDay() || 7;
  const monday = new Date(t); monday.setUTCDate(t.getUTCDate() - day + 1);
  const sunday = new Date(monday); sunday.setUTCDate(monday.getUTCDate() + 6);
  const thursday = new Date(t); thursday.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((thursday.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { week, monday, sunday };
}

/** 5–11 Οκτωβρίου 2026 (or 28 Σεπτεμβρίου – 4 Οκτωβρίου 2026). */
export function weekRange(monday: Date, sunday: Date) {
  if (monday.getUTCMonth() === sunday.getUTCMonth())
    return `${monday.getUTCDate()}–${longDate(sunday)}`;
  return `${monday.getUTCDate()} ${months[monday.getUTCMonth()]} – ${longDate(sunday)}`;
}

/** Greek number format: 143,5 */
export const num = (n: number, digits = 1) =>
  n.toLocaleString('el-GR', { minimumFractionDigits: 0, maximumFractionDigits: digits });
