/* ============================================================
   FitFlow AI — Programs Pages (Calisthenics + Height Increase)
   v2: Real YouTube video embeds, mobile-friendly, interactive
   ============================================================ */

/* ── Calisthenics Video Library ── */
const CALISTHENICS_VIDEOS = [
  {
    id:'cv001', name:'Push-Up Mastery',     emoji:'💪',
    videoId:'IODxDxX7oi4',
    category:'chest',   level:'Beginner',
    desc:'The foundation of all upper-body calisthenics training.',
    muscles:'Chest, Triceps, Shoulders',
    progression:'Knee → Standard → Diamond → Archer → One-Arm'
  },
  {
    id:'cv002', name:'Pull-Up Mastery',     emoji:'🧗',
    videoId:'eGo4IYlbE5g',
    category:'back',    level:'Intermediate',
    desc:'The king of back exercises — builds width and pulling strength.',
    muscles:'Lats, Biceps, Core',
    progression:'Dead Hang → Negative → Band-Assisted → Full → Weighted'
  },
  {
    id:'cv003', name:'Dips (Parallel Bars)', emoji:'⬇️',
    videoId:'0326dy_-CzM',
    category:'chest/triceps', level:'Beginner',
    desc:'Chest and tricep mass builder requiring only parallel bars.',
    muscles:'Chest, Triceps, Shoulders',
    progression:'Chair Dips → Parallel Bars → Weighted Dips → Ring Dips'
  },
  {
    id:'cv004', name:'Muscle-Up',           emoji:'🏆',
    videoId:'7Uq9Y5TKj04',
    category:'full body', level:'Advanced',
    desc:'The pinnacle of calisthenics — combines pull and push into one explosive move.',
    muscles:'Full Upper Body + Core',
    progression:'10 Pull-Ups → Explosive Pull-Up → Negative Muscle-Up → Full'
  },
  {
    id:'cv005', name:'Handstand Push-Up',   emoji:'🤸',
    videoId:'tQhrk6WMcKw',
    category:'shoulders', level:'Advanced',
    desc:'Shoulder strength powerhouse — builds military press strength with bodyweight.',
    muscles:'Shoulders, Triceps, Core',
    progression:'Pike Push-Up → Elevated Pike → Wall Handstand → HSPU'
  },
  {
    id:'cv006', name:'L-Sit',               emoji:'🪑',
    videoId:'16a529_bLU4',
    category:'core',    level:'Intermediate',
    desc:'Intense core compression exercise — builds abs and hip flexors simultaneously.',
    muscles:'Core, Hip Flexors, Triceps',
    progression:'Tuck L-Sit → Half Tuck → L-Sit → V-Sit'
  },
  {
    id:'cv007', name:'Front Lever',         emoji:'⬅️',
    videoId:'UBMk30rjy0o',
    category:'back/core', level:'Advanced',
    desc:'The ultimate horizontal pull — requires immense back and core strength.',
    muscles:'Lats, Core, Shoulders',
    progression:'Tuck → Advanced Tuck → One-Leg → Half Lever → Full'
  },
  {
    id:'cv008', name:'Planche',             emoji:'🌟',
    videoId:'u9yhkSbOSN0',
    category:'chest/shoulders', level:'Advanced',
    desc:'Horizontal push — one of the hardest calisthenics skills in existence.',
    muscles:'Chest, Shoulders, Core, Triceps',
    progression:'Planche Lean → Tuck → Advanced Tuck → Straddle → Full'
  },
  {
    id:'cv009', name:'Pistol Squat',        emoji:'🔫',
    videoId:'7PBzGbxAUqs',
    category:'legs',    level:'Intermediate',
    desc:'Single-leg squat — develops incredible leg strength, balance and flexibility.',
    muscles:'Quads, Glutes, Hamstrings, Core',
    progression:'Assisted → Box Pistol → Full Pistol → Weighted Pistol'
  },
  {
    id:'cv010', name:'Dragon Flag',         emoji:'🐉',
    videoId:'moyFIvRrS0s',
    category:'core',    level:'Advanced',
    desc:'Bruce Lee\'s signature move — builds incredible full-body tension and core strength.',
    muscles:'Full Core, Lats, Glutes',
    progression:'Tuck → One-Leg → Dragon Flag → Negative → Full'
  },
  {
    id:'cv011', name:'Human Flag',          emoji:'🚩',
    videoId:'4vS04m6OOxE',
    category:'core/shoulders', level:'Advanced',
    desc:'Horizontal body hold on a vertical pole — insane side-core strength.',
    muscles:'Obliques, Shoulders, Lats',
    progression:'Tuck Flag → Straddle → Full Human Flag'
  },
  {
    id:'cv012', name:'Bar Dip + Pull-Up Combo', emoji:'🔁',
    videoId:'AuD5PBGxPX0',
    category:'full body', level:'Intermediate',
    desc:'Super-set of pulls and pushes — maximises volume and muscle stimulation.',
    muscles:'Chest, Back, Triceps, Biceps',
    progression:'3×5 each → 3×8 each → 3×12 each → Weighted'
  }
];

function renderCalisthenics() {
  const prog = PROGRAMS?.calisthenics;

  const videoGrid = CALISTHENICS_VIDEOS.map(v => `
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;transition:transform .2s,box-shadow .2s;cursor:pointer;" class="cal-video-card" data-vid="${v.videoId}">
      <!-- YouTube Thumbnail -->
      <div style="position:relative;aspect-ratio:16/9;background:#000;overflow:hidden;">
        <img
          src="https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg"
          style="width:100%;height:100%;object-fit:cover;opacity:.85;"
          loading="lazy"
          alt="${v.name}"
          onerror="this.src='https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg'"
        >
        <!-- Play button overlay -->
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
          <div style="width:52px;height:52px;border-radius:50%;background:rgba(0,0,0,.65);backdrop-filter:blur(6px);border:2px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-play" style="color:#fff;font-size:18px;margin-left:3px;"></i>
          </div>
        </div>
        <!-- Level badge -->
        <div style="position:absolute;top:8px;right:8px;">
          <span style="padding:3px 9px;border-radius:999px;font-size:11px;font-weight:700;background:${v.level==='Advanced'?'rgba(168,85,247,.8)':v.level==='Intermediate'?'rgba(255,170,0,.8)':'rgba(0,255,136,.8)'};color:${v.level==='Advanced'?'#fff':v.level==='Intermediate'?'#000':'#000'};">${v.level}</span>
        </div>
      </div>
      <!-- Card Info -->
      <div style="padding:14px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:4px;">${v.emoji} ${v.name}</div>
        <div style="font-size:12px;color:rgba(255,255,255,.5);margin-bottom:8px;">${v.desc}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <span style="font-size:10px;padding:2px 8px;border-radius:999px;background:rgba(0,212,255,.1);color:#00d4ff;border:1px solid rgba(0,212,255,.2);">${v.muscles}</span>
        </div>
        <div style="margin-top:8px;font-size:11px;color:rgba(255,255,255,.35);">📈 ${v.progression}</div>
      </div>
    </div>
  `).join('');

  // Build phases HTML
  const phaseColors = ['green','amber','blue','purple'];
  const phasesHtml = prog ? prog.phases.map((p,i) => `
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:18px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:rgba(255,255,255,.4);margin-bottom:6px;">Phase ${p.phase} · ${p.weeks}</div>
      <div style="font-size:16px;font-weight:800;margin-bottom:6px;">${p.emoji} ${p.title}</div>
      <div style="font-size:12px;color:rgba(255,255,255,.5);margin-bottom:10px;">${p.description}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${p.exercises.map(e=>`<span style="padding:3px 9px;border-radius:999px;font-size:11px;font-weight:600;background:rgba(0,212,255,.1);color:#00d4ff;border:1px solid rgba(0,212,255,.15);">${e}</span>`).join('')}
      </div>
    </div>
  `).join('') : '';

  document.getElementById('page-content').innerHTML = `
    <div class="page-header">
      <h1 class="page-title">🏆 Calisthenics Program</h1>
      <p class="page-subtitle">Master bodyweight training with step-by-step video tutorials — works at home, gym, or park.</p>
    </div>

    <!-- Hero Banner -->
    <div style="background:linear-gradient(135deg,rgba(0,212,255,0.1),rgba(168,85,247,0.1));border:1px solid rgba(0,212,255,0.2);border-radius:20px;padding:24px 28px;margin-bottom:24px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
      <div style="font-size:52px;flex-shrink:0;">🏆</div>
      <div style="flex:1;">
        <div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;margin-bottom:6px;">Complete Calisthenics Course</div>
        <div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:12px;">12 video tutorials · Beginner to Advanced · No gym needed</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <span style="padding:5px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(0,212,255,.12);color:#00d4ff;border:1px solid rgba(0,212,255,.25);">📅 8 Weeks</span>
          <span style="padding:5px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(0,255,136,.12);color:#00ff88;border:1px solid rgba(0,255,136,.25);">🏠 Home/Park</span>
          <span style="padding:5px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(255,170,0,.12);color:#ffaa00;border:1px solid rgba(255,170,0,.25);">🎯 All Levels</span>
          <span style="padding:5px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(168,85,247,.12);color:#a855f7;border:1px solid rgba(168,85,247,.25);">🎥 12 Videos</span>
        </div>
      </div>
    </div>

    <!-- SECTION TABS -->
    <div style="display:flex;gap:4px;background:rgba(255,255,255,.05);border-radius:12px;padding:4px;margin-bottom:22px;overflow-x:auto;">
      <button class="cal-tab active" data-tab="videos" style="flex:1;min-width:90px;padding:9px 14px;border:none;border-radius:9px;cursor:pointer;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;background:rgba(0,212,255,.15);color:#00d4ff;">🎥 Videos</button>
      <button class="cal-tab" data-tab="program" style="flex:1;min-width:90px;padding:9px 14px;border:none;border-radius:9px;cursor:pointer;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;background:transparent;color:rgba(255,255,255,.5);">📋 Program</button>
      <button class="cal-tab" data-tab="skills" style="flex:1;min-width:90px;padding:9px 14px;border:none;border-radius:9px;cursor:pointer;font-size:13px;font-weight:700;font-family:'Inter',sans-serif;background:transparent;color:rgba(255,255,255,.5);">🏆 Skills</button>
    </div>

    <!-- TAB: VIDEOS -->
    <div id="cal-tab-videos" class="cal-tab-panel" style="display:block;">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
        ${videoGrid}
      </div>
    </div>

    <!-- TAB: PROGRAM -->
    <div id="cal-tab-program" class="cal-tab-panel" style="display:none;">
      ${prog ? `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:22px;">
        ${phasesHtml}
      </div>
      <!-- Weekly schedule -->
      <div class="card" style="padding:20px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:14px;">📅 Weekly Schedule</div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px;">
          ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d,i) => {
            const wk = [['Upper','Rest','Lower','Skills','Rest','Full Body','Rest'],''][0];
            const lbl = wk[i]; const isRest = lbl==='Rest';
            return `
              <div style="text-align:center;padding:10px 4px;border-radius:10px;background:${isRest?'rgba(255,255,255,.03)':'rgba(0,212,255,.08)'};border:1px solid ${isRest?'rgba(255,255,255,.05)':'rgba(0,212,255,.18)'};">
                <div style="font-size:9px;font-weight:700;text-transform:uppercase;color:${isRest?'rgba(255,255,255,.3)':'#00d4ff'};margin-bottom:4px;">${d}</div>
                <div style="font-size:16px;margin-bottom:4px;">${['⬆️','😴','⬇️','🏆','😴','⚡','😴'][i]}</div>
                <div style="font-size:9px;color:rgba(255,255,255,.4);">${lbl}</div>
              </div>`;
          }).join('')}
        </div>
      </div>` : '<p style="color:var(--text-muted)">Program loading...</p>'}
    </div>

    <!-- TAB: SKILLS TRACKER -->
    <div id="cal-tab-skills" class="cal-tab-panel" style="display:none;">
      <div style="margin-bottom:14px;font-size:13px;color:rgba(255,255,255,.5);">Track your progress toward major calisthenics skills. Tap a skill to update your level.</div>
      <div id="skills-grid" style="display:flex;flex-direction:column;gap:10px;"></div>
    </div>

    <!-- Video Modal -->
    <div id="cal-video-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:300;align-items:center;justify-content:center;padding:16px;">
      <div style="width:100%;max-width:760px;background:#0f0f1a;border-radius:20px;overflow:hidden;box-shadow:0 40px 80px rgba(0,0,0,.7);">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08);">
          <div id="cal-modal-title" style="font-size:16px;font-weight:700;"></div>
          <button id="cal-modal-close" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);border:none;color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div id="cal-modal-body" style="padding:0;"></div>
      </div>
    </div>

    <!-- Footer CTA -->
    <div style="background:linear-gradient(135deg,rgba(0,212,255,.05),rgba(168,85,247,.05));border:1px solid rgba(0,212,255,.15);border-radius:20px;padding:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;margin-top:24px;">
      <div>
        <div style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:800;margin-bottom:4px;">Ready to Start?</div>
        <div style="font-size:13px;color:rgba(255,255,255,.5);">Track every workout and see your strength grow week by week.</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <a href="#workouts" data-page="workouts" class="btn btn-primary"><i class="fas fa-dumbbell"></i> All Exercises</a>
        <a href="#scanner" data-page="scanner" class="btn btn-secondary"><i class="fas fa-robot"></i> Body Scan</a>
      </div>
    </div>
  `;

  setupCalisthenicsEvents();
  loadSkillsTracker();
}

function setupCalisthenicsEvents() {
  // Tab switching
  document.querySelectorAll('.cal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cal-tab').forEach(t => {
        t.style.background = 'transparent';
        t.style.color = 'rgba(255,255,255,.5)';
        t.classList.remove('active');
      });
      document.querySelectorAll('.cal-tab-panel').forEach(p => p.style.display = 'none');
      tab.style.background = 'rgba(0,212,255,.15)';
      tab.style.color = '#00d4ff';
      tab.classList.add('active');
      const panel = document.getElementById(`cal-tab-${tab.dataset.tab}`);
      if (panel) panel.style.display = 'block';
    });
  });

  // Video cards — open modal
  document.querySelectorAll('.cal-video-card').forEach(card => {
    card.addEventListener('click', () => {
      const vid = card.dataset.vid;
      const name = card.querySelector('[style*="font-size:15px"]')?.textContent?.trim() || 'Exercise';
      const vidData = CALISTHENICS_VIDEOS.find(v => v.videoId === vid);
      openVideoModal(vid, name, vidData);
    });
    card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-4px)'; card.style.boxShadow = '0 12px 40px rgba(0,0,0,.4)'; });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.boxShadow = ''; });
  });

  // Modal close
  document.getElementById('cal-modal-close')?.addEventListener('click', closeVideoModal);
  document.getElementById('cal-video-modal')?.addEventListener('click', e => {
    if (e.target.id === 'cal-video-modal') closeVideoModal();
  });
}

function openVideoModal(videoId, name, vidData) {
  const modal = document.getElementById('cal-video-modal');
  const title = document.getElementById('cal-modal-title');
  const body  = document.getElementById('cal-modal-body');
  if (!modal || !title || !body) return;

  title.textContent = name;
  body.innerHTML = `
    <div style="position:relative;padding-bottom:56.25%;height:0;background:#000;">
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
        style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    ${vidData ? `
    <div style="padding:16px 18px;">
      <div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:10px;">${vidData.desc}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
        <span style="font-size:11px;padding:3px 10px;border-radius:999px;background:rgba(0,212,255,.1);color:#00d4ff;border:1px solid rgba(0,212,255,.2);">💪 ${vidData.muscles}</span>
        <span style="font-size:11px;padding:3px 10px;border-radius:999px;background:rgba(168,85,247,.1);color:#a855f7;border:1px solid rgba(168,85,247,.2);">${vidData.level}</span>
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,.35);">📈 Progression: ${vidData.progression}</div>
    </div>
    ` : ''}
  `;
  modal.style.display = 'flex';
}

function closeVideoModal() {
  const modal = document.getElementById('cal-video-modal');
  const body  = document.getElementById('cal-modal-body');
  if (modal) modal.style.display = 'none';
  if (body)  body.innerHTML = ''; // Stop video playback
}

/* ── SKILLS TRACKER ── */
const SKILLS = [
  { id:'pushup',  name:'Push-Up',       emoji:'💪', levels:['0','1–5','6–10','11–20','20+','Diamond','Archer','One-Arm'] },
  { id:'pullup',  name:'Pull-Up',       emoji:'🧗', levels:['0','1–3','4–8','9–15','16+','Weighted','L-Pull-Up','One-Arm'] },
  { id:'dip',     name:'Dip',           emoji:'⬇️', levels:['Chair','1–5','6–12','13–20','20+','Ring Dip','Weighted'] },
  { id:'squat',   name:'Pistol Squat',  emoji:'🔫', levels:['None','Assisted','Box','Full','Weighted'] },
  { id:'muscleup',name:'Muscle-Up',     emoji:'🏆', levels:['None','Negative','Kipping','Strict','Bar M-Up'] },
  { id:'hspu',    name:'Handstand P-U', emoji:'🤸', levels:['None','Pike PU','Elevated','Wall HSPU','Freestanding'] },
  { id:'lsit',    name:'L-Sit',         emoji:'🪑', levels:['None','Tuck','Half Tuck','Full','V-Sit'] },
  { id:'planche', name:'Planche',       emoji:'🌟', levels:['None','Lean','Tuck','Straddle','Full'] },
];

function loadSkillsTracker() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  const skillLevels = (() => {
    try { return JSON.parse(localStorage.getItem('fitflow_skills') || '{}'); } catch(e){ return {}; }
  })();

  grid.innerHTML = SKILLS.map(skill => {
    const current = skillLevels[skill.id] || 0;
    const level   = skill.levels[current] || skill.levels[0];
    const pct     = Math.round(current / (skill.levels.length-1) * 100);
    return `
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 18px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:22px;">${skill.emoji}</span>
            <div>
              <div style="font-size:14px;font-weight:700;">${skill.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.4);">Current: <strong style="color:#00d4ff;">${level}</strong></div>
            </div>
          </div>
          <div style="display:flex;gap:6px;align-items:center;">
            <button class="skill-down" data-id="${skill.id}" style="width:28px;height:28px;border-radius:6px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:#fff;cursor:pointer;font-size:13px;" ${current===0?'disabled style="opacity:.3;"':''}>−</button>
            <span style="font-size:12px;color:rgba(255,255,255,.4);">${current}/${skill.levels.length-1}</span>
            <button class="skill-up" data-id="${skill.id}" style="width:28px;height:28px;border-radius:6px;border:1px solid rgba(0,212,255,.3);background:rgba(0,212,255,.1);color:#00d4ff;cursor:pointer;font-size:13px;" ${current===skill.levels.length-1?'disabled style="opacity:.3;"':''}>+</button>
          </div>
        </div>
        <div style="background:rgba(255,255,255,.06);border-radius:999px;height:6px;overflow:hidden;margin-bottom:6px;">
          <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,#00d4ff,#a855f7);border-radius:999px;transition:width .4s;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.3);">
          <span>${skill.levels[0]}</span><span>${skill.levels[Math.floor(skill.levels.length/2)]}</span><span>${skill.levels[skill.levels.length-1]}</span>
        </div>
      </div>
    `;
  }).join('');

  // Skill buttons
  grid.querySelectorAll('.skill-up').forEach(btn => {
    btn.addEventListener('click', () => updateSkill(btn.dataset.id, 1));
  });
  grid.querySelectorAll('.skill-down').forEach(btn => {
    btn.addEventListener('click', () => updateSkill(btn.dataset.id, -1));
  });
}

function updateSkill(id, delta) {
  const skill = SKILLS.find(s => s.id === id);
  if (!skill) return;
  const levels = (() => { try { return JSON.parse(localStorage.getItem('fitflow_skills')||'{}'); } catch(e){ return {}; } })();
  const cur = Math.max(0, Math.min(skill.levels.length-1, (levels[id]||0) + delta));
  levels[id] = cur;
  localStorage.setItem('fitflow_skills', JSON.stringify(levels));
  if (delta > 0 && cur > 0) App.showToast(`🏆 ${skill.name} level up! Now: ${skill.levels[cur]}`, 'success');
  loadSkillsTracker();
}

/* ── HEIGHT PROGRAM ── */
function renderHeight() {
  const prog = PROGRAMS?.height;
  if (!prog) { document.getElementById('page-content').innerHTML = '<p>Loading...</p>'; return; }

  document.getElementById('page-content').innerHTML = `
    <div class="page-header">
      <h1 class="page-title">📏 Height Increase Program</h1>
      <p class="page-subtitle">${prog.subtitle}</p>
    </div>

    <div style="background:linear-gradient(135deg,rgba(0,255,136,.08),rgba(0,212,255,.06));border:1px solid rgba(0,255,136,.2);border-radius:18px;padding:22px 26px;margin-bottom:22px;display:flex;align-items:center;gap:18px;flex-wrap:wrap;">
      <div style="font-size:48px;">📏</div>
      <div>
        <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:900;margin-bottom:6px;">${prog.title}</div>
        <div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:12px;">${prog.description}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <span style="padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(0,212,255,.12);color:#00d4ff;border:1px solid rgba(0,212,255,.25);">📅 ${prog.totalWeeks} Weeks</span>
          <span style="padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(0,255,136,.12);color:#00ff88;border:1px solid rgba(0,255,136,.25);">🕐 ${prog.schedule}</span>
          <span style="padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(255,170,0,.12);color:#ffaa00;border:1px solid rgba(255,170,0,.25);">📊 ${prog.difficulty}</span>
        </div>
      </div>
    </div>

    <!-- Key Factors -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:22px;">
      ${[
        { icon:'😴', title:'Sleep 8–9 hrs', desc:'80% of growth hormone is released during deep sleep. This is non-negotiable.', color:'#a855f7' },
        { icon:'🧘', title:'Daily Stretching', desc:'Spinal decompression + posture stretches add 2–3cm of visible height.', color:'#00d4ff' },
        { icon:'🥗', title:'Calcium & Zinc Diet', desc:'Bone-growth nutrients from milk, eggs, spinach, nuts and seeds.', color:'#00ff88' }
      ].map(f=>`
        <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:16px;text-align:center;">
          <div style="font-size:28px;margin-bottom:8px;">${f.icon}</div>
          <div style="font-size:13px;font-weight:700;margin-bottom:6px;color:${f.color};">${f.title}</div>
          <div style="font-size:11px;color:rgba(255,255,255,.4);line-height:1.5;">${f.desc}</div>
        </div>
      `).join('')}
    </div>

    <!-- Video exercises -->
    <div style="margin-bottom:22px;">
      <div style="font-size:15px;font-weight:700;margin-bottom:14px;">🎥 Height Exercises (Video Guides)</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;">
        ${[
          { name:'Dead Hang',        videoId:'FIYzn1SaYi0', desc:'Best exercise for spinal decompression. 3 sets of 30–60 sec daily.' },
          { name:'Cobra Stretch',    videoId:'JDkohBpU4XU', desc:'Opens the spine and stretches the entire back. Hold 30 seconds × 5.' },
          { name:'Cat-Cow Stretch',  videoId:'kqnua4rHVVA', desc:'Mobilizes the full spine. Do 10 slow reps every morning.' },
          { name:'Jump Rope',        videoId:'u3zgHI8QnqE', desc:'Stimulates bone growth plates. 500 jumps daily is the goal.' },
        ].map(v => `
          <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:14px;overflow:hidden;cursor:pointer;" class="ht-vid-card" data-vid="${v.videoId}" data-name="${v.name}">
            <div style="position:relative;aspect-ratio:16/9;background:#000;">
              <img src="https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg" style="width:100%;height:100%;object-fit:cover;opacity:.8;" loading="lazy">
              <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
                <div style="width:46px;height:46px;border-radius:50%;background:rgba(0,0,0,.65);border:2px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;">
                  <i class="fas fa-play" style="color:#fff;font-size:16px;margin-left:2px;"></i>
                </div>
              </div>
            </div>
            <div style="padding:12px;">
              <div style="font-size:13px;font-weight:700;margin-bottom:4px;">${v.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.45);">${v.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Phases -->
    <div class="card" style="margin-bottom:22px;padding:20px;">
      <div style="font-size:15px;font-weight:700;margin-bottom:14px;">📋 Training Phases</div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${prog.phases.map((p,i) => `
          <div style="display:flex;gap:14px;align-items:flex-start;padding:14px;background:rgba(255,255,255,.03);border-radius:12px;border-left:3px solid ${['#00d4ff','#ffaa00','#00ff88','#a855f7'][i]||'#00d4ff'};">
            <div style="min-width:60px;font-size:11px;font-weight:700;color:rgba(255,255,255,.4);text-transform:uppercase;">Ph.${p.phase}<br>${p.weeks}</div>
            <div>
              <div style="font-size:14px;font-weight:700;margin-bottom:4px;">${p.emoji} ${p.title}</div>
              <div style="font-size:12px;color:rgba(255,255,255,.5);margin-bottom:8px;">${p.description}</div>
              <div style="display:flex;gap:5px;flex-wrap:wrap;">
                ${p.exercises.map(e=>`<span style="font-size:10px;padding:2px 8px;border-radius:999px;background:rgba(0,212,255,.1);color:#00d4ff;border:1px solid rgba(0,212,255,.15);">${e}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Video modal (shared) -->
    <div id="cal-video-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:300;align-items:center;justify-content:center;padding:16px;">
      <div style="width:100%;max-width:700px;background:#0f0f1a;border-radius:20px;overflow:hidden;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.08);">
          <div id="cal-modal-title" style="font-size:16px;font-weight:700;"></div>
          <button id="cal-modal-close" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);border:none;color:#fff;font-size:16px;cursor:pointer;">✕</button>
        </div>
        <div id="cal-modal-body"></div>
      </div>
    </div>
  `;

  // Height video cards
  document.querySelectorAll('.ht-vid-card').forEach(card => {
    card.addEventListener('click', () => {
      openVideoModal(card.dataset.vid, card.dataset.name, null);
    });
  });

  document.getElementById('cal-modal-close')?.addEventListener('click', closeVideoModal);
  document.getElementById('cal-video-modal')?.addEventListener('click', e => {
    if (e.target.id === 'cal-video-modal') closeVideoModal();
  });
}
