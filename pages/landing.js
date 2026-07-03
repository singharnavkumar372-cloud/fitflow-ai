/* ============================================================
   FitFlow AI — Landing Page
   ============================================================ */

function renderLanding() {
  document.getElementById('landing-content').innerHTML = `
    <div class="landing-page">

      <!-- Navigation -->
      <nav class="landing-nav">
        <div class="landing-logo">
          <div class="logo-icon"><i class="fas fa-bolt"></i></div>
          <span>FitFlow <span class="ai-badge">AI</span></span>
        </div>
        <div class="landing-nav-actions">
          <button class="btn btn-secondary" id="ln-login-btn">Sign In</button>
          <button class="btn btn-primary" id="ln-signup-btn">
            <i class="fas fa-rocket"></i> Get Started Free
          </button>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-chip">
          <i class="fas fa-brain"></i> AI-Powered Personal Coach
        </div>
        <h1 class="hero-title">
          Build the Body<br>You've Always<br><span class="hl">Dreamed Of</span>
        </h1>
        <p class="hero-desc">
          The ultimate fitness app for teens and young adults. AI body scanning, step-by-step workouts with videos, personalized diet plans, calisthenics training, and progress tracking — all from home or gym.
        </p>
        <div class="hero-btns">
          <button class="btn btn-primary btn-lg" id="hero-start-btn">
            <i class="fas fa-bolt"></i> Start Free Today
          </button>
          <button class="btn btn-secondary btn-lg" id="hero-learn-btn">
            <i class="fas fa-play"></i> How It Works
          </button>
          <a class="btn btn-secondary btn-lg" href="https://github.com/singharnavkumar372-cloud/fitflow-ai/archive/refs/heads/main.zip" download>
            <i class="fas fa-download"></i> Download App
          </a>
        </div>

        <!-- Hero Stats -->
        <div class="hero-stats">
          <div>
            <div class="h-stat-val">35+</div>
            <div class="h-stat-label">Exercises with Videos</div>
          </div>
          <div>
            <div class="h-stat-val" style="color:var(--accent-green)">🤖</div>
            <div class="h-stat-label">AI Body Scanner</div>
          </div>
          <div>
            <div class="h-stat-val" style="color:var(--accent-amber)">5</div>
            <div class="h-stat-label">Goal Plans</div>
          </div>
          <div>
            <div class="h-stat-val" style="color:var(--accent-purple)">100%</div>
            <div class="h-stat-label">Free Forever</div>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="features-wrap">
        <h2 class="features-title">Everything You Need to Transform</h2>
        <p class="features-subtitle">A complete AI-powered fitness ecosystem in one app</p>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(0,212,255,0.14);color:var(--accent-blue)"><i class="fas fa-brain"></i></div>
            <h3 class="feature-name">AI Body Scanner</h3>
            <p class="feature-desc">Enter your stats and get an AI-powered analysis of your body fat, BMI, muscle composition, and a personalized workout & diet plan built just for you.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(0,255,136,0.14);color:var(--accent-green)"><i class="fas fa-dumbbell"></i></div>
            <h3 class="feature-name">Guided Workouts with Video</h3>
            <p class="feature-desc">35+ exercises with step-by-step instructions, pro tips, and in-app video guides for every muscle group — from chest and back to abs and legs.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(255,170,0,0.14);color:var(--accent-amber)"><i class="fas fa-utensils"></i></div>
            <h3 class="feature-name">Smart Diet Planner</h3>
            <p class="feature-desc">Personalized weekly meal plans with exact calories, protein, carbs and fats — automatically matched to your fitness goal and body stats.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(168,85,247,0.14);color:var(--accent-purple)"><i class="fas fa-person-walking"></i></div>
            <h3 class="feature-name">Calisthenics Program</h3>
            <p class="feature-desc">Structured 8-week program from complete beginner to advanced — pull-ups, muscle-ups, handstands, L-sits, and more. All at home.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(0,212,255,0.14);color:var(--accent-blue)"><i class="fas fa-arrows-up-down"></i></div>
            <h3 class="feature-name">Height Increase Program</h3>
            <p class="feature-desc">12-week daily program with spine decompression, stretching, and posture correction — designed to maximize your natural height potential.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(0,255,136,0.14);color:var(--accent-green)"><i class="fas fa-chart-line"></i></div>
            <h3 class="feature-name">Progress Tracking & Reports</h3>
            <p class="feature-desc">Log your weight, track workouts, and receive AI-generated weekly progress reports with charts and body metrics analysis.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(255,170,0,0.14);color:var(--accent-amber)"><i class="fas fa-home"></i></div>
            <h3 class="feature-name">Home & Gym Workouts</h3>
            <p class="feature-desc">Filter exercises by home (no equipment needed) or gym. Every exercise has a home alternative — no excuses, no gym membership required.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(168,85,247,0.14);color:var(--accent-purple)"><i class="fas fa-shield-alt"></i></div>
            <h3 class="feature-name">Secure User Accounts</h3>
            <p class="feature-desc">Your data is saved securely. Sign up once, log in from anywhere, and your complete fitness journey is always saved and accessible.</p>
          </div>
          <div class="feature-card">
            <div class="feat-icon" style="background:rgba(0,212,255,0.14);color:var(--accent-blue)"><i class="fas fa-fire"></i></div>
            <h3 class="feature-name">Beginner to Advanced</h3>
            <p class="feature-desc">Whether you\'ve never exercised or you\'re already training — FitFlow AI adapts to your level and progressively builds you up.</p>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section style="padding: 60px 64px; border-top: 1px solid var(--border);">
        <h2 class="features-title">How It Works</h2>
        <p class="features-subtitle" style="margin-bottom: 40px;">Get started in under 2 minutes</p>
        <div class="grid-3" style="gap: 24px;">
          <div style="text-align:center; padding: 30px 20px;">
            <div style="width:64px;height:64px;background:linear-gradient(135deg,var(--accent-blue),var(--accent-purple));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#fff;margin:0 auto 18px;box-shadow:var(--glow-blue)">1</div>
            <h3 style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;margin-bottom:8px;">Create Your Profile</h3>
            <p style="font-size:14px;color:var(--text-muted);line-height:1.6;">Sign up with your name, age, weight, height, and fitness goal. Takes 60 seconds.</p>
          </div>
          <div style="text-align:center; padding: 30px 20px;">
            <div style="width:64px;height:64px;background:linear-gradient(135deg,var(--accent-green),var(--accent-green2));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#000;margin:0 auto 18px;box-shadow:var(--glow-green)">2</div>
            <h3 style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;margin-bottom:8px;">Scan Your Body</h3>
            <p style="font-size:14px;color:var(--text-muted);line-height:1.6;">Use the AI Body Scanner to analyze your metrics and get personalized recommendations instantly.</p>
          </div>
          <div style="text-align:center; padding: 30px 20px;">
            <div style="width:64px;height:64px;background:linear-gradient(135deg,var(--accent-amber),#e67e00);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:#000;margin:0 auto 18px;box-shadow:var(--glow-amber)">3</div>
            <h3 style="font-family:'Outfit',sans-serif;font-size:18px;font-weight:700;margin-bottom:8px;">Train & Transform</h3>
            <p style="font-size:14px;color:var(--text-muted);line-height:1.6;">Follow your custom workout and diet plan, track progress weekly, and watch your body transform.</p>
          </div>
        </div>
      </section>

      <!-- Download Banner -->
      <section style="padding:48px 64px;border-top:1px solid var(--border);background:rgba(0,212,255,0.03);">
        <div style="max-width:860px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap;">
          <div>
            <h2 style="font-family:'Outfit',sans-serif;font-size:26px;font-weight:900;margin-bottom:8px;">Download FitFlow AI</h2>
            <p style="font-size:15px;color:var(--text-muted);line-height:1.6;max-width:480px;">
              Download the full source code and run FitFlow AI directly on your computer — no internet required. Just open <strong style="color:var(--text-primary)">index.html</strong> in any browser and you're ready to go.
            </p>
            <div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;">
              <span style="background:rgba(0,255,136,0.1);border:1px solid rgba(0,255,136,0.2);border-radius:var(--r-full);padding:4px 12px;font-size:12px;color:var(--accent-green);font-weight:600;">No Installation</span>
              <span style="background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.2);border-radius:var(--r-full);padding:4px 12px;font-size:12px;color:var(--accent-blue);font-weight:600;">Works Offline</span>
              <span style="background:rgba(255,170,0,0.1);border:1px solid rgba(255,170,0,0.2);border-radius:var(--r-full);padding:4px 12px;font-size:12px;color:var(--accent-amber);font-weight:600;">100% Free</span>
              <span style="background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.2);border-radius:var(--r-full);padding:4px 12px;font-size:12px;color:var(--accent-purple);font-weight:600;">Open Source</span>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px;align-items:center;">
            <a class="btn btn-primary btn-lg" href="https://github.com/singharnavkumar372-cloud/fitflow-ai/archive/refs/heads/main.zip" style="min-width:220px;justify-content:center;">
              <i class="fas fa-download"></i> Download ZIP
            </a>
            <a href="https://github.com/singharnavkumar372-cloud/fitflow-ai" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="min-width:220px;justify-content:center;">
              <i class="fab fa-github"></i> View on GitHub
            </a>
            <span style="font-size:11px;color:var(--text-muted);">v1.0 &nbsp;·&nbsp; MIT License &nbsp;·&nbsp; Free Forever</span>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="landing-cta-section" id="how-it-works">
        <div style="max-width:600px;margin:0 auto;">
          <h2 class="features-title">Ready to Start Your Journey?</h2>
          <p style="font-size:16px;color:var(--text-muted);margin-bottom:32px;line-height:1.7;">
            Join FitFlow AI today — it's completely free. Your personalized fitness coach is waiting.
          </p>
          <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
            <button class="btn btn-primary btn-lg" id="cta-final-btn">
              <i class="fas fa-bolt"></i> Create Free Account Now
            </button>
            <a class="btn btn-secondary btn-lg" href="https://github.com/singharnavkumar372-cloud/fitflow-ai/archive/refs/heads/main.zip">
              <i class="fas fa-download"></i> Download App
            </a>
          </div>
        </div>
      </section>

    </div>
  `;

  // Event listeners for landing page buttons
  setTimeout(() => {
    const addBtn = (id, action) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', action);
    };
    addBtn('ln-login-btn',  () => App.showAuth('login'));
    addBtn('ln-signup-btn', () => App.showAuth('signup'));
    addBtn('hero-start-btn',() => App.showAuth('signup'));
    addBtn('hero-learn-btn',() => document.getElementById('how-it-works')?.scrollIntoView({ behavior:'smooth' }));
    addBtn('cta-final-btn', () => App.showAuth('signup'));
  }, 50);
}
