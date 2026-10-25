import Image from "next/image";
import BedDefence from "@/components/BedDefence";
import CopyHandle from "@/components/CopyHandle";
import Reveal from "@/components/Reveal";
import SiteNav from "@/components/SiteNav";
import { about, credits, gaming, heroImage, links, person, skills } from "@/content/site";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const newTab = <span className="sr-only"> (opens in a new tab)</span>;
const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

const socials = [
  { service: "Twitch", value: "linga676767", note: "Streams", href: links.twitch },
  { service: "GitHub", value: "kdevarasetty7", note: "Code", href: links.github },
  { service: "Spotify", value: "Listening profile", note: "Music", href: links.spotify },
  { service: "Lichess", value: "kaushal_D", note: "Chess", href: links.lichess },
  { service: "Discord server", value: "Join the community", note: "Community", href: links.discordInvite },
];

function Arrow() {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <SiteNav />

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className="hero container" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="tag" data-reveal>
              <span className="tag-dot" aria-hidden="true" />
              Minecraft Bedwars · ArchMC
            </p>
            <h1 id="hero-title" className="hero-title" aria-label={`${person.ign}, ${person.name}`} data-reveal style={delay(1)}>
              <span>linga</span>
              <span className="accent">676767</span>
            </h1>
            <p className="hero-lead" data-reveal style={delay(2)}>
              <strong>{person.name}</strong> is a gamer first and a front-end developer second: top 10 in ArchMC&rsquo;s
              4v4 Bedwars leaderboard, and learning to build clean, responsive sites.
            </p>
            <div className="hero-actions" data-reveal style={delay(3)}>
              <a className="btn btn-primary" href="#about">
                Explore
              </a>
              <a className="btn btn-ghost" href="#contact">
                Contact
              </a>
            </div>
            <dl className="hero-stats" data-reveal style={delay(4)}>
              <div>
                <dt>ArchMC 4v4</dt>
                <dd>Top 10</dd>
              </div>
              <div>
                <dt>Profile badge</dt>
                <dd>{person.badge}</dd>
              </div>
              <div>
                <dt>Stars in @Arch</dt>
                <dd>110+</dd>
              </div>
            </dl>
          </div>

          <figure className="hero-card" data-reveal style={delay(2)}>
            <div className="hero-art">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImage.src} width={heroImage.width} height={heroImage.height} alt={heroImage.alt} fetchPriority="high" />
            </div>
            <figcaption className="hero-card-bar">
              <span>
                <span className="muted">IGN</span> {person.ign}
              </span>
              <span className="muted">Placeholder art · no face reveal</span>
            </figcaption>
          </figure>
        </section>

        {/* ---------- About ---------- */}
        <section className="section container about" id="about" aria-labelledby="about-title">
          <div className="about-intro">
            <h2 id="about-title" className="section-title" data-reveal>
              Off the server
            </h2>
            <p className="section-lead" data-reveal style={delay(1)}>
              Away from the bed he is defending, Kaushal is an Indian high-school student living in Australia, with a soft
              spot for science, chess and badminton.
            </p>
            <p className="about-aside" data-reveal style={delay(2)}>
              He would also like you to know the gaming setup is the floor and the mouse came from an office. The top 10
              happened anyway.
            </p>
          </div>
          <ul className="interests">
            {about.map((item, i) => (
              <li key={item.title} className="card interest" data-reveal style={delay(i % 2)}>
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
          <div className="section-head">
            <h2 id="gaming-title" className="section-title" data-reveal>
              Bedwars on ArchMC
            </h2>
            <p className="section-lead" data-reveal style={delay(1)}>
              A personal best on a public Minecraft server, earned in his own time. Not a pro team, not an esports
              contract, just a lot of beds broken and defended.
            </p>
          </div>

          <div className="bento">
            <article className="card feature" data-reveal>
              <Image
                className="feature-img"
                src={gaming.feature.img}
                alt={gaming.feature.alt}
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
              />
              <div className="feature-body">
                <p className="feature-big">Top 10</p>
                <p className="feature-sub">4v4 leaderboard on ArchMC</p>
                <ul className="chips">
                  <li>Minecraft Bedwars</li>
                  <li>4v4</li>
                  <li>Personal achievement</li>
                </ul>
              </div>
            </article>

            <article className="card player" data-reveal style={delay(1)}>
              <h3 className="card-label">In-game name</h3>
              <p className="player-ign">{person.ign}</p>
              <p className="player-note">Plays Minecraft Bedwars from the floor, with a basic office mouse.</p>
              <div className="player-stats">
                <div className="mini">
                  <span className="mini-value">{person.badge}</span>
                  <span className="mini-label">Profile badge</span>
                </div>
                <div className="mini">
                  <span className="mini-value">110+</span>
                  <span className="mini-label">Stars in @Arch</span>
                </div>
              </div>
            </article>

            {gaming.shots.map((shot, i) => (
              <figure key={shot.img} className={`card shot${i === 0 ? " crop-top" : ""}`} data-reveal style={delay(i)}>
                <Image src={shot.img} alt={shot.alt} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectPosition: shot.pos }} />
                <figcaption>{shot.label}</figcaption>
              </figure>
            ))}

            <div className="card bed-card" data-reveal>
              <BedDefence />
            </div>
          </div>
        </section>

        {/* ---------- Skills ---------- */}
        <section className="section container skills" id="skills" aria-labelledby="skills-title">
          <div className="section-head">
            <h2 id="skills-title" className="section-title" data-reveal>
              Skills &amp; tools
            </h2>
            <p className="section-lead" data-reveal style={delay(1)}>
              He writes clean, responsive front-end code with HTML and CSS, designs in Figma and works in GitHub every
              day. Arduino and Python are the current homework.
            </p>
          </div>
          <ul className="skill-grid">
            {skills.map((s, i) => (
              <li key={s.name} className="card skill" data-reveal style={delay(i % 4)}>
                <span className="badge" data-status={s.status}>
                  {s.status}
                </span>
                <h3>{s.name}</h3>
                <p>{s.kind}</p>
              </li>
            ))}
            <li className="card skill skill-note" data-reveal style={delay(3)}>
              <p>
                Statuses come straight from his profile. CSS is from his own description, which doesn&rsquo;t say how
                often.
              </p>
            </li>
          </ul>
        </section>

        {/* ---------- Connect ---------- */}
        <section className="section container contact" id="contact" aria-labelledby="contact-title">
          <div className="section-head">
            <h2 id="contact-title" className="section-title" data-reveal>
              Let&rsquo;s connect
            </h2>
            <p className="section-lead" data-reveal style={delay(1)}>
              Catch him on stream, on GitHub, on Spotify or over a game of chess. Email works too.
            </p>
          </div>

          <div className="connect">
            <a className="card connect-mail" href={`mailto:${links.email}?subject=${encodeURIComponent("Hi Kaushal")}`} data-reveal>
              <span className="card-label">Email</span>
              <span className="mail-address">{links.email}</span>
              <span className="mail-cta">
                Say hi <Arrow />
              </span>
            </a>

            <div className="card connect-discord" data-reveal style={delay(1)}>
              <span className="card-label">Discord username</span>
              <span className="discord-handle">{links.discordHandle}</span>
              <CopyHandle handle={links.discordHandle} />
            </div>

            {socials.map((s, i) => (
              <a key={s.service} className="card social" href={s.href} {...external} data-reveal style={delay(i % 3)}>
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
            <p className="footer-sign">GG. Thanks for stopping by.</p>
            <a className="btn btn-ghost" href="#top">
              Back to top
            </a>
          </div>
          <p className="credits">
            Minecraft screenshots from Wikimedia Commons:{" "}
            {credits.map((c, i) => (
              <span key={c.page}>
                <a href={c.page} {...external}>
                  &ldquo;{c.title}&rdquo;{newTab}
                </a>{" "}
                by {c.creator},{" "}
                <a href={c.licenseUrl} {...external}>
                  {c.license}
                  {newTab}
                </a>
                {i < credits.length - 1 ? "; " : "."}
              </span>
            ))}{" "}
            Minecraft is a trademark of Mojang; this is a fan&rsquo;s personal site. Voxel artwork is a placeholder drawn
            for this page.
          </p>
          <p className="legal">
            <span>
              &copy; {new Date().getFullYear()} {person.name}
            </span>
            <span>Built with Next.js</span>
          </p>
        </div>
        <p className="footer-word" aria-hidden="true">
          linga676767
        </p>
      </footer>

      <Reveal />
    </>
  );
}
