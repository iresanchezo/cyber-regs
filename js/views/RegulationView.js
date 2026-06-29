/**
 * @fileoverview Vista de normativas con grid, filtros y modal de detalle
 * @module views/RegulationView
 */

export class RegulationView {
  /**
   * Genera el HTML principal de la sección normativas
   * @param {Array<Object>} regulations - Lista de normativas a mostrar
   * @param {string} activeCategory - Categoría activa en el filtro
   * @returns {string}
   */
  render(regulations = [], activeCategory = 'all') {
    return `
      <div class="view" id="regulations-view">
        <div class="section-header">
          <h2>📋 Normativas de Ciberseguridad</h2>
          <p>Directivas europeas y legislación nacional que regulan la ciberseguridad y la protección de datos.</p>
        </div>

        <!-- Filtros -->
        <div class="tabs" role="tablist" aria-label="Filtrar normativas por categoría">
          <button class="tab-btn ${activeCategory === 'all' ? 'active' : ''}"
            role="tab" aria-selected="${activeCategory === 'all'}"
            data-category="all" aria-controls="regulations-grid">
            Todas (${regulations.length})
          </button>
          <button class="tab-btn ${activeCategory === 'Internacional' ? 'active' : ''}"
            role="tab" aria-selected="${activeCategory === 'Internacional'}"
            data-category="Internacional">
            🇪🇺 Internacional
          </button>
          <button class="tab-btn ${activeCategory === 'Nacional' ? 'active' : ''}"
            role="tab" aria-selected="${activeCategory === 'Nacional'}"
            data-category="Nacional">
            🇪🇸 Nacional
          </button>
        </div>

        <!-- Grid de normativas -->
        <div id="regulations-grid" role="tabpanel">
          ${regulations.length > 0
            ? `<div class="grid grid-auto">${regulations.map(r => this.renderCard(r)).join('')}</div>`
            : this.#renderEmpty()
          }
        </div>
      </div>
    `;
  }

  /**
   * Genera una tarjeta de normativa
   * @param {Object} regulation
   * @returns {string}
   */
  renderCard(regulation) {
    return `
      <article class="card regulation-card" data-id="${regulation.id}" aria-label="Normativa ${regulation.name}">
        <div class="card-header colored" style="background: linear-gradient(135deg, ${regulation.color}, ${this.#darken(regulation.color)});">
          <span class="card-icon" aria-hidden="true">${regulation.icon}</span>
          <div>
            <h3 class="card-title">${regulation.name}</h3>
            <p class="card-subtitle">${regulation.shortName} · ${regulation.year}</p>
          </div>
        </div>
        <div class="card-body">
          <div class="flex-wrap mb-4">
            <span class="badge ${regulation.category === 'Internacional' ? 'badge-primary' : 'badge-danger'}">
              ${regulation.category === 'Internacional' ? '🇪🇺' : '🇪🇸'} ${regulation.category}
            </span>
            <span class="badge badge-neutral">${regulation.scope}</span>
            <span class="badge badge-success">${regulation.status}</span>
          </div>
          <p class="card-description">${regulation.description}</p>
          ${regulation.relatedFrameworks && regulation.relatedFrameworks.length > 0 ? `
            <div class="mt-4">
              <p class="text-xs text-muted mb-2">Frameworks relacionados:</p>
              <div class="flex-wrap">
                ${regulation.relatedFrameworks.map(fw => `<span class="tag">${fw}</span>`).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        <div class="card-footer">
          <button class="btn btn-primary w-full" data-action="detail" data-id="${regulation.id}" aria-label="Ver detalles de ${regulation.name}">
            Ver detalles →
          </button>
        </div>
      </article>
    `;
  }

  /**
   * Genera el HTML del modal de detalle de una normativa
   * @param {Object} regulation
   * @param {Array<Object>} [relatedFrameworks=[]] - Frameworks relacionados completos
   * @returns {string}
   */
  renderDetail(regulation, relatedFrameworks = []) {
    const sanctions = Array.isArray(regulation.sanctions) ? regulation.sanctions : [];
    return `
      <div class="modal-header" style="background: linear-gradient(135deg, ${regulation.color}22, transparent);">
        <div class="flex-gap" style="align-items:flex-start;">
          <span style="font-size:3rem;line-height:1;" aria-hidden="true">${regulation.icon}</span>
          <div>
            <h2 id="modal-title">${regulation.name}</h2>
            <div class="flex-wrap mt-2">
              <span class="badge badge-primary">${regulation.category}</span>
              <span class="badge badge-neutral">${regulation.scope}</span>
              <span class="badge badge-success">${regulation.status}</span>
              <span class="badge badge-info">${regulation.year}</span>
            </div>
            <p class="text-sm text-muted mt-3">${regulation.officialReference || ''}</p>
          </div>
        </div>
      </div>
      <div class="modal-body">

        <!-- Descripcion -->
        <div class="modal-section">
          <h4>Descripcion</h4>
          <p>${regulation.description}</p>
        </div>

        <!-- Referencias oficiales -->
        ${regulation.officialLinks?.length ? `
        <div class="modal-section">
          <h4>Referencias oficiales</h4>
          <div class="flex-wrap" style="gap:.5rem;">
            ${regulation.officialLinks.map(l => `
              <a href="${l.url}" target="_blank" rel="noopener noreferrer"
                 class="btn btn-outline btn-sm" style="font-size:.8rem;">
                🔗 ${l.label}
              </a>`).join('')}
          </div>
        </div>` : ''}

        <!-- Objetivos -->
        ${regulation.objectives?.length ? `
        <div class="modal-section">
          <h4>Objetivos principales</h4>
          <ul style="list-style:disc;padding-left:1.25rem;color:var(--color-text-muted);font-size:.9rem;line-height:1.8;">
            ${regulation.objectives.map(o => `<li>${o}</li>`).join('')}
          </ul>
        </div>` : ''}

        <!-- Requisitos clave -->
        ${regulation.requirements?.length ? `
        <div class="modal-section">
          <h4>Requisitos clave</h4>
          <div class="accordion" role="list">
            ${regulation.requirements.map((req, i) => `
              <div class="accordion-item" role="listitem">
                <button class="accordion-header" aria-expanded="false"
                        aria-controls="req-${regulation.id}-${i}" data-accordion>
                  <span>📌 ${req.title}</span>
                  <span class="accordion-chevron" aria-hidden="true">▼</span>
                </button>
                <div class="accordion-body" id="req-${regulation.id}-${i}" hidden>
                  ${req.desc || req.description || ''}
                </div>
              </div>`).join('')}
          </div>
        </div>` : ''}

        <!-- Secciones desplegables adicionales -->
        ${regulation.accordionSections?.length ? regulation.accordionSections.map(sec => `
        <div class="modal-section">
          <h4>${sec.icon || ''} ${sec.title}</h4>
          <div class="accordion" role="list">
            ${sec.items.map((item, i) => `
              <div class="accordion-item" role="listitem">
                <button class="accordion-header" aria-expanded="false"
                        aria-controls="sec-${sec.id}-${i}" data-accordion>
                  <span>${item.title}${item.badge ? ` <span class="badge badge-info" style="margin-left:.5rem;font-size:.7rem;">${item.badge}</span>` : ''}</span>
                  <span class="accordion-chevron" aria-hidden="true">▼</span>
                </button>
                <div class="accordion-body" id="sec-${sec.id}-${i}" hidden>
                  ${item.desc}
                </div>
              </div>`).join('')}
          </div>
        </div>`).join('') : ''}

        <!-- Regimen sancionador -->
        ${sanctions.length ? `
        <div class="modal-section">
          <h4>Regimen sancionador</h4>
          <div class="table-wrapper" style="overflow-x:auto;">
            <table>
              <thead><tr><th>Tipo</th><th>Sancion maxima</th><th>Ambito</th></tr></thead>
              <tbody>
                ${sanctions.map(s => `
                  <tr>
                    <td><strong>${s.type}</strong></td>
                    <td><span class="badge badge-danger" style="white-space:nowrap;">${s.max}</span></td>
                    <td class="text-sm" style="color:var(--color-text-muted);">${s.desc}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>` : ''}

        <!-- Frameworks relacionados -->
        ${regulation.relatedFrameworks?.length ? `
        <div class="modal-section">
          <h4>Frameworks relacionados</h4>
          <div class="flex-wrap">
            ${regulation.relatedFrameworks.map(fwId => {
              const fw = relatedFrameworks.find(f => f.id === fwId);
              return fw
                ? `<button class="chip" data-view="frameworks" data-open="${fwId}">${fw.icon || '🔧'} ${fw.shortName || fw.name}</button>`
                : `<span class="chip">${fwId}</span>`;
            }).join('')}
          </div>
        </div>` : ''}
      </div>
    `;
  }

  /**
   * Renderiza el estado vacío
   * @returns {string}
   * @private
   */
  #renderEmpty() {
    return `
      <div class="empty-state">
        <div class="empty-icon" aria-hidden="true">🔍</div>
        <h3>No se encontraron normativas</h3>
        <p>Prueba con un filtro diferente o limpia la búsqueda.</p>
      </div>
    `;
  }

  /**
   * Oscurece un color hex para gradientes
   * @param {string} hex
   * @returns {string}
   * @private
   */
  #darken(hex) {
    try {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${Math.max(0,r-30)},${Math.max(0,g-30)},${Math.max(0,b-30)})`;
    } catch {
      return hex;
    }
  }

  /**
   * Inserta la vista en el DOM
   * @param {HTMLElement} container
   * @param {Array<Object>} regulations
   * @param {string} [activeCategory='all']
   */
  mount(container, regulations = [], activeCategory = 'all') {
    container.innerHTML = this.render(regulations, activeCategory);
  }
}
