# Deployment, domain, HTTPS & SEO

Static site, built with `pnpm build` → `dist/`, hosted free on **Netlify**, served from
**kungadempatsang.com** (registered at Porkbun). No backend, no secrets — the contact form uses
Netlify Forms.

---

## ⚠️ First: make sure Netlify deploys THIS repo

A diagnosis of the live site found it was last published from a **different, stale origin** (an
`artist-portfolio.manus.space` build that still showed prices and a blog — not this repo). Until that's
fixed, pushing here won't update the site. One-time check in Netlify:

1. **Site configuration → Build & deploy → Continuous deployment.**
2. Confirm the repository is **`ngawang21/artist-portfolio`**, production branch **`main`**,
   build command **`pnpm build`**, publish directory **`dist`** (these match `netlify.toml`).
3. If it points anywhere else (or is a manual/drag-drop deploy), **“Link to a different repository”** →
   choose `ngawang21/artist-portfolio`. Then **Deploys → Trigger deploy → Deploy site** once.

After that, the new portfolio (price-free, real paintings, Raleway) replaces the old build everywhere.

## 1. Domain — already done ✅

DNS is pointed (Porkbun → Netlify). For reference, the records are:

| Type | Host | Value |
| --- | --- | --- |
| `ALIAS`/`A` | `@` (apex) | `apex-loadbalancer.netlify.com` (or A → `75.2.60.5`) |
| `CNAME` | `www` | `kunart.netlify.app` |

In Netlify → **Domain management**, `kungadempatsang.com` is the primary domain and `www` redirects to it.

## 2. HTTPS / “Not Secure” — how to keep it clean

Good news: when checked, HTTPS was **healthy** (HTTP/2, automatic `http → https` redirect, HSTS, and
**zero mixed-content** references). A transient “Not Secure” usually means the Let's Encrypt certificate
hadn't finished provisioning during the DNS cutover. To be sure it stays secure:

1. **Domain management → HTTPS:** confirm the Let's Encrypt certificate is issued and lists **both**
   `kungadempatsang.com` **and** `www.kungadempatsang.com`. If it's stuck, click **Verify DNS configuration**
   / **Renew certificate**.
2. Turn **Force HTTPS** **on** (it 301-redirects any `http://` visitor to `https://`).
3. Mixed content is not a risk here — every image, font and asset is served from our own domain
   (no `http://`, no external CDN), and `SITE.url` is `https://kungadempatsang.com`. Keep it that way.

If a browser still shows “Not Secure”, it's almost always (a) DNS not fully propagated yet (wait up to 24h),
(b) the cert covering only one of apex/`www`, or (c) a stale cached page — hard-refresh.

## 3. Get found on Google (do once)

The verification tag is **already in the site's `<head>`**
(`<meta name="google-site-verification" content="kp9btrZz9jgQmgDIhS4gKUu_esBsyHuZZo8__ZPp7t8">`), so:

1. **Google Search Console** → add property → **URL prefix** `https://kungadempatsang.com` →
   verify with the **HTML tag** method (it's already deployed, so it'll pass).
2. **Sitemaps → submit** `sitemap-index.xml`.
3. **URL Inspection → Request indexing** for the home and About pages to speed up first indexing of her name.

The site ships name-rich titles, descriptions, EN/FR `hreflang`, a sitemap, and `Person` structured data
(with `name` / `alternateName` “Kunga Dempa Tsang”, birthplace, Instagram) — the domain matching her name
plus Search Console is what makes searches for *Kunga Dempa Tsang* find her.

## 4. The content manager + batched publishing 💡

The artist edits at `/admin` (Sveltia CMS, GitHub backend). To **save Netlify build minutes**, the CMS is
set to **`skip_ci: true`** (in `public/admin/config.yml`): every save commits to GitHub but the commit
carries `[skip ci]`, so it **does not redeploy**. She makes all her changes across a session, then
**publishes them all at once**. Set up the one-click publish:

1. Netlify → **Build & deploy → Continuous deployment → Build hooks → Add build hook**
   (name it “Publish”, branch `main`). Copy the URL (`https://api.netlify.com/build_hooks/…`).
2. Give the artist that URL as a **bookmark** named *“Publish my website”*. Opening it once triggers a
   single deploy that picks up everything she saved. (She can also use Netlify → **Deploys → Trigger deploy**.)

A build-hook deploy always runs, even though the commits say `[skip ci]`. Developer pushes (this repo, no
`[skip ci]`) still deploy automatically. To make every save auto-publish instead, set `skip_ci: false`.

Free tier headroom: 300 build minutes/month, 100 GB bandwidth — an Astro build is ~1–3 min, so even with
auto-publish a painter's editing pace stays well within free limits; batching just keeps it comfortable.

## 5. CMS GitHub login (once, by the developer)

1. Create a GitHub OAuth App at <https://github.com/settings/developers>:
   - **Homepage URL:** `https://kungadempatsang.com`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
2. Netlify → **Site configuration → Access & security → OAuth → Install provider → GitHub**; paste the
   Client ID and Secret.
3. Visit `/admin`, **Login with GitHub**, authorize. (If Sveltia ever misbehaves, `public/admin/index.html`
   has a commented Decap CMS line that uses the same config.)

## Before-launch checklist

- [ ] Netlify is building from `ngawang21/artist-portfolio` / `main` (section above) and a fresh deploy is live.
- [ ] Certificate covers apex **and** `www`; **Force HTTPS** is on.
- [ ] Search Console verified; `sitemap-index.xml` submitted; home + About indexing requested.
- [ ] Build hook created and bookmarked as “Publish my website”.
- [ ] GitHub OAuth configured so `/admin` login works.
