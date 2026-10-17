// Google AdSense. Off until PUBLIC_ADSENSE_CLIENT (ca-pub-...) is set at build time; with it unset
// the site loads no ad code, shows no slots and the privacy page keeps its "no cookies" wording.
// The publisher ID and the ad-unit ID are public by design (they appear in every page's HTML).
const clean = (v: unknown) => String(v ?? '').trim().replace(/^["']|["']$/g, '');

const client = clean(import.meta.env.PUBLIC_ADSENSE_CLIENT);
const slot = clean(import.meta.env.PUBLIC_ADSENSE_SLOT);

export const adsClient = /^ca-pub-\d{10,20}$/.test(client) ? client : null;
export const adsSlot = adsClient && /^\d{6,20}$/.test(slot) ? slot : null;
export const adsEnabled = adsClient !== null;
export const adsPublisherId = adsClient ? adsClient.replace(/^ca-/, '') : null;
