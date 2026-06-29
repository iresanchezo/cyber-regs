'use strict';
import { EventEmitter } from './EventEmitter.js';

export class FrameworkModel extends EventEmitter {

  #data      = [];
  #filtered  = [];
  #selected  = new Set(); // max 2 IDs para el comparador
  #activeFilters = { type: 'all', certifiable: null, search: '' };

  static MAX_SELECTION = 2;

  constructor(rawData = []) {
    super();
    this.#data     = rawData.map(f => Object.freeze({ ...f }));
    this.#filtered = [...this.#data];
  }

  static create(rawData) {
    if (!Array.isArray(rawData)) throw new TypeError('FrameworkModel.create: se esperaba un array');
    return new FrameworkModel(rawData);
  }

  getAll() { return [...this.#filtered]; }
  getAllRaw() { return [...this.#data]; }
  getCount() { return this.#data.length; }
  getFilteredCount() { return this.#filtered.length; }

  getById(id) {
    return this.#data.find(f => f.id === id) ?? null;
  }

  getTypes() {
    return [...new Set(this.#data.map(f => f.type))];
  }

  getActiveFilters() { return { ...this.#activeFilters }; }

  filterByType(type) {
    this.#activeFilters.type = type ?? 'all';
    this.#applyFilters();
    return this;
  }

  filterByCertifiable(certifiable) {
    this.#activeFilters.certifiable = certifiable; // null = sin filtro
    this.#applyFilters();
    return this;
  }

  search(query) {
    this.#activeFilters.search = (query ?? '').trim().toLowerCase();
    this.#applyFilters();
    return this;
  }

  clearFilters() {
    this.#activeFilters = { type: 'all', certifiable: null, search: '' };
    this.#filtered = [...this.#data];
    this.emit('change', this.getAll());
    return this;
  }

  toggleSelect(id) {
    if (this.#selected.has(id)) {
      this.#selected.delete(id);
    } else {
      if (this.#selected.size >= FrameworkModel.MAX_SELECTION) {
        const first = [...this.#selected][0];
        this.#selected.delete(first);
      }
      this.#selected.add(id);
    }
    this.emit('selectionChange', this.getSelectedIds());
    return this;
  }

  isSelected(id) { return this.#selected.has(id); }
  getSelectedIds() { return [...this.#selected]; }
  getSelectedFrameworks() { return this.getSelectedIds().map(id => this.getById(id)).filter(Boolean); }
  canCompare() { return this.#selected.size === FrameworkModel.MAX_SELECTION; }
  clearSelection() { this.#selected.clear(); this.emit('selectionChange', []); return this; }

  compareTwo(idA, idB) {
    const a = this.getById(idA), b = this.getById(idB);
    if (!a || !b) return null;
    return this.#buildComparison(a, b);
  }

  getComparison() {
    if (!this.canCompare()) return null;
    const [a, b] = this.getSelectedFrameworks();
    return this.#buildComparison(a, b);
  }

  #buildComparison(a, b) {
    return {
      frameworks: [a, b],
      rows: {
        'Nombre completo':  [a.name,                                          b.name],
        'Tipo':             [a.type,                                          b.type],
        'Certificable':     [a.certifiable ? 'Si' : 'No',                    b.certifiable ? 'Si' : 'No'],
        'Ambito':           [a.scope,                                         b.scope],
        'Ano publicacion':  [String(a.year),                                  String(b.year)],
        'Descripcion':      [a.description,                                   b.description],
        'Normativas rel.':  [(a.relatedRegulations ?? []).join(', '),         (b.relatedRegulations ?? []).join(', ')],
      },
    };
  }

  getRecommendationsForProfile(profile) {
    const map = {
      financiero:      ['dora', 'nist-csf', 'iso27001'],
      administracion:  ['ens',  'nist-csf', 'iso27001'],
      datos_personales:['iso27001', 'iso27005'],
      salud:           ['nist-csf', 'iso27001', 'cis-controls'],
      generico:        ['nist-csf', 'cis-controls', 'iso27001'],
    };
    const ids = map[profile] ?? map.generico;
    return ids.map(id => this.getById(id)).filter(Boolean);
  }

  getRelatedByRegulation(regulationId) {
    return this.#data.filter(f =>
      (f.relatedRegulations ?? []).includes(regulationId)
    );
  }

  getSortedByName(ascending = true) {
    return [...this.#filtered].sort((a, b) => {
      const cmp = a.name.localeCompare(b.name, 'es');
      return ascending ? cmp : -cmp;
    });
  }

  #applyFilters() {
    const { type, certifiable, search } = this.#activeFilters;
    this.#filtered = this.#data.filter(f => {
      const matchType  = type === 'all' || f.type === type;
      const matchCert  = certifiable === null || f.certifiable === certifiable;
      const matchSearch = !search ||
        f.name.toLowerCase().includes(search) ||
        f.shortName.toLowerCase().includes(search) ||
        f.description.toLowerCase().includes(search) ||
        f.type.toLowerCase().includes(search);
      return matchType && matchCert && matchSearch;
    });
    this.emit('change', this.getAll());
  }
}
