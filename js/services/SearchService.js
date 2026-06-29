'use strict';

export class SearchService {
  #index     = new Map();
  #documents = [];

  buildIndex(regulations = [], frameworks = []) {
    this.#index.clear();
    this.#documents = [];

    for (const r of regulations) {
      const doc = {
        id:      r.id,
        type:    'regulation',
        name:    r.name,
        excerpt: r.description?.slice(0, 100) ?? '',
        _tokens: this.#tokenize([r.name, r.shortName, r.description, r.scope]),
      };
      this.#documents.push(doc);
      this.#indexDoc(doc);
    }

    for (const f of frameworks) {
      const doc = {
        id:      f.id,
        type:    'framework',
        name:    f.name,
        excerpt: f.description?.slice(0, 100) ?? '',
        _tokens: this.#tokenize([f.name, f.fullName, f.description, f.type]),
      };
      this.#documents.push(doc);
      this.#indexDoc(doc);
    }
  }

  search(query, maxResults = 10) {
    if (!query || query.trim().length < 2) return [];
    const qTokens = this.#tokenize([query]);
    const scores  = new Map();
    for (const token of qTokens) {
      const exact = this.#index.get(token);
      if (exact) for (const i of exact) scores.set(i, (scores.get(i) ?? 0) + 2);
      for (const [t, ids] of this.#index) {
        if (t !== token && t.startsWith(token))
          for (const i of ids) scores.set(i, (scores.get(i) ?? 0) + 1);
      }
    }
    return [...scores.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxResults)
      .map(([i]) => this.#documents[i])
      .filter(Boolean);
  }

  isBuilt() { return this.#documents.length > 0; }

  #indexDoc(doc) {
    const idx = this.#documents.length - 1;
    for (const t of doc._tokens) {
      if (!this.#index.has(t)) this.#index.set(t, new Set());
      this.#index.get(t).add(idx);
    }
  }

  #tokenize(arr) {
    const tokens = new Set();
    for (const text of arr) {
      if (!text) continue;
      text.toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 2)
        .forEach(w => tokens.add(w));
    }
    return [...tokens];
  }
}
