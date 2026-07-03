/* ============================================================
   FitFlow AI — Dashboard Page
   ============================================================ */

function renderDashboard() {
  const user = Auth.getCurrentUser();
  if (!user) return;

  const bmiCat  = Auth.bmiCategory(user.bmi || 22);
  const bfCat   = Auth.bodyFatCategory(user.bodyFat || 20, user.gender || 'male');
  const target  = Auth.targetCalories(user);
  const goalLabel = Auth.goalLabel(user.goal);

  // Pick today's exercises based on goal
  const todayExercises = getTodayExercises(user.goal);

  // AI tip based on goal
  const tips = {
    'fat-loss':    { title:'Fat Burn Tip', body:'High Intensity Interval Training burns 25% more calories than steady cardio. Try today\'s workout at maximum effort!' },
    'muscle-gain': { title:'Muscle Growth Tip', body:'Progressive overload is the key — add 1 more rep or a tiny bit more weight to each exercise every week.' },
    'calisthenics':{ title:'Calisthenics Tip', body:'The secret to calisthenics progress: master each exercise completely before moving to a harder variation.' },
    'height':      { title:'Height Tip', body:'Your spine compresses ~1.5cm during the day. Do your dead hangs in the morning for maximum decompression benefit.' },
    'general':     { title:'Fitness Tip', body:'Consistency beats perfection. 30 minutes 4 days a week for a year creates massive transformation.' }
  };
  const tip = tips[user.goal] || tips['general'];

  const html = `
    <div class="page-header">
      <h1 class="page-title">Welcome back, ${user.name.split(' ')[0]}! 👋</h1>
      <p class="page-subtitle">Here's your fitness overview for today — ${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</p>
    </div>

    <!-- Stats Row -->
    <div class="stats-grid">
      <div class="stat-card blue">
        <div class="stat-icon blue"><i class="fas fa-weight"></i></div>
        <div class="stat-value">${user.weight}<span style="font-size:16px;font-weight:500;color:var(--text-muted)"> kg</span></div>
        <div class="stat-label">Current Weight</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon green"><i class="fas fa-dumbbell"></i></div>
        <div class="stat-value">${user.workoutsCompleted || 0}</div>
        <div class="stat-label">Workouts Done</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon amber"><i class="fas fa-fire"></i></div>
        <div class="stat-value">${user.totalCalBurned || 0}<span style="font-size:14px;font-weight:500;color:var(--text-muted)"> cal</span></div>
        <div class="stat-label">Total Calories Burned</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-icon purple"><i class="fas fa-bullseye"></i></div>
        <div class="stat-value">${target}<span style="font-size:14px;font-weight:500;color:var(--text-muted)"> cal</span></div>
        <div class="stat-label">Daily Calorie Target</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title-sm">Quick Actions</h2>
      </div>
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

    <!-- Main Content -->
    <div class="grid-2" style="gap:22px;">

      <!-- Today's Workout -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title-sm">Today's Recommended Workout</h2>
          <a href="#workouts" data-page="workouts" class="btn btn-secondary btn-sm">
            See All <i class="fas fa-arrow-right"></i>
          </a>
        </div>
        <div class="workout-today-list">
          ${todayExercises.map(ex => `
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
                <span class="badge badge-${EQUIPMENT[ex.equipment]?.color || 'blue'}">${EQUIPMENT[ex.equipment]?.label || ex.equipment}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Body Stats + AI Tip -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title-sm">Your Body Stats</h2>
          <a href="#scanner" data-page="scanner" class="btn btn-secondary btn-sm">Rescan</a>
        </div>

        <div class="card card-accent" style="margin-bottom:16px;">
          <div class="grid-2" style="gap:16px;">
            <div style="text-align:center;">
              <div style="font-family:'Outfit',sans-serif;font-size:36px;font-weight:900;color:var(--accent-blue);margin-bottom:4px;">${user.bmi || 22}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">BMI</div>
              <span class="badge badge-${bmiCat.color}">${bmiCat.label}</span>
            </div>
            <div style="text-align:center;">
              <div style="font-family:'Outfit',sans-serif;font-size:36px;font-weight:900;color:var(--accent-green);margin-bottom:4px;">${user.bodyFat || '—'}%</div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">Body Fat</div>
              <span class="badge badge-${bfCat.color}">${bfCat.label}</span>
            </div>
          </div>
          <div class="divider"></div>
          <div class="grid-3" style="gap:12px;text-align:center;">
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--accent-amber)">${user.bmr || '—'}</div>
              <div style="font-size:11px;color:var(--text-muted)">BMR (cal/day)</div>
            </div>
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--accent-purple)">${user.height || '—'} cm</div>
              <div style="font-size:11px;color:var(--text-muted)">Height</div>
            </div>
            <div>
              <div style="font-size:15px;font-weight:700;color:var(--text-primary)">${user.age || '—'}</div>
              <div style="font-size:11px;color:var(--text-muted)">Age</div>
            </div>
          </div>
        </div>

        <!-- AI Tip -->
        <div class="ai-tip-card">
          <div class="ai-tip-icon"><i class="fas fa-robot"></i></div>
          <div>
            <div class="ai-tip-title">AI Coach · ${tip.title}</div>
            <div class="ai-tip-body">${tip.body}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weight Progress Mini -->
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
      <div class="card" style="text-align:center;padding:32px;">
        <div style="font-size:32px;margin-bottom:12px;">📊</div>
        <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">Start Tracking Your Progress</h3>
        <p style="font-size:14px;color:var(--text-muted);margin-bottom:16px;">Log your first weight entry to see your transformation chart here.</p>
        <a href="#progress" data-page="progress" class="btn btn-primary btn-sm">
          <i class="fas fa-plus"></i> Log Weight Now
        </a>
      </div>
    </div>
    `}

    <!-- Goal Badge -->
    <div style="background:linear-gradient(135deg,rgba(0,212,255,0.05),rgba(168,85,247,0.05));border:1px solid rgba(0,212,255,0.15);border-radius:var(--r-lg);padding:20px 24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <div style="font-size:13px;color:var(--text-muted);margin-bottom:4px;">Your Active Goal</div>
        <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;">${goalLabel}</div>
      </div>
      <div style="display:flex;gap:10px;">
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

  // Render mini chart if data available
  if (user.weightHistory && user.weightHistory.length > 1) {
    setTimeout(() => renderDashMiniChart(user.weightHistory), 100);
  }
}

function getTodayExercises(goal) {
  const dayOfWeek = new Date().getDay(); // 0=Sun
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
  const ctx = document.getElementById('dash-weight-chart');
  if (!ctx) return;
  const last7 = history.slice(-7);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: last7.map(h => new Date(h.date).toLocaleDateString('en-US',{month:'short',day:'numeric'})),
      datasets: [{
        label: 'Weight (kg)',
        data: last7.map(h => h.weight),
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0,212,255,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#00d4ff',
        pointBorderColor: '#00d4ff',
        pointRadius: 5,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend:{ display:false } },
      scales: {
        x: { grid:{ color:'rgba(255,255,255,0.05)' }, ticks:{ color:'rgba(255,255,255,0.5)', font:{size:11} } },
        y: { grid:{ color:'rgba(255,255,255,0.05)' }, ticks:{ color:'rgba(255,255,255,0.5)', font:{size:11} } }
      }
    }
  });
}
