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
                padding: 72,
                color: "#f2f2f2",
                background: "#151515",
                fontFamily: "Arial, sans-serif",
            }}>
                <div style={{ display: "flex", fontWeight: 700, fontSize: 36, letterSpacing: 2 }}>
                    SABAH<span style={{ color: "#ff3b30" }}>CLICK</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", fontSize: 88, fontWeight: 700, lineHeight: 1, letterSpacing: -1, textTransform: "uppercase" }}>
                    <div>AI for the work</div>
                    <div>you do every day.</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {["#ff3b30", "#ff3b30", "#ff3b30", "#ff3b30", "#ff9a00", "#ff9a00", "#ff9a00", "#ff9a00", "#ffe100", "#ffe100", "#ffe100", "#ffe100", "#ecebe6", "#ecebe6", "#ecebe6", "#ecebe6"].map((color, index) => (
                        <div key={index} style={{ display: "flex", flex: 1, height: 70, background: color, borderRadius: 4 }} />
                    ))}
                </div>
                <div style={{ display: "flex", fontSize: 26, color: "#bdbdbd" }}>
                    Web systems · Mobile apps · Workflow systems · AI training · Kota Kinabalu
                </div>
            </div>
        ),
        size,
    )
}
