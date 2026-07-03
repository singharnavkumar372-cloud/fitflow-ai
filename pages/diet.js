/* ============================================================
   FitFlow AI — Diet Planner Page
   ============================================================ */

let activeDietDay = 'Monday';

function renderDiet() {
  const user = Auth.getCurrentUser();
  if (!user) return;

  const goal    = user.goal || 'general';
  const plan    = DIET_PLANS[goal] || DIET_PLANS['general'];
  const target  = Auth.targetCalories(user);

  const html = `
    <div class="page-header flex-between" style="flex-wrap:wrap;gap:12px;">
      <div>
        <h1 class="page-title">🥗 Diet Planner</h1>
        <p class="page-subtitle">Your personalized weekly meal plan — ${plan.emoji} ${plan.name}</p>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r-sm);padding:10px 16px;text-align:center;">
          <div style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:800;color:var(--accent-green)">${target}</div>
          <div style="font-size:11px;color:var(--text-muted)">Daily Target (kcal)</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r-sm);padding:10px 16px;">
          <label style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);display:block;margin-bottom:4px;">Switch Goal</label>
          <select id="diet-goal-switcher" style="background:transparent;border:none;color:var(--text-primary);font-size:13px;font-weight:600;cursor:pointer;outline:none;">
            ${Object.entries(DIET_PLANS).map(([k,v]) =>
              `<option value="${k}" ${k===goal?'selected':''}>${v.emoji} ${v.name}</option>`
            ).join('')}
          </select>
        </div>
      </div>
    </div>

    <!-- Day Tabs -->
    <div class="day-tabs" id="diet-day-tabs">
      ${DAYS_ORDER.map(d => `
        <button class="day-tab ${d===activeDietDay?'active':''}" data-day="${d}">${d}</button>
      `).join('')}
    </div>

    <!-- Macro Summary Bar -->
    <div class="macro-summary-bar" id="macro-summary-bar"></div>

    <!-- Meals -->
    <div id="meals-content"></div>

    <!-- Nutrition Tips -->
    <div class="card card-accent" style="margin-top:28px;">
      <h3 style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:14px;">
        🧠 AI Nutrition Tips for ${plan.name}
      </h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        ${getNutritionTips(goal).map(t => `
          <div style="display:flex;gap:10px;align-items:flex-start;padding:12px;background:rgba(255,255,255,0.03);border-radius:var(--r-sm);">
            <span style="font-size:18px;flex-shrink:0;">${t.icon}</span>
            <div>
              <div style="font-size:13px;font-weight:700;margin-bottom:3px;">${t.title}</div>
              <div style="font-size:12px;color:var(--text-muted);line-height:1.5;">${t.body}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Macro Breakdown -->
    <div class="grid-2" style="gap:18px;margin-top:18px;">
      <div class="chart-card">
        <div class="chart-title">Target Macros Distribution</div>
        <div style="height:200px;display:flex;align-items:center;justify-content:center;">
          <canvas id="macro-pie-chart" style="max-width:200px;max-height:200px;"></canvas>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;margin-top:12px;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:5px;font-size:12px;"><span style="width:10px;height:10px;background:var(--accent-blue);border-radius:2px;display:inline-block;"></span>Protein ${plan.macros.protein}%</div>
          <div style="display:flex;align-items:center;gap:5px;font-size:12px;"><span style="width:10px;height:10px;background:var(--accent-amber);border-radius:2px;display:inline-block;"></span>Carbs ${plan.macros.carbs}%</div>
          <div style="display:flex;align-items:center;gap:5px;font-size:12px;"><span style="width:10px;height:10px;background:var(--accent-purple);border-radius:2px;display:inline-block;"></span>Fat ${plan.macros.fat}%</div>
        </div>
      </div>
      <div class="card">
        <div style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:700;margin-bottom:16px;">📊 Daily Calorie Targets</div>
        ${[
          {label:'Maintenance Calories', val:user.tdee||2000, color:'blue'},
          {label:'Your Target',          val:target,          color:'green'},
          {label:'Deficit/Surplus',      val:(target-(user.tdee||2000)), color: (target-(user.tdee||2000)) < 0 ? 'red' : 'amber' },
          {label:'BMR (Basal)',          val:user.bmr||1600,  color:'purple'}
        ].map(r => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
            <span style="font-size:13px;color:var(--text-secondary);">${r.label}</span>
            <span style="font-family:'Outfit',sans-serif;font-size:16px;font-weight:800;color:var(--accent-${r.color});">
              ${r.val > 0 && r.label==='Deficit/Surplus' ? '+' : ''}${r.val} kcal
            </span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('page-content').innerHTML = html;
  renderDayMeals(goal);
  setupDietEvents(goal);
  setTimeout(() => renderMacroPie(plan.macros), 100);
}

function renderDayMeals(goal) {
  const plan = DIET_PLANS[goal] || DIET_PLANS['general'];
  const dayData = plan.meals[activeDietDay];
  if (!dayData) return;

  // Macro summary
  let totalP=0, totalC=0, totalF=0, totalKcal=0;
  MEAL_TYPES.forEach(m => {
    const meal = dayData[m.key];
    if (meal) { totalP+=meal.P; totalC+=meal.C; totalF+=meal.F; totalKcal+=meal.kcal; }
  });

  const macroBar = document.getElementById('macro-summary-bar');
  if (macroBar) {
    macroBar.innerHTML = [
      { val:totalKcal, label:'Calories',  color:'green',  unit:'kcal' },
      { val:totalP,    label:'Protein',   color:'blue',   unit:'g'    },
      { val:totalC,    label:'Carbs',     color:'amber',  unit:'g'    },
      { val:totalF,    label:'Fat',       color:'purple', unit:'g'    }
    ].map(m => `
      <div class="macro-item">
        <div class="macro-value text-${m.color}">${m.val}<span style="font-size:14px;font-weight:500;color:var(--text-muted)"> ${m.unit}</span></div>
        <div class="macro-name">${m.label}</div>
      </div>
    `).join('');
  }

  // Meals
  const mealsEl = document.getElementById('meals-content');
  if (!mealsEl) return;
  mealsEl.innerHTML = MEAL_TYPES.map(mt => {
    const meal = dayData[mt.key];
    if (!meal) return '';
    return `
      <div class="meal-section">
        <div class="meal-section-title">${mt.emoji} ${mt.label}</div>
        <div class="meals-grid">
          <div class="meal-card" style="max-width:460px;">
            <div class="meal-name">${meal.name}</div>
            <div class="meal-desc">${meal.desc}</div>
            <div class="macro-chips">
              <div class="macro-chip protein">🥩 ${meal.P}g protein</div>
              <div class="macro-chip carbs">🌾 ${meal.C}g carbs</div>
              <div class="macro-chip fat">🥑 ${meal.F}g fat</div>
              <div class="macro-chip cal">🔥 ${meal.kcal} kcal</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupDietEvents(goal) {
  // Day tabs
  document.querySelectorAll('.day-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeDietDay = tab.dataset.day;
      document.querySelectorAll('.day-tab').forEach(t => t.classList.toggle('active', t.dataset.day === activeDietDay));
      renderDayMeals(goal);
    });
  });

  // Goal switcher
  const switcher = document.getElementById('diet-goal-switcher');
  if (switcher) {
    switcher.addEventListener('change', () => {
      const newGoal = switcher.value;
      renderDayMeals(newGoal);
    });
  }
}

function renderMacroPie(macros) {
  const ctx = document.getElementById('macro-pie-chart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Protein', 'Carbs', 'Fat'],
      datasets: [{
        data: [macros.protein, macros.carbs, macros.fat],
        backgroundColor: ['rgba(0,212,255,0.8)','rgba(255,170,0,0.8)','rgba(168,85,247,0.8)'],
        borderColor: ['#00d4ff','#ffaa00','#a855f7'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      cutout: '65%'
    }
  });
}

function getNutritionTips(goal) {
  const tips = {
    'fat-loss': [
      { icon:'🥗', title:'Eat More Protein', body:'Protein keeps you full longer and preserves muscle. Aim for 35% of calories from protein.' },
      { icon:'💧', title:'Drink Before Meals', body:'Drink 500ml of water 30 minutes before eating to reduce hunger and calorie intake.' },
      { icon:'⏰', title:'Meal Timing', body:'Eat the bulk of your calories before 7pm. Avoid eating 2-3 hours before bed.' },
      { icon:'🚫', title:'Limit Liquid Calories', body:'Avoid sodas, juices, and alcohol — they add hundreds of empty calories without filling you.' }
    ],
    'muscle-gain': [
      { icon:'🥩', title:'Protein Every 3-4 Hours', body:'Distribute protein across 4-5 meals for optimal muscle protein synthesis throughout the day.' },
      { icon:'🍚', title:'Post-Workout Carbs', body:'Eat fast-acting carbs (white rice, banana) within 30 minutes post-workout to replenish glycogen.' },
      { icon:'🌙', title:'Bedtime Protein', body:'Have a slow-digesting protein source (cottage cheese, casein) before bed to feed muscles overnight.' },
      { icon:'📈', title:'Eat in a Surplus', body:'You need to eat MORE than you burn to build muscle. Track calories to ensure you\'re in a consistent surplus.' }
    ],
    'general': [
      { icon:'🎨', title:'Eat the Rainbow', body:'Variety of colorful vegetables ensures you get all vitamins and micronutrients needed for performance.' },
      { icon:'⚖️', title:'80/20 Rule', body:'Eat healthy 80% of the time. Allow yourself treats 20% to make it sustainable long-term.' },
      { icon:'🧠', title:'Mindful Eating', body:'Slow down at meals. It takes 20 minutes for your brain to register fullness. Enjoy your food.' },
      { icon:'🔁', title:'Meal Prep Sundays', body:'Prepare a week\'s worth of food on Sunday. Saves time, money, and ensures you stay on track.' }
    ],
    'calisthenics': [
      { icon:'💪', title:'Protein for Repair', body:'After intense calisthenics sessions, your muscles need protein to repair and grow stronger.' },
      { icon:'⚡', title:'Pre-Workout Fuel', body:'Eat carbs 60-90 minutes before training. Banana + oats is the classic pre-workout meal.' },
      { icon:'🫐', title:'Antioxidants', body:'Intense bodyweight training creates oxidative stress. Berries, spinach, and nuts combat this.' },
      { icon:'💧', title:'Hydration is Key', body:'Even 2% dehydration reduces strength performance. Aim for 3L of water on training days.' }
    ],
    'height': [
      { icon:'🥛', title:'Calcium Daily', body:'Calcium is essential for bone growth and density. Milk, yogurt, cheese, and leafy greens are your best sources.' },
      { icon:'☀️', title:'Vitamin D', body:'Vitamin D helps your body absorb calcium. Get 15-20 minutes of sunlight daily or supplement with D3.' },
      { icon:'🥩', title:'Protein for Growth', body:'Amino acids are the building blocks of all tissue including cartilage and bone. Don\'t skip protein.' },
      { icon:'🌙', title:'Growth Hormone & Sleep', body:'Growth hormone peaks during sleep. Eating well and sleeping 8-9h maximizes your body\'s natural height potential.' }
    ]
  };
  return (tips[goal] || tips['general']).slice(0, 4);
}
