/* ============================================================
   FitFlow AI — Main Application Router & Controller
   Fixed: chart cleanup, nav listener stacking, routing guards
   ============================================================ */

const App = {

  currentPage: null,
  _navSetup: false,
  _routingSetup: false,
  _allCharts: {},          // global chart registry to prevent canvas reuse errors

  init() {
    const user = Auth.getCurrentUser();
    if (user) {
      this.showApp(user);
    } else {
      this.showLanding();
    }
    this.setupAuthEvents();
    this.setupGlobalEvents();
  },

  /* ─── Views ─── */
  showLanding() {
    document.getElementById('landing-view').classList.remove('hidden');
    document.getElementById('app-shell').classList.add('hidden');
    renderLanding();
  },

  showApp(user) {
    document.getElementById('landing-view').classList.add('hidden');
    document.getElementById('app-shell').classList.remove('hidden');
    this.updateSidebarUser();
    this.navigate('dashboard');
    // Guard: only wire nav events once
    if (!this._navSetup) {
      this.setupNavEvents();
      this._navSetup = true;
    }
    if (!this._routingSetup) {
      this.setupRouting();
      this._routingSetup = true;
    }
  },

  showAuth(mode = 'login') {
    const overlay = document.getElementById('auth-overlay');
    overlay.classList.remove('hidden');
    if (mode === 'signup') {
      document.getElementById('login-form').classList.add('hidden');
      document.getElementById('signup-form').classList.remove('hidden');
    } else {
      document.getElementById('login-form').classList.remove('hidden');
      document.getElementById('signup-form').classList.add('hidden');
    }
  },

  hideAuth() {
    document.getElementById('auth-overlay').classList.add('hidden');
  },

  /* ─── Chart Registry ─── */
  registerChart(key, instance) {
    // Destroy previous chart with same key before registering new one
    if (this._allCharts[key]) {
      try { this._allCharts[key].destroy(); } catch(e) {}
    }
    this._allCharts[key] = instance;
  },

  destroyChart(key) {
    if (this._allCharts[key]) {
      try { this._allCharts[key].destroy(); } catch(e) {}
      delete this._allCharts[key];
    }
  },

  destroyPageCharts(prefix) {
    Object.keys(this._allCharts).forEach(k => {
      if (k.startsWith(prefix)) this.destroyChart(k);
    });
  },

  safeChart(canvasId, key, config) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    // Destroy any existing chart on this canvas
    const existing = Chart.getChart(ctx);
    if (existing) existing.destroy();
    this.destroyChart(key);
    const instance = new Chart(ctx, config);
    this.registerChart(key, instance);
    return instance;
  },

  /* ─── Navigation ─── */
  navigate(page) {
    // Stop any running workout timer
    if (typeof WorkoutTimer !== 'undefined') WorkoutTimer.stop();

    // Destroy all charts from previous page
    this.destroyPageCharts(this.currentPage || '');

    this.currentPage = page;

    // Update active nav state
    document.querySelectorAll('.nav-item').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });

    // Scroll to top
    document.getElementById('main-content')?.scrollTo(0, 0);

    // Render page with loading state
    const content = document.getElementById('page-content');
    if (content) content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

    const renderers = {
      dashboard:   renderDashboard,
      scanner:     renderScanner,
      workouts:    renderWorkouts,
      diet:        renderDiet,
      calisthenics:renderCalisthenics,
      height:      renderHeight,
      progress:    renderProgress,
      profile:     renderProfile
    };

    const render = renderers[page];
    if (render) setTimeout(render, 60);
  },

  /* ─── Auth Events ─── */
  setupAuthEvents() {
    document.getElementById('auth-close-btn')?.addEventListener('click', () => this.hideAuth());
    document.getElementById('auth-overlay')?.addEventListener('click', e => {
      if (e.target.id === 'auth-overlay') this.hideAuth();
    });
    document.getElementById('switch-to-signup')?.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('login-form').classList.add('hidden');
      document.getElementById('signup-form').classList.remove('hidden');
    });
    document.getElementById('switch-to-login')?.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('signup-form').classList.add('hidden');
      document.getElementById('login-form').classList.remove('hidden');
    });
    document.getElementById('login-submit-btn')?.addEventListener('click', () => this.handleLogin());
    document.getElementById('login-password')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.handleLogin();
    });
    document.getElementById('signup-submit-btn')?.addEventListener('click', () => this.handleSignup());
    document.getElementById('signup-password')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.handleSignup();
    });
  },

  handleLogin() {
    const email    = document.getElementById('login-email')?.value?.trim();
    const password = document.getElementById('login-password')?.value;
    const btn      = document.getElementById('login-submit-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...'; }

    setTimeout(() => {
      const result = Auth.login(email, password);
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign In'; }
      if (result.success) {
        this.hideAuth();
        this._navSetup = false;
        this._routingSetup = false;
        this.showApp(result.user);
        this.showToast(`Welcome back, ${result.user.name.split(' ')[0]}!`, 'success');
      } else {
        this.showToast(result.error, 'error');
      }
    }, 400);
  },

  handleSignup() {
    const btn = document.getElementById('signup-submit-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...'; }

    setTimeout(() => {
      const result = Auth.register({
        name:     document.getElementById('signup-name')?.value,
        email:    document.getElementById('signup-email')?.value,
        password: document.getElementById('signup-password')?.value,
        age:      document.getElementById('signup-age')?.value,
        gender:   document.getElementById('signup-gender')?.value,
        weight:   document.getElementById('signup-weight')?.value,
        height:   document.getElementById('signup-height')?.value,
        goal:     document.getElementById('signup-goal')?.value
      });
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-rocket"></i> Create My Account'; }
      if (result.success) {
        this.hideAuth();
        this._navSetup = false;
        this._routingSetup = false;
        this.showApp(result.user);
        this.showToast(`Welcome to FitFlow AI, ${result.user.name.split(' ')[0]}! Let's get started!`, 'success');
      } else {
        this.showToast(result.error, 'error');
      }
    }, 500);
  },

  setupNavEvents() {
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) this.navigate(page);
      });
    });
    document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
  },

  setupRouting() {
    document.getElementById('main-content')?.addEventListener('click', e => {
      // Skip if inside a modal
      if (e.target.closest('.modal')) return;

      // Navigation data-page links (not sidebar nav-items)
      const navLink = e.target.closest('[data-page]');
      if (navLink && !navLink.classList.contains('nav-item')) {
        e.preventDefault();
        const page = navLink.dataset.page;
        if (page) this.navigate(page);
        return;
      }

      // Exercise card / today's exercise
      const exCard = e.target.closest('[data-action="open-exercise"]');
      if (exCard) {
        openExercise(exCard.dataset.id);
        return;
      }

      // Water tracker glasses
      const glass = e.target.closest('[data-action="toggle-water"]');
      if (glass) {
        WaterTracker.toggle(parseInt(glass.dataset.idx));
        return;
      }
    });
  },

  setupGlobalEvents() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeExercise();
        this.hideAuth();
      }
    });
  },

  logout() {
    if (typeof WorkoutTimer !== 'undefined') WorkoutTimer.stop();
    Auth.logout();
    this.currentPage = null;
    this._navSetup = false;
    this._routingSetup = false;
    this.showLanding();
    this.showToast("You've been signed out. See you next time!", 'info');
  },

  /* ─── Sidebar ─── */
  updateSidebarUser() {
    const user = Auth.getCurrentUser();
    if (!user) return;
    const avatar   = document.getElementById('sidebar-avatar');
    const username = document.getElementById('sidebar-username');
    const goal     = document.getElementById('sidebar-goal');
    if (avatar)   avatar.textContent = user.name.charAt(0).toUpperCase();
    if (username) username.textContent = user.name.split(' ')[0];
    if (goal)     goal.textContent = Auth.goalLabel(user.goal);
  },

  /* ─── Toast Notifications ─── */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(110%)';
      setTimeout(() => toast.remove(), 360);
    }, 3500);
  }
};

/* ============================================================
   Workout Timer — Global stopwatch/rest timer
   ============================================================ */
const WorkoutTimer = {
  _interval: null,
  _seconds: 0,
  _running: false,
  _mode: 'stopwatch', // 'stopwatch' | 'countdown'
  _countdown: 60,

  start(mode = 'stopwatch', seconds = 60) {
    this.stop();
    this._mode   = mode;
    this._running = true;
    if (mode === 'countdown') {
      this._seconds = seconds;
    } else {
      this._seconds = 0;
    }
    this._interval = setInterval(() => this._tick(), 1000);
  },

  _tick() {
    if (this._mode === 'countdown') {
      this._seconds--;
      if (this._seconds <= 0) {
        this._seconds = 0;
        this.stop();
        App.showToast('Rest time over! Start your next set!', 'success');
      }
    } else {
      this._seconds++;
    }
    this._updateDisplay();
  },

  stop() {
    if (this._interval) { clearInterval(this._interval); this._interval = null; }
    this._running = false;
  },

  reset() { this.stop(); this._seconds = 0; this._updateDisplay(); },

  _updateDisplay() {
    const el = document.getElementById('timer-display');
    if (el) el.textContent = this._format(this._seconds);
  },

  _format(s) {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  },

  isRunning() { return this._running; }
};

/* ============================================================
   Water Tracker — Daily 8-glass tracker
   ============================================================ */
const WaterTracker = {
  _key: () => `fitflow_water_${new Date().toISOString().split('T')[0]}`,

  getCount() {
    return parseInt(localStorage.getItem(this._key()) || '0');
  },

  toggle(idx) {
    const current = this.getCount();
    const newCount = idx < current ? idx : idx + 1;
    localStorage.setItem(this._key(), newCount);
    this._updateDisplay();
  },

  _updateDisplay() {
    const count    = this.getCount();
    const el       = document.getElementById('water-tracker-widget');
    const countEl  = document.getElementById('water-count-label');
    if (countEl) countEl.textContent = `${count}/8 glasses`;
    if (el) {
      el.querySelectorAll('[data-action="toggle-water"]').forEach((g, i) => {
        g.style.background = i < count ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.05)';
        g.style.borderColor = i < count ? 'var(--accent-blue)' : 'rgba(255,255,255,0.12)';
      });
    }
    if (count === 8) App.showToast('Great job! You hit your 8-glass water goal today!', 'success');
  },

  renderWidget() {
    const count = this.getCount();
    return `
      <div id="water-tracker-widget" class="card" style="padding:18px 20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div style="font-size:14px;font-weight:700;display:flex;align-items:center;gap:7px;">
            <span style="font-size:18px;">💧</span> Daily Water
          </div>
          <span id="water-count-label" style="font-size:12px;color:var(--accent-blue);font-weight:700;">${count}/8 glasses</span>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${Array.from({length:8}, (_,i) => `
            <div data-action="toggle-water" data-idx="${i}"
              style="width:28px;height:36px;border-radius:6px;border:1px solid ${i<count?'var(--accent-blue)':'rgba(255,255,255,0.12)'};
              background:${i<count?'rgba(0,212,255,0.5)':'rgba(255,255,255,0.05)'};cursor:pointer;
              transition:all 0.2s;display:flex;align-items:center;justify-content:center;font-size:14px;">
              ${i < count ? '💧' : ''}
            </div>
          `).join('')}
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:8px;">Click glasses to track intake</div>
      </div>
    `;
  }
};

/* ─── Bootstrap ─── */
document.addEventListener('DOMContentLoaded', () => App.init());

/* ── MOBILE BOTTOM NAV ROUTING ── */
(function() {
  function hookBottomNav() {
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const page = item.dataset.page;
        if (page && typeof App !== 'undefined') App.navigate(page);
      });
    });
  }
  document.addEventListener('DOMContentLoaded', hookBottomNav);
})();

/* ── App.toast alias ── */
App.toast = function(msg, type) { this.showToast(msg, type); };

/* ── Extend navigate with new pages ── */
(function() {
  const _origNav = App.navigate.bind(App);
  App.navigate = function(page) {
    // Handle new feature pages
    const newPages = {
      'achievements':     typeof renderAchievements    !== 'undefined' ? renderAchievements    : null,
      'calorie-diary':    typeof renderCalorieDiary    !== 'undefined' ? renderCalorieDiary    : null,
      'measurements':     typeof renderMeasurements    !== 'undefined' ? renderMeasurements    : null,
      'workout-history':  typeof renderWorkoutHistory  !== 'undefined' ? renderWorkoutHistory  : null
    };

    if (newPages[page] !== undefined) {
      if (typeof WorkoutTimer !== 'undefined') WorkoutTimer.stop();
      this.destroyPageCharts(this.currentPage || '');
      this.currentPage = page;

      // Update active state on sidebar + bottom nav
      document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(a => {
        a.classList.toggle('active', a.dataset.page === page);
      });
      document.getElementById('main-content')?.scrollTo(0, 0);
      const content = document.getElementById('page-content');
      if (content) content.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
      if (newPages[page]) setTimeout(newPages[page], 60);
    } else {
      _origNav(page);
      // Also sync bottom nav
      setTimeout(() => {
        document.querySelectorAll('.bottom-nav-item').forEach(a => {
          a.classList.toggle('active', a.dataset.page === page);
        });
      }, 80);
    }
  };
})();
