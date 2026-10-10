// Instagram Graph API (Business/Creator account). Needs: INSTAGRAM_USER_ID, INSTAGRAM_ACCESS_TOKEN (long-lived, 60 days).
import { env, getJSON, type Platform } from './types';
const API = 'https://graph.facebook.com/v21.0';

export async function instagram(): Promise<Platform> {
  const name = 'Instagram', id = env('INSTAGRAM_USER_ID'), token = env('INSTAGRAM_ACCESS_TOKEN');
  const needs = [!id && 'INSTAGRAM_USER_ID', !token && 'INSTAGRAM_ACCESS_TOKEN'].filter(Boolean) as string[];
  if (needs.length) return { status: 'missing', name, needs };
  try {
    const me = await getJSON(`${API}/${id}?fields=username,followers_count,media_count&access_token=${token}`);
    const media = await getJSON(`${API}/${id}/media?fields=caption,permalink,timestamp,like_count,comments_count&limit=10&access_token=${token}`);
    return {
      status: 'ok', name, handle: `@${me.username}`, url: `https://www.instagram.com/${me.username}/`,
      followers: me.followers_count, posts: me.media_count,
      recent: (media.data ?? []).map((m: any) => ({
        title: (m.caption ?? '').split('\n')[0].slice(0, 90) || 'Χωρίς λεζάντα', url: m.permalink, date: new Date(m.timestamp),
        likes: m.like_count, comments: m.comments_count,
      })),
    };
  } catch (e) { return { status: 'error', name, message: (e as Error).message }; }
}
