// TikTok Display API (Login Kit, scopes user.info.stats + video.list).
// Needs: TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REFRESH_TOKEN. Access tokens last 24h, so one is minted per request.
import { env, getJSON, type Platform } from './types';
const API = 'https://open.tiktokapis.com/v2';

export async function tiktok(): Promise<Platform> {
  const name = 'TikTok', key = env('TIKTOK_CLIENT_KEY'), secret = env('TIKTOK_CLIENT_SECRET'), refresh = env('TIKTOK_REFRESH_TOKEN');
  const needs = [!key && 'TIKTOK_CLIENT_KEY', !secret && 'TIKTOK_CLIENT_SECRET', !refresh && 'TIKTOK_REFRESH_TOKEN'].filter(Boolean) as string[];
  if (needs.length) return { status: 'missing', name, needs };
  try {
    const tok = await getJSON(`${API}/oauth/token/`, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_key: key!, client_secret: secret!, grant_type: 'refresh_token', refresh_token: refresh! }),
    });
    const auth = { Authorization: `Bearer ${tok.access_token}` };
    const u = (await getJSON(`${API}/user/info/?fields=display_name,username,follower_count,likes_count,video_count`, { headers: auth })).data.user;
    const v = await getJSON(`${API}/video/list/?fields=id,title,video_description,share_url,create_time,view_count,like_count,comment_count,share_count`, {
      method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify({ max_count: 10 }),
    });
    return {
      status: 'ok', name, handle: `@${u.username ?? 'opsis.gr'}`, url: `https://www.tiktok.com/@${u.username ?? 'opsis.gr'}`,
      followers: u.follower_count, totalLikes: u.likes_count, posts: u.video_count,
      recent: (v.data?.videos ?? []).map((x: any) => ({
        title: (x.title || x.video_description || 'Χωρίς τίτλο').slice(0, 90), url: x.share_url, date: new Date(x.create_time * 1000),
        views: x.view_count, likes: x.like_count, comments: x.comment_count, shares: x.share_count,
      })),
    };
  } catch (e) { return { status: 'error', name, message: (e as Error).message }; }
}
