/* ============================================================
   FitFlow AI — Workouts Page
   ============================================================ */

let activeFilters = { category:'all', level:'all', equipment:'all' };
let searchQuery   = '';

function renderWorkouts() {
  const html = `
    <div class="page-header">
      <h1 class="page-title">💪 Workouts</h1>
      <p class="page-subtitle">Browse all exercises by muscle group, level, and equipment. Click any exercise for video guide and steps.</p>
    </div>

    <!-- Filter Bar -->
    <div style="margin-bottom:22px;">
      <!-- Category Filter -->
      <div style="margin-bottom:10px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:8px;">Muscle Group</div>
        <div class="filter-bar" id="category-filters" style="margin-bottom:0;">
          <button class="filter-btn active" data-filter="category" data-val="all">All</button>
          ${Object.entries(CATEGORIES).map(([k,v]) =>
            `<button class="filter-btn" data-filter="category" data-val="${k}">${v.emoji} ${v.label}</button>`
          ).join('')}
        </div>
      </div>
      <!-- Level + Equipment + Search -->
      <div class="filter-bar">
        <button class="filter-btn active" data-filter="level" data-val="all">All Levels</button>
        <button class="filter-btn" data-filter="level" data-val="beginner">🌱 Beginner</button>
        <button class="filter-btn" data-filter="level" data-val="intermediate">⚡ Intermediate</button>
        <button class="filter-btn" data-filter="level" data-val="advanced">🏆 Advanced</button>

        <div style="width:1px;height:28px;background:var(--border);margin:0 4px;"></div>

        <button class="filter-btn active" data-filter="equipment" data-val="all">All Equipment</button>
        <button class="filter-btn" data-filter="equipment" data-val="home">🏠 Home</button>
        <button class="filter-btn" data-filter="equipment" data-val="gym">🏋️ Gym</button>

        <div class="search-wrapper" style="margin-left:auto;">
          <i class="fas fa-search"></i>
          <input type="text" class="search-box" id="exercise-search" placeholder="Search exercises...">
        </div>
      </div>
    </div>

    <!-- Results Count -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
      <div style="font-size:13px;color:var(--text-muted);">
        Showing <span id="exercise-count" style="color:var(--accent-blue);font-weight:600;">0</span> exercises
      </div>
    </div>

    <!-- Exercise Grid -->
    <div class="exercises-grid" id="exercises-grid"></div>

    <!-- Empty state -->
    <div id="no-exercises" class="hidden empty-state">
      <div class="empty-icon">🔍</div>
      <h3>No exercises found</h3>
      <p>Try adjusting your filters or search term</p>
    </div>

    <!-- Exercise Modal -->
    <div id="exercise-modal-container"></div>
  `;

  document.getElementById('page-content').innerHTML = html;
  activeFilters = { category:'all', level:'all', equipment:'all' };
  searchQuery   = '';
  renderExerciseGrid();
  setupWorkoutEvents();
}

function renderExerciseGrid() {
  let filtered = EXERCISES.filter(ex => {
    const catOk  = activeFilters.category  === 'all' || ex.category  === activeFilters.category;
    const lvlOk  = activeFilters.level     === 'all' || ex.level     === activeFilters.level;
    const eqOk   = activeFilters.equipment === 'all' || ex.equipment === activeFilters.equipment;
    const srchOk = !searchQuery || ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   ex.muscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
                   ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    return catOk && lvlOk && eqOk && srchOk;
  });

  const grid  = document.getElementById('exercises-grid');
  const empty = document.getElementById('no-exercises');
  const count = document.getElementById('exercise-count');

  if (!grid) return;
  if (count) count.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty?.classList.remove('hidden');
    return;
  }
  empty?.classList.add('hidden');

  grid.innerHTML = filtered.map(ex => {
    const lvl = LEVELS[ex.level]  || { label:ex.level, color:'blue' };
    const eq  = EQUIPMENT[ex.equipment] || { label:ex.equipment, color:'blue' };
    const bg  = catBgGradient(ex.category);
    return `
      <div class="exercise-card" data-action="open-exercise" data-id="${ex.id}" tabindex="0" role="button">
        <div class="exercise-thumb" style="background:${bg};">
          <span>${ex.emoji}</span>
        </div>
        <div class="exercise-body">
          <div class="exercise-name">${ex.name}</div>
          <div class="exercise-meta">
            <span class="badge badge-${lvl.color}">${lvl.label}</span>
            <span class="badge badge-${eq.color}">${eq.label}</span>
            <span class="badge badge-${CATEGORIES[ex.category]?.color||'blue'}">${CATEGORIES[ex.category]?.label||ex.category}</span>
          </div>
          <div class="exercise-stats">
            <span><i class="fas fa-layer-group"></i> ${ex.sets} sets</span>
            <span><i class="fas fa-redo-alt"></i> ${ex.reps || ex.duration}</span>
            <span><i class="fas fa-fire"></i> ~${ex.calories * ex.sets} cal</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function catBgGradient(cat) {
  const g = {
    chest:       'linear-gradient(135deg,rgba(0,212,255,0.15),rgba(0,119,255,0.1))',
    back:        'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(124,58,237,0.1))',
    biceps:      'linear-gradient(135deg,rgba(255,170,0,0.15),rgba(230,126,0,0.1))',
    triceps:     'linear-gradient(135deg,rgba(0,255,136,0.15),rgba(0,192,102,0.1))',
    shoulders:   'linear-gradient(135deg,rgba(0,212,255,0.12),rgba(168,85,247,0.1))',
    legs:        'linear-gradient(135deg,rgba(255,170,0,0.15),rgba(168,85,247,0.08))',
    abs:         'linear-gradient(135deg,rgba(0,255,136,0.15),rgba(0,212,255,0.08))',
    cardio:      'linear-gradient(135deg,rgba(255,71,87,0.15),rgba(255,170,0,0.1))',
    calisthenics:'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(0,212,255,0.1))',
    height:      'linear-gradient(135deg,rgba(0,212,255,0.15),rgba(0,255,136,0.1))'
  };
  return g[cat] || g.chest;
}

function setupWorkoutEvents() {
  // Filter buttons
  document.addEventListener('click', handleFilterClick);
  // Search
  const search = document.getElementById('exercise-search');
  if (search) {
    search.addEventListener('input', e => {
      searchQuery = e.target.value;
      renderExerciseGrid();
    });
  }
}

function handleFilterClick(e) {
  const btn = e.target.closest('[data-filter]');
  if (!btn) return;
  const filter = btn.dataset.filter;
  const val    = btn.dataset.val;
  activeFilters[filter] = val;

  // Update active state for that filter group
  const allBtns = document.querySelectorAll(`[data-filter="${filter}"]`);
  allBtns.forEach(b => b.classList.toggle('active', b.dataset.val === val));

  renderExerciseGrid();
}

function openExercise(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;

  const lvl = LEVELS[ex.level]    || { label:ex.level,     color:'blue' };
  const eq  = EQUIPMENT[ex.equipment] || { label:ex.equipment, color:'blue' };
  const cat = CATEGORIES[ex.category] || { label:ex.category, color:'blue' };

  const modalHTML = `
    <div class="modal-overlay" id="ex-modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap;">
              <span class="badge badge-${lvl.color}">${lvl.label}</span>
              <span class="badge badge-${eq.color}">${eq.label}</span>
              <span class="badge badge-${cat.color}">${cat.label}</span>
            </div>
            <h2 style="font-family:'Outfit',sans-serif;font-size:24px;font-weight:900;margin-bottom:4px;">
              ${ex.emoji} ${ex.name}
            </h2>
            <p style="font-size:14px;color:var(--text-secondary);">${ex.description}</p>
          </div>
          <button class="modal-close" id="ex-modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <!-- Quick Stats -->
          <div style="display:flex;gap:10px;margin-bottom:22px;flex-wrap:wrap;">
            <div style="background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);border-radius:var(--r-sm);padding:10px 16px;text-align:center;flex:1;min-width:80px;">
              <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:var(--accent-blue)">${ex.sets}</div>
              <div style="font-size:11px;color:var(--text-muted)">SETS</div>
            </div>
            <div style="background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.2);border-radius:var(--r-sm);padding:10px 16px;text-align:center;flex:1;min-width:80px;">
              <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:var(--accent-green)">${ex.reps || ex.duration}</div>
              <div style="font-size:11px;color:var(--text-muted)">${ex.reps ? 'REPS' : 'TIME'}</div>
            </div>
            <div style="background:rgba(255,170,0,0.1);border:1px solid rgba(255,170,0,0.2);border-radius:var(--r-sm);padding:10px 16px;text-align:center;flex:1;min-width:80px;">
              <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:var(--accent-amber)">${ex.calories * ex.sets}</div>
              <div style="font-size:11px;color:var(--text-muted)">CAL</div>
            </div>
            <div style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.2);border-radius:var(--r-sm);padding:10px 16px;flex:2;min-width:120px;">
              <div style="font-size:12px;font-weight:600;margin-bottom:4px;color:var(--accent-purple)">MUSCLES</div>
              <div style="font-size:13px;color:var(--text-secondary)">${ex.muscles.join(', ')}</div>
            </div>
          </div>

          <!-- Video -->
          <div class="video-container">
            <iframe
              src="https://www.youtube-nocookie.com/embed/${ex.videoId}?rel=0&modestbranding=1"
              title="${ex.name} tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>

          <!-- Steps -->
          <div class="modal-section-title"><i class="fas fa-list-ol" style="color:var(--accent-blue);margin-right:6px;"></i>How to Do It</div>
          <ol class="steps-list">
            ${ex.steps.map((s,i) => `
              <li>
                <div class="step-number">${i+1}</div>
                <div class="step-text">${s}</div>
              </li>
            `).join('')}
          </ol>

          <!-- Tips -->
          <div class="modal-section-title" style="margin-top:22px;"><i class="fas fa-lightbulb" style="color:var(--accent-amber);margin-right:6px;"></i>Pro Tips</div>
          <ul class="tips-list">
            ${ex.tips.map(t => `<li>${t}</li>`).join('')}
          </ul>

          <!-- CTA -->
          <div style="margin-top:24px;display:flex;gap:10px;">
            <button class="btn btn-success btn-sm" id="mark-done-btn" data-exercise-id="${ex.id}">
              <i class="fas fa-check"></i> Mark as Done (+${ex.calories * ex.sets} cal)
            </button>
            <button class="btn btn-secondary btn-sm" id="ex-modal-close2">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('exercise-modal-container').innerHTML = modalHTML;

  document.getElementById('ex-modal-close')?.addEventListener('click', closeExercise);
  document.getElementById('ex-modal-close2')?.addEventListener('click', closeExercise);
  document.getElementById('ex-modal-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'ex-modal-overlay') closeExercise();
  });
  document.getElementById('mark-done-btn')?.addEventListener('click', () => {
    Auth.recordWorkout(ex);
    App.showToast(`✅ "${ex.name}" completed! +${ex.calories * ex.sets} calories burned!`, 'success');
    closeExercise();
    // Refresh sidebar stats
    App.updateSidebarUser();
  });
}

function closeExercise() {
  const container = document.getElementById('exercise-modal-container');
  if (container) container.innerHTML = '';
}
