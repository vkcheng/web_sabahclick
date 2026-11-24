"use client"

import { useState } from "react"
import type { Language } from "@/lib/i18n/translations"
import { whatsAppUrl } from "@/lib/site"
import { copy, NEED_IDS, PROBLEM_IDS, type NeedId, type ProblemId } from "./copy"
import { FxLight, Scramble, signal } from "./fx"
import { Segments } from "./segments"

export function WhatsAppForm({ language, needs, onToggleNeed }: { language: Language; needs: Set<NeedId>; onToggleNeed: (id: NeedId) => void }) {
    const text = copy[language].form
    const [problems, setProblems] = useState<Set<ProblemId>>(new Set())
    const [name, setName] = useState("")
    const [business, setBusiness] = useState("")
    const [note, setNote] = useState("")

    const toggleProblem = (id: ProblemId) => {
        setProblems(current => {
            const next = new Set(current)
            if (next.has(id)) next.delete(id)
            else next.add(id)
            return next
        })
        signal.kick(0.35)
    }

    const pickedNeeds = NEED_IDS.filter(id => needs.has(id)).map(id => text.needs[id])
    const pickedProblems = PROBLEM_IDS.filter(id => problems.has(id)).map(id => text.problems[id])
    const empty = !pickedNeeds.length && !pickedProblems.length && !name.trim() && !business.trim() && !note.trim()
    const message = empty ? text.hello : text.message({ needs: pickedNeeds, problems: pickedProblems, name: name.trim(), business: business.trim(), note: note.trim() })
    const href = `${whatsAppUrl}?text=${encodeURIComponent(message)}`
    const count = needs.size + problems.size

    return <form className="wa-form" data-fx="" onSubmit={event => event.preventDefault()} aria-labelledby="contact-title">
        <FxLight />
        <fieldset className="toggle-group">
            <legend><span className="silk">{text.needsLabel}</span><span className="multi">{text.multi}</span></legend>
            <div className="toggles needs">
                {NEED_IDS.map(id => <button key={id} type="button" className="toggle-key" aria-pressed={needs.has(id)} onClick={() => { onToggleNeed(id); signal.kick(0.35) }}>
                    <span className="led" aria-hidden="true"></span>
                    <span>{text.needs[id]}</span>
                </button>)}
            </div>
        </fieldset>

        <fieldset className="toggle-group">
            <legend><span className="silk">{text.problemsLabel}</span><span className="multi">{text.multi}</span></legend>
            <div className="toggles problems">
                {PROBLEM_IDS.map(id => <button key={id} type="button" className="toggle-key wide" aria-pressed={problems.has(id)} onClick={() => toggleProblem(id)}>
                    <span className="led" aria-hidden="true"></span>
                    <span>{text.problems[id]}</span>
                </button>)}
            </div>
        </fieldset>

        <div className="form-row">
            <div className="field">
                <label htmlFor="wa-name">{text.name} <span className="optional">{text.optional}</span></label>
                <input id="wa-name" name="name" autoComplete="name" value={name} onChange={event => setName(event.target.value)} />
            </div>
            <div className="field">
                <label htmlFor="wa-business">{text.business} <span className="optional">{text.optional}</span></label>
                <input id="wa-business" name="business" placeholder={text.businessHint} value={business} onChange={event => setBusiness(event.target.value)} />
            </div>
        </div>
        <div className="field">
            <label htmlFor="wa-note">{text.note} <span className="optional">{text.optional}</span></label>
            <textarea id="wa-note" name="note" rows={3} value={note} onChange={event => setNote(event.target.value)} />
        </div>

        <div className="form-foot">
            <div className="form-count">
                <div className="readout-window narrow">
                    <Segments value={String(count).padStart(2, "0")} label={`${text.selected} ${count}`} />
                </div>
                <span className="silk">{text.selected}</span>
            </div>
            <a className="btn btn-primary send" href={href} target="_blank" rel="noopener noreferrer">
                <Scramble text={text.send} />
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" /></svg>
            </a>
        </div>
        <p className="form-hint">{text.sendHint}</p>
    </form>
}
