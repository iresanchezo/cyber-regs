'use strict';
import { RegulationModel } from '../models/RegulationModel.js';
import { RegulationView }  from '../views/RegulationView.js';

export class RegulationController {
  #container = null;
  #appCtrl   = null;
  #model     = null;
  #view      = null;
  #bound     = null;

  constructor(container, appController) {
    this.#container = container;
    this.#appCtrl   = appController;
  }

  async init() {
    const raw = await this.#appCtrl.dataService.getRegulations();
    this.#model = RegulationModel.create(raw);
    this.#view  = new RegulationView();

    // Re-render on filter change
    this.#model.on('change', () => this.#render());

    this.#render();
    this.#bindEvents();
  }

  #render() {
    const filters = this.#model.getActiveFilters();
    this.#view.mount(
      this.#container,
      this.#model.getAll(),
      filters.category
    );
    // Re-bind after every render (innerHTML replaces the DOM)
    this.#bindEvents();
  }

  #bindEvents() {
    // Remove previous listener to avoid duplicates
    if (this.#bound) {
      this.#container.removeEventListener('click', this.#bound);
    }

    this.#bound = (e) => {
      // Filter tabs
      const tab = e.target.closest('[data-category]');
      if (tab) {
        this.handleFilterChange(tab.dataset.category);
        return;
      }
      // Detail button
      const detailBtn = e.target.closest('[data-action="detail"][data-id]');
      if (detailBtn) {
        this.handleDetailClick(detailBtn.dataset.id);
        return;
      }
      // Click on card itself
      const card = e.target.closest('.regulation-card[data-id]');
      if (card && !e.target.closest('button')) {
        this.handleDetailClick(card.dataset.id);
      }
    };

    this.#container.addEventListener('click', this.#bound);

    // Search input
    const searchInput = this.#container.querySelector('[data-search]');
    if (searchInput) {
      let debounce;
      searchInput.addEventListener('input', (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => this.handleSearch(e.target.value), 250);
      });
    }

  }

  handleFilterChange(category) {
    this.#model.filterByCategory(category);
  }

  handleSearch(query) {
    this.#model.search(query);
  }

  handleDetailClick(id) {
    const reg = this.#model.getById(id);
    if (!reg) { this.#appCtrl.showToast('Normativa no encontrada', 'error'); return; }
    const html = this.#view.renderDetail(reg, []);
    this.#appCtrl.openModal(html, reg.name);
  }

  destroy() {
    this.#model?.offAll();
    if (this.#bound) {
      this.#container.removeEventListener('click', this.#bound);
    }
  }
}
