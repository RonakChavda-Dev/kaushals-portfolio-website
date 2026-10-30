import Image from "next/image";
import BedDefence from "@/components/BedDefence";
import CopyHandle from "@/components/CopyHandle";
import Gallery from "@/components/Gallery";
import Logo from "@/components/Logo";
import Motion from "@/components/Motion";
import SiteNav from "@/components/SiteNav";
import { about, heroShot, links, nav, person, seo, siteUrl, skills } from "@/content/site";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const newTab = <span className="sr-only"> (opens in a new tab)</span>;
const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

const socials = [
  { service: "Twitch", value: "linga676767", note: "Streams", href: links.twitch },
  { service: "GitHub", value: "kdevarasetty7", note: "Code", href: links.github },
  { service: "Spotify", value: "My listening profile", note: "Music", href: links.spotify },
  { service: "Lichess", value: "kaushal_D", note: "Chess", href: links.lichess },
  { service: "Discord server", value: "Join my community", note: "Community", href: links.discordInvite },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  alternateName: person.ign,
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  description: seo.description,
  email: `mailto:${links.email}`,
  knowsAbout: ["Minecraft Bedwars", "HTML", "CSS", "Figma", "GitHub", "Python", "Arduino"],
  sameAs: [links.twitch, links.github, links.spotify, links.lichess],
};

function Arrow() {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Letters({ text, from = 0 }: { text: string; from?: number }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="char" style={delay(from + i)} aria-hidden="true">
          {ch}
        </span>
      ))}
    </>
  );
}

function SectionHead({ id, kicker, title, lead }: { id: string; kicker: string; title: string; lead: string }) {
  return (
    <div className="section-head">
      <p className="kicker" data-reveal>
        <span aria-hidden="true">{kicker}</span>
      </p>
      <h2 id={id} className="section-title" data-reveal="clip" style={delay(1)}>
        {title}
      </h2>
      <p className="section-lead" data-reveal style={delay(2)}>
        {lead}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="ambient" aria-hidden="true">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="grid-floor" />
      </div>
      <SiteNav />

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className="hero container" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="tag" data-reveal>
              <span className="tag-dot" aria-hidden="true" />
              Minecraft Bedwars · ArchMC
            </p>
            <h1 id="hero-title" className="hero-title" aria-label={`${person.ign}, ${person.name}`}>
              <span className="hero-line">
                <Letters text="linga" />
              </span>
              <span className="hero-line neon">
                <Letters text="676767" from={5} />
              </span>
            </h1>
            <p className="hero-lead" data-reveal style={delay(4)}>
              Hey, I&rsquo;m <strong>{person.name}</strong>. Gamer first, front-end developer second: I made the top 10
              of ArchMC&rsquo;s 4v4 Bedwars leaderboard, and I&rsquo;m learning to build clean, responsive sites like this one.
            </p>
            <div className="hero-actions" data-reveal style={delay(5)}>
              <a className="btn btn-primary" href="#about">
                Explore
              </a>
              <a className="btn btn-ghost" href="#bed-lab">
                Try the bed lab
              </a>
              <a className="btn btn-link" href="#contact">
                Contact <Arrow />
              </a>
            </div>
            <dl className="hero-stats" data-reveal style={delay(6)}>
              <div>
                <dt>ArchMC 4v4</dt>
                <dd>
                  Top <span data-count="10">10</span>
                </dd>
              </div>
              <div>
                <dt>Profile rank</dt>
                <dd>{person.rank}</dd>
              </div>
              <div>
                <dt>Stars in @Arch</dt>
                <dd>
                  <span data-count="110">110</span>+
                </dd>
              </div>
            </dl>
          </div>

          <div className="hero-visual" data-reveal="scale" style={delay(3)}>
            <figure className="hero-card" data-tilt>
              <div className="hero-art" style={{ aspectRatio: `${heroShot.width} / ${heroShot.height}` }}>
                <Image src={heroShot.src} alt={heroShot.alt} fill priority sizes="(max-width: 900px) 100vw, 46vw" />
                <span className="scan" aria-hidden="true" />
              </div>
              <figcaption className="hero-card-bar">
                <span>
                  <span className="muted">IGN</span> {person.ign}
                </span>
                <span className="live-dot">In-game</span>
              </figcaption>
            </figure>
            <p className="float-chip chip-a" aria-hidden="true">
              <span className="chip-k">Rank</span> Top 10 · 4v4
            </p>
            <p className="float-chip chip-b" aria-hidden="true">
              <span className="chip-k">Rank</span> {person.rank}
            </p>
          </div>

          <a className="scroll-cue" href="#about" aria-label="Scroll to About">
            <span aria-hidden="true" />
          </a>
        </section>

        {/* ---------- About ---------- */}
        <section className="section container about" id="about" aria-labelledby="about-title">
          <div className="about-intro">
            <SectionHead
              id="about-title"
              kicker="01 · About"
              title="Off the server"
              lead="Away from the bed I'm defending, I'm an Indian high-school student living in Australia, with a soft spot for science, chess and badminton."
            />
            <p className="about-aside" data-reveal style={delay(3)}>
              Fair warning: my gaming setup is the floor and my mouse came from an office. The top 10 happened anyway.
            </p>
          </div>
          <ul className="interests">
            {about.map((item, i) => (
              <li key={item.title} className="card interest" data-spot data-reveal style={delay(i % 3)}>
                <div className="interest-art">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.icon} alt="" width="300" height="260" loading="lazy" />
                </div>
                <div className="interest-body">
                  <h3>{item.title}</h3>
                  <p className="interest-role">{item.role}</p>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Gaming ---------- */}
        <section className="section container gaming" id="gaming" aria-labelledby="gaming-title">
          <SectionHead
            id="gaming-title"
            kicker="02 · Gaming"
            title="Bedwars on ArchMC"
            lead="A personal best on a public Minecraft server, earned in my own time. Not a pro team, not an esports contract, just a lot of beds broken and defended."
          />

          <div className="bento">
            <article className="card feature" data-spot data-reveal="scale">
              <Image className="feature-img" src="/images/gameplay/4.png" alt="" fill sizes="(max-width: 900px) 100vw, 60vw" />
              <div className="feature-body">
                <p className="feature-kicker">Leaderboard</p>
                <p className="feature-big">
                  Top <span className="neon" data-count="10">10</span>
                </p>
                <p className="feature-sub">4v4 Bedwars on ArchMC</p>
                <ul className="chips">
                  <li>Minecraft Bedwars</li>
                  <li>4v4</li>
                  <li>Personal achievement</li>
                </ul>
              </div>
            </article>

            <article className="card player" data-spot data-reveal style={delay(1)}>
              <h3 className="card-label">In-game name</h3>
              <p className="player-ign">{person.ign}</p>
              <p className="player-note">You&rsquo;ll find me in Bedwars, playing from the floor with a basic office mouse.</p>
              <div className="player-stats">
                <div className="mini">
                  <span className="mini-value">{person.rank}</span>
                  <span className="mini-label">Profile rank</span>
                </div>
                <div className="mini">
                  <span className="mini-value">
                    <span data-count="110">110</span>+
                  </span>
                  <span className="mini-label">Stars in @Arch</span>
                </div>
              </div>
            </article>
          </div>

          <div className="gallery-head" data-reveal>
            <h3>From my screenshots</h3>
            <p>Tap any shot to open it.</p>
          </div>
          <Gallery />
        </section>

        {/* ---------- Bed lab ---------- */}
        <section className="section container bed-lab" id="bed-lab" aria-labelledby="bed-title">
          <SectionHead
            id="bed-title"
            kicker="03 · Bed lab"
            title="Build a bed defence"
            lead="Every Bedwars game starts the same way: wrap your bed in blocks before someone comes for it. I made this to work out how long a defence really holds. Stack up to five layers and see the time with bare hands, with tools, and how much TNT it takes."
          />
          <div className="card lab-card" data-reveal>
            <BedDefence />
          </div>
        </section>

        {/* ---------- Skills ---------- */}
        <section className="section container skills" id="skills" aria-labelledby="skills-title">
          <SectionHead
            id="skills-title"
            kicker="04 · Skills"
            title="Skills & tools"
            lead="I write clean, responsive front-end code with HTML and CSS, design in Figma and use GitHub every day. Arduino and Python are what I'm learning right now."
          />
          <ul className="skill-grid">
            {skills.map((s, i) => (
              <li key={s.name} className="card skill" data-spot data-reveal style={delay(i % 4)}>
                <span className="badge" data-status={s.status}>
                  {s.status}
                </span>
                <h3>{s.name}</h3>
                <p>{s.kind}</p>
              </li>
            ))}
            <li className="card skill skill-note" data-reveal style={delay(3)}>
              <p>
                The labels are the same ones on my profile. CSS doesn&rsquo;t have one there, so I&rsquo;ve left it
                unrated.
              </p>
            </li>
          </ul>
        </section>

        {/* ---------- Connect ---------- */}
        <section className="section container contact" id="contact" aria-labelledby="contact-title">
          <SectionHead
            id="contact-title"
            kicker="05 · Contact"
            title="Let's connect"
            lead="Catch me on stream, on GitHub, on Spotify or over a game of chess. Email works too."
          />

          <div className="connect">
            <a
              className="card connect-mail"
              href={`mailto:${links.email}?subject=${encodeURIComponent("Hi Kaushal")}`}
              data-spot
              data-reveal
            >
              <span className="card-label">Email</span>
              <span className="mail-address">{links.email}</span>
              <span className="mail-cta">
                Say hi <Arrow />
              </span>
            </a>

            <div className="card connect-discord" data-spot data-reveal style={delay(1)}>
              <span className="card-label">Discord username</span>
              <span className="discord-handle">{links.discordHandle}</span>
              <CopyHandle handle={links.discordHandle} />
            </div>

            {socials.map((s, i) => (
              <a key={s.service} className="card social" href={s.href} {...external} data-spot data-reveal style={delay(i % 3)}>
                <span className="card-label">{s.note}</span>
                <span className="social-name">
                  {s.service}
                  {newTab}
                </span>
                <span className="social-value">{s.value}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Logo size={48} />
              <p className="footer-sign">GG. Thanks for stopping by.</p>
            </div>
            <ul className="footer-nav">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href="#top">Back to top ↑</a>
              </li>
            </ul>
          </div>
          <p className="credits">
            Screenshots are my own. Minecraft is a trademark of Mojang; this is my personal fan site and isn&rsquo;t
            affiliated with Mojang or ArchMC.
          </p>
          <p className="legal">
            <span>
              &copy; {new Date().getFullYear()} {person.name}
            </span>
            <span>Designed and built by me (Kaushal Devarasetty) with{" "}
              <a className="credit-link" href="https://ronakchavda.dev" {...external}>
                Ronak Chavda
                {newTab}
              </a>
            </span>
          </p>
        </div>
        <p className="footer-word" aria-hidden="true">
          linga676767
        </p>
      </footer>

      <Motion />
    </>
  );
}
