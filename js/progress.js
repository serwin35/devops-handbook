/* === DEVOPS LEARNING HUB — Progress Tracking === */

const Progress = {
  KEY: 'devops-progress',

  load() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || {};
    } catch { return {}; }
  },

  save(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  isComplete(id) {
    return !!this.load()[id];
  },

  toggle(id) {
    const data = this.load();
    data[id] = !data[id];
    this.save(data);
    return data[id];
  },

  getPercent(ids) {
    const data = this.load();
    const done = ids.filter(id => data[id]).length;
    return Math.round((done / ids.length) * 100);
  },

  // Initialize checkboxes on lesson pages
  initCheckboxes() {
    document.querySelectorAll('.progress-check').forEach(el => {
      const id = el.dataset.id;
      if (!id) return;

      el.checked = this.isComplete(id);
      el.addEventListener('change', () => {
        this.toggle(id);
        this.updateBars();
      });
    });
    this.updateBars();
  },

  // Update all progress bars on the page
  updateBars() {
    document.querySelectorAll('[data-progress-bar]').forEach(bar => {
      const group = bar.dataset.progressBar;
      const checks = document.querySelectorAll(`.progress-check[data-id^="${group}"]`);
      const ids = Array.from(checks).map(c => c.dataset.id);
      if (ids.length === 0) return;

      const pct = this.getPercent(ids);
      bar.style.width = pct + '%';

      const label = document.querySelector(`[data-progress-label="${group}"]`);
      if (label) label.textContent = pct + '%';
    });
  },

  // Update dashboard cards with completion status
  updateDashboard() {
    const data = this.load();

    document.querySelectorAll('[data-lesson-progress]').forEach(el => {
      const prefix = el.dataset.lessonProgress;
      const allKeys = Object.keys(data).filter(k => k.startsWith(prefix));
      const doneKeys = allKeys.filter(k => data[k]);

      if (allKeys.length === 0) {
        el.textContent = 'Nie rozpoczeto';
        return;
      }

      const pct = Math.round((doneKeys.length / allKeys.length) * 100);
      el.textContent = pct === 100 ? 'Ukonczone' : `${pct}% (${doneKeys.length}/${allKeys.length})`;
    });

    // Overall progress
    const totalBar = document.querySelector('[data-progress-bar="overall"]');
    if (totalBar) {
      const allKeys = Object.keys(data);
      const doneKeys = allKeys.filter(k => data[k]);
      const pct = allKeys.length > 0 ? Math.round((doneKeys.length / allKeys.length) * 100) : 0;
      totalBar.style.width = pct + '%';

      const label = document.querySelector('[data-progress-label="overall"]');
      if (label) label.textContent = pct + '%';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Progress.initCheckboxes();
  if (typeof Progress.updateDashboard === 'function') {
    Progress.updateDashboard();
  }
});
