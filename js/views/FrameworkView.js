'use strict';
export class FrameworkView {
  #container=null;#callbacks={};#bound=null;

  mount(container,opts){
    this.#container=container;
    this.#callbacks=opts;
    container.innerHTML=this.#shell(opts);
    this.#bind();
    if(opts.startInComparator)this.#tab('comparator');
  }

  update(filtered){
    const g=this.#container?.querySelector('.framework-grid');
    const c=this.#container?.querySelector('.results-counter');
    if(!g)return;
    g.innerHTML=filtered.length
      ? filtered.map(f=>this.#card(f)).join('')
      : '<div class="empty-state"><h3>Sin resultados</h3></div>';
    if(c)c.textContent=filtered.length+' frameworks';
  }

  updateComparatorResult(html){
    const el=this.#container?.querySelector('#comparator-result');
    if(el)el.innerHTML=html;
  }

  renderDetail(fw) {
    const links = fw.officialLinks || [];
    const secs  = fw.accordionSections || [];
    const badges = [
      `<span class="badge badge-primary">${fw.type}</span>`,
      `<span class="badge badge-neutral">${fw.scope}</span>`,
      `<span class="badge ${fw.certifiable ? 'badge-success' : 'badge-warning'}">${fw.certifiable ? 'Certificable' : 'No certificable'}</span>`,
      `<span class="badge badge-info">${fw.year}</span>`
    ].join('');

    const linksHtml = links.length ? `
      <div class="modal-section">
        <h4>Referencias oficiales</h4>
        <div class="flex-wrap" style="gap:.5rem;">
          ${links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer"
            class="btn btn-outline btn-sm" style="font-size:.8rem;">🔗 ${l.label}</a>`).join('')}
        </div>
      </div>` : '';

    const secsHtml = secs.map(sec => `
      <div class="modal-section">
        <h4>${sec.icon || ''} ${sec.title}</h4>
        <div class="accordion" role="list">
          ${sec.items.map((item, i) => `
            <div class="accordion-item" role="listitem">
              <button class="accordion-header" aria-expanded="false"
                      aria-controls="fw-sec-${sec.id}-${i}" data-accordion>
                <span>${item.title}${item.badge ? ` <span class="badge badge-info" style="margin-left:.5rem;font-size:.7rem;">${item.badge}</span>` : ''}</span>
                <span class="accordion-chevron" aria-hidden="true">▼</span>
              </button>
              <div class="accordion-body" id="fw-sec-${sec.id}-${i}" hidden>
                ${item.desc}
              </div>
            </div>`).join('')}
        </div>
      </div>`).join('');

    const regsHtml = fw.relatedRegulations?.length ? `
      <div class="modal-section">
        <h4>Normativas relacionadas</h4>
        <div class="flex-wrap">
          ${fw.relatedRegulations.map(id => `<span class="chip">${id}</span>`).join('')}
        </div>
      </div>` : '';

    return `
      <div class="modal-header" style="background:linear-gradient(135deg,${fw.color}22,transparent);">
        <div class="flex-gap" style="align-items:flex-start;">
          <span style="font-size:3rem;line-height:1;" aria-hidden="true">${fw.icon}</span>
          <div>
            <h2 id="modal-title">${fw.name}</h2>
            <div class="flex-wrap mt-2">${badges}</div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="modal-section"><h4>Descripcion</h4><p>${fw.description}</p></div>
        ${linksHtml}
        ${secsHtml}
        ${regsHtml}
      </div>`;
  }

  renderComparison(cmp){
    if(!cmp)return'';
    const a=cmp.frameworks[0], b=cmp.frameworks[1];
    let rows='';
    for(const [k,v] of Object.entries(cmp.rows)){
      rows+='<tr><th scope="row">'+k+'</th><td>'+(v[0]||'---')+'</td><td>'+(v[1]||'---')+'</td></tr>';
    }
    return '<div class="comparator-result-wrap">'
      +'<h3 class="comparator-result-title">'+a.name+' <span>vs</span> '+b.name+'</h3>'
      +'<div class="comparator-table-wrap">'
      +'<table class="comparator-table"><thead><tr>'
      +'<th>Criterio</th>'
      +'<th><span style="font-size:1.5rem">'+a.icon+'</span> '+a.name+'</th>'
      +'<th><span style="font-size:1.5rem">'+b.icon+'</span> '+b.name+'</th>'
      +'</tr></thead><tbody>'+rows+'</tbody></table></div></div>';
  }

  renderRecommendations(profile,fws){
    const cards=fws.map((f,i)=>
      '<div class="rec-card"><span class="rec-rank">#'+(i+1)+'</span>'
      +'<h3>'+f.name+'</h3></div>'
    ).join('');
    return '<div class="recommendations-modal"><h2>Recomendaciones para '+profile+'</h2>'
      +'<div class="rec-grid">'+cards+'</div></div>';
  }

  #card(fw){
    return '<article class="card" role="listitem" data-fw-id="'+fw.id+'">'
      +'<div class="card-header"><div>'
      +'<h3 class="card-title">'+fw.name+'</h3>'
      +(fw.fullName?'<p class="card-subtitle">'+fw.fullName+'</p>':'')
      +'</div><div>'
      +'<span class="badge">'+fw.type+'</span>'
      +(fw.certifiable?'<span class="badge badge--success">Certificable</span>':'')
      +'</div></div>'
      +'<div class="card-body"><p class="card-desc">'+(fw.description||'').slice(0,120)+'</p></div>'
      +'<div class="card-footer">'
      +'<button class="btn btn-outline btn-sm" data-detail="'+fw.id+'">Ver detalle</button>'
      +'</div></article>';
  }

  #shell(o){
    const chips=o.types.map(t=>'<button class="filter-chip" data-type="'+t+'">'+t+'</button>').join('');
    const cards=o.frameworks.map(f=>this.#card(f)).join('');
    return '<div class="view-header"><h2 class="section-heading">Frameworks de Ciberseguridad</h2></div>'
      +'<div class="tabs" role="tablist">'
      +'<button class="tab active" data-tab="list">Catalogo</button>'
      +'<button class="tab" data-tab="comparator">Comparador</button>'
      +'<button class="tab" data-tab="recommend">Recomendaciones</button>'
      +'</div>'
      +'<div id="panel-list" role="tabpanel">'
      +'<div class="filter-bar"><div class="filter-chips">'
      +'<button class="filter-chip active" data-type="all">Todos</button>'+chips
      +'</div>'
      +'<label><input type="checkbox" id="cert-toggle"> Solo certificables</label>'
      +'<input type="search" id="fw-search" class="search-inline-input" placeholder="Buscar...">'
      +'</div>'
      +'<div class="results-bar"><span class="results-counter">'+o.frameworks.length+' frameworks</span></div>'
      +'<div class="framework-grid" role="list">'+cards+'</div></div>'
      +'<div id="panel-comparator" role="tabpanel" hidden>'+this.#comparatorPanel(o.frameworks)+'</div>'
      +'<div id="panel-recommend" role="tabpanel" hidden>'+this.#recommendPanel()+'</div>';
  }

  #comparatorPanel(frameworks){
    const opts=frameworks.map(f=>'<option value="'+f.id+'">'+f.icon+' '+f.name+'</option>').join('');
    return '<div class="comparator-panel">'
      +'<p class="comparator-intro">Selecciona dos frameworks para ver una tabla comparativa detallada.</p>'
      +'<div class="comparator-selects">'
      +'<div class="comparator-select-group">'
      +'<label class="config-label" for="fw-cmp-a">Framework A</label>'
      +'<select id="fw-cmp-a" class="select"><option value="">-- Selecciona --</option>'+opts+'</select>'
      +'</div>'
      +'<div class="comparator-vs" aria-hidden="true">VS</div>'
      +'<div class="comparator-select-group">'
      +'<label class="config-label" for="fw-cmp-b">Framework B</label>'
      +'<select id="fw-cmp-b" class="select"><option value="">-- Selecciona --</option>'+opts+'</select>'
      +'</div>'
      +'</div>'
      +'<div id="comparator-result" aria-live="polite"></div>'
      +'</div>';
  }

  #recommendPanel(){
    const ps=[
      ['financiero','Sector financiero'],['administracion','Admin. Publica'],
      ['datos_personales','Datos personales'],['salud','Salud'],['generico','Generica']
    ];
    return '<div class="recommend-panel"><h3>Recomendaciones</h3><div class="profile-grid">'
      +ps.map(p=>'<button class="profile-card" data-profile="'+p[0]+'">'+p[1]+'</button>').join('')
      +'</div></div>';
  }

  #tab(id){
    this.#container?.querySelectorAll('.tab').forEach(t=>{
      const a=t.dataset.tab===id;
      t.classList.toggle('active',a);
      t.setAttribute('aria-selected',String(a));
    });
    this.#container?.querySelectorAll('[role="tabpanel"]').forEach(p=>{
      p.hidden=p.id!=='panel-'+id;
    });
  }

  #bind(){
    let sd;
    this.#bound=(e)=>{
      const tab=e.target.closest('[data-tab]');
      if(tab){this.#tab(tab.dataset.tab);return;}
      const tc=e.target.closest('[data-type]');
      if(tc){this.#callbacks.onFilterType(tc.dataset.type);return;}
      if(e.target.id==='cert-toggle'){
        this.#callbacks.onFilterCertifiable(e.target.checked||null);return;
      }
      const dt=e.target.closest('[data-detail]');
      if(dt){this.#callbacks.onDetail(dt.dataset.detail);return;}
      const pr=e.target.closest('[data-profile]');
      if(pr){this.#callbacks.onRecommend(pr.dataset.profile);return;}
    };
    this.#container.addEventListener('click',this.#bound);
    this.#container.querySelector('#fw-search')?.addEventListener('input',e=>{
      clearTimeout(sd);sd=setTimeout(()=>this.#callbacks.onSearch(e.target.value),250);
    });
    const onChange=()=>{
      const a=this.#container.querySelector('#fw-cmp-a')?.value;
      const b=this.#container.querySelector('#fw-cmp-b')?.value;
      this.#callbacks.onComparatorChange?.(a||null,b||null);
    };
    this.#container.querySelector('#fw-cmp-a')?.addEventListener('change',onChange);
    this.#container.querySelector('#fw-cmp-b')?.addEventListener('change',onChange);
  }

  destroy(){
    if(this.#container&&this.#bound)
      this.#container.removeEventListener('click',this.#bound);
    this.#container=null;
  }
}
