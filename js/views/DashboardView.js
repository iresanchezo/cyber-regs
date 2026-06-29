'use strict';
import { StorageService } from '../services/StorageService.js';

export class DashboardView {
  #container=null;#charts=[];

  mount(container){
    this.#container=container;
    const stats=this.#load();
    container.innerHTML=this.#render(stats);
    this.#initCharts(stats);
  }

  bindEvents(onNavigate){
    this.#container?.addEventListener('click',(e)=>{
      const nav=e.target.closest('[data-nav]');
      if(nav){onNavigate?.(nav.dataset.nav);return;}
      if(e.target.closest('[data-action="reset-stats"]')){
        if(!confirm('Borrar todas las estadisticas?'))return;
        StorageService.remove('quiz_scores');
        StorageService.remove('quiz_global_stats');
        StorageService.remove('viewed_regs');
        StorageService.remove('viewed_fws');
        const stats=this.#load();
        this.#container.innerHTML=this.#render(stats);
        this.#initCharts(stats);
        this.bindEvents(onNavigate);
      }
    });
  }

  #load(){
    const scores=StorageService.get('quiz_scores',[]);
    const global=StorageService.get('quiz_global_stats',{totalQuizzes:0,totalQuestions:0,totalCorrect:0,bestScore:0});
    const viewedRegs=StorageService.get('viewed_regs',[]);
    const viewedFws=StorageService.get('viewed_fws',[]);
    const lastScore=scores.at(-1)||null;
    const avgScore=scores.length
      ? Math.round(scores.reduce((s,q)=>s+q.percentage,0)/scores.length)
      : 0;
    return {scores,global,viewedRegs,viewedFws,lastScore,avgScore};
  }

  #render(s){
    const kpis=[
      ['Tests realizados',s.global.totalQuizzes,''],
      ['Mejor nota',s.global.bestScore+'%',''],
      ['Media',s.avgScore+'%',''],
      ['Normativas vistas',s.viewedRegs.length,''],
      ['Frameworks vistos',s.viewedFws.length,''],
      ['Total preguntas',s.global.totalQuestions,''],
    ].map(([l,v,i])=>
      '<div class="kpi-card stat-card">'
      +'<span class="kpi-icon" aria-hidden="true">'+i+'</span>'
      +'<span class="stat-value">'+v+'</span>'
      +'<span class="stat-label">'+l+'</span></div>'
    ).join('');

    const lastCard=s.lastScore
      ? '<div class="last-score-card card"><h3>Ultimo test</h3>'
        +'<div class="last-score-info">'
        +'<span class="score-grade-badge score-grade-'+s.lastScore.grade?.toLowerCase()+'">'+s.lastScore.grade+'</span>'
        +'<div><p><strong>'+s.lastScore.correct+'/'+s.lastScore.total+'</strong> correctas</p>'
        +'<p>'+s.lastScore.percentage+'% — '+new Date(s.lastScore.date).toLocaleString('es-ES')+'</p>'
        +(s.lastScore.difficulty?'<span class="badge">'+s.lastScore.difficulty+'</span>':'')
        +'</div></div></div>'
      : '';

    return '<div class="dashboard-view" role="main">'
      +'<div class="dashboard-welcome"><h2 class="section-heading">Tu progreso</h2></div>'
      +'<div class="dashboard-kpi-grid">'+kpis+'</div>'
      +'<div class="dashboard-charts-grid">'
      +'<div class="dashboard-chart-card card"><h3>Evolucion de puntuaciones</h3>'
      +(s.scores.length>1
        ? '<canvas id="scores-chart" height="200"></canvas>'
        : '<div class="empty-state mini"><p>Completa al menos 2 tests.</p></div>')
      +'</div>'
      +'<div class="dashboard-chart-card card"><h3>Distribucion por dificultad</h3>'
      +'<canvas id="difficulty-chart" height="200"></canvas></div>'
      +'</div>'
      +lastCard
      +'<div class="dashboard-actions">'
      +'<button class="btn btn-primary" data-nav="quiz">Nuevo test</button>'
      +'<button class="btn btn-outline" data-action="reset-stats">Borrar estadisticas</button>'
      +'</div></div>';
  }

  #initCharts(s){
    if(typeof Chart==='undefined')return;
    this.#charts.forEach(c=>c.destroy?.());
    this.#charts=[];

    const scoresCanvas=this.#container.querySelector('#scores-chart');
    if(scoresCanvas&&s.scores.length>1){
      this.#charts.push(new Chart(scoresCanvas,{
        type:'line',
        data:{
          labels:s.scores.map((_,i)=>'T'+(i+1)),
          datasets:[{label:'Puntuacion (%)',data:s.scores.map(q=>q.percentage),
            borderColor:'var(--color-primary)',tension:0.3,fill:true}],
        },
        options:{responsive:true,scales:{y:{min:0,max:100}},plugins:{legend:{display:false}}},
      }));
    }

    const diffCanvas=this.#container.querySelector('#difficulty-chart');
    if(diffCanvas){
      const counts=s.scores.reduce((acc,q)=>{const d=q.difficulty||'Todas';acc[d]=(acc[d]||0)+1;return acc;},{});
      if(!Object.keys(counts).length)counts['Sin datos']=1;
      this.#charts.push(new Chart(diffCanvas,{
        type:'doughnut',
        data:{
          labels:Object.keys(counts),
          datasets:[{data:Object.values(counts),
            backgroundColor:['var(--color-success)','var(--color-warning)','var(--color-error)','var(--color-info)']}],
        },
        options:{responsive:true,plugins:{legend:{position:'bottom'}}},
      }));
    }
  }

  destroy(){
    this.#charts.forEach(c=>c.destroy?.());
    this.#charts=[];
    this.#container=null;
  }
}
