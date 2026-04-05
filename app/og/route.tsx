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
          background: "#1F1410",
        }}
      >
        {/* Image already has text baked in — show it as-is */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${baseUrl}/og-bg.webp`}
          width={1200}
          height={630}
          style={{
            width: "1200px",
            height: "630px",
            objectFit: "cover",
          }}
          alt=""
        />
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
