import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// The same mark as icon.svg, on a solid tile because iOS adds its own rounded corners.
export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "src/app/icon.svg"), "utf8");
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#070b14" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={168} height={168} alt="" />
      </div>
    ),
    size,
  );
}
