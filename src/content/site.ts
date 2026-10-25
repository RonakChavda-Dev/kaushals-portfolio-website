// Every fact, link and picture on the page lives here so it can be edited in one place.
// Wording marked "as displayed" is copied from https://toxin.cc/linga676767; keep it unless Kaushal confirms a change.

export const person = {
  name: "Kaushal Devarasetty",
  ign: "linga676767",
  badge: "OG", // as displayed
  stars: "110+ Stars in @Arch", // as displayed
};

// Placeholder artwork drawn by scripts/voxel-art.mjs. Swap `src` (and the size) for Kaushal's own image when it arrives.
export const heroImage = {
  src: "/images/art/kaushal-hero-placeholder.svg",
  width: 697,
  height: 560,
  alt: "Placeholder artwork: a faceless, visor-masked blocky player with a sword stands on a floating island beside a blue bed, with the nametag linga676767 above their head",
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#gaming", label: "Gaming" },
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
    text: "A high-school student from India, now in Australia, and proud of his Hindu heritage and culture.",
    icon: "/images/art/heritage.svg",
  },
  {
    title: "Science",
    role: "Enthusiast",
    text: "A science enthusiast. The Arduino on his learning list is that same curiosity, with wires attached.",
    icon: "/images/art/science.svg",
  },
  {
    title: "Badminton",
    role: "Washed, by his own account",
    text: "He loves badminton, even if he will happily admit the skills have gone a little washed.",
    icon: "/images/art/badminton.svg",
  },
  {
    title: "The setup",
    role: "Floor gaming, office mouse",
    text: "No battle station. He plays from the floor with a basic office mouse.",
    icon: "/images/art/setup.svg",
  },
  {
    title: "Chess",
    role: "kaushal_D on Lichess",
    text: "When he is not guarding a bed, he has a Lichess account for slower games.",
    icon: "/images/art/chess.svg",
  },
];

export const gaming = {
  feature: { img: "/images/found/screenshot-from-the-minecraft-end.png", alt: "The End dimension in Minecraft: black obsidian pillars on pale end stone" },
  shots: [
    { img: "/images/found/minecraft-creeper.png", alt: "A creeper standing on sand beside water at night in Minecraft", label: "A creeper at night", pos: "50% 75%" },
    { img: "/images/found/screenshot-from-the-minecraft-nether.png", alt: "The Nether in Minecraft: lava falls and fire on red netherrack", label: "The Nether", pos: "35% 50%" },
    { img: "/images/found/minecraft-lush-caves.jpg", alt: "A lush cave in Minecraft with hanging vines and glow berries", label: "Lush caves", pos: "55% 40%" },
  ],
};

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

export const credits = [
  { title: "Screenshot from the Minecraft End", creator: "Xbox México", license: "CC BY 3.0", page: "https://commons.wikimedia.org/wiki/File:Screenshot_from_the_Minecraft_End.png", licenseUrl: "https://creativecommons.org/licenses/by/3.0" },
  { title: "Minecraft Creeper", creator: "Xbox México", license: "CC BY 3.0", page: "https://commons.wikimedia.org/wiki/File:Minecraft_Creeper.png", licenseUrl: "https://creativecommons.org/licenses/by/3.0" },
  { title: "Screenshot from the Minecraft Nether", creator: "Xbox México", license: "CC BY 3.0", page: "https://commons.wikimedia.org/wiki/File:Screenshot_from_the_Minecraft_Nether.png", licenseUrl: "https://creativecommons.org/licenses/by/3.0" },
  { title: "Minecraft - Lush caves", creator: "Xbox México", license: "CC BY 3.0", page: "https://commons.wikimedia.org/wiki/File:Minecraft_-_Lush_caves.jpg", licenseUrl: "https://creativecommons.org/licenses/by/3.0" },
];
