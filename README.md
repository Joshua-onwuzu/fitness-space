# Fitness Space Landing

Next.js App Router landing page for Fitness Space and Bibi, the AI nutrition
and fitness coach for Nigerian food, African meals, habit tracking and
sustainable weight loss.

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SEO Environment

Set these in production before launch:

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
NEXT_PUBLIC_SIGNUP_URL=https://your-signup-or-onboarding-url.example
```

`NEXT_PUBLIC_SITE_URL` controls canonical URLs, sitemap URLs, robots host,
OpenGraph URLs and JSON-LD entity IDs. `NEXT_PUBLIC_SIGNUP_URL` controls every
primary "Meet Bibi - It's Free" CTA.

## SEO Verification

After deployment, verify:

```bash
curl -I "$NEXT_PUBLIC_SITE_URL/"
curl -I "$NEXT_PUBLIC_SITE_URL/robots.txt"
curl -I "$NEXT_PUBLIC_SITE_URL/sitemap.xml"
```

Then inspect the deployed URL in Google Search Console and validate structured
data with the Google Rich Results Test.

## Measurement Plan

Track the landing page with:

- Google Search Console indexing, queries, impressions, CTR and sitemap status.
- Bing Webmaster Tools indexing and query coverage.
- CTA click events from organic sessions.
- Scroll depth checkpoints for the major sections.
- Core Web Vitals field data, especially LCP, INP and CLS at p75.
- Organic conversion rate from the primary signup CTA.

Targets:

- `/`, `/robots.txt` and `/sitemap.xml` return 200.
- The home page canonical resolves to `NEXT_PUBLIC_SITE_URL`.
- p75 LCP is 2.5s or faster.
- p75 INP is 200ms or faster.
- p75 CLS is 0.1 or lower.
