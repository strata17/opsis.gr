// YouTube Data API v3, public channel statistics. Needs: YOUTUBE_API_KEY (Google Cloud), optional YOUTUBE_HANDLE.
import { env, getJSON, type Platform } from './types';
const API = 'https://www.googleapis.com/youtube/v3';

export async function youtube(): Promise<Platform> {
  const name = 'YouTube', key = env('YOUTUBE_API_KEY'), handle = env('YOUTUBE_HANDLE') ?? 'opsismedia';
  if (!key) return { status: 'missing', name, needs: ['YOUTUBE_API_KEY'] };
  try {
    const ch = (await getJSON(`${API}/channels?part=snippet,statistics,contentDetails&forHandle=@${handle}&key=${key}`)).items?.[0];
    if (!ch) return { status: 'error', name, message: `Δεν βρέθηκε κανάλι @${handle}` };
    const uploads = ch.contentDetails.relatedPlaylists.uploads;
    const list = await getJSON(`${API}/playlistItems?part=contentDetails&maxResults=10&playlistId=${uploads}&key=${key}`);
    const ids = (list.items ?? []).map((i: any) => i.contentDetails.videoId).join(',');
    const vids = ids ? (await getJSON(`${API}/videos?part=snippet,statistics&id=${ids}&key=${key}`)).items ?? [] : [];
    return {
      status: 'ok', name, handle: `@${handle}`, url: `https://www.youtube.com/@${handle}`,
      followers: Number(ch.statistics.subscriberCount), totalViews: Number(ch.statistics.viewCount), posts: Number(ch.statistics.videoCount),
      recent: vids.map((v: any) => ({
        title: v.snippet.title, url: `https://www.youtube.com/watch?v=${v.id}`, date: new Date(v.snippet.publishedAt),
        views: Number(v.statistics.viewCount ?? 0), likes: Number(v.statistics.likeCount ?? 0), comments: Number(v.statistics.commentCount ?? 0),
      })),
    };
  } catch (e) { return { status: 'error', name, message: (e as Error).message }; }
}
