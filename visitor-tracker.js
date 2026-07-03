/* ============================================================
   FitFlow AI — Visitor Tracker
   Captures IP, location, browser, device info on every visit
   Uses ipapi.co (free, 30k requests/month, no API key)
   ============================================================ */

const VisitorTracker = {

  _key:     'fitflow_visits',
  _maxLogs: 500,

  async init() {
    try {
      const visit = await this._buildVisit();
      this._store(visit);
    } catch(e) {
      // Silently fail — never break the main app
    }
  },

  async _buildVisit() {
    let geo = {};
    try {
      const res  = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(4000) });
      geo = await res.json();
    } catch(e) {
      geo = { ip:'unknown', city:'Unknown', region:'', country_name:'Unknown', country_code:'?', latitude:0, longitude:0 };
    }

    const ua   = navigator.userAgent;
    const now  = new Date();

    return {
      id:          `${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
      timestamp:   now.toISOString(),
      date:        now.toISOString().split('T')[0],
      time:        now.toLocaleTimeString(),
      ip:          geo.ip          || 'unknown',
      city:        geo.city        || 'Unknown',
      region:      geo.region      || '',
      country:     geo.country_name|| 'Unknown',
      countryCode: geo.country_code|| '?',
      lat:         parseFloat(geo.latitude  || 0),
      lon:         parseFloat(geo.longitude || 0),
      timezone:    geo.timezone    || '',
      org:         geo.org         || '',
      browser:     this._detectBrowser(ua),
      os:          this._detectOS(ua),
      device:      this._detectDevice(ua),
      screen:      `${screen.width}x${screen.height}`,
      language:    navigator.language || 'unknown',
      referrer:    document.referrer  || 'direct',
      page:        window.location.href,
      loggedIn:    false,
      userName:    '',
      userEmail:   '',
      userGoal:    ''
    };
  },

  recordLogin(user) {
    if (!user) return;
    try {
      const visits = this.getAll();
      // Update the most recent visit with user info
      if (visits.length > 0) {
        const last = visits[visits.length - 1];
        last.loggedIn  = true;
        last.userName  = user.name  || '';
        last.userEmail = user.email || '';
        last.userGoal  = user.goal  || '';
        localStorage.setItem(this._key, JSON.stringify(visits));
      }
    } catch(e) {}
  },

  _store(visit) {
    const visits = this.getAll();
    visits.push(visit);
    // Keep only latest _maxLogs entries
    const trimmed = visits.slice(-this._maxLogs);
    localStorage.setItem(this._key, JSON.stringify(trimmed));
  },

  getAll() {
    try { return JSON.parse(localStorage.getItem(this._key) || '[]'); }
    catch(e) { return []; }
  },

  _detectBrowser(ua) {
    if (/Edg\//.test(ua))     return 'Edge';
    if (/OPR\//.test(ua))     return 'Opera';
    if (/Chrome\//.test(ua))  return 'Chrome';
    if (/Firefox\//.test(ua)) return 'Firefox';
    if (/Safari\//.test(ua))  return 'Safari';
    return 'Other';
  },

  _detectOS(ua) {
    if (/Windows NT/.test(ua))  return 'Windows';
    if (/Mac OS X/.test(ua))    return 'macOS';
    if (/Android/.test(ua))     return 'Android';
    if (/iPhone|iPad/.test(ua)) return 'iOS';
    if (/Linux/.test(ua))       return 'Linux';
    return 'Other';
  },

  _detectDevice(ua) {
    if (/Mobi|Android|iPhone/.test(ua)) return 'Mobile';
    if (/Tablet|iPad/.test(ua))         return 'Tablet';
    return 'Desktop';
  }
};

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => VisitorTracker.init());
