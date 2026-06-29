'use strict';
export class TimelineView {
  #container=null;#callbacks={};#bound=null;#rangeTimer=null;

  mount(container,opts){
    this.#container=container;
    this.#callbacks=opts;
    container.innerHTML=this.#shell(opts);
    this.#bind();
  }

  update(filtered,activeFilters){
    const list=this.#container?.querySelector('.timeline-list');
    const counter=this.#container?.querySelector('.results-counter');
    if(!list)return;
    list.innerHTML=filtered.length
      ? filtered.map(ev=>this.#item(ev)).join('')
      : '<div class="empty-state"><h3>Sin eventos</h3></div>';
    if(counter)counter.textContent=filtered.length+' eventos';
    const cats=activeFilters.categories;
    this.#container.querySelectorAll('.filter-chip[data-cat]').forEach(chip=>{
      const active=cats.size===0||cats.has(chip.dataset.cat);
      chip.classList.toggle('active',active);
      chip.setAttribute('aria-pressed',String(active));
    });
  }

  #shell(o){
    const chips=o.categories.map(c=>
      '<button class="filter-chip active" data-cat="'+c+'" aria-pressed="true">'+c+'</button>'
    ).join('');
    const statsHtml=o.stats
      ? '<div class="timeline-stats-bar">'
        +'<div class="stat-card"><span class="stat-value">'+o.stats.total+'</span>'
        +'<span class="stat-label">Total</span></div>'
        +'<div class="stat-card"><span class="stat-value">'+o.stats.categories+'</span>'
        +'<span class="stat-label">Categorias</span></div>'
        +'<div class="stat-card"><span class="stat-value">'+o.stats.yearSpan+'</span>'
        +'<span class="stat-label">Anos</span></div></div>'
      : '';
    const items=o.events.map(ev=>this.#item(ev)).join('');
    return '<div class="view-header"><h2 class="section-heading">Cronologia de la Ciberseguridad</h2></div>'
      +statsHtml
      +'<div class="timeline-filters">'
      +'<div class="filter-chips" role="group">'+chips+'</div>'
      +'<div class="year-range-wrap">'
      +'<label class="config-label">Desde '
      +'<input type="range" id="year-min" min="'+o.yearRange.min+'" max="'+o.yearRange.max
      +'" value="'+o.yearRange.min+'" step="1">'
      +'<output for="year-min" id="year-min-out">'+o.yearRange.min+'</output></label>'
      +'<label class="config-label">Hasta '
      +'<input type="range" id="year-max" min="'+o.yearRange.min+'" max="'+o.yearRange.max
      +'" value="'+o.yearRange.max+'" step="1">'
      +'<output for="year-max" id="year-max-out">'+o.yearRange.max+'</output></label>'
      +'</div>'
      +'<button class="btn btn-ghost btn-sm" data-action="clear">Limpiar filtros</button>'
      +'</div>'
      +'<div class="results-bar"><span class="results-counter">'+o.events.length+' eventos</span></div>'
      +'<ol class="timeline-list" aria-label="Cronologia">'+items+'</ol>';
  }

  #item(ev){
    const cat=(ev.category||'').toLowerCase().replace(/\s+/g,'-');
    const tags=ev.tags?.length
      ? '<div class="timeline-tags">'+ev.tags.map(t=>'<span class="chip">'+t+'</span>').join('')+'</div>'
      : '';
    return '<li class="timeline-item timeline-item--'+cat+'" data-year="'+ev.year+'">'
      +'<div class="timeline-marker" aria-hidden="true">'
      +'<span class="timeline-year">'+ev.year+'</span></div>'
      +'<div class="timeline-content card">'
      +'<div class="timeline-header"><h3 class="timeline-title">'+ev.title+'</h3>'
      +'<span class="badge">'+ev.category+'</span></div>'
      +'<p class="timeline-desc">'+ev.description+'</p>'
      +tags+'</div></li>';
  }

  #bind(){
    this.#bound=(e)=>{
      const chip=e.target.closest('[data-cat]');
      if(chip){this.#callbacks.onToggleCategory(chip.dataset.cat);return;}
      if(e.target.closest('[data-action="clear"]')){this.#callbacks.onClearFilters();return;}
    };
    this.#container.addEventListener('click',this.#bound);

    const minIn=this.#container.querySelector('#year-min');
    const maxIn=this.#container.querySelector('#year-max');
    const minOut=this.#container.querySelector('#year-min-out');
    const maxOut=this.#container.querySelector('#year-max-out');
    const handler=()=>{
      const min=Number(minIn.value), max=Number(maxIn.value);
      if(min>max)return;
      if(minOut)minOut.textContent=min;
      if(maxOut)maxOut.textContent=max;
      clearTimeout(this.#rangeTimer);
      this.#rangeTimer=setTimeout(()=>this.#callbacks.onYearRange(min,max),300);
    };
    minIn?.addEventListener('input',handler);
    maxIn?.addEventListener('input',handler);
  }

  destroy(){
    clearTimeout(this.#rangeTimer);
    if(this.#container&&this.#bound)this.#container.removeEventListener('click',this.#bound);
    this.#container=null;
  }
}
