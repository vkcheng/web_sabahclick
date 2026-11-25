"use client"

import { useEffect, useRef, useState } from "react"
import type { Language } from "@/lib/i18n/translations"
import { copy } from "./copy"
import { FxLight, signal } from "./fx"

/* A cartoon girl assembled from dense digital symbols. Idle, she blinks and looks around;
   once the pointer enters her panel she wakes up and keeps her eyes on it. */

type Paint = { chars: string; color: string } | null

const HAIR = "#%&$8@"
const SKIN = "01"
const SKIN_EDGE = ":."
const WHITE = "@#"
const IRIS = "@#"
const FONT = 'ui-monospace, "Cascadia Mono", Consolas, "SFMono-Regular", Menlo, monospace'

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const ell = (x: number, y: number, cx: number, cy: number, rx: number, ry: number) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2

type State = { gx: number; gy: number; open: number; awake: number }

/* Which symbol and colour belongs at normalised point (x, y). Layers run front to back. */
function paint(x: number, y: number, s: State): Paint {
    const fx = s.gx * 0.045
    const fy = s.gy * 0.035
    const hs = s.gx * 0.015

    // Hair volume, used for the fringe in front and the mass behind
    const hairMain = ell(x, y, hs, -0.1, 0.8, 0.8)
    // Hair ties sit in front of everything on the buns
    for (const side of [-1, 1]) {
        if (ell(x, y, side * 0.56 + hs, -0.62, 0.07, 0.07) < 1) return { chars: "*+", color: "#ffe100" }
    }
    // Fringe: pointed strands, with the middle parted a little higher so the forehead shows
    const strand = Math.abs(Math.sin((x - hs) * 7.5))
    const fringe = -0.47 + fy * 0.4 + 0.17 * strand ** 2 + 0.08 * Math.min(1, Math.abs(x) * 2.2)
    if (hairMain < 1 && y < fringe) {
        return hairPaint(x, y, hairMain, hs)
    }

    // Eyes
    for (const side of [-1, 1]) {
        const ex = side * 0.27 + fx
        const ey = 0.19 + fy
        const rx = 0.19 + s.awake * 0.01
        const ry = (0.27 + s.awake * 0.02) * s.open
        if (s.open < 0.2) {
            const lid = ey + 0.03 - 1.4 * (x - ex) ** 2
            if (Math.abs(x - ex) < rx && Math.abs(y - lid) < 0.028) return { chars: "=~", color: "#4a1713" }
            continue
        }
        const e = ell(x, y, ex, ey, rx, ry)
        if (e < 1) {
            if (y < ey - ry * 0.35 && e > 0.62) return { chars: "=#", color: "#3a110e" }
            const ix = ex + s.gx * 0.06
            const iy = ey + s.gy * 0.065 + 0.02
            const ir = 0.15 * Math.min(1, 0.55 + s.open * 0.45)
            if (ell(x, y, ix - 0.055, iy - 0.07, 0.05, 0.05) < 1) return { chars: "*", color: "#ffffff" }
            if (ell(x, y, ix + 0.05, iy + 0.06, 0.026, 0.026) < 1) return { chars: "+", color: "#ffffff" }
            const d = Math.hypot(x - ix, (y - iy) * 0.92)
            if (d < ir * 0.42) return { chars: " ", color: "#000" }
            if (d < ir) {
                const t = (y - (iy - ir)) / (2 * ir)
                return { chars: IRIS, color: t < 0.35 ? "#d1251b" : t < 0.7 ? "#ff7a00" : "#ffc400" }
            }
            return { chars: WHITE, color: "#ffffff" }
        }
        // Lower lash, a short dim stroke
        if (e < 1.12 && y > ey + ry * 0.55 && Math.abs(x - ex) < rx * 0.7) return { chars: "-", color: "#7c4a40" }
    }

    // Mouth
    const mx = fx * 0.85
    const my = 0.54 + fy * 0.8
    if (s.awake > 0.5) {
        const m = ell(x, y, mx, my, 0.085, 0.075)
        if (m < 1 && y > my - 0.01) return y > my + 0.038 ? { chars: "o0", color: "#ff7066" } : { chars: "#8", color: "#8f1510" }
    } else {
        const w = 0.065
        const curve = my + 0.028 * (1 - ((x - mx) / w) ** 2)
        if (Math.abs(x - mx) < w && Math.abs(y - curve) < 0.02) return { chars: "w~", color: "#d1251b" }
    }

    // Blush and nose
    for (const side of [-1, 1]) {
        if (ell(x, y, side * 0.42 + fx, 0.44 + fy, 0.1, 0.045) < 1) return { chars: "/", color: s.awake > 0.5 ? "#ff5a3d" : "#ff8a5c" }
    }
    if (ell(x, y, fx * 0.9, 0.41 + fy, 0.02, 0.014) < 1) return { chars: ".", color: "#b08a7c" }

    // Face: an egg that tapers to a soft chin
    const fcy = 0.1
    const taper = y > fcy ? 1 - 0.32 * ((y - fcy) / 0.66) ** 2 : 1
    const face = ell(x, y, fx * 0.4, fcy, 0.62 * taper, 0.68)
    if (face < 1) return face > 0.8 ? { chars: SKIN_EDGE, color: "#7a6358" } : { chars: SKIN, color: "#b5978a" }

    // Hair ties, buns, side locks and the hair mass behind the face
    for (const side of [-1, 1]) {
        const bun = ell(x, y, side * 0.68 + hs, -0.76, 0.2, 0.2)
        if (bun < 1) return hairPaint(x, y, bun, hs)
        const lock = ell(x, y, side * 0.7 + hs * 2, 0.3, 0.13, 0.55)
        if (lock < 1) return hairPaint(x, y, lock, hs)
    }
    if (hairMain < 1) return hairPaint(x, y, hairMain, hs)

    // Neck, collar bow and shoulders
    if (Math.abs(x - fx * 0.3) < 0.12 && y > 0.7 && y < 1.02) return { chars: SKIN_EDGE, color: "#b9a294" }
    if (ell(x, y, 0, 1.02, 0.1, 0.06) < 1) return { chars: "*", color: "#ffe100" }
    const body = ell(x, y, 0, 1.42, 0.82, 0.52)
    if (body < 1) return Math.abs(x) < 0.32 - (y - 0.95) * 0.6 && y < 1.2 ? { chars: "v", color: "#ff3b30" } : { chars: "=|", color: "#d9d4cc" }
    return null
}

function hairPaint(x: number, y: number, field: number, hs: number): Paint {
    // A glossy band across the top of the head
    const shine = ell(x, y, hs - 0.12, -0.32, 0.56, 0.5)
    if (shine > 0.82 && shine < 1 && y < -0.42 && x < 0.25) return { chars: "~=", color: "#ff9a00" }
    if (field > 0.86) return { chars: HAIR, color: "#b52219" }
    return { chars: HAIR, color: "#ff3b30" }
}

export function PixelFace({ language }: { language: Language }) {
    const text = copy[language].face
    const panel = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [awake, setAwake] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const box = panel.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !box || !ctx) return
        const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches

        const state: State = { gx: 0, gy: 0, open: 1, awake: 0 }
        let target = { x: 0, y: 0 }
        let isAwake = false
        let lastMove = 0
        let nextBlink = performance.now() + 2500
        let blinkStart = -1
        let noise = new Uint16Array(0)
        let cols = 0
        let rows = 0
        let raf = 0
        let visible = true
        let lastRender = 0
        let lastFlicker = 0
        let dirty = true

        const wake = (on: boolean) => {
            if (on === isAwake) return
            isAwake = on
            setAwake(on)
            dirty = true
        }

        const resize = () => {
            const ratio = Math.min(2, window.devicePixelRatio || 1)
            const w = canvas.clientWidth
            const h = canvas.clientHeight
            canvas.width = Math.round(w * ratio)
            canvas.height = Math.round(h * ratio)
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
            const cw = w < 420 ? 6 : 7
            cols = Math.floor(w / cw)
            rows = Math.floor(h / (cw * 1.5))
            noise = new Uint16Array(cols * rows).map(() => (Math.random() * 997) | 0)
            dirty = true
        }

        const render = () => {
            const w = canvas.clientWidth
            const h = canvas.clientHeight
            const cw = w / cols
            const chh = h / rows
            const scale = Math.min(w, h * 1.02) * 0.46
            const cy = h * 0.5
            ctx.clearRect(0, 0, w, h)
            ctx.font = `600 ${Math.round(chh * 0.92)}px ${FONT}`
            ctx.textBaseline = "top"
            ctx.textAlign = "center"
            // Group cells by colour so the canvas changes fill style only a few times per frame.
            const buckets = new Map<string, number[]>()
            const glyphs: string[] = new Array(cols * rows)
            for (let r = 0; r < rows; r++) {
                const y = ((r + 0.5) * chh - cy) / scale
                for (let c = 0; c < cols; c++) {
                    const i = r * cols + c
                    const p = paint(((c + 0.5) * cw - w / 2) / scale, y, state)
                    if (!p && noise[i] % 13 !== 0) continue
                    const set = p ? p.chars : "0123456789"
                    glyphs[i] = set[noise[i] % set.length]
                    const key = p ? p.color : "rgba(242, 242, 242, 0.1)"
                    let list = buckets.get(key)
                    if (!list) { list = []; buckets.set(key, list) }
                    list.push(i)
                }
            }
            for (const [color, cells] of buckets) {
                ctx.fillStyle = color
                for (const i of cells) ctx.fillText(glyphs[i], ((i % cols) + 0.5) * cw, ((i / cols) | 0) * chh)
            }
        }

        const frame = (now: number) => {
            raf = 0
            if (!visible || document.hidden) return
            if (isAwake && now - lastMove > 9000) wake(false)

            let tx = target.x
            let ty = target.y
            if (!isAwake) {
                tx = reduce ? 0 : Math.sin(now / 1900) * 0.55 + Math.sin(now / 760) * 0.1
                ty = reduce ? 0 : Math.sin(now / 2600) * 0.3
            }
            const ease = isAwake ? 0.22 : 0.06
            const ngx = state.gx + (tx - state.gx) * ease
            const ngy = state.gy + (ty - state.gy) * ease
            if (Math.abs(ngx - state.gx) > 0.002 || Math.abs(ngy - state.gy) > 0.002) dirty = true
            state.gx = ngx
            state.gy = ngy
            const wantAwake = isAwake ? 1 : 0
            if (state.awake !== wantAwake) { state.awake = wantAwake; dirty = true }

            if (!reduce) {
                if (blinkStart < 0 && now > nextBlink) blinkStart = now
                if (blinkStart >= 0) {
                    const p = (now - blinkStart) / 170
                    state.open = p >= 1 ? 1 : 1 - Math.sin(p * Math.PI)
                    dirty = true
                    if (p >= 1) { blinkStart = -1; nextBlink = now + 2200 + Math.random() * 3200 }
                }
                if (now - lastFlicker > 110) {
                    lastFlicker = now
                    for (let k = 0; k < noise.length * 0.03; k++) noise[(Math.random() * noise.length) | 0] = (Math.random() * 997) | 0
                    dirty = true
                }
            }

            if (dirty && now - lastRender > 30) {
                render()
                lastRender = now
                dirty = false
            }
            if (!reduce || dirty || isAwake) raf = requestAnimationFrame(frame)
        }
        const kick = () => { if (!raf) raf = requestAnimationFrame(frame) }

        const onMove = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect()
            const dx = event.clientX - (rect.left + rect.width / 2)
            const dy = event.clientY - (rect.top + rect.height * 0.42)
            target = { x: clamp(dx / (rect.width * 0.55), -1, 1), y: clamp(dy / (rect.height * 0.55), -1, 1) }
            lastMove = performance.now()
            const r = box.getBoundingClientRect()
            if (event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom) {
                if (!isAwake) signal.kick(0.6)
                wake(true)
            }
            if (isAwake) kick()
        }
        const onLeave = () => wake(false)

        const sizer = new ResizeObserver(() => { resize(); kick() })
        sizer.observe(canvas)
        const watcher = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) kick() })
        watcher.observe(canvas)
        const onVisibility = () => { if (!document.hidden) kick() }
        document.addEventListener("visibilitychange", onVisibility)
        document.addEventListener("pointermove", onMove, { passive: true })
        document.addEventListener("pointerdown", onMove, { passive: true })
        document.documentElement.addEventListener("pointerleave", onLeave)
        resize()
        kick()

        return () => {
            cancelAnimationFrame(raf)
            sizer.disconnect()
            watcher.disconnect()
            document.removeEventListener("visibilitychange", onVisibility)
            document.removeEventListener("pointermove", onMove)
            document.removeEventListener("pointerdown", onMove)
            document.documentElement.removeEventListener("pointerleave", onLeave)
        }
    }, [])

    return <div className="face-panel" ref={panel} data-fx="" data-awake={awake ? "" : undefined}>
        <FxLight />
        <div className="face-head">
            <span className={"led" + (awake ? " is-on" : "")} aria-hidden="true"></span>
            <span className="silk">{awake ? text.awake : text.idle}</span>
        </div>
        <canvas ref={canvasRef} className="face-canvas" role="img" aria-label={text.alt}></canvas>
    </div>
}
