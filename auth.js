/* ============================================================
   FitFlow AI — Authentication Module v2
   Handles user registration, login, session, metrics & achievements
   ============================================================ */

const Auth = {

  /* ---------- Storage Helpers ---------- */
  getUsers() {
    try { return JSON.parse(localStorage.getItem('fitflow_users') || '[]'); }
    catch(e) { return []; }
  },
  saveUsers(users) {
    localStorage.setItem('fitflow_users', JSON.stringify(users));
  },
  getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('fitflow_current_user') || 'null'); }
    catch(e) { return null; }
  },
  saveCurrentUser(user) {
    localStorage.setItem('fitflow_current_user', JSON.stringify(user));
  },

  /* ---------- Auth Actions ---------- */
  register({ name, email, password, age, gender, weight, height, goal }) {
    if (!name || !email || !password || !age || !weight || !height) {
      return { success: false, error: 'Please fill in all fields.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }
    const users = this.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered. Please sign in.' };
    }

    const bmi     = this.calcBMI(+weight, +height);
    const bmr     = this.calcBMR(+weight, +height, +age, gender);
    const tdee    = this.calcTDEE(bmr);
    const bodyFat = this.estimateBodyFat(bmi, +age, gender);

    const user = {
      id:                Date.now().toString(),
      name:              name.trim(),
      email:             email.trim().toLowerCase(),
      password,
      age:               +age,
      gender,
      weight:            +weight,
      height:            +height,
      goal:              goal || 'general',
      createdAt:         new Date().toISOString(),
      bmi, bmr, tdee, bodyFat,
      weightHistory:     [{ date: todayStr(), weight: +weight }],
      workoutsCompleted: 0,
      streakDays:        0,
      totalCalBurned:    0,
      lastWorkout:       null,
      scanResults:       null,
      notes:             '',
      progressLog:       [],
      /* NEW: Achievements */
      achievements:      [],
      /* NEW: Calorie diary */
      calorieDiary:      [],
      /* NEW: Body measurements */
      measurements:      [],
      /* NEW: Workout history */
      workoutHistory:    [],
      /* NEW: Steps */
      steps:             [],
      /* NEW: Water log */
      waterLog:          {}
    };

    users.push(user);
    this.saveUsers(users);
    this.saveCurrentUser(user);
    if (typeof VisitorTracker !== 'undefined') VisitorTracker.recordLogin(user);
    // Unlock "Welcome" achievement
    this.unlockAchievement('welcome');
    return { success: true, user };
  },

  login(email, password) {
    if (!email || !password) return { success: false, error: 'Please enter email and password.' };
    const users = this.getUsers();
    const user  = users.find(u => u.email === email.trim().toLowerCase() && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password.' };
    this.saveCurrentUser(user);
    if (typeof VisitorTracker !== 'undefined') VisitorTracker.recordLogin(user);
    return { success: true, user };
  },

  logout() {
    localStorage.removeItem('fitflow_current_user');
  },

  /* ---------- User Updates ---------- */
  updateUser(updates) {
    const current = this.getCurrentUser();
    if (!current) return false;
    const users = this.getUsers();
    const idx   = users.findIndex(u => u.id === current.id);
    if (idx === -1) return false;
    const updated = { ...users[idx], ...updates };
    users[idx]    = updated;
    this.saveUsers(users);
    this.saveCurrentUser(updated);
    return true;
  },

  logWeight(weight) {
    const user = this.getCurrentUser();
    if (!user) return;
    const history  = [...(user.weightHistory || [])];
    const today    = todayStr();
    const existIdx = history.findIndex(h => h.date === today);
    if (existIdx >= 0) { history[existIdx].weight = +weight; }
    else               { history.push({ date: today, weight: +weight }); }
    history.sort((a,b) => a.date.localeCompare(b.date));
    const bmi = this.calcBMI(+weight, user.height);
    this.updateUser({ weight: +weight, weightHistory: history, bmi });
  },

  logProgress(entry) {
    const user = this.getCurrentUser();
    if (!user) return;
    const log = [...(user.progressLog || [])];
    log.unshift({ ...entry, date: todayStr(), id: Date.now() });
    this.updateUser({ progressLog: log.slice(0, 50) });
  },

  recordWorkout(exercise) {
    const user = this.getCurrentUser();
    if (!user) return;
    const cal  = exercise ? ((exercise.calories || 10) * (exercise.sets || 1)) : 10;
    const newCount = (user.workoutsCompleted || 0) + 1;

    // Add to history
    const workoutHistory = [...(user.workoutHistory || [])];
    workoutHistory.unshift({
      id: Date.now(),
      exercise: exercise?.name || 'Workout',
      category: exercise?.category || 'General',
      sets: exercise?.sets || 1,
      reps: exercise?.reps || 0,
      cal,
      date: todayStr(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });

    this.updateUser({
      workoutsCompleted: newCount,
      totalCalBurned:    (user.totalCalBurned || 0) + cal,
      lastWorkout:       new Date().toISOString(),
      workoutHistory:    workoutHistory.slice(0, 100)
    });

    // Check achievements
    if (newCount === 1)   this.unlockAchievement('first_workout');
    if (newCount === 5)   this.unlockAchievement('five_workouts');
    if (newCount === 10)  this.unlockAchievement('ten_workouts');
    if (newCount === 25)  this.unlockAchievement('twentyfive_workouts');
    if (newCount === 50)  this.unlockAchievement('fifty_workouts');
    if ((user.totalCalBurned||0)+cal >= 1000) this.unlockAchievement('cal_1000');
    if ((user.totalCalBurned||0)+cal >= 5000) this.unlockAchievement('cal_5000');
  },

  /* ---------- NEW: Calorie Diary ---------- */
  logCalories(entry) {
    // entry: { name, calories, protein, carbs, fat, mealType }
    const user = this.getCurrentUser();
    if (!user) return;
    const diary = [...(user.calorieDiary || [])];
    diary.unshift({
      ...entry,
      id:   Date.now(),
      date: todayStr(),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });
    this.updateUser({ calorieDiary: diary.slice(0, 200) });
  },

  getTodayCalories() {
    const user = this.getCurrentUser();
    if (!user) return { total: 0, entries: [] };
    const today   = todayStr();
    const entries = (user.calorieDiary || []).filter(e => e.date === today);
    const total   = entries.reduce((s, e) => s + (e.calories || 0), 0);
    return { total, entries };
  },

  /* ---------- NEW: Body Measurements ---------- */
  logMeasurements(data) {
    // data: { chest, waist, hips, arms, thighs, neck }
    const user = this.getCurrentUser();
    if (!user) return;
    const measurements = [...(user.measurements || [])];
    const today = todayStr();
    const existIdx = measurements.findIndex(m => m.date === today);
    if (existIdx >= 0) measurements[existIdx] = { ...data, date: today };
    else measurements.unshift({ ...data, date: today, id: Date.now() });
    this.updateUser({ measurements: measurements.slice(0, 100) });
    this.unlockAchievement('first_measurement');
  },

  /* ---------- NEW: Achievements ---------- */
  unlockAchievement(id) {
    const user = this.getCurrentUser();
    if (!user) return false;
    const all = [...(user.achievements || [])];
    if (all.find(a => a.id === id)) return false; // already unlocked
    const def = ACHIEVEMENTS[id];
    if (!def) return false;
    all.push({ id, unlockedAt: new Date().toISOString() });
    this.updateUser({ achievements: all });
    // Show toast if App is available
    if (typeof App !== 'undefined') {
      App.toast(`🏆 Achievement Unlocked: ${def.title}`, 'success');
    }
    return true;
  },

  getAchievements() {
    const user = this.getCurrentUser();
    if (!user) return [];
    const unlocked = user.achievements || [];
    return Object.entries(ACHIEVEMENTS).map(([id, def]) => ({
      id, ...def,
      unlocked: !!unlocked.find(a => a.id === id),
      unlockedAt: unlocked.find(a => a.id === id)?.unlockedAt || null
    }));
  },

  saveScanResults(results) {
    this.updateUser({ scanResults: results });
    this.unlockAchievement('first_scan');
  },

  /* ---------- Calculations ---------- */
  calcBMI(weight, height) {
    const h = height / 100;
    return parseFloat((weight / (h * h)).toFixed(1));
  },

  bmiCategory(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', color: 'blue'  };
    if (bmi < 25.0) return { label: 'Normal',      color: 'green' };
    if (bmi < 30.0) return { label: 'Overweight',  color: 'amber' };
    return                  { label: 'Obese',       color: 'red'   };
  },

  calcBMR(weight, height, age, gender) {
    if (gender === 'male') return Math.round(10*weight + 6.25*height - 5*age + 5);
    return Math.round(10*weight + 6.25*height - 5*age - 161);
  },

  calcTDEE(bmr, activity = 'moderate') {
    const m = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725, veryActive:1.9 };
    return Math.round(bmr * (m[activity] || 1.55));
  },

  estimateBodyFat(bmi, age, gender) {
    const bf = (1.2*bmi) + (0.23*age) - (10.8*(gender==='male'?1:0)) - 5.4;
    return parseFloat(Math.max(4, Math.min(50, bf)).toFixed(1));
  },

  bodyFatCategory(bf, gender) {
    if (gender === 'male') {
      if (bf < 6)  return { label: 'Essential', color: 'blue'  };
      if (bf < 14) return { label: 'Athletic',  color: 'green' };
      if (bf < 18) return { label: 'Fitness',   color: 'green' };
      if (bf < 25) return { label: 'Average',   color: 'amber' };
      return               { label: 'Obese',    color: 'red'   };
    } else {
      if (bf < 14) return { label: 'Essential', color: 'blue'  };
      if (bf < 21) return { label: 'Athletic',  color: 'green' };
      if (bf < 25) return { label: 'Fitness',   color: 'green' };
      if (bf < 32) return { label: 'Average',   color: 'amber' };
      return               { label: 'Obese',    color: 'red'   };
    }
  },

  targetCalories(user) {
    const tdee = user.tdee || this.calcTDEE(user.bmr || 2000);
    const adj  = { 'fat-loss': -500, 'muscle-gain': +300, 'general': 0, 'calisthenics': +100, 'height': 0 };
    return tdee + (adj[user.goal] || 0);
  },

  goalLabel(goal) {
    const m = {
      'fat-loss':    '🔥 Fat Loss',
      'muscle-gain': '💪 Muscle Gain',
      'calisthenics':'🏆 Calisthenics',
      'height':      '📏 Height Increase',
      'general':     '⚖️ General Fitness'
    };
    return m[goal] || '⚖️ General Fitness';
  }
};

/* ---- Achievement Definitions ---- */
const ACHIEVEMENTS = {
  welcome:             { title: 'Welcome to FitFlow!',   emoji: '🎉', desc: 'Created your account',       color: 'blue'   },
  first_workout:       { title: 'First Sweat!',           emoji: '💪', desc: 'Completed your first workout', color: 'green'  },
  five_workouts:       { title: 'Getting Serious',        emoji: '🔥', desc: '5 workouts done',             color: 'amber'  },
  ten_workouts:        { title: 'Dedicated Athlete',      emoji: '⚡', desc: '10 workouts completed',       color: 'blue'   },
  twentyfive_workouts: { title: 'Fitness Machine',        emoji: '🏋️', desc: '25 workouts done!',           color: 'purple' },
  fifty_workouts:      { title: 'Legend Status',          emoji: '🏆', desc: '50 workouts — incredible!',   color: 'amber'  },
  cal_1000:            { title: 'Calorie Crusher',        emoji: '🔥', desc: 'Burned 1,000+ calories',      color: 'red'    },
  cal_5000:            { title: 'Inferno Mode',           emoji: '🌋', desc: 'Burned 5,000+ calories',      color: 'red'    },
  first_scan:          { title: 'Body Analyst',           emoji: '🔬', desc: 'Completed your first body scan', color: 'purple' },
  first_measurement:   { title: 'Precision Tracker',     emoji: '📏', desc: 'Logged body measurements',    color: 'green'  },
  streak_3:            { title: 'On a Roll!',             emoji: '🔄', desc: '3-day workout streak',        color: 'green'  },
  streak_7:            { title: 'Week Warrior',           emoji: '🗓️', desc: '7-day workout streak',        color: 'amber'  }
};

/* ---------- Tiny Utility ---------- */
function todayStr() {
  return new Date().toISOString().split('T')[0];
}
