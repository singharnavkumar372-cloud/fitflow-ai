/* ============================================================
   FitFlow AI — Authentication Module
   Handles user registration, login, session & metrics
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
      id:               Date.now().toString(),
      name:             name.trim(),
      email:            email.trim().toLowerCase(),
      password,
      age:              +age,
      gender,
      weight:           +weight,
      height:           +height,
      goal:             goal || 'general',
      createdAt:        new Date().toISOString(),
      /* Stats */
      bmi,  bmr,  tdee,  bodyFat,
      weightHistory: [{ date: todayStr(), weight: +weight }],
      workoutsCompleted: 0,
      streakDays:        0,
      totalCalBurned:    0,
      lastWorkout:       null,
      scanResults:       null,
      notes:             '',
      /* Progress logs */
      progressLog: []
    };

    users.push(user);
    this.saveUsers(users);
    this.saveCurrentUser(user);
    return { success: true, user };
  },

  login(email, password) {
    if (!email || !password) return { success: false, error: 'Please enter email and password.' };
    const users = this.getUsers();
    const user  = users.find(u => u.email === email.trim().toLowerCase() && u.password === password);
    if (!user) return { success: false, error: 'Invalid email or password.' };
    this.saveCurrentUser(user);
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
    const history = [...(user.weightHistory || [])];
    const today   = todayStr();
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
    this.updateUser({ progressLog: log.slice(0, 50) }); // keep last 50
  },

  recordWorkout(exercise) {
    const user = this.getCurrentUser();
    if (!user) return;
    const cal = exercise ? (exercise.calories || 10) : 10;
    this.updateUser({
      workoutsCompleted: (user.workoutsCompleted || 0) + 1,
      totalCalBurned:    (user.totalCalBurned    || 0) + cal,
      lastWorkout:       new Date().toISOString()
    });
  },

  saveScanResults(results) {
    this.updateUser({ scanResults: results });
  },

  /* ---------- Calculations ---------- */
  calcBMI(weight, height) {
    const h = height / 100;
    return parseFloat((weight / (h * h)).toFixed(1));
  },

  bmiCategory(bmi) {
    if (bmi < 18.5) return { label: 'Underweight', color: 'blue'   };
    if (bmi < 25.0) return { label: 'Normal',      color: 'green'  };
    if (bmi < 30.0) return { label: 'Overweight',  color: 'amber'  };
    return                  { label: 'Obese',       color: 'red'    };
  },

  calcBMR(weight, height, age, gender) {
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
      return Math.round(10*weight + 6.25*height - 5*age + 5);
    }
    return Math.round(10*weight + 6.25*height - 5*age - 161);
  },

  calcTDEE(bmr, activity = 'moderate') {
    const m = { sedentary:1.2, light:1.375, moderate:1.55, active:1.725, veryActive:1.9 };
    return Math.round(bmr * (m[activity] || 1.55));
  },

  estimateBodyFat(bmi, age, gender) {
    // Deurenberg formula
    const bf = (1.2 * bmi) + (0.23 * age) - (10.8 * (gender === 'male' ? 1 : 0)) - 5.4;
    return parseFloat(Math.max(4, Math.min(50, bf)).toFixed(1));
  },

  bodyFatCategory(bf, gender) {
    if (gender === 'male') {
      if (bf < 6)  return { label: 'Essential', color: 'blue'   };
      if (bf < 14) return { label: 'Athletic',  color: 'green'  };
      if (bf < 18) return { label: 'Fitness',   color: 'green'  };
      if (bf < 25) return { label: 'Average',   color: 'amber'  };
      return               { label: 'Obese',    color: 'red'    };
    } else {
      if (bf < 14) return { label: 'Essential', color: 'blue'   };
      if (bf < 21) return { label: 'Athletic',  color: 'green'  };
      if (bf < 25) return { label: 'Fitness',   color: 'green'  };
      if (bf < 32) return { label: 'Average',   color: 'amber'  };
      return               { label: 'Obese',    color: 'red'    };
    }
  },

  /* Recommended daily calories for goal */
  targetCalories(user) {
    const tdee = user.tdee || this.calcTDEE(user.bmr || 2000);
    const adj  = { 'fat-loss': -500, 'muscle-gain': +300, 'general': 0, 'calisthenics': +100, 'height': 0 };
    return tdee + (adj[user.goal] || 0);
  },

  /* Display name for goal */
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

/* ---------- Tiny Utility ---------- */
function todayStr() {
  return new Date().toISOString().split('T')[0];
}
