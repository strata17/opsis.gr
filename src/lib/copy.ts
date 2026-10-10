// Greek UI strings. Rationale and terminology: docs/ux-copy.md.
export const copy = {
  siteName: 'Opsis',
  tagline: 'Καθαρή ματιά',
  skip: 'Μετάβαση στο περιεχόμενο',
  nav: [
    { href: '/', label: 'Η εβδομάδα' },
    { href: '/#arxeio', label: 'Αρχείο' },
    { href: '/methodos/', label: 'Μέθοδος' },
  ],
  issue: {
    week: (n: number) => `Εβδομάδα ${n}`,
    count: (n: number) => (n === 1 ? '1 θέμα' : `${n} θέματα`),
    contents: 'Σε αυτό το τεύχος',
    readLead: 'Διάβασε την ανάλυση',
    readData: 'Δες τα στοιχεία',
    readComment: 'Διάβασε το σχόλιο',
    readClaim: 'Δες όλο τον έλεγχο',
  },
  claims: {
    said: 'Λέγεται',
    facts: 'Τα στοιχεία',
    heading: 'Λέγεται, αλλά',
  },
  register: {
    heading: 'Αρχείο',
    columns: { date: 'Ημερομηνία', type: 'Είδος', title: 'Θέμα', source: 'Πηγή' },
    empty: 'Δεν υπάρχουν ακόμη θέματα. Τα πρώτα θα εμφανιστούν εδώ, με ημερομηνία και πηγή.',
  },
  types: {
    analysi: 'Ανάλυση',
    dedomena: 'Δεδομένα',
    sxolio: 'Σχόλιο',
    elegxos: 'Έλεγχος',
  },
  source: 'Πηγή',
  sources: 'Πηγές',
  processing: 'Επεξεργασία: Opsis',
  commentNote: 'Σχόλιο. Θέση της Opsis, όχι στοιχείο.',
  article: {
    sources: 'Πηγές',
    method: 'Πώς το μετρήσαμε',
    corrections: 'Διορθώσεις',
    noCorrections:
      'Καμία διόρθωση μέχρι σήμερα. Αν βρεις λάθος, γράψε μας και θα το σημειώσουμε εδώ με ημερομηνία.',
    back: 'Όλα τα θέματα',
    published: 'Δημοσίευση',
  },
  notFound: {
    title: 'Η σελίδα δεν βρέθηκε',
    body: 'Ο σύνδεσμος μπορεί να άλλαξε ή να περιέχει λάθος.',
    week: 'Δες τα θέματα της εβδομάδας',
    archive: 'Άνοιξε το αρχείο',
  },
  footer: {
    statement: 'Αναλύσεις με πηγή σε κάθε στοιχείο. Τα δεδομένα και η γνώμη γράφονται χωριστά.',
    follow: 'Ακολούθησε την Opsis',
    links: [
      { label: 'TikTok', href: 'https://www.tiktok.com/@opsis.gr' },
      { label: 'Instagram', href: 'https://www.instagram.com/opsis.gr/' },
    ],
    handle: '@opsis.gr',
  },
  theme: {
    label: 'Θέμα',
    toDark: 'Σκούρο θέμα',
    toLight: 'Φωτεινό θέμα',
  },
  video: {
    title: 'Δες το σε βίντεο',
  },
  sampleShort: 'Δείγμα: δοκιμαστικές ημερομηνίες και σελίδες.',
  sample:
    'Δείγμα. Τα θέματα και οι πηγές είναι πραγματικά, οι ημερομηνίες και οι σελίδες είναι δοκιμαστικές.',
} as const;
