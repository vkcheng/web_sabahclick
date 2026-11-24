---
name: SabahClick
description: A business's workday as a sixteen-step drum-machine row; visitors program which jobs AI should take.
colors:
  ground: "#121212"
  panel: "#1a1a1a"
  panel-raised: "#202020"
  well: "#0b0b0b"
  rule: "rgba(242, 242, 242, 0.12)"
  rule-strong: "rgba(242, 242, 242, 0.26)"
  ink: "#f2f2f2"
  silk: "#bdbdbd"
  silk-dim: "#9a9a9a"
  key-ink: "#111111"
  red: "#ff3b30"
  red-deep: "#d1251b"
  red-hover: "#e32c21"
  orange: "#ff9a00"
  yellow: "#ffe100"
  white: "#ecebe6"
  led-off: "#3a1715"
typography:
  display:
    fontFamily: "Saira Condensed, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Noto Sans CJK SC, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 5.1vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 0.96
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Saira Condensed, PingFang SC, Microsoft YaHei, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 1
  title:
    fontFamily: "Saira Condensed, PingFang SC, Microsoft YaHei, Arial Narrow, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, PingFang SC, Microsoft YaHei, Noto Sans CJK SC, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Saira Condensed, PingFang SC, Microsoft YaHei, Arial Narrow, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    letterSpacing: "0.14em"
  button:
    fontFamily: "Saira Condensed, PingFang SC, Microsoft YaHei, Arial Narrow, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    letterSpacing: "0.12em"
rounded:
  control: "2px"
  panel: "3px"
spacing:
  key-gap: "8px"
  rack-gap: "10px"
  panel-pad: "28px"
  gutter: "clamp(16px, 4vw, 56px)"
  band: "clamp(72px, 9vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.red-deep}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.red-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "46px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.silk}"
    typography: "{typography.button}"
    padding: "0 8px"
  hw-key:
    backgroundColor: "{colors.panel-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "44px"
  hw-key-on:
    backgroundColor: "{colors.red-deep}"
    textColor: "{colors.ink}"
  lang-key-pressed:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.key-ink}"
  step-key:
    backgroundColor: "{colors.red}"
    rounded: "{rounded.panel}"
    height: "clamp(72px, 6.5vw, 104px)"
  panel-module:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  readout-window:
    backgroundColor: "{colors.well}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  input-field:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
---

# Design System: SabahClick

## Overview

**Creative North Star: "The Workday Step Sequencer"**

The site is one piece of hardware: a matte charcoal drum machine whose sixteen step keys are the jobs of a business day, from opening to closing. Everything else on the page is a module on the same chassis: control panel, rack units for the three services, a pattern chain for how work starts, a spec plate for the shipped app, and a contact panel with recessed input wells. The visitor reads it the way they would read a real instrument: silkscreen labels name every control, lit LEDs and red seven-segment digits report state, and coloured keys are the only saturated surfaces.

Density is that of a front panel, not a brochure. Panels sit on a near-black ground with a faint fractal-noise grain; sections are separated by hairline rules, not by colour bands. The colour story is entirely carried by the four time-of-day banks (red, orange, yellow, white) and by red as the signal colour; every other surface is neutral charcoal and grey. Motion is mechanical and clocked: a chase light walks the row at one tempo and keys flash on press. There is no ambient animation.

The world explicitly rejects the AI-agency default (headline, three rounded service cards, a robot glow) and the previous dark/lime HUD look it replaced.

**Key Characteristics:**
- Matte charcoal panels on a grained near-black ground; depth from bevels and recessed wells.
- Four-bank key colour by time of day: red (morning), orange (midday), yellow (afternoon), white (closing).
- Red seven-segment readouts and square LEDs are the only light sources.
- Condensed industrial caps (Saira Condensed) for display, buttons and silkscreen labels; system sans and system CJK for reading text.
- Near-square geometry: 2px on controls, 3px on panels and keys, 0 on LEDs.

## Colors

A neutral charcoal chassis with one signal red and a four-colour key bank; saturation lives only on keys, LEDs and readouts.

### Primary
- **Signal Red** (red): lit LEDs, seven-segment digits, the current-step number, route counts when lit, list ticks, link underlines, text selection, and the first (morning) key bank. Red means "on" or "now".
- **Deep Signal Red** (red-deep): the filled surface of the primary action (send to WhatsApp, form submit) and of latched hardware keys (RUN while running). Hovers to **Pressed Red** (red-hover).

### Secondary
- **Bank Orange** (orange): midday key bank, second rack unit key, second chain key, job-list tick.
- **Bank Yellow** (yellow): afternoon key bank, third rack unit key, third chain key; also the focus ring, the skip link and positive status text (armed state label, form success).
- **Bank White** (white): closing key bank and the warm off-white of display and section headlines.

### Neutral
- **Ground** (ground): page background under the noise grain; mobile nav sheet.
- **Panel Charcoal** (panel): every module surface (control panel, step row, rack units, chain, spec plate, form).
- **Raised Key Grey** (panel-raised): face of square hardware keys.
- **Well Black** (well): recessed readout windows, route rows, input wells.
- **Hairline** (rule) and **Strong Hairline** (rule-strong): dividers inside panels; panel and control borders.
- **Ink** (ink): primary text and pressed language key face.
- **Silkscreen Grey** (silk): labels, nav, body copy on panels.
- **Dim Silkscreen** (silk-dim): tertiary text, step task captions, unlit counts, footer.
- **Key Ink** (key-ink): text printed on coloured keys and on light pressed faces.
- **Dark LED** (led-off): unlit LED.

### Named Rules
**The Only-Glow Rule.** Glow (`box-shadow` bloom) belongs to lit LEDs and nothing else. Seven-segment digits are lit by fill, not by blur. No glowing buttons, cards, borders or text.

**The Bank Order Rule.** Key colour always follows the time-of-day order red, orange, yellow, white. A set of three (routes, chain steps) takes the first three banks in that order. Bank colour is never used as decoration away from a key or key-derived tick.

**The Red-Means-On Rule.** Red text and fills report state (lit, now, armed count, primary action). Do not use red for emphasis in prose or headings.

## Typography

**Display Font:** Saira Condensed 500/700, self-hosted latin + latin-ext (falls through to system CJK, then Arial Narrow)
**Body Font:** system UI sans (-apple-system, Segoe UI, Roboto) with system CJK (PingFang SC, Microsoft YaHei, Noto Sans CJK SC)

**Character:** Condensed industrial caps read as panel silkscreen and stamped key legends; the plain system sans keeps every explanatory line readable for non-technical owners in three languages.

### Hierarchy
- **Display** (700, clamp(2.6rem, 5.1vw, 5.6rem), 0.96, uppercase, balanced): the two-line hero headline only, one line per span. Chinese: clamp(2.4rem, 5vw, 5rem), line-height 1.12.
- **Headline** (700, clamp(2rem, 3.6vw, 3.4rem), 1, uppercase): section titles. Chinese line-height 1.2.
- **Title** (700, 28px, 1.1, uppercase): rack unit names; chain step names at 24px / 1.15.
- **Body** (400, 17px, 1.6): hero paragraph and section leads (max 52 to 60ch); panel copy at 16px; step hint and detail help in silk, max 60 to 70ch.
- **Label** (500, 13px, 0.14em, uppercase): silkscreen names over controls, bank names, step numbers (15px), fact terms, form labels (0.12em).
- **Button** (700, 15px, 0.12 to 0.14em, uppercase): every button and hardware key legend; nav links at 500 weight.

### Named Rules
**The Silkscreen Rule.** A silkscreen label names a control, readout or fact that sits directly under it. It is never a section kicker above a headline; section heads are a headline and a lead, nothing above them.

**The Legible-Chinese Rule.** Under `data-lang="cn"`, display and headline sizes step down and line-height opens to 1.12 to 1.2; tracked caps tighten (nav 0.06em). Chinese is never set in faux-condensed or letter-spaced caps.

## Layout

Content is capped at 1500px with a fluid side gutter (gutter). The hero is a two-column grid (copy 1fr, control panel 1.12fr) with the full-width step row spanning beneath. Below the hero, each section is a band: vertical padding (band), a hairline top rule, and a two-column head (headline left, lead right, bottom-aligned) above its module.

Rhythm is panel-like: keys sit 8px apart (key-gap), stacked rack units 10px (rack-gap), panels pad 26 to 32px (panel-pad). The sixteen-key row is a strict 16-column grid with four bank brackets beneath.

Responsive behaviour: at 1180px the hero stacks copy, step row, then control panel and the top-bar WhatsApp button hides. At 900px the nav collapses into a sheet behind a square menu key, band heads and two-column sections stack, the control panel reflows to two columns, the chain turns vertical, and the send action moves directly under the keys. At 720px the step row folds into two rows of eight, task captions give way to a full job list (number, time, task, bank tick), bank brackets hide, and keys fix at 72px tall.

## Elevation & Depth

Depth is physical and shallow: bevels, key travel and recessed wells, not floating cards. Panels carry a 1px top inner highlight; keys carry an inner bottom shade, an inner top highlight and a short dark skirt that collapses when pressed; readout windows and inputs are sunk with inset shadows. Only the hero control panel casts an ambient drop shadow.

### Shadow Vocabulary
- **Panel bevel** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.04)`): every panel module.
- **Control panel lift** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 40px rgba(0,0,0,0.45)`): the hero control panel only.
- **Coloured key** (`box-shadow: inset 0 -5px 0 rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 0 #050505`): step keys, rack unit keys, chain keys. Pressed: `inset 0 -2px 0 rgba(0,0,0,0.22), 0 0 0 #050505` with translateY(3px).
- **Hardware key** (`box-shadow: 0 2px 0 #000, 0 3px 6px rgba(0,0,0,0.4)`): square grey keys. Pressed: translateY(2px), skirt collapses.
- **Well** (`box-shadow: inset 0 2px 6px rgba(0,0,0,0.8)`): readout windows; inputs at `inset 0 2px 5px rgba(0,0,0,0.7)`.
- **LED bloom** (`box-shadow: 0 0 6px 1px rgba(255,59,48,0.55)`): lit red LED; white step LEDs bloom 8px (armed) or 12px (accent).

### Named Rules
**The Key-Travel Rule.** The short dark skirt under a key is key travel, not a decorative offset shadow: it appears only on pressable keys and collapses on `:active`. Panels, text and links never get one.

## Shapes

Near-square everything. Controls (buttons, hardware keys, language switch, readout windows, inputs, route rows) use a 2px corner (control); panels and coloured keys use 3px (panel); LEDs, list ticks and job-list ticks are sharp rectangles. Borders are 1px hairlines in rule-strong around panels and controls, pure black around wells. The chain is joined by a dashed 2px rule (8px dash, 6px gap). Bank brackets are drawn as hairline corner ticks around each bank name.

## Components

### Buttons
Stamped, compact and square.
- **Shape:** 2px corners, min-height 46px, 20px inline padding, 1px strong-hairline border, optional 15px stroke icon after the label.
- **Primary:** deep red fill and border, ink text. Reserved for the one send action per context (WhatsApp send under the step row, form submit).
- **Outline:** transparent with ink text; hover lifts the border to ink and adds a 6% ink wash.
- **Quiet:** borderless silk text, 8px padding; hover to ink.
- **All:** `:active` presses down 1px; transitions 150ms on the shared ease.

### Hardware Keys
Square grey keys for machine controls (pattern prev/next, RUN/STOP, CLEAR, mobile menu).
- **Shape:** 2px corners, 44 by 44px minimum, raised key grey face, strong-hairline border, hardware key shadow.
- **States:** hover to #2a2a2a; press travels 2px; latched (`is-on`) fills deep red.
- **Language switch:** a bordered strip of 38px keys split by hairlines; the pressed language inverts to ink with key-ink text.

### Step Key (signature)
The sixteen jobs of the day. A tall coloured key (72 to 104px) in its bank colour with a small rectangular LED near the top and a black square foot near the bottom; step number in label type above, task caption (12.5px, silk-dim) below.
- **States cycle on press:** off, armed (white LED with bloom, caption to ink), accent (stronger bloom plus a 3px ink outline offset 3px).
- **Now:** the chase step brightens (brightness 1.18) and its number turns red. Hover brightens 1.08.
- **Motion:** the chase advances one step every 560ms, pauses off-screen or when the tab is hidden, and does not start under reduced motion.

### Seven-Segment Readout
Red digits drawn in SVG with a -6° skew; unlit segments stay faintly visible at 9% red. Sits in a black well with an inset shadow. Used for clock, pattern number, armed count and per-service lit counts. Always carries an accessible label.

### LED
A 9px square, dark red when off, signal red with bloom when lit. Indicates route activity, spec-plate items and rack unit status.

### Cards / Containers (Panel Modules)
- **Corner Style:** 3px.
- **Background:** panel charcoal, 1px strong-hairline border, panel bevel.
- **Internal Padding:** 26 to 32px desktop, 16 to 20px mobile.
- **Rack unit:** three columns (coloured unit key with LED and route legend, body with title, copy and red-ticked list, side column of silkscreen facts, readout and outline button). When its route has armed steps the border warms to 60% red and the key LED lights white.
- **Chain:** one panel holding three numbered coloured keys joined by a dashed rule.
- **Spec plate:** rows of LED, label term and value, divided by hairlines.

### Inputs / Fields
- **Style:** recessed black well, 1px black border, 2px corners, inset shadow, ink text, red caret, 16px text, silkscreen label above.
- **Focus:** 2px yellow outline, 1px offset.
- **Status:** success text in yellow, error text in a soft red (#ff8a80).

### Navigation
Sticky 68px top bar on 94% ground with a 10px backdrop blur and a hairline bottom rule. Wordmark in 700 Saira Condensed caps with CLICK in signal red. Nav links in 15px silkscreen caps, silk to ink on hover. Below 900px the links drop into a full-width sheet with hairline-separated 14px rows, opened by a square menu key and closed by Escape.

## Do's and Don'ts

### Do:
- **Do** build every new module as a panel on the chassis: panel charcoal, 1px strong hairline, 3px corners, panel bevel.
- **Do** colour keys strictly in bank order red, orange, yellow, white, and print legends on them in key-ink.
- **Do** report state with LEDs, seven-segment digits and red text; keep glow on LEDs only.
- **Do** label controls and facts with 13px silkscreen caps directly above or beside what they name.
- **Do** use the yellow 2px focus ring on every interactive element, and keep touch targets at 44px or more.
- **Do** lock any motion to the machine clock or to a press, and stop it under `prefers-reduced-motion`.
- **Do** step down display sizes and open line-height under `data-lang="cn"`.

### Don't:
- **Don't** use rounded cards, pills, or radii above 3px.
- **Don't** add glowing buttons, gradient halos, robot imagery or any ambient animation.
- **Don't** reintroduce the replaced lime (#CCFF00) HUD or terminal styling.
- **Don't** put a silkscreen label above a section headline as a kicker.
- **Don't** give the key-travel skirt to anything that is not a pressable key.
- **Don't** use bank colours as decorative fills, backgrounds or text colours away from keys and their ticks.
