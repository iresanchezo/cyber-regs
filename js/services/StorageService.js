'use strict';

const PREFIX = 'cybersec_';

export class StorageService {
  constructor() {}

  static set(key, value) {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  static get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw === null ? defaultValue : JSON.parse(raw);
    } catch (e) {
      return defaultValue;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(PREFIX + key);
      return true;
    } catch (e) {
      return false;
    }
  }

  static clearAll() {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX)) keys.push(k);
      }
      keys.forEach(k => localStorage.removeItem(k));
      return true;
    } catch (e) {
      return false;
    }
  }

  static isAvailable() {
    try {
      const p = '__test__';
      localStorage.setItem(p, p);
      localStorage.removeItem(p);
      return true;
    } catch (_) {
      return false;
    }
  }

  static getAll() {
    const result = {};
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (!k || !k.startsWith(PREFIX)) continue;
        result[k.slice(PREFIX.length)] = StorageService.get(k.slice(PREFIX.length));
      }
    } catch (_) {}
    return result;
  }
}

window.__StorageService = StorageService;
