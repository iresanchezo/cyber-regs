/**
 * @fileoverview Modelo del quiz con máquina de estados y patrón Observer
 * @module models/QuizModel
 */
import { EventEmitter } from './EventEmitter.js';

/**
 * @typedef {'idle'|'active'|'completed'} QuizState
 */

export class QuizModel extends EventEmitter {
  /** @type {Array<Object>} */
  #allQuestions = [];
  /** @type {Array<Object>} */
  #questions = [];
  /** @type {number} */
  #currentIndex = 0;
  /** @type {number} */
  #correctCount = 0;
  /** @type {Map<string, Object>} */
  #answers = new Map();
  /** @type {QuizState} */
  #state = 'idle';

  /**
   * @param {Array<Object>} questions - Todas las preguntas disponibles
   */
  constructor(questions = []) {
    super();
    this.#allQuestions = questions;
  }

  /**
   * Estado actual del quiz
   * @returns {QuizState}
   */
  get state() {
    return this.#state;
  }

  /**
   * Pregunta actual
   * @returns {Object|null}
   */
  get currentQuestion() {
    return this.#questions[this.#currentIndex] || null;
  }

  /**
   * Mezcla y selecciona preguntas para el quiz
   * @param {number} [count=10] - Número de preguntas
   * @param {string|null} [difficulty=null] - Filtro de dificultad
   */
  shuffleQuestions(count = 10, difficulty = null) {
    let pool = [...this.#allQuestions];

    if (difficulty && difficulty !== 'todas') {
      pool = pool.filter(q => q.difficulty === difficulty);
    }

    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    this.#questions = pool.slice(0, Math.min(count, pool.length));
    this.#currentIndex = 0;
    this.#correctCount = 0;
    this.#answers.clear();
    this.#state = 'active';

    this.emit('start', { total: this.#questions.length });
    this.emit('progress', this.getProgress());
  }

  /**
   * Registra una respuesta para la pregunta actual
   * @param {string} questionId - ID de la pregunta
   * @param {number} answerIndex - Índice de la opción elegida (0-3)
   * @returns {{correct: boolean, explanation: string, correctAnswer: number}|null}
   */
  submitAnswer(questionId, answerIndex) {
    if (this.#state !== 'active') return null;
    const question = this.#questions.find(q => q.id === questionId);
    if (!question || this.#answers.has(questionId)) return null;

    const correct = answerIndex === question.correctAnswer;
    if (correct) this.#correctCount++;

    const result = {
      correct,
      explanation: question.explanation,
      correctAnswer: question.correctAnswer,
      selectedAnswer: answerIndex
    };

    this.#answers.set(questionId, result);
    this.emit('answer', { questionId, ...result });

    return result;
  }

  /**
   * Avanza a la siguiente pregunta
   * @returns {Object|null} Siguiente pregunta o null si se completó
   */
  nextQuestion() {
    if (this.#state !== 'active') return null;
    this.#currentIndex++;

    if (this.#currentIndex >= this.#questions.length) {
      this.#state = 'completed';
      this.emit('complete', this.getScore());
      return null;
    }

    this.emit('progress', this.getProgress());
    return this.currentQuestion;
  }

  /**
   * Obtiene la puntuación actual
   * @returns {{correct: number, total: number, percentage: number, grade: string}}
   */
  getScore() {
    const total = this.#questions.length;
    const correct = this.#correctCount;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    let grade;
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 65) grade = 'C';
    else if (percentage >= 50) grade = 'D';
    else grade = 'F';

    // Calcular breakdown por tema
    const topicBreakdown = {};
    for (const [qId, result] of this.#answers) {
      const q = this.#questions.find(q => q.id === qId);
      if (q) {
        if (!topicBreakdown[q.topic]) {
          topicBreakdown[q.topic] = { correct: 0, total: 0 };
        }
        topicBreakdown[q.topic].total++;
        if (result.correct) topicBreakdown[q.topic].correct++;
      }
    }

    // Calcular breakdown por dificultad
    const difficultyBreakdown = {};
    for (const [qId, result] of this.#answers) {
      const q = this.#questions.find(q => q.id === qId);
      if (q) {
        if (!difficultyBreakdown[q.difficulty]) {
          difficultyBreakdown[q.difficulty] = { correct: 0, total: 0 };
        }
        difficultyBreakdown[q.difficulty].total++;
        if (result.correct) difficultyBreakdown[q.difficulty].correct++;
      }
    }

    for (const tb of Object.values(topicBreakdown)) {
      tb.percentage = Math.round((tb.correct / tb.total) * 100);
    }

    return { correct, total, percentage, grade, topicBreakdown, difficultyBreakdown, date: new Date().toISOString() };
  }

  /**
   * Obtiene el progreso actual
   * @returns {{current: number, total: number, percentage: number}}
   */
  getProgress() {
    const total = this.#questions.length;
    const current = this.#currentIndex + 1;
    const percentage = total > 0 ? Math.round((this.#currentIndex / total) * 100) : 0;
    return { current, total, percentage };
  }

  /**
   * Restablece el quiz al estado inicial
   */
  reset() {
    this.#questions = [];
    this.#currentIndex = 0;
    this.#correctCount = 0;
    this.#answers.clear();
    this.#state = 'idle';
    this.emit('reset');
  }

  /**
   * Verifica si la pregunta actual ya fue respondida
   * @returns {boolean}
   */
  isCurrentAnswered() {
    const q = this.currentQuestion;
    return q ? this.#answers.has(q.id) : false;
  }

  /**
   * Obtiene todas las dificultades únicas disponibles
   * @returns {string[]}
   */
  getDifficulties() {
    return [...new Set(this.#allQuestions.map(q => q.difficulty))];
  }

  /**
   * Obtiene el conteo de preguntas por dificultad
   * @returns {Object}
   */
  getQuestionCounts() {
    const counts = {};
    for (const q of this.#allQuestions) {
      counts[q.difficulty] = (counts[q.difficulty] || 0) + 1;
    }
    return counts;
  }

  /**
   * Factory method
   * @param {Array<Object>} questions
   * @returns {QuizModel}
   */
  static create(questions) {
    return new QuizModel(questions);
  }
}
