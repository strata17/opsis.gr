// Topic slugs used in content frontmatter (`topics: [...]`) and their Greek labels.
export const topics = {
  pasok: 'ΠΑΣΟΚ',
  elas: 'ΕΛΑΣ',
  syriza: 'ΣΥΡΙΖΑ',
  kentroaristera: 'Κεντροαριστερά',
  dimoskopiseis: 'Δημοσκοπήσεις',
  kyvernisi: 'Κυβέρνηση',
  oikonomia: 'Οικονομία',
  ergasia: 'Εργασία',
  nea_kommata: 'Νέα κόμματα',
  ekloges: 'Εκλογές',
  kke: 'ΚΚΕ',
  agrotes: 'Αγρότες',
  kriti: 'Κρήτη',
} as const;
export type Topic = keyof typeof topics;
export const topicHref = (t: string) => `/thema/${t}/`;

// Archive filter slugs per piece type.
export const typeSlugs = { analysi: 'analyseis', dedomena: 'dedomena', sxolio: 'sxolia', elegxos: 'elegxoi' } as const;
export const typePlural = { analysi: 'Αναλύσεις', dedomena: 'Δεδομένα', sxolio: 'Σχόλια', elegxos: 'Έλεγχοι' } as const;
