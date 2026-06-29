'use strict';
export class QuizView {
  #container=null;#callbacks={};#bound=null;

  mount(container,{difficulties,totalInBank,bankStats,onStart}){
    this.#container=container;
    this.#callbacks={onStart};
    container.innerHTML=this.#buildStart(difficulties,totalInBank,bankStats);
    this.#bind();
  }

  renderStart({difficulties,totalInBank,bankStats,onStart}){
    if(onStart)this.#callbacks.onStart=onStart;
    this.#container.innerHTML=this.#buildStart(difficulties,totalInBank,bankStats);
    this.#bind();
  }

  #buildStart(difficulties,totalInBank,bankStats){
    const opts=difficulties.map(d=>'<option value="'+d+'">'+d+'</option>').join('');
    const stats=bankStats
      ? Object.entries(bankStats).map(([t,n])=>
          '<div class="bank-stat-item"><span class="bank-stat-topic">'+t+'</span>'
          +'<span class="bank-stat-count">'+n+'</span></div>').join('')
      : '';
    return '<div class="quiz-start" role="main">'
      +'<h2 class="section-heading">Test de Conocimiento</h2>'
      +'<p class="quiz-intro">Banco: <strong>'+totalInBank+'</strong> preguntas.</p>'
      +'<div class="quiz-config card"><h3>Configura tu test</h3>'
      +'<div class="config-grid">'
      +'<div class="config-field"><label for="quiz-count" class="config-label">Preguntas</label>'
      +'<select id="quiz-count" class="select">'
      +'<option value="5">5</option><option value="10" selected>10</option>'
      +'<option value="15">15</option><option value="20">20</option>'
      +'</select></div>'
      +'<div class="config-field"><label for="quiz-difficulty" class="config-label">Dificultad</label>'
      +'<select id="quiz-difficulty" class="select"><option value="">Todas</option>'+opts+'</select></div>'
      +'</div>'
      +'<button class="btn btn-primary btn-lg" data-action="start">Iniciar Test</button></div>'
      +(stats ? '<div class="bank-stats">'+stats+'</div>' : '')
      +'</div>';
  }

  renderQuestion(question,progress){
    const pct=Math.round((progress.current/progress.total)*100);
    const dc={basico:'success',intermedio:'warning',avanzado:'error'};
    const answers=question.options.map((a,i)=>
      '<button class="quiz-answer" data-answer-index="'+i+'" role="radio" aria-checked="false">'
      +'<span class="quiz-answer-letter" aria-hidden="true">'+'ABCD'[i]+'</span>'
      +'<span class="quiz-answer-text">'+a+'</span></button>'
    ).join('');
    this.#container.innerHTML=
      '<div class="quiz-question-screen" role="main">'
      +'<div class="quiz-progress-bar" role="progressbar" '
      +'aria-valuenow="'+progress.current+'" aria-valuemax="'+progress.total+'">'
      +'<div class="quiz-progress-fill" style="width:'+pct+'%"></div></div>'
      +'<div class="quiz-meta">'
      +'<span class="quiz-counter">Pregunta '+progress.current+' / '+progress.total+'</span>'
      +'<span class="quiz-topic badge">'+question.topic+'</span>'
      +'<span class="quiz-difficulty badge badge--'+(dc[question.difficulty]||'info')+'">'
      +question.difficulty+'</span></div>'
      +'<div class="quiz-card card">'
      +'<p class="quiz-question" id="quiz-q-text">'+question.question+'</p>'
      +'<div class="quiz-answers" role="radiogroup" aria-labelledby="quiz-q-text">'
      +answers+'</div></div></div>';
    this.#bind();
  }

  showFeedback(result,{onNext}){
    this.#callbacks.onNext=onNext;
    this.#container.querySelectorAll('.quiz-answer').forEach((btn,i)=>{
      btn.disabled=true;
      btn.setAttribute('aria-checked',String(i===result.selectedIndex));
      if(i===result.correctIndex)btn.classList.add('correct');
      else if(i===result.selectedIndex&&!result.correct)btn.classList.add('incorrect');
    });
    const card=this.#container.querySelector('.quiz-card');
    if(!card)return;
    const fb=document.createElement('div');
    fb.className='quiz-feedback '+(result.correct?'correct':'incorrect');
    fb.setAttribute('aria-live','polite');
    fb.innerHTML='<div class="feedback-header">'
      +'<span class="feedback-icon">'+(result.correct?'✓':'✕')+'</span>'
      +'<strong>'+(result.correct?'Correcto!':'Incorrecto')+'</strong></div>'
      +(result.explanation?'<p class="feedback-explanation">'+result.explanation+'</p>':'')
      +'<button class="btn btn-primary btn-md" data-action="next">'
      +(result.isLast?'Ver resultados':'Siguiente')+'</button>';
    card.appendChild(fb);
    fb.querySelector('[data-action="next"]')?.focus();
  }

  renderResults(score,{onRetry,onRetryDiff}){
    this.#callbacks={onRetry,onRetryDiff};
    const breakdown=Object.entries(score.topicBreakdown).map(([t,d])=>
      '<div class="breakdown-item"><span class="breakdown-topic">'+t+'</span>'
      +'<div class="breakdown-bar-wrap"><div class="breakdown-bar" style="width:'+d.percentage+'%"></div></div>'
      +'<span class="breakdown-value">'+d.correct+'/'+d.total+'</span></div>'
    ).join('');
    this.#container.innerHTML=
      '<div class="quiz-results" role="main">'
      +'<h2 class="section-heading">Resultados</h2>'
      +'<div class="score-hero">'
      +'<div class="score-circle score-grade-'+score.grade.toLowerCase()+'">'
      +'<span class="score-grade">'+score.grade+'</span>'
      +'<span class="score-pct">'+score.percentage+'%</span></div>'
      +'<div class="score-summary">'
      +'<p><strong>'+score.correct+'</strong> de <strong>'+score.total+'</strong></p>'
      +'<p>'+new Date(score.date).toLocaleString('es-ES')+'</p></div></div>'
      +'<div class="topic-breakdown"><h3>Por tema</h3>'
      +'<div class="breakdown-grid">'+breakdown+'</div></div>'
      +'<div class="results-actions">'
      +'<button class="btn btn-primary" data-action="retry">Repetir</button>'
      +'<button class="btn btn-outline" data-action="retry-diff">Cambiar dificultad</button>'
      +'</div></div>';
    this.#bind();
  }

  setAnswerCallback(fn){this.#callbacks.onAnswer=fn;}

  #bind(){
    if(this.#bound)this.#container.removeEventListener('click',this.#bound);
    this.#bound=(e)=>{
      const btn=e.target.closest('[data-action]');
      if(btn){
        const a=btn.dataset.action;
        if(a==='start'){
          const count=Number(this.#container.querySelector('#quiz-count')?.value||10);
          const diff=this.#container.querySelector('#quiz-difficulty')?.value||null;
          this.#callbacks.onStart?.({count,difficulty:diff});
          return;
        }
        if(a==='next'){this.#callbacks.onNext?.();return;}
        if(a==='retry'){this.#callbacks.onRetry?.();return;}
        if(a==='retry-diff'){this.#callbacks.onRetryDiff?.(null);return;}
      }
      const ans=e.target.closest('.quiz-answer');
      if(ans&&!ans.disabled)this.#callbacks.onAnswer?.(Number(ans.dataset.answerIndex));
    };
    this.#container.addEventListener('click',this.#bound);
  }

  destroy(){
    if(this.#container&&this.#bound)this.#container.removeEventListener('click',this.#bound);
    this.#container=null;
  }
}
