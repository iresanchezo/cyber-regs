/**
 * @fileoverview Modelo del timeline histórico con patrón Observer
 * @module models/TimelineModel
 */
import { EventEmitter } from './EventEmitter.js';

export class TimelineModel extends EventEmitter {
  /** @type {Array<Object>} */
  #data = [];
  /** @type {Array<Object>} */
  #filtered = [];
  /** @type {{category: string, yearStart: number, yearEnd: number}} */
  #activeFilters = { category: 'all', yearStart: 0, yearEnd: 9999 };

  /**
   * @param {Array<Object>} data - Array de eventos del timeline
   */
  constructor(data = []) {
    super();
    this.#data = data.map(e => Object.freeze({ ...e })).sort((a, b) => a.year - b.year);
    this.#filtered = [...this.#data];

    const range = this.getYearRange();
    this.#activeFilters.yearStart = range.min;
    this.#activeFilters.yearEnd = range.max;
  }

  /**
   * Obtiene todos los eventos filtrados
   * @returns {Array<Object>}
   */
  getAll() {
    return this.#filtered;
  }

  /**
   * Filtra por categoría
   * @param {string} category - 'all' o una categoría específica
   */
  filterByCategory(category) {
    this.#activeFilters.category = category;
    this.#applyFilters();
  }

  /**
   * Filtra por rango de años
   * @param {number} start - Año de inicio
   * @param {number} end - Año de fin
   */
  filterByYearRange(start, end) {
    this.#activeFilters.yearStart = start;
    this.#activeFilters.yearEnd = end;
    this.#applyFilters();
  }

  /**
   * Restablece todos los filtros
   */
  resetFilters() {
    const range = this.getYearRange();
    this.#activeFilters = { category: 'all', yearStart: range.min, yearEnd: range.max };
    this.#filtered = [...this.#data];
    this.emit('change', this.#filtered);
  }

  /**
   * Aplica los filtros activos
   * @private
   */
  #applyFilters() {
    this.#filtered = this.#data.filter(e => {
      const matchCat =
        this.#activeFilters.category === 'all' ||
        e.category === this.#activeFilters.category;

      const matchYear =
        e.year >= this.#activeFilters.yearStart &&
        e.year <= this.#activeFilters.yearEnd;

      return matchCat && matchYear;
    });
    this.emit('change', this.#filtered);
  }

  /**
   * Obtiene todas las categorías únicas
   * @returns {string[]}
   */
  getCategories() {
    return [...new Set(this.#data.map(e => e.category))];
  }

  /**
   * Obtiene el rango de años de los datos
   * @returns {{min: number, max: number}}
   */
  getYearRange() {
    if (this.#data.length === 0) return { min: 1990, max: 2025 };
    const years = this.#data.map(e => e.year);
    return { min: Math.min(...years), max: Math.max(...years) };
  }

  /**
   * Obtiene estadísticas por categoría
   * @returns {Object<string, number>}
   */
  getStatsByCategory() {
    const stats = {};
    for (const e of this.#data) {
      stats[e.category] = (stats[e.category] || 0) + 1;
    }
    return stats;
  }

  /**
   * Obtiene los filtros activos
   * @returns {Object}
   */
  getActiveFilters() {
    const cats = this.#activeFilters.category === 'all'
      ? new Set()
      : new Set([this.#activeFilters.category]);
    return { categories: cats, yearStart: this.#activeFilters.yearStart, yearEnd: this.#activeFilters.yearEnd };
  }

  toggleCategory(cat) {
    this.#activeFilters.category = this.#activeFilters.category === cat ? 'all' : cat;
    this.#applyFilters();
  }

  clearFilters() { this.resetFilters(); }

  getFilteredCount() { return this.#filtered.length; }

  getStats() {
    const range = this.getYearRange();
    return { total: this.#data.length, categories: this.getCategories().length, yearSpan: range.max - range.min + 1 };
  }

  /**
   * Factory method
   * @param {Array<Object>} data
   * @returns {TimelineModel}
   */
  static create(data) {
    return new TimelineModel(data);
  }
}
