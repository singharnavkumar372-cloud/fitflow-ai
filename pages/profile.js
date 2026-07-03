/* ============================================================
   FitFlow AI — User Profile Page
   ============================================================ */

function renderProfile() {
  const user = Auth.getCurrentUser();
  if (!user) return;

  const bmiCat = Auth.bmiCategory(user.bmi || 22);

  const html = `
    <div class="page-header">
      <h1 class="page-title">👤 My Profile</h1>
      <p class="page-subtitle">Manage your account, update your stats, and customize your fitness journey.</p>
    </div>

    <!-- Profile Hero -->
    <div class="profile-hero">
      <div class="profile-avatar-lg">${user.name.charAt(0).toUpperCase()}</div>
      <div style="flex:1;">
        <div class="profile-name">${user.name}</div>
        <div class="profile-goal-tag">
          <i class="fas fa-bullseye"></i> ${Auth.goalLabel(user.goal)}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <span class="badge badge-blue"><i class="fas fa-envelope"></i> &nbsp;${user.email}</span>
          <span class="badge badge-green">Joined ${new Date(user.createdAt).toLocaleDateString('en-US',{month:'long',year:'numeric'})}</span>
          <span class="badge badge-${bmiCat.color}">BMI ${user.bmi || '—'} · ${bmiCat.label}</span>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="stats-grid" style="margin-bottom:26px;">
      <div class="stat-card blue">
        <div class="stat-icon blue"><i class="fas fa-dumbbell"></i></div>
        <div class="stat-value">${user.workoutsCompleted || 0}</div>
        <div class="stat-label">Workouts Completed</div>
      </div>
      <div class="stat-card green">
        <div class="stat-icon green"><i class="fas fa-fire"></i></div>
        <div class="stat-value">${(user.totalCalBurned || 0).toLocaleString()}</div>
        <div class="stat-label">Total Calories Burned</div>
      </div>
      <div class="stat-card amber">
        <div class="stat-icon amber"><i class="fas fa-weight"></i></div>
        <div class="stat-value">${user.weight} kg</div>
        <div class="stat-label">Current Weight</div>
      </div>
      <div class="stat-card purple">
        <div class="stat-icon purple"><i class="fas fa-ruler-vertical"></i></div>
        <div class="stat-value">${user.height} cm</div>
        <div class="stat-label">Height</div>
      </div>
    </div>

    <!-- Edit Profile Form -->
    <div class="grid-2" style="gap:20px;align-items:start;">
      <!-- Update Stats -->
      <div class="card">
        <h3 style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;margin-bottom:20px;display:flex;align-items:center;gap:8px;">
          <i class="fas fa-edit" style="color:var(--accent-blue)"></i> Update Stats
        </h3>
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" id="profile-name" value="${escapeHtml(user.name)}">
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Age</label>
            <input type="number" id="profile-age" value="${user.age}" min="13" max="80">
          </div>
          <div class="form-group">
            <label>Gender</label>
            <select id="profile-gender">
              <option value="male" ${user.gender==='male'?'selected':''}>Male</option>
              <option value="female" ${user.gender==='female'?'selected':''}>Female</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Weight (kg)</label>
            <input type="number" id="profile-weight" value="${user.weight}" min="30" max="300" step="0.1">
          </div>
          <div class="form-group">
            <label>Height (cm)</label>
            <input type="number" id="profile-height" value="${user.height}" min="100" max="250">
          </div>
        </div>
        <div class="form-group">
          <label>Primary Goal</label>
          <select id="profile-goal">
            <option value="fat-loss" ${user.goal==='fat-loss'?'selected':''}>🔥 Lose Fat / Reduce Weight</option>
            <option value="muscle-gain" ${user.goal==='muscle-gain'?'selected':''}>💪 Build Muscle</option>
            <option value="calisthenics" ${user.goal==='calisthenics'?'selected':''}>🏆 Learn Calisthenics</option>
            <option value="height" ${user.goal==='height'?'selected':''}>📏 Increase Height</option>
            <option value="general" ${user.goal==='general'?'selected':''}>⚖️ General Fitness</option>
          </select>
        </div>
        <button class="btn btn-primary btn-full" id="save-profile-btn">
          <i class="fas fa-save"></i> Save Changes
        </button>
      </div>

      <!-- Account Info + Danger Zone -->
      <div style="display:flex;flex-direction:column;gap:18px;">
        <!-- Body Metrics -->
        <div class="card">
          <h3 style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;margin-bottom:16px;">
            <i class="fas fa-chart-pie" style="color:var(--accent-purple)"></i> Body Metrics
          </h3>
          ${[
            { label:'BMI',           val:user.bmi    ||'—',   note:bmiCat.label,  color:'blue'   },
            { label:'Body Fat %',    val:(user.bodyFat||'—')+'%', note:'Estimated', color:'amber' },
            { label:'BMR',           val:(user.bmr   ||'—')+' cal', note:'At rest burn', color:'green' },
            { label:'TDEE',          val:(user.tdee  ||'—')+' cal', note:'With activity', color:'purple' },
            { label:'Daily Target',  val:Auth.targetCalories(user)+' cal', note:Auth.goalLabel(user.goal), color:'green' }
          ].map(m => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);">
              <div>
                <div style="font-size:13px;font-weight:600;">${m.label}</div>
                <div style="font-size:11px;color:var(--text-muted);">${m.note}</div>
              </div>
              <div style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:800;color:var(--accent-${m.color});">${m.val}</div>
            </div>
          `).join('')}
          <div style="margin-top:14px;">
            <a href="#scanner" data-page="scanner" class="btn btn-secondary btn-sm btn-full">
              <i class="fas fa-sync-alt"></i> Update via AI Scan
            </a>
          </div>
        </div>

        <!-- Account Info -->
        <div class="card">
          <h3 style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;margin-bottom:16px;">
            <i class="fas fa-shield-alt" style="color:var(--accent-green)"></i> Account
          </h3>
          <div style="display:flex;flex-direction:column;gap:10px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:13px;color:var(--text-muted);">Email</span>
              <span style="font-size:13px;font-weight:600;">${user.email}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:13px;color:var(--text-muted);">Member since</span>
              <span style="font-size:13px;font-weight:600;">${new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:13px;color:var(--text-muted);">Last workout</span>
              <span style="font-size:13px;font-weight:600;">${user.lastWorkout ? new Date(user.lastWorkout).toLocaleDateString() : 'Not yet'}</span>
            </div>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="card" style="border-color:rgba(255,71,87,0.2);">
          <h3 style="font-family:'Outfit',sans-serif;font-size:17px;font-weight:700;margin-bottom:12px;color:var(--accent-red);">
            <i class="fas fa-exclamation-triangle"></i> Danger Zone
          </h3>
          <p style="font-size:13px;color:var(--text-muted);margin-bottom:14px;">
            Logging out will not delete your account. You can sign back in anytime.
          </p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn btn-danger btn-sm" id="profile-logout-btn">
              <i class="fas fa-sign-out-alt"></i> Sign Out
            </button>
            <button class="btn btn-danger btn-sm" id="delete-account-btn">
              <i class="fas fa-trash"></i> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('page-content').innerHTML = html;
  setupProfileEvents();
}

function setupProfileEvents() {
  // Save profile
  document.getElementById('save-profile-btn')?.addEventListener('click', () => {
    const name   = document.getElementById('profile-name')?.value?.trim();
    const age    = parseInt(document.getElementById('profile-age')?.value);
    const gender = document.getElementById('profile-gender')?.value;
    const weight = parseFloat(document.getElementById('profile-weight')?.value);
    const height = parseFloat(document.getElementById('profile-height')?.value);
    const goal   = document.getElementById('profile-goal')?.value;

    if (!name || !age || !weight || !height) {
      App.showToast('Please fill in all required fields', 'error');
      return;
    }

    const bmi = Auth.calcBMI(weight, height);
    const bmr = Auth.calcBMR(weight, height, age, gender);
    const tdee = Auth.calcTDEE(bmr);
    const bodyFat = Auth.estimateBodyFat(bmi, age, gender);

    Auth.updateUser({ name, age, gender, weight, height, goal, bmi, bmr, tdee, bodyFat });
    App.updateSidebarUser();
    App.showToast('✅ Profile updated successfully!', 'success');
    renderProfile();
  });

  // Logout
  document.getElementById('profile-logout-btn')?.addEventListener('click', () => {
    App.logout();
  });

  // Delete account
  document.getElementById('delete-account-btn')?.addEventListener('click', () => {
    if (confirm('⚠️ Are you sure you want to delete your account? All your data will be permanently lost. This cannot be undone.')) {
      const user = Auth.getCurrentUser();
      if (user) {
        const users = Auth.getUsers().filter(u => u.id !== user.id);
        Auth.saveUsers(users);
      }
      Auth.logout();
      App.showLanding();
      App.showToast('Account deleted. We\'re sorry to see you go!', 'info');
    }
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str || ''));
  return div.innerHTML;
}
