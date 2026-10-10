# Admin analytics: setup

The private dashboard lives at `/admin`. It is server-rendered on Vercel, behind a password, never cached, and marked `noindex`.

All values go in **Vercel → opsis-gr → Settings → Environment Variables** (Production). Redeploy after adding them.

## 1. Password (required)
`ADMIN_PASSWORD`: at least 12 characters. Until it is set, the login page shows a setup note and nobody can sign in. Changing it signs every session out.

## 2. YouTube (easiest, about 5 minutes)
1. Go to console.cloud.google.com, create a project and enable **YouTube Data API v3**.
2. Under Credentials, create an **API key**. Restrict it to the YouTube Data API.
3. Set `YOUTUBE_API_KEY`. Optionally set `YOUTUBE_HANDLE` (default `opsismedia`).

This shows subscribers, total views, video count and the last 10 videos with views, likes and comments.

## 3. Instagram
Requires an Instagram **Business or Creator** account linked to a Facebook Page.
1. At developers.facebook.com, create an app (type Business) and add **Instagram Graph API**.
2. With the Graph API Explorer, get a user token with `instagram_basic`, `pages_show_list` and `instagram_manage_insights`, then exchange it for a **long-lived token** (valid for 60 days).
3. Find the Instagram user ID: `GET /me/accounts`, then `/{page-id}?fields=instagram_business_account`.
4. Set `INSTAGRAM_USER_ID` and `INSTAGRAM_ACCESS_TOKEN`.

This shows followers, post count and the last 10 posts with likes and comments. The token must be renewed every 60 days; the dashboard says so when it expires.

## 4. TikTok
1. At developers.tiktok.com, create an app and add **Login Kit** with the scopes `user.info.basic`, `user.info.stats` and `video.list`. Submit it for review (sandbox works for your own account meanwhile).
2. Authorise the app once with the @opsis.gr account and exchange the code for tokens. Keep the **refresh token** (valid for 365 days).
3. Set `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET` and `TIKTOK_REFRESH_TOKEN`.

This shows followers, total likes, video count and the last 10 videos with views, likes, comments and shares. A fresh 24-hour access token is minted on each visit.

## Website traffic
Enable **Web Analytics** in the Vercel project (Analytics tab). The site already loads the script; it uses no cookies.
