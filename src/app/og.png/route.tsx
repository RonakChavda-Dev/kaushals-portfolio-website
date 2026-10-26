import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { person } from "@/content/site";

// Served as /og.png: a real .png file in the static export, so every host sends it with an image content type.
// layout.tsx points the Open Graph and Twitter tags here.
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

const neon = "#5ff4ff";
const blue = "#2f6bff";
const ink = "#04060c";

const asDataUrl = (data: Buffer, type: string) => `data:${type};base64,${data.toString("base64")}`;

// The same faces as the page (condensed Archivo for display, Pixelify for labels). ImageResponse cannot read the
// variable woff2 files next/font ships, so static TTF instances from Google Fonts (OFL) are kept next to this route.
const font = (file: string) => readFile(join(process.cwd(), "src/app/og.png/fonts", file));

// The link preview (Discord, X, iMessage, LinkedIn...). Rendered once at build time.
export async function GET() {
  const [svg, png, display, body, pixel] = await Promise.all([
    readFile(join(process.cwd(), "src/app/icon.svg")),
    readFile(join(process.cwd(), "public/images/gameplay/1.png")),
    font("archivo-condensed-800.ttf"),
    font("archivo-500.ttf"),
    font("pixelify-sans-700.ttf"),
  ]);
  const logo = asDataUrl(svg, "image/svg+xml");
  const shot = asDataUrl(png, "image/png");

  const stats = [
    { value: "Top 10", label: "ArchMC 4v4" },
    { value: person.badge, label: "Badge" },
    { value: "110+", label: "Stars in @Arch" }, // person.stars, split for the big number
  ];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: ink, color: "#f2f7ff", fontFamily: "Archivo" }}>
        {/* Gameplay shot bleeding off the right edge (882x711 scaled to the card height), faded into the background. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot} width={782} height={630} alt="" style={{ position: "absolute", top: 0, right: -100, width: 782, height: 630 }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${ink} 46%, rgba(4,6,12,0.75) 56%, rgba(4,6,12,0.1) 72%, rgba(4,6,12,0) 100%)`,
          }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex", backgroundImage: `linear-gradient(0deg, ${ink} 0%, rgba(4,6,12,0) 30%)` }} />
        {/* Ambient blue light and a faint block grid. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "radial-gradient(circle at 0% 100%, rgba(47,107,255,0.4), transparent 45%), radial-gradient(circle at 30% 0%, rgba(34,229,255,0.16), transparent 40%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 620,
            height: 630,
            display: "flex",
            opacity: 0.07,
            backgroundImage: "linear-gradient(90deg, #9fdcff 1px, transparent 1px), linear-gradient(0deg, #9fdcff 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
        {/* Neon edge on the left. */}
        <div style={{ position: "absolute", top: 0, left: 0, width: 8, height: 630, display: "flex", backgroundImage: `linear-gradient(180deg, ${neon}, ${blue})` }} />

        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "54px 0 54px 72px", width: 700 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={60} height={60} alt="" />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", fontFamily: "Pixelify", fontSize: 22, color: neon, letterSpacing: 1.5 }}>MINECRAFT BEDWARS · ARCHMC</div>
              <div style={{ display: "flex", fontFamily: "Archivo Body", fontSize: 22, color: "#9aa8c2" }}>{person.name}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: -8 }}>
            <div style={{ display: "flex", fontSize: 156, lineHeight: 0.84, letterSpacing: -2 }}>LINGA</div>
            <div
              style={{
                display: "flex",
                fontSize: 156,
                lineHeight: 0.84,
                letterSpacing: -2,
                backgroundImage: `linear-gradient(90deg, ${neon}, ${blue})`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              676767
            </div>
            <div style={{ display: "flex", fontFamily: "Archivo Body", fontSize: 28, color: "#c9d6ee", marginTop: 20 }}>
              Gamer first, front-end developer second.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "stretch" }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  paddingLeft: i ? 30 : 0,
                  paddingRight: 30,
                  borderLeft: i ? "2px solid rgba(95,244,255,0.28)" : "none",
                }}
              >
                <div style={{ display: "flex", fontSize: 50, lineHeight: 0.9, color: i ? "#f2f7ff" : neon }}>{s.value.toUpperCase()}</div>
                <div style={{ display: "flex", fontFamily: "Pixelify", fontSize: 18, color: "#8ea0bf", letterSpacing: 1 }}>{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: display, weight: 800, style: "normal" },
        { name: "Archivo Body", data: body, weight: 500, style: "normal" },
        { name: "Pixelify", data: pixel, weight: 700, style: "normal" },
      ],
    },
  );
}
