/* ============================================================
   FitFlow AI — Programs Pages (Calisthenics + Height Increase)
   ============================================================ */

function renderCalisthenics() {
  renderProgram('calisthenics');
}

function renderHeight() {
  renderProgram('height');
}

function renderProgram(programId) {
  const prog = PROGRAMS[programId];
  if (!prog) return;

  const phaseColors = ['green', 'amber', 'blue', 'purple'];

  const html = `
    <div class="page-header">
      <h1 class="page-title">${prog.emoji} ${prog.title}</h1>
      <p class="page-subtitle">${prog.subtitle}</p>
    </div>

    <!-- Program Hero Card -->
    <div class="program-header-card" style="margin-bottom:24px;">
      <div class="program-hero-icon float">${prog.emoji}</div>
      <div>
        <h2 class="program-title">${prog.title}</h2>
        <p class="program-desc">${prog.description}</p>
        <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;">
          <span class="badge badge-blue"><i class="fas fa-calendar-week"></i> &nbsp;${prog.totalWeeks} Weeks</span>
          <span class="badge badge-green"><i class="fas fa-clock"></i> &nbsp;${prog.schedule}</span>
          <span class="badge badge-amber"><i class="fas fa-signal"></i> &nbsp;${prog.difficulty}</span>
        </div>
      </div>
    </div>

    <!-- Equipment -->
    <div class="card" style="margin-bottom:22px;">
      <h3 style="font-family:'Outfit',sans-serif;font-size:15px;font-weight:700;margin-bottom:12px;display:flex;align-items:center;gap:8px;">
        <i class="fas fa-tools" style="color:var(--accent-blue)"></i> Equipment Needed
      </h3>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${prog.equipment.map(e => `
          <span style="background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.2);border-radius:var(--r-full);padding:7px 16px;font-size:13px;color:var(--text-secondary);font-weight:500;">
            ✅ ${e}
          </span>
        `).join('')}
      </div>
    </div>

    <!-- Phases -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title-sm">📋 Training Phases</h2>
      </div>
      <div class="phases-grid">
        ${prog.phases.map((p, i) => `
          <div class="phase-card">
            <div class="phase-num">Phase ${p.phase} · ${p.weeks}</div>
            <div class="phase-title">${p.emoji} ${p.title}</div>
            <div class="phase-weeks" style="color:var(--text-muted);font-size:12px;margin-bottom:8px;">
              📅 ${p.schedule} &nbsp;·&nbsp; 🎯 ${p.focus}
            </div>
            <div class="phase-focus" style="margin-bottom:12px;">${p.description}</div>
            <div class="phase-exercises">
              ${p.exercises.map(e => `<span class="badge badge-${phaseColors[i%phaseColors.length]}">${e}</span>`).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Week-by-Week -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title-sm">📅 Week-by-Week Plan</h2>
      </div>
      <div class="card">
        <div class="week-timeline">
          ${prog.weeklyPlan.map(w => `
            <div class="week-item">
              <div class="week-num-badge">W${w.week}</div>
              <div>
                <div class="week-title">${w.title}</div>
                <div class="week-desc">${w.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Tips and FAQ -->
    <div class="grid-2" style="gap:18px;">
      <div>
        <div class="section-header">
          <h2 class="section-title-sm">💡 Expert Tips</h2>
        </div>
        <div class="card">
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${prog.tips.map(t => `
              <div style="display:flex;gap:10px;align-items:flex-start;padding:10px;background:rgba(255,255,255,0.03);border-radius:var(--r-sm);border:1px solid var(--border);">
                <span style="font-size:18px;flex-shrink:0;margin-top:1px;">${t.slice(0,2)}</span>
                <span style="font-size:13px;color:var(--text-secondary);line-height:1.55;">${t.slice(2).trim()}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div>
        <div class="section-header">
          <h2 class="section-title-sm">❓ Frequently Asked</h2>
        </div>
        <div class="card">
          <div style="display:flex;flex-direction:column;gap:0;">
            ${prog.faq.map((f, i) => `
              <div style="padding:16px 0;${i < prog.faq.length-1 ? 'border-bottom:1px solid var(--border);' : ''}">
                <div style="font-size:13.5px;font-weight:700;margin-bottom:8px;color:var(--accent-blue);">
                  <i class="fas fa-question-circle"></i> ${f.q}
                </div>
                <div style="font-size:13px;color:var(--text-secondary);line-height:1.6;">
                  ${f.a}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- CTA -->
    <div style="background:linear-gradient(135deg,rgba(0,212,255,0.06),rgba(168,85,247,0.06));border:1px solid rgba(0,212,255,0.18);border-radius:var(--r-xl);padding:28px 32px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:8px;">
      <div>
        <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;margin-bottom:6px;">
          Start ${prog.title} Today!
        </div>
        <div style="font-size:14px;color:var(--text-muted);">All exercises are available with step-by-step guides and video tutorials.</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <a href="#workouts" data-page="workouts" class="btn btn-primary">
          <i class="fas fa-dumbbell"></i> Start Exercises
        </a>
        <a href="#diet" data-page="diet" class="btn btn-success">
          <i class="fas fa-utensils"></i> View Diet Plan
        </a>
        <a href="#progress" data-page="progress" class="btn btn-secondary">
          <i class="fas fa-chart-line"></i> Track Progress
        </a>
      </div>
    </div>
  `;

  document.getElementById('page-content').innerHTML = html;
}
