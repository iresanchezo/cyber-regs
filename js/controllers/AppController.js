'use strict';
import { StorageService }       from '../services/StorageService.js';
import { SearchService }        from '../services/SearchService.js';
import { DataService }          from '../services/DataService.js';
import { RegulationController } from './RegulationController.js';
import { FrameworkController }  from './FrameworkController.js';
import { QuizController }       from './QuizController.js';
import { TimelineController }   from './TimelineController.js';
export class AppController {
  #currentView=null;#activeController=null;#searchService=null;#dataService=null;#searchTimer=null;#handlers={};
  #root=null;#navLinks=null;#searchInput=null;#searchDropdown=null;#darkToggle=null;
  #modalOverlay=null;#modalContent=null;#modalClose=null;#toastContainer=null;#hamburger=null;#mainNav=null;
  get dataService(){return this.#dataService;}
  get currentView(){return this.#currentView;}
  async init(){
    this.#root=document.getElementById('app-root');
    this.#navLinks=document.querySelectorAll('.nav-link[data-view]');
    this.#searchInput=document.getElementById('global-search');
    this.#searchDropdown=document.getElementById('search-results');
    this.#darkToggle=document.getElementById('dark-mode-toggle');
    this.#modalOverlay=document.getElementById('modal-overlay');
    this.#modalContent=document.getElementById('modal-content');
    this.#modalClose=document.getElementById('modal-close');
    this.#toastContainer=document.getElementById('toast-container');
    this.#hamburger=document.getElementById('nav-hamburger');
    this.#mainNav=document.getElementById('main-nav');
    this.#dataService=new DataService();
    this.#searchService=new SearchService();
    const[regs,fws]=await Promise.all([this.#dataService.getRegulations(),this.#dataService.getFrameworks()]);
    this.#searchService.buildIndex(regs,fws);
    const t=StorageService.get('theme','light');
    document.documentElement.setAttribute('data-theme',t);
    this.#bindEvents();
    this.#navigateTo('home');
  }
  #bindEvents(){
    this.#handlers.nav=(e)=>{const l=e.target.closest('[data-view]');if(l){e.preventDefault();this.#navigateTo(l.dataset.view);this.#mainNav?.classList.remove('open');}};
    this.#handlers.dark=()=>{const n=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',n);StorageService.set('theme',n);};
    this.#handlers.search=(e)=>{clearTimeout(this.#searchTimer);this.#searchTimer=setTimeout(()=>this.#runSearch(e.target.value),250);};
    this.#handlers.outside=(e)=>{if(!this.#searchInput?.contains(e.target)&&!this.#searchDropdown?.contains(e.target))this.#closeSearch();};
    this.#handlers.esc=(e)=>{if(e.key==='Escape')this.closeModal();};
    this.#handlers.burger=()=>this.#mainNav?.classList.toggle('open');
    document.addEventListener('click',this.#handlers.nav);
    document.addEventListener('click',this.#handlers.outside);
    document.addEventListener('keydown',this.#handlers.esc);
    this.#darkToggle?.addEventListener('click',this.#handlers.dark);
    this.#searchInput?.addEventListener('input',this.#handlers.search);
    this.#modalClose?.addEventListener('click',()=>this.closeModal());
    this.#modalOverlay?.addEventListener('click',(e)=>{if(e.target===this.#modalOverlay)this.closeModal();});
    this.#hamburger?.addEventListener('click',this.#handlers.burger);
    this.#handlers.accordion=(e)=>{
      const btn=e.target.closest('[data-accordion]');
      if(!btn)return;
      const item=btn.closest('.accordion-item');
      const expanded=btn.getAttribute('aria-expanded')==='true';
      btn.setAttribute('aria-expanded',String(!expanded));
      item?.classList.toggle('open',!expanded);
      const bodyEl=document.getElementById(btn.getAttribute('aria-controls'));
      if(bodyEl)bodyEl.hidden=expanded;
    };
    document.addEventListener('click',this.#handlers.accordion);
  }
  #navigateTo(view){
    if(view===this.#currentView)return;
    this.#activeController?.destroy?.();
    this.#activeController=null;
    this.#root.innerHTML='<div class="loader-wrap"><div class="spinner"></div></div>';
    this.#navLinks.forEach(l=>l.classList.toggle('active',l.dataset.view===view));
    this.#currentView=view;
    StorageService.set('last_view',view);
    this.#mountView(view);
  }
  async #mountView(view){
    switch(view){
      case 'home':{const{HomeView}=await import('../views/HomeView.js');new HomeView().mount(this.#root,{onNavigate:v=>this.#navigateTo(v)});break;}
      case 'regulations':{const c=new RegulationController(this.#root,this);await c.init();this.#activeController=c;break;}
      case 'frameworks':case 'comparator':{const c=new FrameworkController(this.#root,this,{startInComparator:view==='comparator'});await c.init();this.#activeController=c;break;}
      case 'quiz':{const c=new QuizController(this.#root,this);await c.init();this.#activeController=c;break;}
      case 'timeline':{const c=new TimelineController(this.#root,this);await c.init();this.#activeController=c;break;}
      case 'dashboard':{const{DashboardView}=await import('../views/DashboardView.js');const dv=new DashboardView();dv.mount(this.#root);dv.bindEvents(v=>this.#navigateTo(v));break;}
      default:this.#root.innerHTML='<div class="empty-state"><h3>Vista no encontrada</h3></div>';
    }
  }
  #runSearch(q){
    if(q.trim().length<2){this.#closeSearch();return;}
    const res=this.#searchService.search(q,8);
    if(!this.#searchDropdown)return;
    this.#searchDropdown.innerHTML=res.length?res.map(r=>`<div class="search-result-item" data-type="${r.type}" tabindex="0"><span class="search-result-type">${r.type==='regulation'?'Normativa':'Framework'}</span><div class="search-result-name">${r.name}</div></div>`).join(''):'<div class="search-result-item">Sin resultados</div>';
    this.#searchDropdown.querySelectorAll('.search-result-item[data-type]').forEach(el=>el.addEventListener('click',()=>{this.#closeSearch();this.#searchInput.value='';this.#navigateTo(el.dataset.type==='regulation'?'regulations':'frameworks');}));
    this.#searchDropdown.classList.add('open');
  }
  #closeSearch(){this.#searchDropdown?.classList.remove('open');if(this.#searchDropdown)this.#searchDropdown.innerHTML='';}
  openModal(html,title=''){if(!this.#modalOverlay)return;this.#modalContent.innerHTML=html;this.#modalOverlay.classList.add('open');this.#modalOverlay.setAttribute('aria-hidden','false');if(title)this.#modalOverlay.setAttribute('aria-label',title);document.body.style.overflow='hidden';}
  closeModal(){if(!this.#modalOverlay)return;this.#modalOverlay.classList.remove('open');this.#modalOverlay.setAttribute('aria-hidden','true');this.#modalContent.innerHTML='';document.body.style.overflow='';}
  showToast(message,type='info',duration=3500){const t=document.createElement('div');t.className=`toast ${type}`;t.setAttribute('role','alert');t.innerHTML=`<span class="toast-message">${message}</span>`;this.#toastContainer?.appendChild(t);const rm=()=>{t.style.opacity='0';setTimeout(()=>t.remove(),300);};t.addEventListener('click',rm);setTimeout(rm,duration);}
  destroy(){clearTimeout(this.#searchTimer);this.#activeController?.destroy?.();document.removeEventListener('click',this.#handlers.nav);document.removeEventListener('click',this.#handlers.outside);document.removeEventListener('click',this.#handlers.accordion);document.removeEventListener('keydown',this.#handlers.esc);this.#darkToggle?.removeEventListener('click',this.#handlers.dark);this.#searchInput?.removeEventListener('input',this.#handlers.search);}
}