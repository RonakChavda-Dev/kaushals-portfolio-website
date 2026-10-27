// Every fact, link and picture on the page lives here so it can be edited in one place.
// Wording marked "as displayed" is copied from https://toxin.cc/linga676767; keep it unless Kaushal confirms a change.

// The public address once the site is hosted. Canonical links, the sitemap and the link-preview image all hang off it,
// so share embeds only work when it is the real domain. Set NEXT_PUBLIC_SITE_URL in the host's environment; otherwise
// the domain Vercel, Netlify, Render or Cloudflare Pages provide is used, and localhost only in development.
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercel && `https://${vercel}`) ||
  process.env.URL || // Netlify
  process.env.RENDER_EXTERNAL_URL ||
  process.env.CF_PAGES_URL || // Cloudflare Pages (this deployment's *.pages.dev address)
  "http://localhost:3000"
).replace(/\/+$/, "");

export const person = {
  name: "Kaushal Devarasetty",
  firstName: "Kaushal",
  ign: "linga676767",
  badge: "OG", // as displayed
  stars: "110+ Stars in @Arch", // as displayed
};

export const seo = {
  title: "Kaushal Devarasetty · linga676767",
  description:
    "I'm Kaushal Devarasetty, linga676767 in Minecraft Bedwars. Top 10 on ArchMC's 4v4 leaderboard, and learning to build clean, responsive websites.",
  keywords: [
    "Kaushal Devarasetty",
    "linga676767",
    "Minecraft Bedwars",
    "ArchMC",
    "Bedwars 4v4",
    "gamer portfolio",
    "front-end developer",
  ],
};

// In-game screenshots from Kaushal. Minecraft skins only, no face reveal.
export const heroShot = {
  src: "/images/gameplay/3.png",
  width: 391,
  height: 433,
  alt: "Minecraft screenshot: my player in a dark purple hooded outfit surrounded by armour stands in purple armour and a wall of coloured blocks",
};

export const shots = [
  { src: "/images/gameplay/2.png", width: 486, height: 391, label: "Lobby", alt: "Minecraft screenshot: my player in sunglasses and a white jacket standing in a lobby under the linga676767 nametag, beside two other players" },
  { src: "/images/gameplay/4.png", width: 512, height: 501, label: "Under the tricolour", alt: "Minecraft screenshot: my player in purple armour at night, linga676767 nametag above, with a block-built Indian flag on a tall pole behind" },
  { src: "/images/gameplay/1.png", width: 882, height: 711, label: "Up close", alt: "Minecraft screenshot: my red-armoured Bedwars player up close, with the linga676767 nametag floating above" },
  { src: "/images/gameplay/5.png", width: 525, height: 405, label: "Three of us", alt: "Minecraft screenshot: three players in purple and diamond armour standing together on a grassy field" },
  { src: "/images/gameplay/6.png", width: 567, height: 506, label: "Red team", alt: "Minecraft screenshot: two red-team players in a wooden room, nametags not_yiggy and not_linga" },];

export const nav = [
  { href: "#about", label: "About" },
  { href: "#gaming", label: "Gaming" },
  { href: "#bed-lab", label: "Bed lab" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const links = {
  email: "kaushal.hkd@gmail.com",
  discordHandle: "@m4sterfunkyboizz",
  discordInvite: "https://discord.gg/tKUA5gJXM",
  twitch: "https://twitch.tv/linga676767",
  github: "https://github.com/kdevarasetty7",
  spotify: "https://open.spotify.com/user/31grbhw32dekt2z4s6gcnx4uul7y",
  lichess: "https://lichess.org/@/kaushal_D",
};

export const about = [
  {
    title: "Heritage",
    role: "Indian, living in Australia",
    text: "I'm a high-school student from India, now living in Australia, and proud of my Hindu heritage and culture.",
    icon: "/images/art/heritage.svg",
  },
  {
    title: "Science",
    role: "Enthusiast",
    text: "I love science. Arduino is on my learning list for the same reason: it's curiosity with wires attached.",
    icon: "/images/art/science.svg",
  },
  {
    title: "Badminton",
    role: "Washed, honestly",
    text: "I love badminton. My skills are a little washed these days, but I'm still out there.",
    icon: "/images/art/badminton.svg",
  },
  {
    title: "The setup",
    role: "Floor gaming, office mouse",
    text: "No battle station here. I play from the floor with a basic office mouse.",
    icon: "/images/art/setup.svg",
  },
  {
    title: "Chess",
    role: "kaushal_D on Lichess",
    text: "When I'm not guarding a bed, I'm on Lichess for slower games.",
    icon: "/images/art/chess.svg",
  },
];

// Status words exactly as shown on the existing profile. CSS has no status there, so it is marked as a stated skill.
export const skills = [
  { name: "HTML5", kind: "Markup", status: "Daily" },
  { name: "CSS", kind: "Responsive layouts", status: "Stated skill" },
  { name: "Figma", kind: "Design", status: "Daily" },
  { name: "GitHub", kind: "Code and versions", status: "Daily" },
  { name: "Google Cloud", kind: "Cloud", status: "Listed" },
  { name: "Arduino", kind: "Electronics", status: "Learning" },
  { name: "Python", kind: "Programming", status: "Learning" },
];

