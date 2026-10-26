<div align="center">

<img src="src/app/icon.svg" width="96" height="96" alt="Kaushal's K. logo" />

# Kaushal Devarasetty · `linga676767`

**Gamer first, front-end developer second.**
My personal portfolio: Minecraft Bedwars, a bed-defence calculator, and the stuff I'm learning.

![Next.js](https://img.shields.io/badge/Next.js-16-000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-20232a?logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Minecraft Bedwars](https://img.shields.io/badge/Bedwars-Top%2010%204v4%20on%20ArchMC-22e5ff)

</div>

---

## About me

Hey, I'm **Kaushal**. I'm an Indian high-school student living in Australia, proud of my Hindu heritage and culture, and a big science fan. In Minecraft I go by **linga676767**, and I made the **top 10 of the 4v4 Bedwars leaderboard on ArchMC**. All of that from a floor setup and a basic office mouse.

When I'm not guarding a bed, I'm writing clean, responsive front-end code with HTML and CSS, playing chess on Lichess, or playing badminton (washed, but still out there).

| | |
| --- | --- |
| 🎮 IGN | `linga676767` |
| 🏆 Bedwars | Top 10, 4v4 leaderboard on ArchMC |
| 🏷️ Profile badge | OG · 110+ Stars in @Arch |
| 🛠️ Daily | HTML5 · Figma · GitHub |
| 📚 Learning | Python · Arduino |
| ☁️ Also listed | Google Cloud · CSS |

## What's on the site

- **Hero** with my in-game screenshot, animated name and stats.
- **About**: heritage, science, badminton, my "pro" setup and chess.
- **Gaming**: my ArchMC leaderboard spot, IGN card and a screenshot gallery with a lightbox.
- **Bed lab**: build a Bedwars bed defence (up to five layers) and see:
  - how long it takes to dig through with **bare hands**
  - how long it takes with the **best tool per block**, for any tool tier and Efficiency level
  - how many **TNT** it takes and how long the fuses run (4 s each), or whether TNT **can't break it** at all (obsidian, blast-proof glass)
  - a **Blast it** button that animates each TNT going off
- **Skills** with the same labels as my profile (Daily, Learning, Listed).
- **Contact**: email, Discord (with a copy button), Twitch, GitHub, Spotify, Lichess and my Discord server.

### How the bed lab works out the numbers

It uses vanilla Minecraft **Java Edition** formulas, so treat it as a guide; servers like ArchMC can change things.

- **Break time**: per tick, progress = tool speed ÷ block hardness ÷ 30 (or ÷ 100 if the block needs a tool you don't have). Efficiency adds level² + 1 to the tool's speed.
- **TNT**: power 4 with an average-strength roll. The blast ray loses 0.225 every 0.3 blocks, and each block it enters costs (blast resistance + 0.3) × 0.3. A block breaks while the ray still has strength left. TNT is placed right against the next layer standing.

The maths lives in [`src/lib/bedwars.ts`](src/lib/bedwars.ts).

## Built with

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- Plain global CSS with design tokens, no UI library
- `next/font` (Archivo for display type, Pixelify Sans for small game-style labels)
- `next/og` for the generated share image and Apple touch icon
- Static export (`output: "export"`), so it deploys as plain files
- Intersection Observer for scroll reveals and count-ups, all respecting `prefers-reduced-motion`

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
# the static site lands in out/
```

## Deploying

The site is a **static export**: `npm run build` writes plain files to `out/`, so it runs on any static host.

**Cloudflare Pages** (what I use):

| Setting | Value |
| --- | --- |
| Framework preset | None (or Next.js (Static HTML Export)) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Environment variables | `NEXT_PUBLIC_SITE_URL` = your domain, and `NODE_VERSION` = `22` if the build complains about Node |

Vercel, Netlify and GitHub Pages work too: point them at the same build command and the `out` folder.

Set the live domain so canonical links, the sitemap and link previews point to it (see `.env.example`):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If it isn't set, the domain the host gives the site is used (on Cloudflare that is the deployment's own `*.pages.dev` address, so set the variable for a stable link). A build with no domain at all prints a warning, because link previews would point at localhost.

### Link previews (embeds)

Paste the link in Discord, WhatsApp, X, iMessage or LinkedIn and it shows a 1200×630 card with my logo, `linga676767`, my name, the Top 10 badge and an in-game screenshot. The card is generated at build time as `/og.png` from `src/app/og.png/route.tsx`, and Discord draws its side stripe in the site's neon cyan. After deploying you can test it at [opengraph.xyz](https://www.opengraph.xyz/). Discord caches embeds, so a changed card can take a while to show up there.

### Also ready for hosting

- Security and cache headers in `public/_headers` (read by Cloudflare Pages and Netlify): no framing, no MIME sniffing, HSTS, strict referrer, long caching for built assets
- A themed 404 page ("Bed broken")

SEO that's already set up:

- Title, description, keywords, canonical URL and robots rules
- Open Graph + Twitter card with a generated 1200×630 preview image (`/og.png`)
- `robots.txt`, `sitemap.xml` and a web app manifest
- `Person` structured data (JSON-LD) linking my profiles
- SVG favicon plus an Apple touch icon

## Project layout

```
src/
  app/
    layout.tsx            fonts, metadata, SEO
    page.tsx              the single page (all sections)
    globals.css           theme tokens, layout and animations
    icon.svg              the K. logo / favicon
    og.png/route.tsx      link-preview image, built to /og.png
    apple-touch-icon.png/route.tsx   home-screen icon
    not-found.tsx  manifest.ts  robots.ts  sitemap.ts
  components/
    BedDefence.tsx        the bed lab
    Gallery.tsx           screenshot grid and lightbox
    Motion.tsx            reveals, count-ups, tilt and spotlight effects
    SiteNav.tsx           header, mobile menu, scroll progress
    Logo.tsx  CopyHandle.tsx
  content/site.ts         every fact, link and picture in one place
  lib/bedwars.ts          break-time and TNT maths
public/images/
  gameplay/               my in-game screenshots
  art/                    voxel icons (drawn by scripts/voxel-art.mjs)
```

## Find me

[Twitch](https://twitch.tv/linga676767) · [GitHub](https://github.com/kdevarasetty7) · [Spotify](https://open.spotify.com/user/31grbhw32dekt2z4s6gcnx4uul7y) · [Lichess](https://lichess.org/@/kaushal_D) · [Discord server](https://discord.gg/tKUA5gJXM) · Discord `@m4sterfunkyboizz` · [kaushal.hkd@gmail.com](mailto:kaushal.hkd@gmail.com)

---

<sub>Minecraft is a trademark of Mojang. This is my personal fan site and isn't affiliated with Mojang or ArchMC.</sub>
