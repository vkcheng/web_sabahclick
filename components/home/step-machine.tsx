"use client"

import { useEffect, useRef, useState } from "react"
import type { Language } from "@/lib/i18n/translations"
import { copy } from "./copy"
import { Knob, Scope, Scramble, signal, FxLight } from "./fx"
import { Segments } from "./segments"
import { workdays, type Route } from "./workdays"

const ROUTES: Route[] = ["build", "assist", "learn"]

/* The workday plays by itself: the clock walks through sixteen jobs and each one it passes
   is handed to AI. Visitors only watch; nothing has to be picked. */
export function StepMachine({ language }: { language: Language }) {
    const text = copy[language].machine
    const routeText = copy[language].route
    const [patternIndex, setPatternIndex] = useState(0)
    const [running, setRunning] = useState(false)
    const [chase, setChase] = useState(0)
    const [visible, setVisible] = useState(true)
    const [bpm, setBpm] = useState(110)
    const root = useRef<HTMLDivElement>(null)

    const pattern = workdays[patternIndex]
    const steps = pattern.steps
    const step = steps[chase]

    useEffect(() => {
        const reduce = matchMedia("(prefers-reduced-motion: reduce)")
        const start = () => setRunning(!reduce.matches)
        start()
        reduce.addEventListener("change", start)
        return () => reduce.removeEventListener("change", start)
    }, [])

    useEffect(() => {
        const node = root.current
        if (!node) return
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!running || !visible) return
        const timer = window.setInterval(() => {
            if (document.hidden) return
            setChase(current => (current + 1) % 16)
            signal.kick(0.22)
        }, Math.round(60000 / bpm))
        return () => window.clearInterval(timer)
    }, [running, visible, bpm])

    function shiftPattern(delta: number) {
        setPatternIndex(current => (current + delta + workdays.length) % workdays.length)
        setChase(0)
        signal.kick(0.4)
    }

    return <div className="machine" ref={root}>
        <div className="control-panel" aria-label={text.panel} role="group" data-fx="">
            <FxLight />
            <div className="readout clock">
                <span className="silk">{text.clock}</span>
                <div className="readout-window">
                    <Segments value={step.time} label={`${text.clock} ${step.time}`} />
                </div>
            </div>

            <div className="readout scope">
                <span className="silk">{text.scope}</span>
                <div className="readout-window scope-window">
                    <Scope label={text.scope} />
                </div>
            </div>

            <div className="readout pattern">
                <span className="silk">{text.pattern}</span>
                <div className="pattern-select">
                    <button type="button" className="hw-key small" onClick={() => shiftPattern(-1)} aria-label={text.prev}>
                        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3 5 8l5 5" /></svg>
                    </button>
                    <div className="readout-window narrow">
                        <Segments value={String(patternIndex + 1).padStart(2, "0")} label={`${text.pattern} ${patternIndex + 1}`} />
                    </div>
                    <button type="button" className="hw-key small" onClick={() => shiftPattern(1)} aria-label={text.next}>
                        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" /></svg>
                    </button>
                </div>
                <span className="pattern-name" aria-live="polite">{pattern.name[language]} <em>· {text.sample}</em></span>
            </div>

            <div className="readout handled">
                <span className="silk">{text.handled}</span>
                <div className="readout-window narrow">
                    <Segments value={String(chase + 1).padStart(2, "0")} label={`${text.handled} ${chase + 1}`} />
                </div>
            </div>

            <div className="readout tempo">
                <span className="silk">{text.tempo}</span>
                <Knob value={bpm} min={60} max={200} label={text.tempo} onChange={setBpm} />
            </div>

            <div className="routes">
                <span className="silk">{text.routes}</span>
                <ul>
                    {ROUTES.map(route => <li key={route} className={step.route === route ? "is-lit" : undefined}>
                        <span className="led" aria-hidden="true"></span>
                        <span className="route-key">{routeText[route].key}</span>
                        <span className="route-name">{routeText[route].name}</span>
                    </li>)}
                </ul>
            </div>

            <p className="now-line" aria-live="off">
                <span className="silk">{text.now}</span>
                <strong>{step.task[language]}</strong>
                <span>{step.help[language]}</span>
            </p>

            <div className="transport">
                <button type="button" className={"hw-key transport-run" + (running ? " is-on" : "")} aria-pressed={running} onClick={() => { setRunning(!running); signal.kick(0.3) }}>
                    <Scramble text={running ? text.stop : text.run} />
                </button>
            </div>
        </div>

    </div>
}
