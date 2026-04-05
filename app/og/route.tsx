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

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "1200px",
            height: "630px",
            background:
              "linear-gradient(160deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.60) 100%)",
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
            gap: "28px",
            position: "relative",
            padding: "60px 80px",
          }}
        >
          {/* Main headline — uppercase, heavy */}
          <div
            style={{
              fontSize: "86px",
              fontWeight: 900,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: "1.0",
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0px",
            }}
          >
            <span>AI-СИСТЕМЫ,</span>
            <span>КОТОРЫЕ РАБОТАЮТ</span>
          </div>

          {/* Brand line — crimson */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "2px",
                background: "#C41230",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "17px",
                fontWeight: 700,
                color: "#C41230",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                display: "flex",
              }}
            >
              POLISHCHUK AI SYSTEMS
            </span>
            <div
              style={{
                width: "40px",
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
