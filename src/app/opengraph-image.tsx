import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { person } from "@/content/site";

export const alt = "Kaushal Devarasetty, linga676767: Minecraft Bedwars, top 10 on ArchMC 4v4, and front-end developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const asDataUrl = (data: Buffer, type: string) => `data:${type};base64,${data.toString("base64")}`;

// The link preview (Discord, X, iMessage, LinkedIn...). Rendered once at build time.
export default async function OpengraphImage() {
  const [svg, png] = await Promise.all([
    readFile(join(process.cwd(), "src/app/icon.svg")),
    readFile(join(process.cwd(), "public/images/gameplay/1.png")),
  ]);
  const logo = asDataUrl(svg, "image/svg+xml");
  const shot = asDataUrl(png, "image/png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 85% 10%, rgba(34,211,255,0.35), transparent 45%), radial-gradient(circle at 10% 100%, rgba(47,107,255,0.35), transparent 50%), #04060c",
          color: "#f2f7ff",
          fontFamily: "sans-serif",
          padding: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={84} height={84} alt="" />
            <div style={{ display: "flex", fontSize: 26, color: "#7fe9ff", letterSpacing: 4, textTransform: "uppercase" }}>
              Minecraft Bedwars · ArchMC
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 108, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>linga</div>
            <div
              style={{
                display: "flex",
                fontSize: 108,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: -3,
                backgroundImage: "linear-gradient(90deg, #5ff4ff, #2f6bff)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              676767
            </div>
            <div style={{ display: "flex", fontSize: 34, marginTop: 24, color: "#c9d6ee" }}>{person.name}</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {["Top 10 · ArchMC 4v4", "Gamer", "Front-end developer"].map((t) => (
              <div
                key={t}
                style={{ display: "flex", alignItems: "center", fontSize: 22, padding: "10px 20px", borderRadius: 999, border: "2px solid rgba(95,244,255,0.45)", color: "#dff9ff" }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              width: 420,
              height: 500,
              borderRadius: 32,
              overflow: "hidden",
              border: "3px solid rgba(95,244,255,0.6)",
              boxShadow: "0 0 80px rgba(34,211,255,0.35)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot} width={620} height={500} alt="" style={{ objectFit: "cover", width: 620, height: 500, marginLeft: -80 }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
