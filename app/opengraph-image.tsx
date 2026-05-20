import { ImageResponse } from "next/og";

export const alt = "SabahClick web design and SEO studio in Kota Kinabalu";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#eefcff",
          background: "linear-gradient(135deg, #061115 0%, #0d2430 48%, #111827 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 800, letterSpacing: 4 }}>
            SABAH<span style={{ color: "#00f0ff" }}>CLICK</span>
          </div>
          <div
            style={{
              border: "1px solid rgba(0, 240, 255, 0.6)",
              borderRadius: 999,
              padding: "12px 22px",
              color: "#8ff7ff",
              fontSize: 24,
            }}
          >
            Kota Kinabalu
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 900, lineHeight: 1.05, maxWidth: 940 }}>
            Web Design & Local SEO for Sabah Businesses
          </div>
          <div style={{ fontSize: 32, color: "#c7d8df", maxWidth: 860, lineHeight: 1.35 }}>
            Fast websites, conversion-focused landing pages, and search visibility for local brands.
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, color: "#9fb3bd", fontSize: 24 }}>
          <span>Website Design</span>
          <span>Landing Pages</span>
          <span>SEO Optimization</span>
        </div>
      </div>
    ),
    size
  );
}
