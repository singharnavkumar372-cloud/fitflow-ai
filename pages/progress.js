/* ============================================================
   FitFlow AI — Progress Tracker Page
   ============================================================ */

let progressChartInstances = {};

function renderProgress() {
  const user = Auth.getCurrentUser();
  if (!user) return;

  const history = user.weightHistory || [];
  const startWeight = history.length > 0 ? history[0].weight : user.weight;
  const currentWeight = user.weight;
  const weightChange  = parseFloat((currentWeight - startWeight).toFixed(1));
  const totalWorkouts = user.workoutsCompleted || 0;
  const totalCal      = user.totalCalBurned || 0;

  // Destroy old charts
  Object.values(progressChartInstances).forEach(c => { try { c.destroy(); } catch(e){} });
  progressChartInstances = {};

  const html = `
    <div class="page-header">
      <h1 class="page-title">📊 Progress Tracker</h1>
      <p class="page-subtitle">Track your weight, workouts, and body metrics over time. Log consistently for best insights.</p>
    </div>

    <!-- AI Weekly Report -->
    <div class="report-highlight">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">
        <div style="width:36px;height:36px;background:linear-gradient(135deg,var(--accent-blue),var(--accent-purple));border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:16px;">🤖</div>
        <div>
          <div class="report-highlight-title">AI Weekly Report</div>
          <div style="font-size:13px;color:var(--text-muted);">Generated for ${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</div>
        </div>
      </div>
      <p style="font-size:14px;color:var(--text-secondary);line-height:1.6;margin-bottom:18px;">
        ${generateAIReport(user)}
      </p>
      <div class="report-metrics-row">
        <div class="report-metric-item">
          <div class="report-metric-value text-accent">${currentWeight} kg</div>
          <div class="report-metric-label">Current Weight</div>
        </div>
        <div class="report-metric-item">
          <div class="report-metric-value ${weightChange <= 0 ? 'text-green' : 'text-amber'}">${weightChange > 0 ? '+' : ''}${weightChange} kg</div>
          <div class="report-metric-label">Total Change</div>
        </div>
        <div class="report-metric-item">
          <div class="report-metric-value text-amber">${totalWorkouts}</div>
          <div class="report-metric-label">Workouts Logged</div>
        </div>
        <div class="report-metric-item">
          <div class="report-metric-value text-green">${totalCal.toLocaleString()}</div>
          <div class="report-metric-label">Calories Burned</div>
        </div>
      </div>
    </div>

    <!-- Log Weight -->
    <div class="log-form-card">
      <div style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:14px;">
        ⚖️ Log Today's Weight
      </div>
      <div class="log-form-inner">
        <div class="form-group" style="margin-bottom:0;">
          <label>Weight (kg)</label>
          <input type="number" id="log-weight-input" placeholder="e.g. 70.5" step="0.1" min="20" max="300" value="${currentWeight}">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Notes (optional)</label>
          <input type="text" id="log-notes-input" placeholder="Feeling great today...">
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label>Date</label>
          <input type="date" id="log-date-input" value="${todayStr()}">
        </div>
        <button class="btn btn-primary" id="log-weight-btn">
          <i class="fas fa-plus"></i> Log Weight
        </button>
      </div>
    </div>

    <!-- Charts -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title-sm">Weight History</h2>
        <span style="font-size:13px;color:var(--text-muted);">${history.length} entries</span>
      </div>
      ${history.length >= 2 ? `
        <div class="chart-card">
          <div class="chart-title">Weight Over Time (kg)</div>
          <div class="chart-canvas-wrap">
            <canvas id="weight-history-chart"></canvas>
          </div>
        </div>
      ` : `
        <div class="card" style="text-align:center;padding:40px;">
          <div style="font-size:36px;margin-bottom:12px;">📈</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">Log at Least 2 Weights</h3>
          <p style="font-size:13px;color:var(--text-muted);">Your weight progress chart will appear here once you have logged at least 2 entries.</p>
        </div>
      `}
    </div>

    <!-- Workout Stats -->
    <div class="grid-2" style="gap:18px;margin-bottom:24px;">
      <div class="chart-card">
        <div class="chart-title">Workouts Per Week (Simulated)</div>
        <div class="chart-canvas-wrap">
          <canvas id="workout-freq-chart"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-title">Calories Burned Per Week</div>
        <div class="chart-canvas-wrap">
          <canvas id="cal-chart"></canvas>
        </div>
      </div>
    </div>

    <!-- Body Stats Overview -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title-sm">Body Metrics Snapshot</h2>
        <a href="#scanner" data-page="scanner" class="btn btn-primary btn-sm">
          <i class="fas fa-qrcode"></i> Update via Scan
        </a>
      </div>
      <div class="stats-grid">
        <div class="stat-card blue">
          <div class="stat-icon blue"><i class="fas fa-weight"></i></div>
          <div class="stat-value">${user.bmi || '—'}</div>
          <div class="stat-label">BMI</div>
        </div>
        <div class="stat-card green">
          <div class="stat-icon green"><i class="fas fa-percentage"></i></div>
          <div class="stat-value">${user.bodyFat || '—'}%</div>
          <div class="stat-label">Body Fat %</div>
        </div>
        <div class="stat-card amber">
          <div class="stat-icon amber"><i class="fas fa-fire"></i></div>
          <div class="stat-value">${user.bmr || '—'}</div>
          <div class="stat-label">BMR (cal/day)</div>
        </div>
        <div class="stat-card purple">
          <div class="stat-icon purple"><i class="fas fa-bolt"></i></div>
          <div class="stat-value">${user.tdee || '—'}</div>
          <div class="stat-label">TDEE (cal/day)</div>
        </div>
      </div>
    </div>

    <!-- Progress Log Table -->
    <div class="section">
      <div class="section-header">
        <h2 class="section-title-sm">Weight Log History</h2>
        ${history.length > 0 ? `<button class="btn btn-danger btn-sm" id="clear-log-btn"><i class="fas fa-trash"></i> Clear All</button>` : ''}
      </div>
      ${history.length > 0 ? `
        <div class="card" style="overflow:hidden;">
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr style="border-bottom:1px solid var(--border);">
                  <th style="text-align:left;padding:10px 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);">Date</th>
                  <th style="text-align:right;padding:10px 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);">Weight</th>
                  <th style="text-align:right;padding:10px 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);">Change</th>
                </tr>
              </thead>
              <tbody>
                ${[...history].reverse().map((h, i, arr) => {
                  const prev = arr[i+1];
                  const change = prev ? parseFloat((h.weight - prev.weight).toFixed(1)) : null;
                  const changeStr = change !== null ? (change > 0 ? `<span style="color:var(--accent-amber)">+${change}</span>` : change < 0 ? `<span style="color:var(--accent-green)">${change}</span>` : `<span style="color:var(--text-muted)">0</span>`) : `<span style="color:var(--text-muted)">—</span>`;
                  return `
                    <tr style="border-bottom:1px solid var(--border);">
                      <td style="padding:12px 14px;font-size:14px;">${new Date(h.date + 'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</td>
                      <td style="padding:12px 14px;font-size:14px;font-weight:700;text-align:right;">${h.weight} kg</td>
                      <td style="padding:12px 14px;font-size:14px;font-weight:700;text-align:right;">${changeStr} kg</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : `
        <div class="empty-state">
          <div class="empty-icon">⚖️</div>
          <h3>No weight entries yet</h3>
          <p>Log your first weight above to start tracking your journey</p>
        </div>
      `}
    </div>
  `;

  document.getElementById('page-content').innerHTML = html;
  setupProgressEvents();
  setTimeout(() => renderProgressCharts(user), 150);
}

function setupProgressEvents() {
  document.getElementById('log-weight-btn')?.addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('log-weight-input')?.value);
    if (!weight || weight < 20 || weight > 300) {
      App.showToast('Please enter a valid weight (20–300 kg)', 'error');
      return;
    }
    Auth.logWeight(weight);
    App.showToast(`✅ Weight ${weight} kg logged successfully!`, 'success');
    renderProgress(); // re-render
  });

  document.getElementById('clear-log-btn')?.addEventListener('click', () => {
    if (confirm('Clear all weight log entries? This cannot be undone.')) {
      const user = Auth.getCurrentUser();
      Auth.updateUser({ weightHistory: [{ date: todayStr(), weight: user.weight }] });
      App.showToast('Weight log cleared.', 'info');
      renderProgress();
    }
  });
}

function renderProgressCharts(user) {
  const history = user.weightHistory || [];

  // Weight chart
  if (history.length >= 2) {
    const ctx = document.getElementById('weight-history-chart');
    if (ctx) {
      progressChartInstances.weight = new Chart(ctx, {
        type: 'line',
        data: {
          labels: history.map(h => new Date(h.date + 'T12:00:00').toLocaleDateString('en-US',{month:'short',day:'numeric'})),
          datasets: [{
            label: 'Weight (kg)',
            data: history.map(h => h.weight),
            borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.08)',
            borderWidth: 2.5, pointBackgroundColor: '#00d4ff',
            pointRadius: 5, tension: 0.4, fill: true
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}} },
            y: { grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}} }
          }
        }
      });
    }
  }

  // Workout frequency chart (simulated)
  const workoutCtx = document.getElementById('workout-freq-chart');
  if (workoutCtx) {
    const weeks = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'];
    const total = user.workoutsCompleted || 0;
    const spread = distributeWorkouts(total, 8);
    progressChartInstances.workouts = new Chart(workoutCtx, {
      type: 'bar',
      data: {
        labels: weeks,
        datasets: [{
          label: 'Workouts',
          data: spread,
          backgroundColor: 'rgba(0,255,136,0.6)',
          borderColor: '#00ff88', borderWidth: 1.5, borderRadius: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid:{display:false}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}} },
          y: { grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11},stepSize:1} }
        }
      }
    });
  }

  // Calories chart (simulated)
  const calCtx = document.getElementById('cal-chart');
  if (calCtx) {
    const weeks = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'];
    const totalCal = user.totalCalBurned || 0;
    const spread = distributeWorkouts(totalCal, 8);
    progressChartInstances.calories = new Chart(calCtx, {
      type: 'bar',
      data: {
        labels: weeks,
        datasets: [{
          label: 'Calories Burned',
          data: spread,
          backgroundColor: 'rgba(255,170,0,0.6)',
          borderColor: '#ffaa00', borderWidth: 1.5, borderRadius: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid:{display:false}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}} },
          y: { grid:{color:'rgba(255,255,255,0.05)'}, ticks:{color:'rgba(255,255,255,0.5)',font:{size:11}} }
        }
      }
    });
  }
}

function distributeWorkouts(total, weeks) {
  if (total === 0) return Array(weeks).fill(0);
  const arr = Array(weeks).fill(0);
  let remaining = total;
  for (let i = weeks - 1; i >= 0 && remaining > 0; i--) {
    const v = Math.min(remaining, Math.round(total/weeks + (Math.random()*2-1)));
    arr[i] = Math.max(0, v);
    remaining -= arr[i];
  }
  return arr;
}

function generateAIReport(user) {
  const goal = Auth.goalLabel(user.goal);
  const history = user.weightHistory || [];
  const workouts = user.workoutsCompleted || 0;

  if (workouts === 0) {
    return `Welcome to FitFlow AI, ${user.name.split(' ')[0]}! Your goal is <strong>${goal}</strong>. Log your first workout to start generating personalized weekly reports. The AI will track your progress and provide recommendations as you train.`;
  }

  const startW   = history.length > 0 ? history[0].weight : user.weight;
  const change   = parseFloat((user.weight - startW).toFixed(1));
  const trend    = change < 0 ? 'losing weight' : change > 0 ? 'gaining weight' : 'maintaining weight';
  const changeStr = change < 0 ? `lost ${Math.abs(change)}kg` : change > 0 ? `gained ${change}kg` : 'maintained your weight';

  return `Great work, ${user.name.split(' ')[0]}! You've completed <strong>${workouts} workout${workouts>1?'s':''}</strong> and burned <strong>${(user.totalCalBurned||0).toLocaleString()} calories</strong> total. You've ${changeStr} since you started — you're ${trend}. For your <strong>${Auth.goalLabel(user.goal)}</strong> goal, consistency is your superpower. Keep training and logging — your next breakthrough is just around the corner! 💪`;
}
