import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const baseUrl = new URL(req.url).origin;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#1F1410",
        }}
      >
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${baseUrl}/og-bg.webp`}
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
          alt=""
        />

        {/* Gradient overlay — boosts text contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            background:
              "linear-gradient(160deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            position: "relative",
            padding: "60px 80px",
          }}
        >
          {/* Main headline */}
          <div
            style={{
              fontSize: "78px",
              fontWeight: 900,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: "1.04",
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span>AI-системы,</span>
            <span>которые работают</span>
          </div>

          {/* Brand line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "#C41230",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              POLISHCHUK AI SYSTEMS
            </span>
            <div
              style={{
                width: "32px",
                height: "2px",
                background: "#C41230",
                display: "flex",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
