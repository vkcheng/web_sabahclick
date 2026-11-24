// Seven-segment LED readout drawn in SVG: unlit segments stay faintly visible, like a real display.

const DIGITS: Record<string, string> = {
    "0": "abcdef", "1": "bc", "2": "abged", "3": "abgcd", "4": "fgbc",
    "5": "afgcd", "6": "afgedc", "7": "abc", "8": "abcdefg", "9": "abcfgd", "-": "g", " ": "",
}

const h = (x: number, y: number) => `${x + 3},${y} ${x + 23},${y} ${x + 26},${y + 3} ${x + 23},${y + 6} ${x + 3},${y + 6} ${x},${y + 3}`
const v = (x: number, y: number) => `${x + 3},${y} ${x + 6},${y + 3} ${x + 6},${y + 23} ${x + 3},${y + 26} ${x},${y + 23} ${x},${y + 3}`

const SEGMENTS: [string, string][] = [
    ["a", h(3, 0)], ["b", v(26, 3)], ["c", v(26, 30)], ["d", h(3, 54)],
    ["e", v(0, 30)], ["f", v(0, 3)], ["g", h(3, 27)],
]

const DIGIT_W = 32
const GAP = 7
const COLON_W = 10

export function Segments({ value, label, className }: { value: string; label: string; className?: string }) {
    let x = 0
    const glyphs = [...value].map((char, index) => {
        if (char === ":" || char === ".") {
            const g = <g key={index} transform={`translate(${x} 0)`}>
                {char === ":" && <rect className="seg-on" x="2" y="16" width="6" height="6" />}
                <rect className="seg-on" x="2" y="46" width="6" height="6" />
            </g>
            x += COLON_W + GAP
            return g
        }
        const lit = DIGITS[char] ?? ""
        const g = <g key={index} transform={`translate(${x} 0) skewX(-6)`}>
            {SEGMENTS.map(([name, points]) => <polygon key={name} points={points} className={lit.includes(name) ? "seg-on" : "seg-off"} />)}
        </g>
        x += DIGIT_W + GAP
        return g
    })
    const width = Math.max(1, x - GAP + 4)
    return <svg className={"segments " + (className ?? "")} viewBox={`-2 -1 ${width} 62`} role="img" aria-label={label}>
        {glyphs}
    </svg>
}
