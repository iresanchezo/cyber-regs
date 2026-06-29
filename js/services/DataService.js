'use strict';

export class DataService {
  #cache = new Map();

  async getRegulations() {
    if (this.#cache.has('regulations')) return this.#cache.get('regulations');
    const { regulationsData } = await import('../data/regulations.js');
    this.#cache.set('regulations', regulationsData);
    return regulationsData;
  }

  async getFrameworks() {
    if (this.#cache.has('frameworks')) return this.#cache.get('frameworks');
    const { frameworksData } = await import('../data/frameworks.js');
    this.#cache.set('frameworks', frameworksData);
    return frameworksData;
  }

  async getQuizQuestions() {
    if (this.#cache.has('quiz')) return this.#cache.get('quiz');
    const { quizData } = await import('../data/quiz.js');
    this.#cache.set('quiz', quizData);
    return quizData;
  }

  async getTimeline() {
    if (this.#cache.has('timeline')) return this.#cache.get('timeline');
    const { timelineData } = await import('../data/timeline.js');
    this.#cache.set('timeline', timelineData);
    return timelineData;
  }

  invalidateCache(key = null) {
    key ? this.#cache.delete(key) : this.#cache.clear();
  }
}
