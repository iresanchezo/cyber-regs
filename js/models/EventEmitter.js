'use strict';

export class EventEmitter {
  #listeners = new Map();

  on(event, fn) {
    if (typeof fn !== 'function') throw new TypeError('EventEmitter: fn debe ser funcion');
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set());
    this.#listeners.get(event).add(fn);
    return this;
  }

  once(event, fn) {
    const wrapper = (...args) => { fn(...args); this.off(event, wrapper); };
    wrapper._originalFn = fn;
    return this.on(event, wrapper);
  }

  off(event, fn) {
    if (!this.#listeners.has(event)) return this;
    const set = this.#listeners.get(event);
    for (const listener of set) {
      if (listener === fn || listener._originalFn === fn) { set.delete(listener); break; }
    }
    if (set.size === 0) this.#listeners.delete(event);
    return this;
  }

  offAll(event) {
    if (event) this.#listeners.delete(event); else this.#listeners.clear();
    return this;
  }

  emit(event, ...args) {
    if (!this.#listeners.has(event)) return false;
    for (const fn of this.#listeners.get(event)) {
      try { fn(...args); }
      catch (e) { console.error('EventEmitter listener error:', e); }
    }
    return true;
  }

  listenerCount(event) { return this.#listeners.get(event)?.size ?? 0; }
  eventNames() { return [...this.#listeners.keys()]; }
}
