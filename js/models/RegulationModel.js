'use strict';
import { EventEmitter } from './EventEmitter.js';

export class RegulationModel extends EventEmitter {

  #data     = [];
  #filtered = [];
  #activeFilters = { category: 'all', search: '' };

  constructor(rawData = []) {
    super();
    this.#data     = rawData.map(r => Object.freeze({ ...r }));
    this.#filtered = [...this.#data];
  }

  static create(rawData) {
    if (!Array.isArray(rawData)) throw new TypeError('RegulationModel.create: se esperaba un array');
    return new RegulationModel(rawData);
  }

  getAll() {
    return [...this.#filtered];
  }

  getAllRaw() {
    return [...this.#data];
  }

  getById(id) {
    return this.#data.find(r => r.id === id) ?? null;
  }

  getCount() {
    return this.#data.length;
  }

  getFilteredCount() {
    return this.#filtered.length;
  }

  getCategories() {
    return [...new Set(this.#data.map(r => r.category))];
  }

  getActiveFilters() {
    return { ...this.#activeFilters };
  }

  filterByCategory(category) {
    const valid = ['all', ...this.getCategories()];
    if (!valid.includes(category)) {
      console.warn('RegulationModel.filterByCategory: categoria no valida:', category);
      return this;
    }
    this.#activeFilters.category = category;
    this.#applyFilters();
    return this;
  }

  search(query) {
    this.#activeFilters.search = (query ?? '').trim().toLowerCase();
    this.#applyFilters();
    return this;
  }

  clearFilters() {
    this.#activeFilters = { category: 'all', search: '' };
    this.#filtered = [...this.#data];
    this.emit('change', this.getAll());
    return this;
  }

  getRelatedFrameworkIds(regulationId) {
    const reg = this.getById(regulationId);
    return reg?.relatedFrameworks ?? [];
  }

  getByCategory(category) {
    return this.#data.filter(r => r.category === category);
  }

  getSortedByYear(ascending = true) {
    return [...this.#filtered].sort((a, b) =>
      ascending ? a.year - b.year : b.year - a.year
    );
  }

  #applyFilters() {
    const { category, search } = this.#activeFilters;
    this.#filtered = this.#data.filter(r => {
      const matchCat = category === 'all' || r.category === category;
      const matchSearch = !search ||
        r.name.toLowerCase().includes(search) ||
        r.shortName.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search) ||
        r.scope.toLowerCase().includes(search) ||
        (r.objectives ?? []).some(o => o.toLowerCase().includes(search));
      return matchCat && matchSearch;
    });
    this.emit('change', this.getAll());
  }
}
