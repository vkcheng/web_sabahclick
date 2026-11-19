import { ImageResponse } from "next/og"

const size = { width: 1200, height: 630 }
export const dynamic = "force-static"

export function GET() {
    return new ImageResponse(
        (
            <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 74,
                color: "#102024",
                background: "#eef8f7",
                fontFamily: "Arial, sans-serif",
            }}>
                <div style={{ display: "flex", fontWeight: 700, fontSize: 34, letterSpacing: 4 }}>
                    SABAH<span style={{ color: "#006c70" }}>CLICK</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1.08, letterSpacing: -3 }}>
                    <div>AI systems for</div>
                    <div style={{ color: "#006c70" }}>Sabah businesses.</div>
                </div>
                <div style={{ display: "flex", fontSize: 26, color: "#435b60" }}>
                    Custom AI systems and AI transformation Â· Kota Kinabalu, Sabah
                </div>
            </div>
        ),
        size,
    )
}
