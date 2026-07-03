/* ============================================================
   FitFlow AI — Workouts Page
   Fixed: event listener stacking, added Favorites + Timer
   ============================================================ */

let activeFilters = { category:'all', level:'all', equipment:'all', favorites: false };
let searchQuery   = '';

/* ─── Favorites ─── */
const Favorites = {
  _key: 'fitflow_favorites',
  get()       { try { return JSON.parse(localStorage.getItem(this._key) || '[]'); } catch(e){ return []; } },
  add(id)     { const f = this.get(); if (!f.includes(id)) { f.push(id); localStorage.setItem(this._key, JSON.stringify(f)); } },
  remove(id)  { const f = this.get().filter(i => i !== id); localStorage.setItem(this._key, JSON.stringify(f)); },
  toggle(id)  { this.isFav(id) ? this.remove(id) : this.add(id); },
  isFav(id)   { return this.get().includes(id); }
};

function renderWorkouts() {
  const favCount = Favorites.get().length;

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
        <div class="filter-bar" style="margin-bottom:0;">
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

        <div style="width:1px;height:28px;background:var(--border);margin:0 4px;"></div>

        <button class="filter-btn ${favCount > 0 && activeFilters.favorites ? 'active' : ''}" id="fav-filter-btn" data-filter="favorites" data-val="true">
          ❤️ Favorites ${favCount > 0 ? `<span style="background:rgba(255,71,87,0.3);border-radius:999px;padding:1px 6px;font-size:10px;margin-left:4px;">${favCount}</span>` : ''}
        </button>

        <div class="search-wrapper" style="margin-left:auto;">
          <i class="fas fa-search"></i>
          <input type="text" class="search-box" id="exercise-search" placeholder="Search exercises..." value="${searchQuery}">
        </div>
      </div>
    </div>

    <!-- Results Count + Session Stats -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
      <div style="font-size:13px;color:var(--text-muted);">
        Showing <span id="exercise-count" style="color:var(--accent-blue);font-weight:600;">0</span> exercises
      </div>
      <div id="session-stats" style="display:flex;gap:10px;align-items:center;font-size:12px;color:var(--text-muted);">
        <span>Session: <span id="session-count" style="color:var(--accent-green);font-weight:700;">0</span> done</span>
        <span>·</span>
        <span><span id="session-cal" style="color:var(--accent-amber);font-weight:700;">0</span> cal burned</span>
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

    <!-- Exercise Modal Container -->
    <div id="exercise-modal-container"></div>
  `;

  document.getElementById('page-content').innerHTML = html;

  // Reset filters on fresh page load (keep search)
  activeFilters = { category:'all', level:'all', equipment:'all', favorites: false };
  searchQuery   = '';

  renderExerciseGrid();
  setupWorkoutPageEvents();
  updateSessionStats();
}

/* ─── Session Tracker ─── */
const Session = {
  _key: 'fitflow_session',
  get()  { try { return JSON.parse(sessionStorage.getItem(this._key) || '{"done":0,"cal":0}'); } catch(e){ return {done:0,cal:0}; } },
  add(cal){ const s = this.get(); s.done++; s.cal += cal; sessionStorage.setItem(this._key, JSON.stringify(s)); }
};

function updateSessionStats() {
  const s = Session.get();
  const el1 = document.getElementById('session-count');
  const el2 = document.getElementById('session-cal');
  if (el1) el1.textContent = s.done;
  if (el2) el2.textContent = s.cal;
}

/* ─── Render Grid ─── */
function renderExerciseGrid() {
  const favIds = Favorites.get();

  let filtered = EXERCISES.filter(ex => {
    if (activeFilters.favorites && !favIds.includes(ex.id)) return false;
    const catOk  = activeFilters.category  === 'all' || ex.category  === activeFilters.category;
    const lvlOk  = activeFilters.level     === 'all' || ex.level     === activeFilters.level;
    const eqOk   = activeFilters.equipment === 'all' || ex.equipment === activeFilters.equipment;
    const srchOk = !searchQuery ||
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ex.category.toLowerCase().includes(searchQuery.toLowerCase());
    return catOk && lvlOk && eqOk && srchOk;
  });

  // Sort: favorites first
  filtered.sort((a, b) => {
    const aF = favIds.includes(a.id) ? -1 : 0;
    const bF = favIds.includes(b.id) ? -1 : 0;
    return aF - bF;
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
    const lvl  = LEVELS[ex.level]    || { label:ex.level,     color:'blue'  };
    const eq   = EQUIPMENT[ex.equipment] || { label:ex.equipment, color:'blue' };
    const bg   = catBgGradient(ex.category);
    const isFav = favIds.includes(ex.id);
    return `
      <div class="exercise-card" data-action="open-exercise" data-id="${ex.id}" tabindex="0" role="button">
        <div class="exercise-thumb" style="background:${bg}; position:relative;">
          <span>${ex.emoji}</span>
          <button class="fav-btn ${isFav ? 'faved' : ''}" data-action="toggle-fav" data-id="${ex.id}"
            title="${isFav ? 'Remove from favorites' : 'Add to favorites'}"
            style="position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:50%;background:rgba(0,0,0,0.55);border:1px solid ${isFav?'rgba(255,71,87,0.6)':'rgba(255,255,255,0.2)'};color:${isFav?'#ff4757':'rgba(255,255,255,0.6)'};font-size:13px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.2s;z-index:2;">
            ${isFav ? '❤️' : '🤍'}
          </button>
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

/* ─── Events (scoped to page content — avoids stacking on document) ─── */
function setupWorkoutPageEvents() {
  const content = document.getElementById('page-content');
  if (!content) return;

  // Filter buttons — event delegation on the page content div
  content.addEventListener('click', handleWorkoutClick);

  // Search
  document.getElementById('exercise-search')?.addEventListener('input', e => {
    searchQuery = e.target.value;
    renderExerciseGrid();
  });
}

function handleWorkoutClick(e) {
  // Filter button
  const filterBtn = e.target.closest('[data-filter]');
  if (filterBtn) {
    const filter = filterBtn.dataset.filter;
    const val    = filterBtn.dataset.val;
    if (filter === 'favorites') {
      activeFilters.favorites = !activeFilters.favorites;
      filterBtn.classList.toggle('active', activeFilters.favorites);
    } else {
      activeFilters[filter] = val;
      document.querySelectorAll(`[data-filter="${filter}"]`).forEach(b => {
        b.classList.toggle('active', b.dataset.val === val);
      });
    }
    renderExerciseGrid();
    return;
  }

  // Favorite toggle — must be before open-exercise
  const favBtn = e.target.closest('[data-action="toggle-fav"]');
  if (favBtn) {
    e.stopPropagation();
    const id = favBtn.dataset.id;
    Favorites.toggle(id);
    const isFav = Favorites.isFav(id);
    favBtn.innerHTML = isFav ? '❤️' : '🤍';
    favBtn.style.color = isFav ? '#ff4757' : 'rgba(255,255,255,0.6)';
    favBtn.style.borderColor = isFav ? 'rgba(255,71,87,0.6)' : 'rgba(255,255,255,0.2)';
    App.showToast(isFav ? 'Added to favorites!' : 'Removed from favorites', isFav ? 'success' : 'info');
    // Update fav filter badge count
    const count = Favorites.get().length;
    const favFilterBtn = document.getElementById('fav-filter-btn');
    if (favFilterBtn) {
      favFilterBtn.innerHTML = `❤️ Favorites ${count > 0 ? `<span style="background:rgba(255,71,87,0.3);border-radius:999px;padding:1px 6px;font-size:10px;margin-left:4px;">${count}</span>` : ''}`;
    }
    return;
  }

  // Open exercise
  const exCard = e.target.closest('[data-action="open-exercise"]');
  if (exCard) {
    openExercise(exCard.dataset.id);
    return;
  }
}

/* ─── Exercise Modal ─── */
function openExercise(id) {
  const ex = EXERCISES.find(e => e.id === id);
  if (!ex) return;

  const lvl  = LEVELS[ex.level]    || { label:ex.level,     color:'blue' };
  const eq   = EQUIPMENT[ex.equipment] || { label:ex.equipment, color:'blue' };
  const cat  = CATEGORIES[ex.category] || { label:ex.category, color:'blue' };
  const isFav = Favorites.isFav(id);

  const modalHTML = `
    <div class="modal-overlay" id="ex-modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
              <span class="badge badge-${lvl.color}">${lvl.label}</span>
              <span class="badge badge-${eq.color}">${eq.label}</span>
              <span class="badge badge-${cat.color}">${cat.label}</span>
            </div>
            <h2 style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;margin-bottom:4px;">
              ${ex.emoji} ${ex.name}
            </h2>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.5;">${ex.description}</p>
          </div>
          <div style="display:flex;gap:8px;align-items:flex-start;">
            <button id="modal-fav-btn" style="width:36px;height:36px;border-radius:50%;background:rgba(255,71,87,0.1);border:1px solid rgba(255,71,87,${isFav?'0.5':'0.2'});color:${isFav?'#ff4757':'rgba(255,71,87,0.5)'};cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;" title="Toggle Favorite">${isFav?'❤️':'🤍'}</button>
            <button class="modal-close" id="ex-modal-close"><i class="fas fa-times"></i></button>
          </div>
        </div>

        <div class="modal-body">
          <!-- Quick Stats -->
          <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
            <div style="background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);border-radius:var(--r-sm);padding:10px 16px;text-align:center;flex:1;min-width:70px;">
              <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:var(--accent-blue)">${ex.sets}</div>
              <div style="font-size:10px;color:var(--text-muted)">SETS</div>
            </div>
            <div style="background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.2);border-radius:var(--r-sm);padding:10px 16px;text-align:center;flex:1;min-width:70px;">
              <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:var(--accent-green)">${ex.reps || ex.duration}</div>
              <div style="font-size:10px;color:var(--text-muted)">${ex.reps ? 'REPS' : 'TIME'}</div>
            </div>
            <div style="background:rgba(255,170,0,0.1);border:1px solid rgba(255,170,0,0.2);border-radius:var(--r-sm);padding:10px 16px;text-align:center;flex:1;min-width:70px;">
              <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;color:var(--accent-amber)">${ex.calories * ex.sets}</div>
              <div style="font-size:10px;color:var(--text-muted)">CAL</div>
            </div>
            <div style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.2);border-radius:var(--r-sm);padding:10px 16px;flex:2;min-width:120px;">
              <div style="font-size:11px;font-weight:600;margin-bottom:3px;color:var(--accent-purple)">MUSCLES</div>
              <div style="font-size:13px;color:var(--text-secondary)">${ex.muscles.join(', ')}</div>
            </div>
          </div>

          <!-- Workout Timer -->
          <div style="background:rgba(0,0,0,0.3);border:1px solid var(--border);border-radius:var(--r-md);padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div>
              <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted);margin-bottom:4px;">Workout Timer</div>
              <div id="timer-display" style="font-family:'Outfit',sans-serif;font-size:28px;font-weight:900;color:var(--accent-blue);letter-spacing:0.05em;">00:00</div>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button id="timer-start-btn" class="btn btn-primary btn-sm"><i class="fas fa-play"></i> Start</button>
              <button id="timer-stop-btn" class="btn btn-secondary btn-sm"><i class="fas fa-pause"></i> Pause</button>
              <button id="timer-reset-btn" class="btn btn-secondary btn-sm"><i class="fas fa-redo"></i> Reset</button>
              <button id="timer-rest-btn" class="btn btn-amber btn-sm"><i class="fas fa-hourglass-half"></i> Rest 60s</button>
            </div>
          </div>

          <!-- Video -->
          <div class="video-container">
            <iframe
              src="https://www.youtube-nocookie.com/embed/${ex.videoId}?rel=0&modestbranding=1"
              title="${ex.name} tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen loading="lazy">
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
          <div class="modal-section-title" style="margin-top:20px;"><i class="fas fa-lightbulb" style="color:var(--accent-amber);margin-right:6px;"></i>Pro Tips</div>
          <ul class="tips-list">
            ${ex.tips.map(t => `<li>${t}</li>`).join('')}
          </ul>

          <!-- Actions -->
          <div style="margin-top:22px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn btn-success" id="mark-done-btn" data-exercise-id="${ex.id}">
              <i class="fas fa-check"></i> Mark as Done (+${ex.calories * ex.sets} cal)
            </button>
            <button class="btn btn-secondary" id="ex-modal-close2">
              <i class="fas fa-times"></i> Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Use global container in index.html or fallback to page container
  const container = document.getElementById('exercise-modal-container');
  if (container) container.innerHTML = modalHTML;

  // Close handlers
  document.getElementById('ex-modal-close')?.addEventListener('click', closeExercise);
  document.getElementById('ex-modal-close2')?.addEventListener('click', closeExercise);
  document.getElementById('ex-modal-overlay')?.addEventListener('click', e => {
    if (e.target.id === 'ex-modal-overlay') closeExercise();
  });

  // Favorite toggle in modal
  document.getElementById('modal-fav-btn')?.addEventListener('click', () => {
    Favorites.toggle(id);
    const nowFav = Favorites.isFav(id);
    const btn = document.getElementById('modal-fav-btn');
    if (btn) {
      btn.innerHTML = nowFav ? '❤️' : '🤍';
      btn.style.color = nowFav ? '#ff4757' : 'rgba(255,71,87,0.5)';
      btn.style.borderColor = `rgba(255,71,87,${nowFav?'0.5':'0.2'})`;
    }
    App.showToast(nowFav ? 'Added to favorites!' : 'Removed from favorites', nowFav ? 'success' : 'info');
  });

  // Timer buttons
  document.getElementById('timer-start-btn')?.addEventListener('click', () => {
    WorkoutTimer.start('stopwatch');
    App.showToast('Timer started!', 'info');
  });
  document.getElementById('timer-stop-btn')?.addEventListener('click', () => {
    WorkoutTimer.stop();
  });
  document.getElementById('timer-reset-btn')?.addEventListener('click', () => {
    WorkoutTimer.reset();
  });
  document.getElementById('timer-rest-btn')?.addEventListener('click', () => {
    WorkoutTimer.start('countdown', 60);
    App.showToast('60 second rest timer started!', 'info');
  });

  // Mark as done
  document.getElementById('mark-done-btn')?.addEventListener('click', () => {
    Auth.recordWorkout(ex);
    Session.add(ex.calories * ex.sets);
    updateSessionStats();
    App.showToast(`"${ex.name}" completed! +${ex.calories * ex.sets} calories burned!`, 'success');
    WorkoutTimer.stop();
    WorkoutTimer.reset();
    closeExercise();
    App.updateSidebarUser();
  });
}

function closeExercise() {
  WorkoutTimer.stop();
  const container = document.getElementById('exercise-modal-container');
  if (container) container.innerHTML = '';
}
