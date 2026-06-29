'use strict';
import { QuizModel }      from '../models/QuizModel.js';
import { QuizView }       from '../views/QuizView.js';
import { StorageService } from '../services/StorageService.js';

export class QuizController {
  #container = null;
  #appCtrl   = null;
  #model     = null;
  #view      = null;

  constructor(container, appCtrl) {
    this.#container = container;
    this.#appCtrl   = appCtrl;
  }

  async init() {
    const questions = await this.#appCtrl.dataService.getQuizQuestions();
    this.#model = QuizModel.create(questions);
    this.#view  = new QuizView();
    this.#bindModelEvents();
    this.#view.mount(this.#container, {
      difficulties: this.#model.getDifficulties(),
      totalInBank:  questions.length,
      bankStats:    this.#model.getQuestionCounts(),
      onStart:      s => this.handleStart(s),
    });
  }

  #bindModelEvents() {
    this.#model.on('start', () => {
      const q = this.#model.currentQuestion;
      const p = this.#model.getProgress();
      this.#view.renderQuestion(q, p);
      this.#view.setAnswerCallback(i => this.handleAnswer(i));
    });
    this.#model.on('progress', () => {
      const q = this.#model.currentQuestion;
      const p = this.#model.getProgress();
      this.#view.renderQuestion(q, p);
      this.#view.setAnswerCallback(i => this.handleAnswer(i));
    });
    this.#model.on('answer', result => {
      const progress = this.#model.getProgress();
      const isLast = progress.current >= progress.total;
      this.#view.showFeedback(
        { correct: result.correct, selectedIndex: result.selectedAnswer,
          correctIndex: result.correctAnswer, explanation: result.explanation, isLast },
        { onNext: () => this.handleNext() }
      );
    });
    this.#model.on('complete', score => {
      this.#saveScore(score);
      this.#view.renderResults(score, {
        onRetry: () => this.handleRetry(),
        onRetryDiff: () => this.handleRetry(),
      });
      const type = (score.grade === 'A' || score.grade === 'B') ? 'success' : 'info';
      this.#appCtrl.showToast('Nota: ' + score.grade + ' (' + score.percentage + '%)', type, 5000);
    });
    this.#model.on('reset', () => {
      const counts = this.#model.getQuestionCounts();
      const total = Object.values(counts).reduce((a,b)=>a+b,0);
      this.#view.renderStart({ difficulties: this.#model.getDifficulties(),
        totalInBank: total, bankStats: counts, onStart: s => this.handleStart(s) });
    });
  }

  handleStart(s = {}) {
    try { this.#model.shuffleQuestions(s.count ?? 10, s.difficulty ?? null); }
    catch (e) { this.#appCtrl.showToast(e.message, 'error'); }
  }

  handleAnswer(answerIndex) {
    const q = this.#model.currentQuestion;
    if (!q) return;
    try { this.#model.submitAnswer(q.id, answerIndex); }
    catch (e) { this.#appCtrl.showToast(e.message, 'error'); }
  }

  handleNext() {
    try { this.#model.nextQuestion(); }
    catch (e) { this.#appCtrl.showToast(e.message, 'error'); }
  }

  handleRetry() { this.#model.reset(); }

  #saveScore(sc) {
    const scores = StorageService.get('quiz_scores', []);
    scores.push({ date: new Date().toISOString(), correct: sc.correct, total: sc.total,
      percentage: sc.percentage, grade: sc.grade });
    if (scores.length > 50) scores.splice(0, scores.length - 50);
    StorageService.set('quiz_scores', scores);
    const g = StorageService.get('quiz_global_stats',
      { totalQuizzes:0, totalQuestions:0, totalCorrect:0, bestScore:0 });
    g.totalQuizzes++; g.totalQuestions += sc.total; g.totalCorrect += sc.correct;
    g.bestScore = Math.max(g.bestScore, sc.percentage);
    StorageService.set('quiz_global_stats', g);
  }

  destroy() { this.#model?.offAll(); this.#view?.destroy?.(); }
}