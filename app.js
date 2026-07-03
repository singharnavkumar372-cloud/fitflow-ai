/* ============================================================
   FitFlow AI — Main Application Router & Controller
   ============================================================ */

const App = {

  currentPage: null,

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
    this.setupNavEvents();
    this.setupRouting();
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

  /* ─── Navigation ─── */
  navigate(page) {
    // Destroy old charts if switching away from progress
    if (this.currentPage === 'progress' && typeof progressChartInstances !== 'undefined') {
      Object.values(progressChartInstances).forEach(c => { try { c.destroy(); } catch(e){} });
    }

    this.currentPage = page;

    // Update active nav state
    document.querySelectorAll('.nav-item').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });

    // Scroll to top
    document.getElementById('main-content')?.scrollTo(0, 0);

    // Render page
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
    if (render) {
      document.getElementById('page-content').innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
      setTimeout(render, 60); // tiny delay for loading animation feel
    }
  },

  /* ─── Event Setup ─── */
  setupAuthEvents() {
    // Close button
    document.getElementById('auth-close-btn')?.addEventListener('click', () => this.hideAuth());

    // Overlay click to close
    document.getElementById('auth-overlay')?.addEventListener('click', e => {
      if (e.target.id === 'auth-overlay') this.hideAuth();
    });

    // Switch forms
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

    // Login submit
    document.getElementById('login-submit-btn')?.addEventListener('click', () => this.handleLogin());
    document.getElementById('login-password')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') this.handleLogin();
    });

    // Signup submit
    document.getElementById('signup-submit-btn')?.addEventListener('click', () => this.handleSignup());
  },

  handleLogin() {
    const email    = document.getElementById('login-email')?.value;
    const password = document.getElementById('login-password')?.value;
    const result   = Auth.login(email, password);
    if (result.success) {
      this.hideAuth();
      this.showApp(result.user);
      this.showToast(`Welcome back, ${result.user.name.split(' ')[0]}! 🔥`, 'success');
    } else {
      this.showToast(result.error, 'error');
    }
  },

  handleSignup() {
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

    if (result.success) {
      this.hideAuth();
      this.showApp(result.user);
      this.showToast(`Welcome to FitFlow AI, ${result.user.name.split(' ')[0]}! Let's get started! 🚀`, 'success');
    } else {
      this.showToast(result.error, 'error');
    }
  },

  setupNavEvents() {
    // Sidebar nav links
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) this.navigate(page);
      });
    });

    // Logout button
    document.getElementById('logout-btn')?.addEventListener('click', () => this.logout());
  },

  setupRouting() {
    // Internal link routing — delegated on the main content area
    document.getElementById('main-content')?.addEventListener('click', e => {
      // Navigation links
      const navLink = e.target.closest('[data-page]');
      if (navLink && !navLink.classList.contains('nav-item')) {
        e.preventDefault();
        const page = navLink.dataset.page;
        if (page) this.navigate(page);
        return;
      }

      // Exercise cards and today's exercise items
      const exCard = e.target.closest('[data-action="open-exercise"]');
      if (exCard) {
        openExercise(exCard.dataset.id);
        return;
      }
    });
  },

  setupGlobalEvents() {
    // Keyboard escape to close modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeExercise();
        this.hideAuth();
      }
    });
  },

  logout() {
    Auth.logout();
    this.currentPage = null;
    this.showLanding();
    this.showToast('You\'ve been signed out. See you next time! 👋', 'info');
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

    const icon = { success:'✅', error:'❌', info:'ℹ️' }[type] || 'ℹ️';
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(110%)';
      setTimeout(() => toast.remove(), 360);
    }, 3500);
  }
};

/* ─── Bootstrap ─── */
document.addEventListener('DOMContentLoaded', () => App.init());
