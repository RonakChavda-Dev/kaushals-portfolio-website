# Kaushal Devarasetty Portfolio — Project Brief

Use this document as the source of truth when planning or building this portfolio. The goal is a polished personal website for Kaushal Devarasetty, based on the supplied brief, the current profile, and the local inspiration images. Keep personal claims accurate and do not invent projects, achievements, metrics, or social accounts.

## Goal

Create a dark, blue-accented portfolio that presents Kaushal primarily as a gamer and secondarily as an early-stage front-end developer. It should feel personal and energetic, with gaming identity and personality as strong as the coding content. The site must work well on mobile and desktop.

The portfolio should be a **single-page website**. Build the sections below on one page, and make the header links scroll to their corresponding sections (with smooth scrolling only when reduced motion is not requested). Do not split the portfolio into separate routes/pages unless the user later asks for that.

## Tech stack

- Next.js (App Router) and React.
- TypeScript.
- CSS Modules or a small, consistent global CSS system; choose the simplest fit for the repository.
- Use accessible semantic HTML and responsive layouts.
- Motion can use CSS transitions/animations and Intersection Observer; use a motion library only if it is already installed or clearly useful.
- Respect `prefers-reduced-motion`; animations must not block reading or navigation.

## Visual direction

- Primary palette (updated 2026-10-26 at the user's request): near-black backgrounds, neon cyan and bright electric blue highlights, cool white text, muted slate secondary text. Avoid the orange/purple palettes in the reference images; the requested black-and-blue palette takes precedence.
- Strong typographic hierarchy, oversized display headings, crisp compact labels, generous spacing, layered panels/cards, subtle borders, blue glow used sparingly, and a polished gaming-inspired editorial feel.
- The supplied references are in `inspirations/1.webp` and `inspirations/2.webp`. Use them for layout/energy cues, not as assets to copy. The first shows a bold gaming portfolio with large type, a featured player image, stats, biography, and event cards. The second shows a gaming hero, intro, social cards, video/content list, and image strip. Adapt only the sections supported by Kaushal's real information.
- Do not use Valorant/esports team branding or imply professional esports status. The verified competitive detail is Minecraft Bedwars on ArchMC.
- Copy is written in the first person, as Kaushal, as if he built the site himself.

## Privacy and portrait direction

- No face reveal. Do not use or generate a realistic identifiable face for Kaushal.
- In-game Minecraft screenshots now live in `public/images/gameplay/` (Minecraft skins only, no face reveal) and are used for the hero, gaming bento and gallery. Swap the hero picture through `heroShot` in `src/content/site.ts`; never replace it with a realistic face.
- Do not repurpose the existing profile avatar as a face reveal unless the user supplies/approves that image for this site.

## Verified profile content from the existing page

Current profile: <https://toxin.cc/linga676767>

- Name: **Kaushal Devarasetty**
- Current profile rank: **Majestic** (preserve the label as displayed; do not expand the acronym without confirmation).
- Profile stat: **110+ Stars in @Arch** (keep the displayed wording; do not reinterpret what the stars measure).
- Gaming identity / IGN: **linga676767**
- Game: Minecraft Bedwars
- Achievement: **top 10 leaderboard for 4v4 on ArchMC**
- Personal background and interests (from his supplied profile text): Indian high-school student living in Australia; proud of Hindu heritage and culture; science enthusiast; writes clean, responsive code with HTML and CSS; loves badminton.
- Keep the voice friendly and self-aware. The original bio jokes about his floor gaming setup, basic office mouse, and washed badminton skills. These can be paraphrased in a personable way, but do not present them as polished equipment or professional claims.

### Existing profile links

Preserve these as links where appropriate, preferably in a compact social/contact section:

- Discord username: `@m4sterfunkyboizz` (existing page offers a copy action; render as text/copy button only if implemented accessibly).
- Email: <mailto:kaushal.hkd@gmail.com>
- Twitch: <https://twitch.tv/linga676767>
- GitHub: <https://github.com/kdevarasetty7>
- Spotify: <https://open.spotify.com/user/31grbhw32dekt2z4s6gcnx4uul7y>
- Discord community invite (widget on existing page): <https://discord.gg/tKUA5gJXM>
- Lichess profile: <https://lichess.org/@/kaushal_D>

The old profile also contains an ArchMC Minecraft server widget and a community poll. Do not hard-code transient server presence, online/member counts, a clock, poll results, comments, or loading states into the portfolio. These are live/profile widgets, not durable portfolio facts.

### Skill stack shown on existing page

Display these with the same level/status distinctions; do not overstate proficiency:

- HTML5 — Daily
- Figma — Daily
- Arduino — Learning
- Google Cloud — listed (no frequency/status shown)
- GitHub — Daily
- Python — Learning

The supplied description also explicitly says he uses HTML and CSS for responsive front-end code. Treat CSS as a stated skill, but do not assign a frequency/rating that the source does not provide.

## Suggested page structure

1. **Header/navigation:** name or simple monogram, anchor links to About, Gaming, Skills, and Contact sections on the same page; mobile-friendly menu.
2. **Hero:** name, short gamer + front-end developer introduction, Minecraft/ArchMC highlight, strong blue-accented anonymous portrait placeholder, and clear anchor links such as “Explore” and “Contact”. Avoid unsupported numbers or claims.
3. **About:** adapt the facts and friendly tone from the bio; include science, cultural pride, and badminton without making the page feel like a resume.
4. **Gaming feature:** Minecraft Bedwars, IGN `linga676767`, and top 10 in ArchMC 4v4. Make clear this is a personal achievement, not a pro team affiliation.
5. **Skills/tools:** HTML5, CSS, Figma, Arduino (Learning), Google Cloud, GitHub, and Python (Learning), clearly labeled.
6. **Connect:** verified Twitch, GitHub, Spotify, Discord handle/community, email, and Lichess links. Use descriptive link labels and safe external-link behavior.
7. **Footer:** concise sign-off and navigation back to top.

Only add a projects, videos, or social-stat section if real items or verified metrics are supplied. Use tasteful empty-state placeholders rather than invented content.

## Motion and interaction requirements

- Include polished entrance/reveal motion and on-scroll section/card reveals, with subtle stagger where it improves hierarchy.
- Use restrained ambient blue lighting, hover/focus feedback, small parallax or depth only where it remains comfortable and performant.
- Keep animation durations short and consistent; avoid constant high-intensity motion, autoplay audio/video, excessive cursor effects, or scroll hijacking.
- Use Intersection Observer or an existing motion package for viewport reveals. Ensure content remains visible if JavaScript/motion fails and provide reduced-motion behavior.
- Interactive controls must be keyboard accessible, visibly focused, and have appropriate labels.

## Content and implementation guardrails

- Preserve the displayed rank **Majestic** and **110+ Stars in @Arc** exactly unless Kaushal confirms a better wording.
- Do not claim professional gamer, esports player, advanced programmer, or skills beyond the evidence above.
- Do not invent a biography, project list, social follower counts, age, school, city, or contact details.
- Do not reveal a face or imply that the placeholder is Kaushal's real photo.
- Keep URLs in one easy-to-edit content/config file where practical.
- Use descriptive alt text for meaningful images and empty alt text for decorative visuals.
- Before finishing implementation, check responsive behavior and accessibility basics, and ensure the page builds with the project's existing scripts.

