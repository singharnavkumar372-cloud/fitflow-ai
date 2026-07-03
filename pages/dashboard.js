/* ============================================================
   FitFlow AI — Dashboard Page
   Added: Water Tracker, Streak, Motivational Quote, BMI Gauge
   Fixed: Chart reuse, quick-action routing
   ============================================================ */

const QUOTES = [
  { text:"The body achieves what the mind believes.", author:"Napoleon Hill" },
  { text:"Take care of your body. It's the only place you have to live.", author:"Jim Rohn" },
  { text:"A one-hour workout is 4% of your day. No excuses.", author:"Unknown" },
  { text:"Your only limit is you. Push past the pain.", author:"Unknown" },
  { text:"Success starts with self-discipline.", author:"Unknown" },
  { text:"Don't stop when you're tired. Stop when you're done.", author:"Unknown" },
  { text:"What hurts today makes you stronger tomorrow.", author:"Jay Cutler" },
  { text:"The secret of getting ahead is getting started.", author:"Mark Twain" },
  { text:"Champions aren't made in gyms. They are made from vision.", author:"Muhammad Ali" },
  { text:"You don't have to be great to start, but you have to start to be great.", author:"Zig Ziglar" },
  { text:"It never gets easier, you just get stronger.", author:"Unknown" },
  { text:"Train insane or remain the same.", author:"Unknown" }
];

function getDailyQuote() {
  const idx = Math.floor(Date.now() / 86400000) % QUOTES.length;
  return QUOTES[idx];
}

/* ─── Streak Tracker ─── */
const StreakTracker = {
  _key: 'fitflow_streak',
  getData() {
    try { return JSON.parse(localStorage.getItem(this._key) || '{"current":0,"last":null,"best":0}'); }
    catch(e) { return { current:0, last:null, best:0 }; }
  },
  checkAndUpdate() {
    const user = Auth.getCurrentUser();
    if (!user?.lastWorkout) return this.getData();
    const data    = this.getData();
    const today   = todayStr();
    const last    = data.last;
    const wDay    = user.lastWorkout?.split('T')[0];
    if (wDay === today && last !== today) {
      data.current++;
      data.best = Math.max(data.best, data.current);
      data.last = today;
      localStorage.setItem(this._key, JSON.stringify(data));
    } else if (wDay) {
      const diff = Math.floor((new Date(today) - new Date(last||wDay)) / 86400000);
      if (diff > 1) { data.current = 1; data.last = wDay; localStorage.setItem(this._key, JSON.stringify(data)); }
    }
    return data;
  }
};

function renderDashboard() {
  const user = Auth.getCurrentUser();
  if (!user) return;

  const bmiCat    = Auth.bmiCategory(user.bmi || 22);
  const target    = Auth.targetCalories(user);
  const goalLabel = Auth.goalLabel(user.goal);
  const quote     = getDailyQuote();
  const streak    = StreakTracker.checkAndUpdate();
  const todayExes = getTodayExercises(user.goal);
  const tips      = getGoalTip(user.goal);

  const html = `
    <div class="page-header flex-between" style="flex-wrap:wrap;gap:10px;">
      <div>
        <h1 class="page-title">Welcome back, ${user.name.split(' ')[0]}! 👋</h1>
        <p class="page-subtitle">${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</p>
      </div>
      <div class="badge badge-amber" style="font-size:13px;padding:8px 14px;">
        🔥 ${streak.current} day streak &nbsp;·&nbsp; Best: ${streak.best}
      </div>
    </div>

    <!-- Daily Quote -->
    <div style="background:linear-gradient(135deg,rgba(168,85,247,0.07),rgba(0,212,255,0.05));border:1px solid rgba(168,85,247,0.18);border-radius:var(--r-md);padding:14px 18px;margin-bottom:22px;display:flex;align-items:center;gap:12px;">
      <span style="font-size:22px;flex-shrink:0;">💬</span>
      <div>
        <div style="font-size:14px;font-style:italic;color:var(--text-primary);line-height:1.5;">"${quote.text}"</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:3px;">— ${quote.author}</div>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-icon blue"><i class="fas fa-weight"></i></div>
        <div class="stat-value">${user.weight}<span style="font-size:15px;font-weight:500;color:var(--text-muted)"> kg</span></div>
        <div class="stat-label">Current Weight</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon green"><i class="fas fa-dumbbell"></i></div>
        <div class="stat-value">${user.workoutsCompleted || 0}</div>
        <div class="stat-label">Workouts Done</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon amber"><i class="fas fa-fire"></i></div>
        <div class="stat-value">${(user.totalCalBurned || 0).toLocaleString()}<span style="font-size:12px;font-weight:500;color:var(--text-muted)"> cal</span></div>
        <div class="stat-label">Total Calories Burned</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-icon purple"><i class="fas fa-bullseye"></i></div>
        <div class="stat-value">${target}<span style="font-size:12px;font-weight:500;color:var(--text-muted)"> cal</span></div>
        <div class="stat-label">Daily Calorie Target</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="section">
      <div class="section-header"><h2 class="section-title-sm">Quick Actions</h2></div>
      <div class="quick-actions-grid">
        <a class="quick-action" href="#scanner" data-page="scanner">
          <div class="quick-action-icon">🤖</div>
          <div class="quick-action-label">AI Body Scan</div>
        </a>
        <a class="quick-action" href="#workouts" data-page="workouts">
          <div class="quick-action-icon">🏋️</div>
          <div class="quick-action-label">Browse Workouts</div>
        </a>
        <a class="quick-action" href="#diet" data-page="diet">
          <div class="quick-action-icon">🥗</div>
          <div class="quick-action-label">Today's Meals</div>
        </a>
        <a class="quick-action" href="#progress" data-page="progress">
          <div class="quick-action-icon">📊</div>
          <div class="quick-action-label">Log Progress</div>
        </a>
      </div>
    </div>

    <!-- Main 2-col -->
    <div class="grid-2" style="gap:22px;margin-bottom:22px;">

      <!-- Today's Workout -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title-sm">Today's Recommended Workout</h2>
          <a href="#workouts" data-page="workouts" class="btn btn-secondary btn-sm">See All <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="workout-today-list">
          ${todayExes.map(ex => `
            <div class="today-ex-item" data-action="open-exercise" data-id="${ex.id}">
              <div class="today-ex-emoji">${ex.emoji}</div>
              <div>
                <div class="today-ex-name">${ex.name}</div>
                <div class="today-ex-meta">
                  <i class="fas fa-redo-alt"></i> ${ex.reps || ex.duration} &nbsp;·&nbsp;
                  <i class="fas fa-layer-group"></i> ${ex.sets} sets &nbsp;·&nbsp;
                  🔥 ~${ex.calories * ex.sets} cal
                </div>
              </div>
              <div class="today-ex-badge">
                <span class="badge badge-${EQUIPMENT[ex.equipment]?.color||'blue'}">${EQUIPMENT[ex.equipment]?.label||ex.equipment}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Body Stats + BMI Gauge -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title-sm">Body Stats</h2>
          <a href="#scanner" data-page="scanner" class="btn btn-secondary btn-sm">Rescan</a>
        </div>
        <div class="card card-accent" style="margin-bottom:14px;">
          <!-- BMI Gauge -->
          <div style="text-align:center;margin-bottom:14px;">
            <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:8px;">Body Mass Index</div>
            <div style="position:relative;height:10px;background:linear-gradient(90deg,rgba(0,212,255,0.5),rgba(0,255,136,0.5),rgba(255,170,0,0.5),rgba(255,71,87,0.5));border-radius:999px;margin-bottom:8px;">
              <div style="position:absolute;top:50%;transform:translate(-50%,-50%);left:${Math.min(95,Math.max(5, ((user.bmi||22)-15)/25*100))}%;width:16px;height:16px;background:#fff;border-radius:50%;box-shadow:0 0 8px rgba(0,212,255,0.6);border:2px solid var(--accent-blue);"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-muted);">
              <span>Under</span><span>Normal</span><span>Over</span><span>Obese</span>
            </div>
            <div style="margin-top:10px;">
              <span style="font-family:'Outfit',sans-serif;font-size:32px;font-weight:900;color:var(--accent-blue);">${user.bmi || '—'}</span>
              <span class="badge badge-${bmiCat.color}" style="margin-left:8px;">${bmiCat.label}</span>
            </div>
          </div>
          <div class="divider"></div>
          <div class="grid-3" style="gap:12px;text-align:center;">
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--accent-green)">${user.bodyFat || '—'}%</div>
              <div style="font-size:11px;color:var(--text-muted)">Body Fat</div>
            </div>
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--accent-amber)">${user.height || '—'} cm</div>
              <div style="font-size:11px;color:var(--text-muted)">Height</div>
            </div>
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--accent-purple)">${user.bmr || '—'}</div>
              <div style="font-size:11px;color:var(--text-muted)">BMR cal/day</div>
            </div>
          </div>
        </div>

        <!-- AI Tip -->
        <div class="ai-tip-card">
          <div class="ai-tip-icon"><i class="fas fa-robot"></i></div>
          <div>
            <div class="ai-tip-title">AI Coach · ${tips.title}</div>
            <div class="ai-tip-body">${tips.body}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Water Tracker + Streak side by side -->
    <div class="grid-2" style="gap:18px;margin-bottom:22px;">
      ${WaterTracker.renderWidget()}

      <div class="card" style="padding:18px 20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <div style="font-size:14px;font-weight:700;display:flex;align-items:center;gap:7px;">
            <span style="font-size:18px;">🔥</span> Workout Streak
          </div>
        </div>
        <div style="display:flex;gap:14px;align-items:center;">
          <div style="text-align:center;">
            <div style="font-family:'Outfit',sans-serif;font-size:44px;font-weight:900;color:var(--accent-amber);line-height:1;">${streak.current}</div>
            <div style="font-size:12px;color:var(--text-muted);">Current</div>
          </div>
          <div style="width:1px;height:50px;background:var(--border);"></div>
          <div style="text-align:center;">
            <div style="font-family:'Outfit',sans-serif;font-size:44px;font-weight:900;color:var(--accent-purple);line-height:1;">${streak.best}</div>
            <div style="font-size:12px;color:var(--text-muted);">Best Ever</div>
          </div>
          <div style="flex:1;padding-left:14px;">
            <div style="font-size:13px;color:var(--text-secondary);line-height:1.55;">
              ${streak.current === 0
                ? 'Complete your first workout today to start your streak!'
                : streak.current < 3
                ? 'Great start! Keep training daily to build momentum.'
                : streak.current < 7
                ? 'Amazing! You\'re building a powerful habit!'
                : 'Incredible dedication! You\'re a true fitness champion!'}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Mini Chart -->
    ${user.weightHistory && user.weightHistory.length > 1 ? `
    <div class="section">
      <div class="section-header">
        <h2 class="section-title-sm">Weight Progress</h2>
        <a href="#progress" data-page="progress" class="btn btn-secondary btn-sm">Full Report</a>
      </div>
      <div class="chart-card">
        <div class="chart-canvas-wrap">
          <canvas id="dash-weight-chart"></canvas>
        </div>
      </div>
    </div>
    ` : `
    <div class="section">
      <div class="card" style="text-align:center;padding:30px;">
        <div style="font-size:32px;margin-bottom:10px;">📊</div>
        <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">Start Tracking Your Progress</h3>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">Log your first weight entry to see your transformation chart here.</p>
        <a href="#progress" data-page="progress" class="btn btn-primary btn-sm">
          <i class="fas fa-plus"></i> Log Weight Now
        </a>
      </div>
    </div>
    `}

    <!-- Goal Banner -->
    <div style="background:linear-gradient(135deg,rgba(0,212,255,0.05),rgba(168,85,247,0.05));border:1px solid rgba(0,212,255,0.15);border-radius:var(--r-lg);padding:20px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Active Goal</div>
        <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;">${goalLabel}</div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <a href="#workouts" data-page="workouts" class="btn btn-primary">
          <i class="fas fa-dumbbell"></i> Start Workout
        </a>
        <a href="#diet" data-page="diet" class="btn btn-success">
          <i class="fas fa-utensils"></i> View Diet Plan
        </a>
      </div>
    </div>
  `;

  document.getElementById('page-content').innerHTML = html;

  if (user.weightHistory && user.weightHistory.length > 1) {
    setTimeout(() => renderDashMiniChart(user.weightHistory), 100);
  }
}

function getGoalTip(goal) {
  const tips = {
    'fat-loss':    { title:'Fat Burn Tip', body:'HIIT burns 25% more calories than steady cardio. Try today\'s workout at maximum effort for best fat loss results!' },
    'muscle-gain': { title:'Muscle Growth Tip', body:'Progressive overload is the key — add 1 more rep or slightly more weight to each exercise every week without fail.' },
    'calisthenics':{ title:'Calisthenics Tip', body:'Master each exercise completely before moving to a harder variation. Slow negatives (3-5 sec) build strength fastest.' },
    'height':      { title:'Height Tip', body:'Your spine compresses ~1.5cm during the day. Do your dead hangs every morning for maximum spinal decompression benefit.' },
    'general':     { title:'Fitness Tip', body:'Consistency beats perfection. 30 minutes 4 days a week for a year creates massive, visible body transformation.' }
  };
  return tips[goal] || tips['general'];
}

function getTodayExercises(goal) {
  const pools = {
    'fat-loss':    ['ca001','ca002','a001','l001','ca003'],
    'muscle-gain': ['c001','b001','bi001','t001','s001'],
    'calisthenics':['b001','b002','cal001','cal003','c001'],
    'height':      ['h001','h002','h003','h004','a001'],
    'general':     ['c001','l001','a001','ca002','bi001']
  };
  const ids = (pools[goal] || pools['general']).slice(0, 4);
  return ids.map(id => EXERCISES.find(e => e.id === id)).filter(Boolean);
}

function renderDashMiniChart(history) {
  const last7 = history.slice(-7);
  App.safeChart('dash-weight-chart', 'dashboard-weight', {
    type: 'line',
    data: {
      labels: last7.map(h => new Date(h.date + 'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'})),
      datasets: [{
        label: 'Weight (kg)',
        data: last7.map(h => h.weight),
        borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.08)',
        borderWidth: 2.5, pointBackgroundColor: '#00d4ff',
        pointRadius: 5, tension: 0.4, fill: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend:{ display:false } },
      scales: {
        x: { grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}} },
        y: { grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}} }
      }
    }
  });
}
