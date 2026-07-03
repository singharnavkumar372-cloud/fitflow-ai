/* ============================================================
   FitFlow AI — AI Body Scanner Page
   ============================================================ */

function renderScanner() {
  const user = Auth.getCurrentUser();
  const prev = user?.scanResults;

  const html = `
    <div class="page-header">
      <h1 class="page-title">🤖 AI Body Scanner</h1>
      <p class="page-subtitle">Enter your measurements and let AI analyze your body composition and create your personalized plan.</p>
    </div>

    <div class="scanner-wrap">

      <!-- Input Form -->
      <div id="scan-form-section">
        <div class="card" style="margin-bottom:20px;">
          <h3 style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:10px;">
            <span style="width:32px;height:32px;background:linear-gradient(135deg,var(--accent-blue),var(--accent-purple));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;">1</span>
            Your Body Measurements
          </h3>
          <div class="form-row">
            <div class="form-group">
              <label>Age</label>
              <input type="number" id="scan-age" value="${user?.age || ''}" placeholder="e.g. 18" min="13" max="80">
            </div>
            <div class="form-group">
              <label>Gender</label>
              <select id="scan-gender">
                <option value="male" ${user?.gender==='male'?'selected':''}>Male</option>
                <option value="female" ${user?.gender==='female'?'selected':''}>Female</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Weight (kg)</label>
              <input type="number" id="scan-weight" value="${user?.weight || ''}" placeholder="e.g. 70" min="30" max="300">
            </div>
            <div class="form-group">
              <label>Height (cm)</label>
              <input type="number" id="scan-height" value="${user?.height || ''}" placeholder="e.g. 175" min="100" max="250">
            </div>
          </div>
        </div>

        <div class="card" style="margin-bottom:20px;">
          <h3 style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:10px;">
            <span style="width:32px;height:32px;background:linear-gradient(135deg,var(--accent-green),var(--accent-green2));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#000;">2</span>
            Lifestyle & Activity
          </h3>
          <div class="form-row">
            <div class="form-group">
              <label>Activity Level</label>
              <select id="scan-activity">
                <option value="sedentary">😴 Sedentary (desk job, no exercise)</option>
                <option value="light">🚶 Light (1–3 days/week)</option>
                <option value="moderate" selected>🏃 Moderate (3–5 days/week)</option>
                <option value="active">💪 Active (6–7 days/week)</option>
                <option value="veryActive">🔥 Very Active (twice daily)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Primary Goal</label>
              <select id="scan-goal">
                <option value="fat-loss" ${user?.goal==='fat-loss'?'selected':''}>🔥 Fat Loss</option>
                <option value="muscle-gain" ${user?.goal==='muscle-gain'?'selected':''}>💪 Muscle Gain</option>
                <option value="calisthenics" ${user?.goal==='calisthenics'?'selected':''}>🏆 Calisthenics</option>
                <option value="height" ${user?.goal==='height'?'selected':''}>📏 Height Increase</option>
                <option value="general" ${user?.goal==='general'?'selected':''}>⚖️ General Fitness</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Current Fitness Experience</label>
            <select id="scan-level">
              <option value="beginner">🌱 Complete Beginner</option>
              <option value="intermediate">⚡ Some Experience (6+ months)</option>
              <option value="advanced">🏆 Advanced (2+ years)</option>
            </select>
          </div>
        </div>

        <div class="scan-upload-area" id="scan-upload-zone">
          <div class="scan-icon">📸</div>
          <h3 style="font-size:16px;font-weight:700;margin-bottom:6px;">Optional: Upload a Photo</h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:12px;">For enhanced accuracy, upload a front-facing photo. Not required.</p>
          <input type="file" id="scan-photo-input" accept="image/*" style="display:none">
          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('scan-photo-input').click()">
            <i class="fas fa-upload"></i> Choose Photo
          </button>
          <div id="scan-photo-name" style="font-size:12px;color:var(--accent-green);margin-top:8px;"></div>
        </div>

        <button class="btn btn-primary btn-full btn-lg" id="run-scan-btn" style="margin-top:4px;">
          <i class="fas fa-brain"></i> Analyze My Body with AI
        </button>
      </div>

      <!-- Scanning Animation -->
      <div class="scan-animating" id="scan-animating">
        <div class="scan-ring"></div>
        <div>
          <div style="font-family:'Outfit',sans-serif;font-size:20px;font-weight:800;margin-bottom:8px;">AI Analyzing...</div>
          <div class="scan-status-text" id="scan-status-msg">Calculating body composition...</div>
        </div>
        <div style="width:100%;max-width:300px;">
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span style="font-size:12px;color:var(--text-muted)">Analysis Progress</span>
            <span style="font-size:12px;color:var(--accent-blue)" id="scan-pct">0%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill blue" id="scan-progress-fill" style="width:0%"></div>
          </div>
        </div>
      </div>

      <!-- Results -->
      <div class="scan-results" id="scan-results">

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;">
          <div>
            <h2 style="font-family:'Outfit',sans-serif;font-size:24px;font-weight:900;margin-bottom:4px;">
              ✅ Analysis Complete!
            </h2>
            <p style="font-size:14px;color:var(--text-muted);">Scanned on ${new Date().toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</p>
          </div>
          <button class="btn btn-secondary btn-sm" id="rescan-btn">
            <i class="fas fa-redo"></i> Rescan
          </button>
        </div>

        <!-- Metrics Grid -->
        <div class="body-metrics-grid" id="metrics-grid"></div>

        <!-- Muscle Map -->
        <div class="card" style="margin-bottom:22px;">
          <h3 style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:16px;">
            <i class="fas fa-person" style="color:var(--accent-blue)"></i> Muscle Development Analysis
          </h3>
          <div class="muscle-map-grid" id="muscle-map"></div>
        </div>

        <!-- Recommendations -->
        <div class="card card-accent" style="margin-bottom:22px;" id="recommendations-card">
          <h3 style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:16px;">
            <i class="fas fa-robot" style="color:var(--accent-blue)"></i> AI Recommendations
          </h3>
          <div id="recommendations-content"></div>
        </div>

        <!-- Weekly Plan Preview -->
        <div class="card" id="weekly-plan-card">
          <h3 style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:16px;">
            📅 Your Personalized Weekly Plan
          </h3>
          <div id="weekly-plan-content"></div>
          <div style="margin-top:16px;display:flex;gap:10px;">
            <a href="#workouts" data-page="workouts" class="btn btn-primary">
              <i class="fas fa-dumbbell"></i> Start Workouts
            </a>
            <a href="#diet" data-page="diet" class="btn btn-success">
              <i class="fas fa-utensils"></i> View Diet Plan
            </a>
          </div>
        </div>

      </div>

      <!-- Previous Scan -->
      ${prev ? `
      <div class="card" style="margin-top:22px;border-color:rgba(0,212,255,0.15);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <i class="fas fa-history" style="color:var(--accent-blue)"></i>
          <span style="font-size:14px;font-weight:600;">Previous Scan</span>
          <span style="font-size:12px;color:var(--text-muted)">${new Date(prev.date).toLocaleDateString()}</span>
        </div>
        <div class="grid-3" style="gap:12px;text-align:center;">
          <div><div style="font-size:20px;font-weight:800;color:var(--accent-blue)">${prev.bmi}</div><div style="font-size:11px;color:var(--text-muted)">BMI</div></div>
          <div><div style="font-size:20px;font-weight:800;color:var(--accent-green)">${prev.bodyFat}%</div><div style="font-size:11px;color:var(--text-muted)">Body Fat</div></div>
          <div><div style="font-size:20px;font-weight:800;color:var(--accent-amber)">${prev.tdee}</div><div style="font-size:11px;color:var(--text-muted)">TDEE (cal)</div></div>
        </div>
      </div>
      ` : ''}

    </div>
  `;

  document.getElementById('page-content').innerHTML = html;
  setupScannerEvents();
}

function setupScannerEvents() {
  // Photo input
  const photoInput = document.getElementById('scan-photo-input');
  if (photoInput) {
    photoInput.addEventListener('change', () => {
      const name = photoInput.files[0]?.name || '';
      const display = document.getElementById('scan-photo-name');
      if (display) display.textContent = name ? `✅ ${name}` : '';
    });
  }

  // Run scan
  const scanBtn = document.getElementById('run-scan-btn');
  if (scanBtn) {
    scanBtn.addEventListener('click', startScan);
  }

  // Rescan
  const rescanBtn = document.getElementById('rescan-btn');
  if (rescanBtn) {
    rescanBtn.addEventListener('click', () => {
      document.getElementById('scan-results').classList.remove('active');
      document.getElementById('scan-form-section').style.display = '';
    });
  }
}

function startScan() {
  const age    = parseInt(document.getElementById('scan-age')?.value);
  const gender = document.getElementById('scan-gender')?.value;
  const weight = parseFloat(document.getElementById('scan-weight')?.value);
  const height = parseFloat(document.getElementById('scan-height')?.value);
  const activity = document.getElementById('scan-activity')?.value || 'moderate';
  const goal   = document.getElementById('scan-goal')?.value || 'general';
  const level  = document.getElementById('scan-level')?.value || 'beginner';

  if (!age || !weight || !height) {
    App.showToast('Please fill in age, weight, and height!', 'error');
    return;
  }

  // Hide form, show animation
  document.getElementById('scan-form-section').style.display = 'none';
  document.getElementById('scan-animating').classList.add('active');
  document.getElementById('scan-results').classList.remove('active');

  const messages = [
    'Calculating body composition...',
    'Analyzing BMI and body fat...',
    'Mapping muscle groups...',
    'Generating personalized recommendations...',
    'Optimizing workout plan...',
    'Building your nutrition strategy...',
    'Finalizing AI report...'
  ];

  let pct = 0;
  let msgIdx = 0;
  const interval = setInterval(() => {
    pct = Math.min(pct + (Math.random() * 8 + 4), 100);
    const fill = document.getElementById('scan-progress-fill');
    const pctEl = document.getElementById('scan-pct');
    const msg   = document.getElementById('scan-status-msg');
    if (fill) fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (msg && msgIdx < messages.length && pct > msgIdx * 15) {
      msg.textContent = messages[msgIdx++];
    }
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => showScanResults(weight, height, age, gender, activity, goal, level), 500);
    }
  }, 150);
}

function showScanResults(weight, height, age, gender, activity, goal, level) {
  const bmi      = Auth.calcBMI(weight, height);
  const bmiCat   = Auth.bmiCategory(bmi);
  const bmr      = Auth.calcBMR(weight, height, age, gender);
  const tdee     = Auth.calcTDEE(bmr, activity);
  const bodyFat  = Auth.estimateBodyFat(bmi, age, gender);
  const bfCat    = Auth.bodyFatCategory(bodyFat, gender);
  const targetCal= Auth.targetCalories({ tdee, goal });
  const leanMass = parseFloat((weight * (1 - bodyFat/100)).toFixed(1));

  // Hide animation, show results
  document.getElementById('scan-animating').classList.remove('active');
  document.getElementById('scan-results').classList.add('active');

  // Metrics
  const metricsGrid = document.getElementById('metrics-grid');
  if (metricsGrid) {
    metricsGrid.innerHTML = [
      { val:bmi,              label:'BMI',        color:'blue',   cat:bmiCat.label },
      { val:bodyFat+'%',      label:'Body Fat',   color:'amber',  cat:bfCat.label },
      { val:leanMass+' kg',   label:'Lean Mass',  color:'green',  cat:'Muscle + Bone' },
      { val:bmr,              label:'BMR (cal/day)',color:'purple',cat:'At rest calories' },
      { val:tdee,             label:'TDEE (cal/day)',color:'blue', cat:'Daily burn' },
      { val:targetCal,        label:'Target Calories',color:'green',cat:Auth.goalLabel(goal) }
    ].map(m => `
      <div class="metric-card">
        <div class="metric-value text-${m.color}">${m.val}</div>
        <div class="metric-label">${m.label}</div>
        <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">${m.cat}</div>
      </div>
    `).join('');
  }

  // Muscle map (simulated scores based on BMI/BF)
  const muscleGroups = [
    { name:'Chest',     score: muscleSim(bodyFat, 'chest',  gender) },
    { name:'Back',      score: muscleSim(bodyFat, 'back',   gender) },
    { name:'Shoulders', score: muscleSim(bodyFat, 'shoulder',gender) },
    { name:'Biceps',    score: muscleSim(bodyFat, 'biceps', gender) },
    { name:'Triceps',   score: muscleSim(bodyFat, 'triceps',gender) },
    { name:'Core',      score: muscleSim(bodyFat, 'core',   gender) },
    { name:'Quads',     score: muscleSim(bodyFat, 'quads',  gender) },
    { name:'Glutes',    score: muscleSim(bodyFat, 'glutes', gender) }
  ];
  const muscleMap = document.getElementById('muscle-map');
  if (muscleMap) {
    muscleMap.innerHTML = muscleGroups.map(m => {
      const pct  = m.score;
      const col  = pct >= 70 ? 'green' : pct >= 45 ? 'amber' : 'red';
      const colVar = { green:'var(--accent-green)', amber:'var(--accent-amber)', red:'var(--accent-red)' }[col];
      return `
        <div class="muscle-item">
          <div class="muscle-item-name">${m.name}</div>
          <div class="muscle-item-score" style="color:${colVar};font-weight:700;">${pct}%</div>
          <div class="progress-bar"><div class="progress-fill ${col}" style="width:${pct}%"></div></div>
        </div>
      `;
    }).join('');
  }

  // Recommendations
  const recs = buildRecommendations(bmi, bodyFat, goal, level, gender);
  const recsEl = document.getElementById('recommendations-content');
  if (recsEl) {
    recsEl.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${recs.map(r => `
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:rgba(255,255,255,0.03);border-radius:var(--r-sm);border:1px solid var(--border);">
            <span style="font-size:20px;flex-shrink:0;">${r.icon}</span>
            <div>
              <div style="font-size:14px;font-weight:700;margin-bottom:3px;">${r.title}</div>
              <div style="font-size:13px;color:var(--text-secondary);line-height:1.5;">${r.body}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Weekly plan
  const weeklyEl = document.getElementById('weekly-plan-content');
  if (weeklyEl) {
    const plan = buildWeeklyPlan(goal, level);
    weeklyEl.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:4px;">
        ${plan.map(d => `
          <div style="background:${d.isRest?'rgba(255,255,255,0.03)':'rgba(0,212,255,0.08)'};border:1px solid ${d.isRest?'var(--border)':'rgba(0,212,255,0.2)'};border-radius:var(--r-sm);padding:10px 6px;text-align:center;">
            <div style="font-size:10px;font-weight:700;color:${d.isRest?'var(--text-muted)':'var(--accent-blue)'};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;">${d.day}</div>
            <div style="font-size:16px;margin-bottom:4px;">${d.emoji}</div>
            <div style="font-size:10px;color:var(--text-muted);">${d.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Save scan results
  const results = { bmi, bodyFat, bmr, tdee, targetCal, leanMass, goal, level, date:new Date().toISOString() };
  Auth.saveScanResults(results);
  Auth.updateUser({ bmi, bodyFat, bmr, tdee, goal });

  App.showToast('AI scan complete! Your personalized plan is ready.', 'success');
}

function muscleSim(bodyFat, group, gender) {
  const base = gender === 'male' ? 60 : 55;
  const fatPenalty = Math.max(0, bodyFat - 15) * 1.2;
  const offsets = { chest:5, back:8, shoulder:-2, biceps:-5, triceps:-3, core:-8, quads:10, glutes:6 };
  const score = base + (offsets[group]||0) - fatPenalty + (Math.random()*10 - 5);
  return Math.round(Math.max(10, Math.min(95, score)));
}

function buildRecommendations(bmi, bodyFat, goal, level, gender) {
  const recs = [];
  const bmiCat = Auth.bmiCategory(bmi);

  if (goal === 'fat-loss' || bmiCat.label === 'Overweight' || bmiCat.label === 'Obese') {
    recs.push({ icon:'🔥', title:'Calorie Deficit Strategy', body:`Aim for a 400–500 calorie daily deficit. Your diet plan has been calibrated for fat loss while preserving muscle mass.` });
    recs.push({ icon:'🏃', title:'Cardio + Strength Combo', body:`4 days per week: 2 days of HIIT cardio, 2 days of strength training. This combination maximizes fat loss.` });
  }
  if (goal === 'muscle-gain') {
    recs.push({ icon:'💪', title:'Progressive Overload', body:'Add 1–2 reps or slightly more weight each week to each exercise. This is the primary driver of muscle growth.' });
    recs.push({ icon:'🥩', title:'Protein Priority', body:`Target ${Math.round(bmi < 25 ? (gender==='male'?2:1.8) : 1.6)}g of protein per kg of bodyweight daily. Prioritize protein in every meal.` });
  }
  if (goal === 'calisthenics') {
    recs.push({ icon:'🏆', title:'Skill Before Volume', body:'Master each movement with perfect form before adding more reps or sets. Technique drives calisthenics progress.' });
    recs.push({ icon:'🔄', title:'Train 4x/Week', body:'Follow the 8-week calisthenics program: 4 training days, 3 rest days. Recovery is when strength is built.' });
  }
  if (goal === 'height') {
    recs.push({ icon:'😴', title:'Sleep is Non-Negotiable', body:'80% of growth hormone is released during deep sleep. Hit 8–9 hours every night. This is the most impactful change you can make.' });
    recs.push({ icon:'📏', title:'Daily Decompression', body:'Do your dead hang exercises every single morning. 3 sets of 1 minute. Also practice correct posture at all times.' });
  }

  recs.push({ icon:'🥗', title:'Nutrition Plan Activated', body:`Your personalized ${Auth.goalLabel(goal)} diet plan is now available in the Diet Planner tab with full macro breakdowns.` });
  recs.push({ icon:'📊', title:'Track Weekly Progress', body:'Weigh yourself weekly (same day, same time, morning) and log in the Progress tab. Adjust based on 4-week trends.' });

  return recs.slice(0, 4);
}

function buildWeeklyPlan(goal, level) {
  const plans = {
    'fat-loss':    ['Training','Training','Rest','Training','Training','Cardio','Rest'],
    'muscle-gain': ['Push','Pull','Legs','Rest','Push','Pull','Rest'],
    'calisthenics':['Upper','Rest','Lower','Skills','Rest','Full','Rest'],
    'height':      ['Stretch','Stretch','Stretch','Stretch','Stretch','Stretch','Stretch'],
    'general':     ['Full Body','Rest','Full Body','Rest','Full Body','Cardio','Rest']
  };
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const emojis = { Training:'🏋️', Rest:'😴', Cardio:'🏃', Push:'💪', Pull:'🔄', Legs:'🦵', Upper:'⬆️', Lower:'⬇️', Skills:'🏆', Stretch:'🧘', 'Full Body':'⚡', 'Full':'⚡' };
  return (plans[goal]||plans['general']).map((label, i) => ({
    day: days[i], label, emoji: emojis[label]||'💪', isRest: label === 'Rest'
  }));
}
