'use strict';
import { TimelineModel } from '../models/TimelineModel.js';
import { TimelineView }  from '../views/TimelineView.js';

export class TimelineController {
  #container = null; #appCtrl = null;
  #model = null; #view = null; #observer = null;

  constructor(container, appCtrl) {
    this.#container = container; this.#appCtrl = appCtrl;
  }

  async init() {
    const raw = await this.#appCtrl.dataService.getTimeline();
    this.#model = TimelineModel.create(raw);
    this.#view  = new TimelineView();
    this.#model.on('change', f => {
      this.#view.update(f, this.#model.getActiveFilters());
      this.#initObserver();
    });
    this.#model.on('reset', () => this.#appCtrl.showToast('Filtros eliminados','info',1800));
    this.#view.mount(this.#container, {
      events:           this.#model.getAll(),
      categories:       this.#model.getCategories(),
      yearRange:        this.#model.getYearRange(),
      activeFilters:    this.#model.getActiveFilters(),
      stats:            this.#model.getStats(),
      onToggleCategory: c      => this.handleCategoryToggle(c),
      onYearRange:      (a, b) => this.handleYearRange(a, b),
      onClearFilters:   ()     => this.handleClearFilters(),
    });
    this.#initObserver();
  }

  handleCategoryToggle(cat) {
    this.#model.toggleCategory(cat);
    if (this.#model.getFilteredCount() === 0)
      this.#appCtrl.showToast('Sin eventos para esta combinacion','warning',2500);
  }
  handleYearRange(min, max) { this.#model.filterByYearRange(min, max); }
  handleClearFilters()      { this.#model.clearFilters(); }

  #initObserver() {
    this.#observer?.disconnect();
    if (!('IntersectionObserver' in window)) {
      this.#container.querySelectorAll('.timeline-item').forEach(el => el.classList.add('visible'));
      return;
    }
    this.#observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); this.#observer.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.15 });
    this.#container.querySelectorAll('.timeline-item:not(.visible)').forEach(el => this.#observer.observe(el));
  }

  destroy() {
    this.#observer?.disconnect();
    this.#model?.offAll();
    this.#view?.destroy?.();
  }
}
