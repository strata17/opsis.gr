export interface Post { title: string; url?: string; date?: Date; views?: number; likes?: number; comments?: number; shares?: number }
export type Platform =
  | { status: 'ok'; name: string; handle: string; url: string; followers?: number; totalViews?: number; totalLikes?: number; posts: number; recent: Post[] }
  | { status: 'missing'; name: string; needs: string[] }
  | { status: 'error'; name: string; message: string };
export const env = (k: string) => (import.meta.env[k] as string | undefined) ?? process.env[k];
export async function getJSON(url: string, init?: RequestInit) {
  const r = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) });
  const body = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(body?.error?.message ?? body?.error?.code ?? `HTTP ${r.status}`);
  return body;
}
