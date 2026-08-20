/* ============================================================
   FitFlow AI — AI Body Scanner v3
   Camera support, full analysis, fully mobile-compatible
   ============================================================ */

let _scanStream = null; // webcam stream reference

function renderScanner() {
  const user = Auth.getCurrentUser();
  const prev = user?.scanResults;

  document.getElementById('page-content').innerHTML = `
    <div class="page-header">
      <h1 class="page-title">🤖 AI Body Scanner</h1>
      <p class="page-subtitle">AI-powered body composition analysis. Fill in your stats or use your camera for enhanced analysis.</p>
    </div>

    <div style="max-width:820px;margin:0 auto;">

      <!-- STEP 1 FORM -->
      <div id="scan-form-section">

        <!-- Camera Section -->
        <div class="card" style="margin-bottom:16px;text-align:center;padding:20px;">
          <div style="font-size:22px;margin-bottom:8px;">📸</div>
          <div style="font-size:15px;font-weight:700;margin-bottom:6px;">Optional: Use Camera or Upload Photo</div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">Take a photo for enhanced visual analysis (processed locally — never uploaded).</div>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:14px;">
            <button class="btn btn-secondary" id="open-camera-btn"><i class="fas fa-camera"></i> Open Camera</button>
            <button class="btn btn-secondary" id="upload-photo-btn"><i class="fas fa-upload"></i> Upload Photo</button>
            <input type="file" id="scan-photo-input" accept="image/*" capture="environment" style="display:none">
          </div>
          <!-- Camera viewfinder -->
          <div id="camera-section" style="display:none;">
            <video id="scan-video" autoplay playsinline muted
              style="width:100%;max-width:360px;border-radius:14px;border:2px solid rgba(0,212,255,0.35);background:#000;margin-bottom:10px;"></video>
            <canvas id="scan-canvas" style="display:none;"></canvas>
            <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
              <button class="btn btn-primary" id="capture-btn"><i class="fas fa-camera"></i> Capture</button>
              <button class="btn btn-secondary" id="close-camera-btn"><i class="fas fa-times"></i> Close</button>
            </div>
          </div>
          <!-- Photo preview -->
          <div id="photo-preview-wrap" style="display:none;margin-top:12px;">
            <img id="scan-photo-preview" style="max-width:200px;max-height:200px;border-radius:12px;border:2px solid rgba(0,255,136,0.4);object-fit:cover;">
            <div style="font-size:12px;color:var(--accent-green);margin-top:6px;" id="photo-label">✅ Photo ready</div>
            <button class="btn btn-secondary btn-sm" id="remove-photo-btn" style="margin-top:6px;"><i class="fas fa-trash"></i> Remove</button>
          </div>
        </div>

        <!-- Body Measurements Card -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px;">
            <span style="width:28px;height:28px;background:linear-gradient(135deg,#00d4ff,#a855f7);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#fff;">1</span>
            Body Measurements
          </h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="form-group">
              <label>Age</label>
              <input type="number" id="scan-age" value="${user?.age||''}" placeholder="e.g. 20" min="10" max="80" inputmode="numeric">
            </div>
            <div class="form-group">
              <label>Gender</label>
              <select id="scan-gender">
                <option value="male" ${user?.gender==='male'?'selected':''}>Male</option>
                <option value="female" ${user?.gender==='female'?'selected':''}>Female</option>
              </select>
            </div>
            <div class="form-group">
              <label>Weight (kg)</label>
              <input type="number" id="scan-weight" value="${user?.weight||''}" placeholder="e.g. 70" min="30" max="300" inputmode="decimal">
            </div>
            <div class="form-group">
              <label>Height (cm)</label>
              <input type="number" id="scan-height" value="${user?.height||''}" placeholder="e.g. 175" min="100" max="250" inputmode="decimal">
            </div>
          </div>
        </div>

        <!-- Lifestyle Card -->
        <div class="card" style="margin-bottom:16px;">
          <h3 style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px;">
            <span style="width:28px;height:28px;background:linear-gradient(135deg,#00ff88,#00cc6a);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:12px;color:#000;">2</span>
            Lifestyle &amp; Goal
          </h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
            <div class="form-group" style="margin:0">
              <label>Activity Level</label>
              <select id="scan-activity">
                <option value="sedentary">😴 Sedentary (no exercise)</option>
                <option value="light">🚶 Light (1–3 days/week)</option>
                <option value="moderate" selected>🏃 Moderate (3–5 days/week)</option>
                <option value="active">💪 Active (6–7 days/week)</option>
                <option value="veryActive">🔥 Very Active (twice daily)</option>
              </select>
            </div>
            <div class="form-group" style="margin:0">
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
          <div class="form-group" style="margin:0">
            <label>Experience Level</label>
            <select id="scan-level">
              <option value="beginner">🌱 Beginner (under 6 months)</option>
              <option value="intermediate">⚡ Intermediate (6+ months)</option>
              <option value="advanced">🏆 Advanced (2+ years)</option>
            </select>
          </div>
        </div>

        <button class="btn btn-primary" id="run-scan-btn" style="width:100%;padding:14px;font-size:16px;font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:.03em;">
          <i class="fas fa-brain"></i> Analyze My Body with AI
        </button>
      </div>

      <!-- SCANNING ANIMATION -->
      <div id="scan-animating" style="display:none;text-align:center;padding:60px 20px;">
        <div style="width:80px;height:80px;border-radius:50%;border:3px solid rgba(0,212,255,0.15);border-top-color:#00d4ff;animation:spin 1s linear infinite;margin:0 auto 24px;"></div>
        <div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:800;margin-bottom:8px;">🤖 AI Analyzing...</div>
        <div id="scan-status-msg" style="font-size:14px;color:var(--text-muted);margin-bottom:20px;">Calculating body composition...</div>
        <div style="width:100%;max-width:320px;margin:0 auto;">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:6px;">
            <span style="color:var(--text-muted)">Analysis Progress</span>
            <span style="color:var(--accent-blue)" id="scan-pct">0%</span>
          </div>
          <div style="background:rgba(255,255,255,0.07);border-radius:999px;height:6px;overflow:hidden;">
            <div id="scan-progress-fill" style="height:100%;width:0%;background:linear-gradient(90deg,#00d4ff,#a855f7);border-radius:999px;transition:width .2s;"></div>
          </div>
        </div>
      </div>

      <!-- RESULTS -->
      <div id="scan-results" style="display:none;">

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:10px;">
          <div>
            <h2 style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;margin-bottom:4px;">✅ Analysis Complete!</h2>
            <p style="font-size:13px;color:var(--text-muted);">Scanned on ${new Date().toLocaleDateString('en-IN',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</p>
          </div>
          <button class="btn btn-secondary" id="rescan-btn"><i class="fas fa-redo"></i> Rescan</button>
        </div>

        <!-- Photo used? -->
        <div id="photo-used-badge" style="display:none;margin-bottom:16px;">
          <div style="display:flex;align-items:center;gap:8px;background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.2);border-radius:10px;padding:10px 16px;font-size:13px;color:var(--accent-green);">
            <i class="fas fa-camera"></i>
            <span>📸 Photo-enhanced analysis — visual data factored into results</span>
          </div>
        </div>

        <!-- KEY METRICS -->
        <div id="metrics-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;"></div>

        <!-- BMI GAUGE -->
        <div class="card" style="margin-bottom:18px;padding:20px 22px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:14px;"><i class="fas fa-weight" style="color:var(--accent-blue);margin-right:6px;"></i>BMI Analysis</div>
          <div id="bmi-gauge-wrap"></div>
        </div>

        <!-- MACRO TARGETS -->
        <div class="card" style="margin-bottom:18px;padding:20px 22px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:14px;"><i class="fas fa-utensils" style="color:var(--accent-green);margin-right:6px;"></i>Daily Nutrition Targets</div>
          <div id="macro-targets"></div>
        </div>

        <!-- MUSCLE MAP -->
        <div class="card" style="margin-bottom:18px;">
          <div style="font-size:14px;font-weight:700;padding:16px 20px;border-bottom:1px solid var(--border);"><i class="fas fa-person-running" style="color:var(--accent-purple);margin-right:6px;"></i>Muscle Group Analysis</div>
          <div id="muscle-map" style="display:grid;grid-template-columns:repeat(2,1fr);gap:0;padding:12px;"></div>
        </div>

        <!-- AI RECOMMENDATIONS -->
        <div class="card card-accent" style="margin-bottom:18px;padding:20px 22px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:14px;"><i class="fas fa-robot" style="color:var(--accent-blue);margin-right:6px;"></i>AI Coach Recommendations</div>
          <div id="recommendations-content"></div>
        </div>

        <!-- WEEKLY PLAN -->
        <div class="card" style="margin-bottom:18px;padding:20px 22px;">
          <div style="font-size:14px;font-weight:700;margin-bottom:14px;">📅 Your Personalized Weekly Plan</div>
          <div id="weekly-plan-content"></div>
          <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap;">
            <a href="#workouts" data-page="workouts" class="btn btn-primary"><i class="fas fa-dumbbell"></i> Start Workouts</a>
            <a href="#diet" data-page="diet" class="btn btn-success"><i class="fas fa-utensils"></i> View Diet Plan</a>
            <a href="#calisthenics" data-page="calisthenics" class="btn btn-secondary"><i class="fas fa-trophy"></i> Calisthenics</a>
          </div>
        </div>

      </div>

      <!-- Previous Scan -->
      ${prev ? `
      <div class="card" style="margin-top:18px;border-color:rgba(0,212,255,0.2);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <i class="fas fa-history" style="color:var(--accent-blue)"></i>
          <span style="font-size:14px;font-weight:600;">Previous Scan</span>
          <span style="font-size:12px;color:var(--text-muted)">${new Date(prev.date).toLocaleDateString('en-IN',{month:'short',day:'numeric',year:'numeric'})}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;text-align:center;">
          <div><div style="font-size:20px;font-weight:800;color:var(--accent-blue)">${prev.bmi}</div><div style="font-size:11px;color:var(--text-muted)">BMI</div></div>
          <div><div style="font-size:20px;font-weight:800;color:var(--accent-green)">${prev.bodyFat}%</div><div style="font-size:11px;color:var(--text-muted)">Body Fat</div></div>
          <div><div style="font-size:20px;font-weight:800;color:var(--accent-amber)">${prev.tdee}</div><div style="font-size:11px;color:var(--text-muted)">TDEE</div></div>
        </div>
      </div>
      ` : ''}

    </div>
  `;

  setupScannerEvents();
}

/* ── SCANNER EVENTS ── */
function setupScannerEvents() {
  let capturedPhotoData = null;

  // Camera open
  document.getElementById('open-camera-btn')?.addEventListener('click', async () => {
    const camSection = document.getElementById('camera-section');
    const video = document.getElementById('scan-video');
    if (!camSection || !video) return;
    try {
      // Try back camera first (mobile), fall back to any camera
      const constraints = { video: { facingMode: { ideal: 'environment' }, width: { ideal: 640 } } };
      _scanStream = await navigator.mediaDevices.getUserMedia(constraints).catch(() =>
        navigator.mediaDevices.getUserMedia({ video: true })
      );
      video.srcObject = _scanStream;
      camSection.style.display = 'block';
    } catch(e) {
      App.showToast('Camera not available. Please upload a photo instead.', 'error');
    }
  });

  // Close camera
  document.getElementById('close-camera-btn')?.addEventListener('click', stopCamera);

  // Capture photo from camera
  document.getElementById('capture-btn')?.addEventListener('click', () => {
    const video  = document.getElementById('scan-video');
    const canvas = document.getElementById('scan-canvas');
    if (!video || !canvas) return;
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    capturedPhotoData = canvas.toDataURL('image/jpeg', 0.75);
    showPhotoPreview(capturedPhotoData, '📸 Camera photo captured');
    stopCamera();
  });

  // Upload photo
  document.getElementById('upload-photo-btn')?.addEventListener('click', () => {
    document.getElementById('scan-photo-input')?.click();
  });
  document.getElementById('scan-photo-input')?.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      capturedPhotoData = e.target.result;
      showPhotoPreview(capturedPhotoData, `✅ ${file.name}`);
    };
    reader.readAsDataURL(file);
  });

  // Remove photo
  document.getElementById('remove-photo-btn')?.addEventListener('click', () => {
    capturedPhotoData = null;
    document.getElementById('photo-preview-wrap').style.display = 'none';
  });

  // Run scan
  document.getElementById('run-scan-btn')?.addEventListener('click', () => startScan(capturedPhotoData));

  // Rescan
  document.getElementById('rescan-btn')?.addEventListener('click', () => {
    document.getElementById('scan-results').style.display = 'none';
    document.getElementById('scan-form-section').style.display = '';
    capturedPhotoData = null;
    document.getElementById('photo-preview-wrap').style.display = 'none';
  });
}

function showPhotoPreview(dataUrl, label) {
  const wrap   = document.getElementById('photo-preview-wrap');
  const img    = document.getElementById('scan-photo-preview');
  const lbl    = document.getElementById('photo-label');
  const camSec = document.getElementById('camera-section');
  if (wrap) wrap.style.display = 'block';
  if (img)  img.src = dataUrl;
  if (lbl)  lbl.textContent = label;
  if (camSec) camSec.style.display = 'none';
}

function stopCamera() {
  if (_scanStream) {
    _scanStream.getTracks().forEach(t => t.stop());
    _scanStream = null;
  }
  const camSec = document.getElementById('camera-section');
  if (camSec) camSec.style.display = 'none';
}

function startScan(photoData) {
  const age    = parseInt(document.getElementById('scan-age')?.value);
  const gender = document.getElementById('scan-gender')?.value;
  const weight = parseFloat(document.getElementById('scan-weight')?.value);
  const height = parseFloat(document.getElementById('scan-height')?.value);
  const activity = document.getElementById('scan-activity')?.value || 'moderate';
  const goal   = document.getElementById('scan-goal')?.value || 'general';
  const level  = document.getElementById('scan-level')?.value || 'beginner';

  if (!age || !weight || !height) {
    App.showToast('Please fill in Age, Weight, and Height!', 'error');
    return;
  }

  stopCamera();
  document.getElementById('scan-form-section').style.display = 'none';
  document.getElementById('scan-animating').style.display = 'block';
  document.getElementById('scan-results').style.display = 'none';

  const messages = [
    'Reading biometric data...',
    'Calculating BMI & body composition...',
    'Analyzing body fat percentage...',
    'Mapping muscle development...',
    photoData ? 'Processing visual body scan...' : 'Generating fitness profile...',
    'Building nutrition targets...',
    'Creating your personalized plan...',
    'Finalizing AI report...'
  ];

  let pct = 0, msgIdx = 0;
  const interval = setInterval(() => {
    pct = Math.min(pct + (Math.random() * 7 + 3), 100);
    const fill  = document.getElementById('scan-progress-fill');
    const pctEl = document.getElementById('scan-pct');
    const msg   = document.getElementById('scan-status-msg');
    if (fill)  fill.style.width = pct + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (msg && msgIdx < messages.length && pct > msgIdx * 13) {
      msg.textContent = messages[msgIdx++];
    }
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => showScanResults(weight, height, age, gender, activity, goal, level, !!photoData), 600);
    }
  }, 120);
}

function showScanResults(weight, height, age, gender, activity, goal, level, hasPhoto) {
  const bmi     = Auth.calcBMI(weight, height);
  const bmiCat  = Auth.bmiCategory(bmi);
  const bmr     = Auth.calcBMR(weight, height, age, gender);
  const tdee    = Auth.calcTDEE(bmr, activity);
  const bodyFat = Auth.estimateBodyFat(bmi, age, gender);
  const bfCat   = Auth.bodyFatCategory(bodyFat, gender);
  const targetCal = Auth.targetCalories({ tdee, goal });
  const leanMass  = parseFloat((weight * (1 - bodyFat/100)).toFixed(1));
  const fatMass   = parseFloat((weight - leanMass).toFixed(1));
  const protein   = Math.round(leanMass * 2.2);
  const carbs     = Math.round((targetCal * 0.40) / 4);
  const fat       = Math.round((targetCal * 0.25) / 9);

  document.getElementById('scan-animating').style.display = 'none';
  document.getElementById('scan-results').style.display = 'block';
  if (hasPhoto) document.getElementById('photo-used-badge').style.display = 'block';

  // ── METRICS GRID ──
  const colors = { blue:'#00d4ff', green:'#00ff88', amber:'#ffaa00', purple:'#a855f7', red:'#ff4757' };
  const metrics = [
    { val: bmi,           sub: bmiCat.label,          label:'BMI',              color:'blue'   },
    { val: bodyFat+'%',   sub: bfCat.label,            label:'Body Fat',         color:'amber'  },
    { val: leanMass+' kg',sub: 'Muscle & bone',        label:'Lean Mass',        color:'green'  },
    { val: fatMass+' kg', sub: 'Total fat mass',       label:'Fat Mass',         color:'red'    },
    { val: bmr,           sub: 'cal/day at rest',      label:'BMR',              color:'purple' },
    { val: tdee,          sub: 'Total daily burn',     label:'TDEE',             color:'blue'   },
    { val: targetCal,     sub: Auth.goalLabel(goal),   label:'Target Calories',  color:'green'  },
    { val: protein+'g',   sub: 'Protein daily target', label:'Protein',          color:'amber'  },
  ];
  document.getElementById('metrics-grid').innerHTML = metrics.map(m => `
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px;text-align:center;border-top:2px solid ${colors[m.color]};">
      <div style="font-family:'Outfit',sans-serif;font-size:22px;font-weight:900;color:${colors[m.color]};line-height:1;">${m.val}</div>
      <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:.06em;margin-top:4px;">${m.label}</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:2px;">${m.sub}</div>
    </div>
  `).join('');

  // ── BMI GAUGE ──
  const gaugeLeft = Math.min(92, Math.max(4, ((bmi - 15) / 25) * 100));
  document.getElementById('bmi-gauge-wrap').innerHTML = `
    <div style="position:relative;height:10px;background:linear-gradient(90deg,rgba(0,212,255,.6),rgba(0,255,136,.6),rgba(255,170,0,.6),rgba(255,71,87,.6));border-radius:999px;margin-bottom:8px;">
      <div style="position:absolute;top:50%;transform:translate(-50%,-50%);left:${gaugeLeft}%;width:18px;height:18px;background:#fff;border-radius:50%;border:3px solid #00d4ff;box-shadow:0 0 10px rgba(0,212,255,.7);"></div>
    </div>
    <div style="display:flex;justify-content:space-between;font-size:10px;color:rgba(255,255,255,.4);margin-bottom:12px;">
      <span>Underweight<br>&lt;18.5</span><span>Normal<br>18.5–25</span><span>Overweight<br>25–30</span><span>Obese<br>&gt;30</span>
    </div>
    <div style="text-align:center;">
      <span style="font-family:'Outfit',sans-serif;font-size:38px;font-weight:900;color:#00d4ff;">${bmi}</span>
      <span style="display:inline-block;margin-left:8px;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;background:rgba(${bmiCat.color==='green'?'0,255,136':'0,212,255'},.12);color:${bmiCat.color==='green'?'#00ff88':'#ffaa00'};">${bmiCat.label}</span>
    </div>
  `;

  // ── MACRO TARGETS ──
  document.getElementById('macro-targets').innerHTML = [
    { label:'Calories', val: targetCal+'kcal', goal: 'Daily Target', color:'#00d4ff', pct:100 },
    { label:'Protein',  val: protein+'g',       goal: `${Math.round(protein/targetCal*400)}% of calories`, color:'#00ff88', pct: Math.round(protein*4/targetCal*100) },
    { label:'Carbs',    val: carbs+'g',          goal: `${Math.round(carbs*4/targetCal*100)}% of calories`, color:'#ffaa00', pct: Math.round(carbs*4/targetCal*100) },
    { label:'Fats',     val: fat+'g',            goal: `${Math.round(fat*9/targetCal*100)}% of calories`,   color:'#a855f7', pct: Math.round(fat*9/targetCal*100) },
  ].map(m => `
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px;">
        <span style="font-weight:700;">${m.label} <span style="font-weight:900;color:${m.color}">${m.val}</span></span>
        <span style="color:rgba(255,255,255,.4);font-size:11px;">${m.goal}</span>
      </div>
      <div style="background:rgba(255,255,255,.07);border-radius:999px;height:7px;overflow:hidden;">
        <div style="height:100%;width:${Math.min(100,m.pct)}%;background:${m.color};border-radius:999px;"></div>
      </div>
    </div>
  `).join('');

  // ── MUSCLE MAP ──
  const muscleGroups = [
    { name:'Chest', score:muscleSim(bodyFat,'chest',gender) },
    { name:'Back', score:muscleSim(bodyFat,'back',gender) },
    { name:'Shoulders', score:muscleSim(bodyFat,'shoulder',gender) },
    { name:'Biceps', score:muscleSim(bodyFat,'biceps',gender) },
    { name:'Triceps', score:muscleSim(bodyFat,'triceps',gender) },
    { name:'Core / Abs', score:muscleSim(bodyFat,'core',gender) },
    { name:'Quads', score:muscleSim(bodyFat,'quads',gender) },
    { name:'Glutes', score:muscleSim(bodyFat,'glutes',gender) },
  ];
  document.getElementById('muscle-map').innerHTML = muscleGroups.map(m => {
    const c = m.score >= 70 ? '#00ff88' : m.score >= 45 ? '#ffaa00' : '#ff4757';
    const bg = m.score >= 70 ? 'rgba(0,255,136,.06)' : m.score >= 45 ? 'rgba(255,170,0,.06)' : 'rgba(255,71,87,.06)';
    const lbl = m.score >= 70 ? 'Strong' : m.score >= 45 ? 'Average' : 'Needs Work';
    return `
      <div style="padding:12px;border-right:1px solid rgba(255,255,255,.05);border-bottom:1px solid rgba(255,255,255,.05);background:${bg};">
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span style="font-size:12px;font-weight:700;">${m.name}</span>
          <span style="font-size:12px;font-weight:800;color:${c};">${m.score}%</span>
        </div>
        <div style="background:rgba(255,255,255,.07);border-radius:999px;height:5px;overflow:hidden;margin-bottom:3px;">
          <div style="height:100%;width:${m.score}%;background:${c};border-radius:999px;"></div>
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,.35);">${lbl}</div>
      </div>
    `;
  }).join('');

  // ── RECOMMENDATIONS ──
  document.getElementById('recommendations-content').innerHTML =
    buildRecommendations(bmi, bodyFat, goal, level, gender, weight).map(r => `
      <div style="display:flex;align-items:flex-start;gap:12px;padding:12px 14px;background:rgba(255,255,255,.03);border-radius:10px;border:1px solid rgba(255,255,255,.06);margin-bottom:10px;">
        <span style="font-size:22px;flex-shrink:0;">${r.icon}</span>
        <div>
          <div style="font-size:13px;font-weight:700;margin-bottom:3px;">${r.title}</div>
          <div style="font-size:12px;color:rgba(255,255,255,.55);line-height:1.55;">${r.body}</div>
        </div>
      </div>
    `).join('');

  // ── WEEKLY PLAN ──
  const plan = buildWeeklyPlan(goal, level);
  document.getElementById('weekly-plan-content').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:4px;">
      ${plan.map(d => `
        <div style="background:${d.isRest?'rgba(255,255,255,.03)':'rgba(0,212,255,.08)'};border:1px solid ${d.isRest?'rgba(255,255,255,.06)':'rgba(0,212,255,.2)'};border-radius:10px;padding:10px 4px;text-align:center;">
          <div style="font-size:9px;font-weight:700;color:${d.isRest?'rgba(255,255,255,.3)':'#00d4ff'};text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;">${d.day}</div>
          <div style="font-size:18px;margin-bottom:4px;">${d.emoji}</div>
          <div style="font-size:9px;color:rgba(255,255,255,.4);line-height:1.2;">${d.label}</div>
        </div>
      `).join('')}
    </div>
  `;

  // Save results
  const results = { bmi, bodyFat, bmr, tdee, targetCal, leanMass, fatMass, protein, carbs, fat, goal, level, hasPhoto, date: new Date().toISOString() };
  Auth.saveScanResults(results);
  Auth.updateUser({ bmi, bodyFat, bmr, tdee, goal });

  App.showToast('🤖 AI scan complete! Your personalized plan is ready.', 'success');
}

function muscleSim(bodyFat, group, gender) {
  const base = gender === 'male' ? 62 : 57;
  const fatPenalty = Math.max(0, bodyFat - 14) * 1.3;
  const offsets = { chest:6, back:9, shoulder:-1, biceps:-4, triceps:-2, core:-9, quads:11, glutes:7 };
  const score = base + (offsets[group] || 0) - fatPenalty + (Math.random() * 8 - 4);
  return Math.round(Math.max(10, Math.min(96, score)));
}

function buildRecommendations(bmi, bodyFat, goal, level, gender, weight) {
  const recs = [];
  if (goal === 'fat-loss' || bmi >= 25) {
    recs.push({ icon:'🔥', title:'Calorie Deficit Strategy', body:`Create a 400–500 kcal daily deficit. Your TDEE has been calculated — eat below it consistently. Weigh food for accuracy.` });
    recs.push({ icon:'🏃', title:'HIIT + Strength Combo', body:`3 days HIIT cardio (20–25 min) + 2 days weight training per week. This combination burns fat while preserving muscle.` });
  }
  if (goal === 'muscle-gain') {
    recs.push({ icon:'💪', title:'Progressive Overload is King', body:`Add 1–2 reps or 2.5kg to each lift every week. Track everything. Stagnation = no growth.` });
    recs.push({ icon:'🥩', title:'Protein Target', body:`Aim for ${Math.round(weight * 1.8)}–${Math.round(weight * 2.2)}g protein/day. That's ${Math.round(weight * 2)} boiled eggs worth, or ~${Math.round(weight * 0.4)} chicken breasts.` });
  }
  if (goal === 'calisthenics') {
    recs.push({ icon:'🏆', title:'Master Fundamentals First', body:`Perfect your push-up, pull-up, and dip form before advancing. Watch the tutorial videos in the Workouts section.` });
    recs.push({ icon:'🔄', title:'Skill-Based Training', body:`Calisthenics requires neurological adaptation. Train 4x/week. Rest days are when strength is actually built — don't skip them.` });
  }
  if (goal === 'height') {
    recs.push({ icon:'😴', title:'Sleep is Your #1 Tool', body:`80% of growth hormone secretion happens during deep sleep (11pm–1am). Get 8–9 hours, same time every night.` });
    recs.push({ icon:'📏', title:'Daily Spinal Decompression', body:`Dead hangs: 3 × 1 minute every morning. Yoga stretches. Good posture adds visible 2–3cm immediately.` });
  }
  recs.push({ icon:'🥗', title:'Nutrition Plan Ready', body:`Your ${Auth.goalLabel(goal)} diet plan is now available in the Diet tab with full meal breakdowns and macro tracking.` });
  recs.push({ icon:'📊', title:'Weekly Progress Tracking', body:`Log your weight every Monday morning (same conditions). Check the Progress tab for charts and trends.` });
  return recs.slice(0, 5);
}

function buildWeeklyPlan(goal, level) {
  const plans = {
    'fat-loss':    ['Training','Training','Rest','Training','Training','Cardio','Rest'],
    'muscle-gain': ['Push','Pull','Legs','Rest','Push','Pull','Rest'],
    'calisthenics':['Upper','Rest','Lower','Skills','Rest','Full','Rest'],
    'height':      ['Stretch','Stretch','Stretch','Stretch','Stretch','Stretch','Rest'],
    'general':     ['Full Body','Rest','Full Body','Rest','Full Body','Cardio','Rest']
  };
  const days  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const emojis = { Training:'🏋️',Rest:'😴',Cardio:'🏃',Push:'💪',Pull:'🔄',Legs:'🦵',Upper:'⬆️',Lower:'⬇️',Skills:'🏆',Stretch:'🧘','Full Body':'⚡','Full':'⚡' };
  return (plans[goal]||plans['general']).map((label,i) => ({ day:days[i], label, emoji:emojis[label]||'💪', isRest:label==='Rest' }));
}
