const CONSOLE_LOGS = [
  {
    label: 'STAGE 01 / INTAKE',
    html: `<span class="hl">[09:14:02.118]</span> <span class="bright">INBOUND_WHATSAPP</span> +6016-842-XXXX\n` +
          `<span class="hl">» PAYLOAD:</span> "Hi, got room for 4 pax this Friday night in KK?"\n\n` +
          `<span class="bright">STATUS:</span> Captured via SabahClick Webhook\n` +
          `<span class="bright">INTENT:</span> booking_enquiry (confidence: 0.984)\n` +
          `<span class="hl">NEXT:</span> Dispatching to AI Extraction Node...`
  },
  {
    label: 'STAGE 02 / AI EXTRACTION',
    html: `<span class="hl">[09:14:02.490]</span> <span class="bright">AI_PARSER_ACTIVE</span>\n` +
          `  party_size  : <span class="bright">4 guests</span>\n` +
          `  target_date : <span class="bright">2026-11-20 (Fri)</span>\n` +
          `  calendar_db : <span class="hl">AVAILABLE (2 units remaining)</span>\n\n` +
          `<span class="bright">DRAFTED REPLY:</span>\n` +
          `"Hi! Yes, we have availability for 4 guests this Friday (20 Nov). Would you like us to reserve a slot under your name?"`
  },
  {
    label: 'STAGE 03 / HUMAN COMMAND',
    html: `<span class="hl">[09:14:19.004]</span> <span class="bright">OPERATOR_APPROVED</span> (Staff: Kelvin, KK Desk)\n` +
          `<span class="hl">» ACTION:</span> Reply dispatched via WhatsApp Business API\n` +
          `<span class="hl">» RECORD:</span> Booking #KK-2049 synced to Google Sheet &amp; Calendar\n\n` +
          `<span class="bright">CYCLE TIME:</span> 16.8s  //  <span class="hl">HUMAN REVIEW PRESERVED</span>`
  }
];

export function mountTelemetry() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const pinned = matchMedia("(min-width: 961px) and (min-height: 700px)");
    let manualStage = false;
    let frame = 0;
    let lastDraw = -Infinity;
    const canvas = document.getElementById('topo-canvas');
    const ctx = canvas.getContext('2d');
    let cw = 0, ch = 0;

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();


    let targetScroll = window.scrollY;
    let smoothScroll = window.scrollY;
    let lastStage = -1;



    const heroWrap = document.getElementById('heroWrap');
    const heroLines = document.querySelectorAll('#heroTitle .line');
    const pipeZone = document.getElementById('pipeline');
    const pipeSteps = document.querySelectorAll('.p-step');
    const railFill = document.getElementById('railFill');
    const railPct = document.getElementById('railPct');
    const velHud = document.getElementById('scrollVelocityHud');
    const consoleStream = document.getElementById('consoleStream');
    const consoleStageLabel = document.getElementById('consoleStageLabel');
    const consoleProgress = document.getElementById('consoleProgress');

    function setPipelineStage(stage, progress) {
      consoleProgress.style.transform = `scaleX(${Math.max(0.06, progress)})`;
      document.getElementById('cLink0').style.transform = `scaleX(${Math.min(1, Math.max(0, (progress - 0.12) / 0.3))})`;
      document.getElementById('cLink1').style.transform = `scaleX(${Math.min(1, Math.max(0, (progress - 0.52) / 0.3))})`;
      if (stage === lastStage) return;
      lastStage = stage;
      pipeSteps.forEach((el, i) => {
        el.classList.toggle('active', i === stage);
        el.querySelector('button').setAttribute('aria-pressed', String(i === stage));
      });
      for (let i = 0; i < 3; i++) {
        document.getElementById(`cNode${i}`).classList.toggle('lit', i <= stage);
      }
      consoleStageLabel.textContent = CONSOLE_LOGS[stage].label;
      consoleStream.innerHTML = CONSOLE_LOGS[stage].html;
    }



    // Architectural Terrain Grid Renderer (Mount Kinabalu inspired wireframe)
    function drawTopo(time, scrollY, velocity) {
      if (!ctx) return;
      ctx.clearRect(0, 0, cw, ch);
      const cols = 26;
      const rows = 14;
      const horizonY = ch * 0.42 - (scrollY * 0.04) % 90;
      const speedShift = scrollY * 0.004 + time * 0.00025;
      const boost = Math.min(28, Math.abs(velocity) * 0.8);

      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        const depth = (r + 1) / rows;
        const yBase = horizonY + Math.pow(depth, 1.8) * (ch * 0.72);
        const alpha = 0.03 + depth * 0.11;
        ctx.strokeStyle = r === 9 ? `rgba(204, 255, 0, ${0.22 + boost * 0.004})` : `rgba(242, 244, 247, ${alpha})`;
        ctx.beginPath();
        for (let c = 0; c <= cols; c++) {
          const nx = (c / cols) * 2 - 1;
          const x = cw * 0.5 + nx * cw * (0.45 + depth * 0.85);
          const ridge = Math.sin(c * 0.45 + speedShift) * Math.cos(r * 0.55 - speedShift * 0.7);
          const peak = Math.exp(-Math.pow(nx * 2.1, 2)) * (48 + boost) * depth;
          const y = yBase - ridge * 24 * depth - peak;
          if (c === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    function animate(time) {
      frame = 0;
      const prev = smoothScroll;
      smoothScroll = reduced.matches ? targetScroll : smoothScroll + (targetScroll - smoothScroll) * 0.1;
      const velocity = smoothScroll - prev;

      // Global scroll progress
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const docProg = Math.min(1, Math.max(0, smoothScroll / maxScroll));
      railFill.style.transform = `scaleY(${docProg})`;
      railPct.textContent = `${String(Math.round(docProg * 100)).padStart(3, '0')}%`;
      if (velHud) {
        velHud.textContent = Math.abs(velocity) > 0.2
          ? `SCROLLING // ${Math.abs(velocity).toFixed(1)} PX/F`
          : `READY // ${Math.round(docProg * 100)}% DEPTH`;
      }

      // Hero parallax opposing shift
      if (pinned.matches && !reduced.matches) {
        const heroRect = heroWrap.getBoundingClientRect();
        const heroProgress = Math.min(1, Math.max(0, -heroRect.top / Math.max(1, heroWrap.offsetHeight - window.innerHeight)));
        heroLines.forEach(line => {
          const dir = parseFloat(line.dataset.shift || '0');
          line.style.transform = `translate3d(${dir * heroProgress * 95}px, 0, 0)`;
        });

        // Pinned Pipeline scrub
        const pipeRect = pipeZone.getBoundingClientRect();
        const pipeMax = Math.max(1, pipeZone.offsetHeight - window.innerHeight);
        const pProg = Math.min(1, Math.max(0, -pipeRect.top / pipeMax));
        const stage = pProg < 0.34 ? 0 : pProg < 0.68 ? 1 : 2;
        if (!manualStage) setPipelineStage(stage, pProg);
      }

      if (reduced.matches || time - lastDraw >= 32) {
        drawTopo(reduced.matches ? 0 : time, reduced.matches ? 0 : smoothScroll, velocity);
        lastDraw = time;
      }
      if (!reduced.matches) schedule();

    }



    function schedule() {
      if (!frame && !document.hidden) frame = requestAnimationFrame(animate);
    }

    const controller = new AbortController();
    const { signal } = controller;
    window.addEventListener('scroll', () => {
      targetScroll = window.scrollY;
      manualStage = false;
      schedule();
    }, { passive: true, signal });
    window.addEventListener('resize', () => {
      resizeCanvas();
      heroLines.forEach(line => line.style.removeProperty('transform'));
      schedule();
    }, { signal });
    reduced.addEventListener('change', () => {
      heroLines.forEach(line => line.style.removeProperty('transform'));
      schedule();
    }, { signal });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else schedule();
    }, { signal });
    pipeSteps.forEach((step, index) => {
      step.addEventListener('click', () => {
        manualStage = true;
        setPipelineStage(index, (index + 1) / 3);
      }, { signal });
    });

    const targets = document.querySelectorAll('.reveal, .process-item');
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
    targets.forEach(element => observer.observe(element));
    document.documentElement.classList.add('has-telemetry');
    setPipelineStage(0, 0.08);
    schedule();
    return () => {
      document.documentElement.classList.remove('has-telemetry');
      observer.disconnect();
      controller.abort();
      cancelAnimationFrame(frame);
    };
}
