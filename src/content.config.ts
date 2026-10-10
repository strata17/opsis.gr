import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const source = z.object({
  name: z.string(),          // ΕΛΣΤΑΤ, Eurostat, ΤΑ ΝΕΑ ...
  detail: z.string().optional(), // what exactly, and when
  url: z.string().url().optional(),
});

const figure = z.object({
  title: z.string(),
  unit: z.string().optional(),
  rows: z.array(z.object({
    label: z.string(),
    value: z.number(),
    highlight: z.boolean().default(false),
    reference: z.boolean().default(false), // averages such as ΕΕ
  })),
  source: z.string(),
});

const themata = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/themata' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    keyFigure: z.string().optional(), // the one number, set in cinnabar in the headline
    dek: z.string(),
    type: z.enum(['analysi', 'dedomena', 'sxolio', 'elegxos']),
    claims: z.array(z.object({
      claim: z.string(),          // what circulates, quoted without attribution
      fact: z.string(),           // what the data says, one sentence
      keyFigure: z.string().optional(),
      source: z.string(),
    })).optional(),
    date: z.coerce.date(),
    sourceLine: z.string(),   // short form for lists: "Eurostat, 2025"
    sources: z.array(source).min(1),
    figure: figure.optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string(), when: z.string().optional() })).optional(),
    method: z.string().optional(),
    photo: z.object({
      src: image(),               // graded black and white, as in the videos (06_video_toolkit/grade.py)
      alt: z.string(),
      credit: z.string(),         // "Basilispanagou, Wikimedia Commons, CC BY-SA 4.0"
      position: z.string().default('50% 30%'),
    }).optional(),
    video: z.object({ url: z.string().url(), platform: z.string(), duration: z.string().optional() }).optional(),
    corrections: z.array(z.object({ date: z.coerce.date(), text: z.string() })).default([]),
    lead: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});

export const collections = { themata };
