import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

/**
 * Default social preview for every page, generated at build time. Content is
 * centred with wide side padding because WhatsApp crops the card from the middle.
 */
export const alt = `${SITE_NAME}: ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const mark = await readFile(join(process.cwd(), "public/images/brand/watwa-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 28,
          textAlign: "center",
          padding: "60px 160px",
          background: "radial-gradient(circle at 50% 25%, #d8f1f7 0%, #f7fbfc 60%)",
          color: "#0b2532",
          fontFamily: "sans-serif",
        }}
      >
        <img src={markSrc} width={130} height={140} alt="" />
        <div style={{ fontSize: 30, letterSpacing: 18, fontWeight: 700 }}>WATWA</div>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>Every drop, engineered to flow again.</div>
        <div style={{ fontSize: 28, color: "#4c6571" }}>ETP · STP · RO · DM · ZLD · Trusted by JK Cement</div>
        <div style={{ display: "flex", fontSize: 22, color: "#0a7593" }}>{new URL(SITE_URL).host}</div>
      </div>
    ),
    size,
  );
}
