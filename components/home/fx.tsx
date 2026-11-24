"use client"

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from "react"

/* One shared "signal level" the whole page feeds: pointer speed, key presses and the clock.
   The oscilloscope reads it, so the machine visibly responds to the visitor's hand. */
export const signal = {
    level: 0,
    kick(amount: number) { this.level = Math.min(1, this.level + amount) },
}

const finePointer = () => typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches
const reducedMotion = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches

/* Pointer light: every [data-fx] surface gets --mx/--my for a light that follows the cursor,
   [data-fx~="tilt"] modules lean toward it, and the page grid is revealed around the pointer. */
export function FxLayer() {
    useEffect(() => {
        // Gated per event by pointer type, so touch never triggers it and a mouse plugged in later does.
        const root = document.documentElement
        const reduce = reducedMotion()
        let raf = 0
        let px = -999
        let py = -999
        let lx = 0
        let ly = 0
        let lt = 0
        let target: Element | null = null
        let current: HTMLElement | null = null

        const release = (el: HTMLElement) => {
            el.style.removeProperty("--rx")
            el.style.removeProperty("--ry")
            el.removeAttribute("data-fx-on")
        }

        const apply = () => {
            raf = 0
            root.style.setProperty("--px", `${px}px`)
            root.style.setProperty("--py", `${py}px`)
            const el = target instanceof Element ? target.closest<HTMLElement>("[data-fx]") : null
            if (current && current !== el) release(current)
            current = el
            if (!el) return
            const r = el.getBoundingClientRect()
            const x = (px - r.left) / r.width
            const y = (py - r.top) / r.height
            el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`)
            el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`)
            el.setAttribute("data-fx-on", "")
            if (!reduce && el.dataset.fx?.includes("tilt")) {
                el.style.setProperty("--rx", `${((0.5 - y) * 3).toFixed(2)}deg`)
                el.style.setProperty("--ry", `${((x - 0.5) * 4).toFixed(2)}deg`)
            }
        }

        const onMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse" && event.pointerType !== "pen") return
            px = event.clientX
            py = event.clientY
            target = event.target instanceof Element ? event.target : null
            const now = performance.now()
            const speed = Math.hypot(px - lx, py - ly) / Math.max(16, now - lt)
            lx = px
            ly = py
            lt = now
            signal.kick(Math.min(0.1, speed * 0.025))
            root.setAttribute("data-pointer", "")
            if (!raf) raf = requestAnimationFrame(apply)
        }
        const onLeave = () => {
            root.removeAttribute("data-pointer")
            if (current) release(current)
            current = null
        }

        document.addEventListener("pointermove", onMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", onLeave)
        return () => {
            document.removeEventListener("pointermove", onMove)
            document.documentElement.removeEventListener("pointerleave", onLeave)
            cancelAnimationFrame(raf)
        }
    }, [])

    return <TileField />
}

/* Retro digital tile wall behind the whole page. The pointer's path flips tiles over; as each one
   turns edge-on, the lamp behind it flashes in its bank colour, then it flips back. */
const BANK_RGB: [number, number, number][] = [[255, 59, 48], [255, 154, 0], [255, 225, 0], [236, 235, 230]]
const SEGMENTS: Record<number, string> = { 0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg", 5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg" }
const FLIP_MS = 560
const HOLD_MS = 1100
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

function TileField() {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = ref.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return
        const reduce = reducedMotion()
        const flips = new Map<string, { t0: number; digit: number }>()
        let w = 0
        let h = 0
        let size = 34
        let gap = 4
        let pitch = 38
        let raf = 0
        let lastX: number | null = null
        let lastY: number | null = null

        const layout = () => {
            const sy = window.scrollY
            return { ox: Math.round(((w % pitch) - gap) / 2), offY: -(sy % pitch), r0: Math.floor(sy / pitch) }
        }
        const bankOf = (x: number) => Math.min(3, Math.max(0, Math.floor((x / Math.max(1, w)) * 4)))

        const drawFront = (x: number, y: number, hh: number, shade: number) => {
            ctx.fillStyle = "#1c1c1c"
            ctx.fillRect(x, y, size, hh)
            if (hh > 4) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.06)"
                ctx.fillRect(x, y, size, 1)
                ctx.fillStyle = "rgba(0, 0, 0, 0.55)"
                ctx.fillRect(x, y + hh - 2, size, 2)
            }
            if (shade > 0.01) {
                ctx.fillStyle = `rgba(0, 0, 0, ${shade})`
                ctx.fillRect(x, y, size, hh)
            }
        }

        const drawBack = (x: number, y: number, hh: number, digit: number, rgb: [number, number, number], shade: number) => {
            ctx.fillStyle = "#140a09"
            ctx.fillRect(x, y, size, hh)
            const sy = hh / size
            const dw = size * 0.4
            const dh = size * 0.6
            const t = Math.max(2, size * 0.09)
            const left = x + (size - dw) / 2
            const top = y + ((size - dh) / 2) * sy
            const mid = top + (dh / 2) * sy
            const bottom = top + dh * sy
            const on = SEGMENTS[digit]
            const seg = (name: string, sx: number, syy: number, sw: number, sh: number) => {
                ctx.fillStyle = on.includes(name) ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.1)`
                ctx.fillRect(sx, syy, sw, Math.max(1, sh))
            }
            seg("a", left + t, top, dw - 2 * t, t * sy)
            seg("g", left + t, mid - (t * sy) / 2, dw - 2 * t, t * sy)
            seg("d", left + t, bottom - t * sy, dw - 2 * t, t * sy)
            seg("f", left, top + t * sy, t, mid - top - 1.5 * t * sy)
            seg("b", left + dw - t, top + t * sy, t, mid - top - 1.5 * t * sy)
            seg("e", left, mid + (t * sy) / 2, t, bottom - mid - 1.5 * t * sy)
            seg("c", left + dw - t, mid + (t * sy) / 2, t, bottom - mid - 1.5 * t * sy)
            if (shade > 0.01) {
                ctx.fillStyle = `rgba(0, 0, 0, ${shade})`
                ctx.fillRect(x, y, size, hh)
            }
        }

        const draw = (now: number) => {
            const { ox, offY, r0 } = layout()
            const cols = Math.ceil(w / pitch) + 1
            const rows = Math.ceil(h / pitch) + 2
            ctx.fillStyle = "#0c0c0c"
            ctx.fillRect(0, 0, w, h)
            for (let r = 0; r < rows; r++) {
                const y = offY + r * pitch
                for (let c = 0; c < cols; c++) {
                    const x = ox + c * pitch
                    const key = `${c},${r0 + r}`
                    const flip = flips.get(key)
                    if (!flip) { drawFront(x, y, size, 0); continue }
                    const e = now - flip.t0
                    let angle: number
                    let flash: number
                    if (e < FLIP_MS) { const p = e / FLIP_MS; angle = easeInOut(p) * Math.PI; flash = Math.sin(p * Math.PI) }
                    else if (e < FLIP_MS + HOLD_MS) { angle = Math.PI; flash = 0.18 * (1 - (e - FLIP_MS) / HOLD_MS) }
                    else if (e < 2 * FLIP_MS + HOLD_MS) { const p = (e - FLIP_MS - HOLD_MS) / FLIP_MS; angle = Math.PI + easeInOut(p) * Math.PI; flash = Math.sin(p * Math.PI) * 0.55 }
                    else { flips.delete(key); drawFront(x, y, size, 0); continue }
                    const rgb = BANK_RGB[bankOf(x)]
                    if (flash > 0.02) {
                        ctx.save()
                        ctx.shadowColor = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${flash})`
                        ctx.shadowBlur = 22 * flash
                        ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${0.9 * flash})`
                        ctx.fillRect(x - 1, y - 1, size + 2, size + 2)
                        ctx.restore()
                    }
                    const cos = Math.cos(angle)
                    const hh = Math.max(1, size * Math.abs(cos))
                    const yy = y + (size - hh) / 2
                    const shade = (1 - Math.abs(cos)) * 0.55
                    if (cos < 0) drawBack(x, yy, hh, flip.digit, rgb, shade)
                    else drawFront(x, yy, hh, shade)
                }
            }
        }

        const frame = (now: number) => {
            draw(now)
            raf = flips.size ? requestAnimationFrame(frame) : 0
        }
        const schedule = () => { if (!raf) raf = requestAnimationFrame(frame) }

        const trigger = (px: number, py: number, now: number) => {
            const { ox, offY, r0 } = layout()
            const c = Math.floor((px - ox) / pitch)
            const r = Math.floor((py - offY) / pitch)
            if (c < 0 || r < 0) return
            const key = `${c},${r0 + r}`
            if (!flips.has(key)) flips.set(key, { t0: now, digit: (Math.random() * 10) | 0 })
        }

        const resize = () => {
            const ratio = Math.min(2, window.devicePixelRatio || 1)
            w = window.innerWidth
            h = window.innerHeight
            size = w < 720 ? 26 : 34
            gap = w < 720 ? 3 : 4
            pitch = size + gap
            canvas.width = Math.round(w * ratio)
            canvas.height = Math.round(h * ratio)
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
            draw(performance.now())
        }

        const onMove = (event: PointerEvent) => {
            if (reduce) return
            const now = performance.now()
            const x = event.clientX
            const y = event.clientY
            if (lastX === null || lastY === null) trigger(x, y, now)
            else {
                // Walk the segment since the last event so a fast swipe leaves an unbroken trail.
                const steps = Math.max(1, Math.ceil(Math.hypot(x - lastX, y - lastY) / (pitch / 2)))
                for (let i = 1; i <= steps; i++) trigger(lastX + ((x - lastX) * i) / steps, lastY + ((y - lastY) * i) / steps, now)
            }
            lastX = x
            lastY = y
            schedule()
        }
        const onLeave = () => { lastX = null; lastY = null }
        const onScroll = () => { lastX = null; lastY = null; if (!raf) raf = requestAnimationFrame(frame) }

        // The wall stays alive without a mouse: now and then one tile turns over by itself.
        const ambient = reduce ? 0 : window.setInterval(() => {
            if (document.hidden) return
            trigger(Math.random() * w, Math.random() * h, performance.now())
            schedule()
        }, 900)

        resize()
        window.addEventListener("resize", resize)
        window.addEventListener("scroll", onScroll, { passive: true })
        document.addEventListener("pointermove", onMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", onLeave)
        return () => {
            cancelAnimationFrame(raf)
            window.clearInterval(ambient)
            window.removeEventListener("resize", resize)
            window.removeEventListener("scroll", onScroll)
            document.removeEventListener("pointermove", onMove)
            document.documentElement.removeEventListener("pointerleave", onLeave)
        }
    }, [])

    return <canvas ref={ref} className="tile-field" aria-hidden="true"></canvas>
}

/* Light layer placed inside any [data-fx] surface. */
export function FxLight() {
    return <i className="fx-light" aria-hidden="true"></i>
}

// Narrow-to-medium glyphs only: wide ones (W, M, %, #, &) made the decoded text overflow its box.
const GLYPHS = "ABCDEFGHJKLNOPRSTUVXYZ0123456789+=<>/"

/* Display-style text decode on hover, like a vacuum-fluorescent readout settling.
   The real text stays in the DOM for assistive tech; the scramble is a visual overlay. */
export function Scramble({ text }: { text: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const [live, setLive] = useState<string | null>(null)

    useEffect(() => {
        const node = ref.current
        const host = node?.closest<HTMLElement>("a, button, [data-scramble]")
        if (!host || !/[A-Za-z0-9]/.test(text)) return
        let timer = 0
        const run = () => {
            if (!finePointer() || reducedMotion()) return
            window.clearInterval(timer)
            const chars = Array.from(text)
            const total = 12
            let frame = 0
            timer = window.setInterval(() => {
                frame++
                if (frame >= total) {
                    window.clearInterval(timer)
                    setLive(null)
                    return
                }
                const settled = Math.floor((frame / total) * chars.length)
                setLive(chars.map((ch, i) => i < settled || !/[A-Za-z0-9]/.test(ch) ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]).join(""))
            }, 34)
        }
        host.addEventListener("pointerenter", run)
        return () => {
            host.removeEventListener("pointerenter", run)
            window.clearInterval(timer)
        }
    }, [text])

    return <span className="scr" ref={ref} data-live={live !== null ? "" : undefined}>
        <span className="scr-text">{text}</span>
        {live !== null && <span className="scr-live" aria-hidden="true">{live}</span>}
    </span>
}

/* Oscilloscope: a red trace on the readout glass, its amplitude driven by the shared signal. */
export function Scope({ label }: { label: string }) {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = ref.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return
        const reduce = reducedMotion()
        let raf = 0
        let t = 0
        let visible = true

        const draw = () => {
            const w = canvas.clientWidth
            const h = canvas.clientHeight
            ctx.clearRect(0, 0, w, h)
            ctx.lineWidth = 1
            ctx.strokeStyle = "rgba(255, 59, 48, 0.13)"
            ctx.beginPath()
            for (let i = 1; i < 10; i++) { const x = Math.round((w / 10) * i) + 0.5; ctx.moveTo(x, 0); ctx.lineTo(x, h) }
            for (let i = 1; i < 4; i++) { const y = Math.round((h / 4) * i) + 0.5; ctx.moveTo(0, y); ctx.lineTo(w, y) }
            ctx.stroke()

            const level = signal.level
            const amp = h * 0.36 * (0.22 + level * 0.78)
            ctx.beginPath()
            for (let x = 0; x <= w; x += 2) {
                const p = x / w
                const y = h / 2
                    + Math.sin(p * Math.PI * 5 + t) * amp * 0.62
                    + Math.sin(p * Math.PI * 19 - t * 2.1) * amp * 0.38 * level
                    + Math.sin(p * Math.PI * 1.7 + t * 0.4) * amp * 0.18
                if (x === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            }
            ctx.strokeStyle = "#ff3b30"
            ctx.lineWidth = 2
            ctx.shadowColor = "rgba(255, 59, 48, 0.85)"
            ctx.shadowBlur = 8
            ctx.stroke()
            ctx.shadowBlur = 0
        }

        const frame = () => {
            t += 0.045 + signal.level * 0.16
            signal.level *= 0.955
            draw()
            raf = visible ? requestAnimationFrame(frame) : 0
        }

        const resize = () => {
            const ratio = Math.min(2, window.devicePixelRatio || 1)
            canvas.width = Math.round(canvas.clientWidth * ratio)
            canvas.height = Math.round(canvas.clientHeight * ratio)
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
            draw()
        }
        const sizer = new ResizeObserver(resize)
        sizer.observe(canvas)

        const watcher = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting && !reduce
            if (visible && !raf) raf = requestAnimationFrame(frame)
        })
        watcher.observe(canvas)
        const onVisibility = () => {
            if (document.hidden) { cancelAnimationFrame(raf); raf = 0 }
            else if (visible && !raf) raf = requestAnimationFrame(frame)
        }
        document.addEventListener("visibilitychange", onVisibility)

        return () => {
            cancelAnimationFrame(raf)
            sizer.disconnect()
            watcher.disconnect()
            document.removeEventListener("visibilitychange", onVisibility)
        }
    }, [])

    return <canvas ref={ref} className="scope-canvas" role="img" aria-label={label}></canvas>
}

/* Rotary knob: drag up or down, or use the arrow keys. */
export function Knob({ value, min, max, step = 5, label, onChange }: { value: number; min: number; max: number; step?: number; label: string; onChange: (value: number) => void }) {
    const drag = useRef<{ y: number; value: number } | null>(null)
    const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v)))
    const angle = -135 + ((value - min) / (max - min)) * 270

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        drag.current = { y: event.clientY, value }
    }
    const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (!drag.current) return
        const next = clamp(drag.current.value + (drag.current.y - event.clientY) * 0.8)
        if (next !== value) { onChange(next); signal.kick(0.15) }
    }
    const onPointerUp = () => { drag.current = null }
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const moves: Record<string, number> = { ArrowUp: step, ArrowRight: step, ArrowDown: -step, ArrowLeft: -step, PageUp: step * 3, PageDown: -step * 3 }
        if (event.key in moves) { event.preventDefault(); onChange(clamp(value + moves[event.key])); signal.kick(0.15) }
        else if (event.key === "Home") { event.preventDefault(); onChange(min) }
        else if (event.key === "End") { event.preventDefault(); onChange(max) }
    }

    return <div className="knob" role="slider" tabIndex={0} aria-label={label} aria-valuemin={min} aria-valuemax={max} aria-valuenow={value}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onKeyDown={onKeyDown}>
        <svg className="knob-ticks" viewBox="0 0 100 100" aria-hidden="true">
            {Array.from({ length: 11 }, (_, i) => {
                const a = ((-135 + i * 27) * Math.PI) / 180
                return <line key={i} x1={50 + Math.sin(a) * 44} y1={50 - Math.cos(a) * 44} x2={50 + Math.sin(a) * 49} y2={50 - Math.cos(a) * 49} />
            })}
        </svg>
        <span className="knob-cap" style={{ transform: `rotate(${angle}deg)` }}><span className="knob-mark"></span></span>
    </div>
}
