// Required by Google AdSense. Empty until the publisher ID is configured.
import { adsPublisherId } from '../lib/ads';

export const GET = () =>
  new Response(adsPublisherId ? `google.com, ${adsPublisherId}, DIRECT, f08c47fec0942fa0\n` : '', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
