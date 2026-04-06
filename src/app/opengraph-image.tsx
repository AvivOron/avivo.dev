import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Aviv Oron — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const avatarData = await readFile(join(process.cwd(), "public/images/aviv.png"));
  const avatarSrc = `data:image/png;base64,${avatarData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          gap: 32,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Indigo glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.12)",
            filter: "blur(120px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Avatar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          width={140}
          height={140}
          style={{ borderRadius: "50%", objectFit: "cover" }}
          alt="Aviv Oron"
        />

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          Aviv Oron
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "-0.3px",
          }}
        >
          Software engineer. Building things that matter. To me.
        </div>

        {/* Domain badge */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.25)",
            fontFamily: "monospace",
            marginTop: 8,
          }}
        >
          avivo.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
