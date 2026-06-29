'use strict';
import { FrameworkModel } from '../models/FrameworkModel.js';
import { FrameworkView }  from '../views/FrameworkView.js';

export class FrameworkController {
  #container = null; #appCtrl = null; #options = {};
  #model = null; #view = null; #handlers = {};

  constructor(container, appCtrl, options = {}) {
    this.#container = container; this.#appCtrl = appCtrl; this.#options = options;
  }

  async init() {
    const raw = await this.#appCtrl.dataService.getFrameworks();
    this.#model = FrameworkModel.create(raw);
    this.#view  = new FrameworkView();
    this.#model.on('change', f => this.#view.update(f));
    this.#view.mount(this.#container, {
      frameworks:          this.#model.getAll(),
      types:               this.#model.getTypes(),
      startInComparator:   this.#options.startInComparator ?? false,
      onFilterType:        t      => this.handleFilterType(t),
      onFilterCertifiable: v      => this.handleFilterCertifiable(v),
      onSearch:            q      => this.handleSearch(q),
      onDetail:            id     => this.handleDetailClick(id),
      onComparatorChange:  (a, b) => this.handleComparatorChange(a, b),
      onRecommend:         p      => this.handleRecommendation(p),
    });
  }

  handleFilterType(t)        { this.#model.filterByType(t); }
  handleFilterCertifiable(v) { this.#model.filterByCertifiable(v); }
  handleSearch(q)            { this.#model.search(q); }

  handleDetailClick(id) {
    const fw = this.#model.getById(id);
    if (!fw) { this.#appCtrl.showToast('No encontrado','error'); return; }
    const html = this.#view.renderDetail(fw, { onRelatedRegulation: () => {
      this.#appCtrl.closeModal();
      document.querySelector('[data-view=regulations]')?.click();
    }});
    this.#appCtrl.openModal(html, fw.name);
  }

  handleComparatorChange(idA, idB) {
    if (!idA || !idB) { this.#view.updateComparatorResult(''); return; }
    if (idA === idB) {
      this.#view.updateComparatorResult('<p class="comparator-same-warn">Selecciona dos frameworks diferentes.</p>');
      return;
    }
    const cmp = this.#model.compareTwo(idA, idB);
    this.#view.updateComparatorResult(this.#view.renderComparison(cmp));
  }

  handleRecommendation(profile) {
    const fws = this.#model.getRecommendationsForProfile(profile);
    this.#appCtrl.openModal(this.#view.renderRecommendations(profile, fws), 'Recomendaciones');
  }

  destroy() { this.#model?.offAll(); this.#view?.destroy?.(); }
}
