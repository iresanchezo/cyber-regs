/**
 * @fileoverview Vista de la página principal con hero, stats y recomendaciones
 * @module views/HomeView
 */

export class HomeView {
  /** @type {HTMLElement|null} */
  #container = null;
  /** @type {Object|null} */
  #radarChart = null;

  /**
   * Genera el HTML de la vista principal
   * @returns {string} HTML de la vista
   */
  render() {
    return `
      <div class="view" id="home-view">
        <!-- Hero -->
        <section class="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">🛡️ Plataforma de Normativas de Ciberseguridad</h1>
          <p class="hero-subtitle">
            Aprende las normativas y frameworks más importantes de ciberseguridad:
            NIS2, DORA, RGPD, ENS, ISO 27001, NIST CSF y más.
            Con quizzes interactivos, comparador y timeline histórico.
          </p>
          <div class="hero-actions">
            <button class="btn btn-primary btn-lg" data-view="regulations" aria-label="Ver todas las normativas">
              📋 Ver Normativas
            </button>
            <button class="btn btn-outline btn-lg" data-view="quiz" aria-label="Iniciar quiz de ciberseguridad">
              🎯 Iniciar Quiz
            </button>
          </div>
        </section>

        <!-- Stats Row -->
        <section class="grid grid-4 mb-8" aria-label="Estadísticas de la plataforma">
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true">📋</div>
            <div class="stat-value">6</div>
            <div class="stat-label">Normativas</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true">🔧</div>
            <div class="stat-value">8</div>
            <div class="stat-label">Frameworks</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true">🎯</div>
            <div class="stat-value">32+</div>
            <div class="stat-label">Preguntas</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon" aria-hidden="true">📅</div>
            <div class="stat-value">24</div>
            <div class="stat-label">Eventos Timeline</div>
          </div>
        </section>

        <!-- Por qué aprender -->
        <section class="mb-8" aria-labelledby="why-title">
          <div class="section-header">
            <h2 id="why-title">¿Por qué aprender sobre normativas de ciberseguridad?</h2>
            <p>El incumplimiento regulatorio puede costar millones. El conocimiento te protege.</p>
          </div>
          <div class="grid grid-3">
            <div class="feature-card">
              <div class="feature-icon" aria-hidden="true">💰</div>
              <h3 class="feature-title">Evita multas millonarias</h3>
              <p class="feature-desc">RGPD y NIS2 pueden imponer sanciones de hasta 20M€ o el 4% del volumen global de negocio. DORA puede paralizar operaciones financieras.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" aria-hidden="true">🏆</div>
              <h3 class="feature-title">Impulsa tu carrera</h3>
              <p class="feature-desc">Los profesionales con conocimiento en normativas y frameworks son los más demandados en ciberseguridad. ISO 27001 Lead Auditor puede doblar tu salario.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" aria-hidden="true">🔐</div>
              <h3 class="feature-title">Protege tu organización</h3>
              <p class="feature-desc">Los frameworks como NIST CSF y CIS Controls ofrecen hoja de ruta probada para mejorar la postura de seguridad contra amenazas reales.</p>
            </div>
          </div>
        </section>

        <!-- Recomendaciones por perfil -->
        <section class="mb-8" aria-labelledby="profiles-title">
          <div class="section-header">
            <h2 id="profiles-title">Recomendaciones por perfil organizacional</h2>
            <p>Cada organización tiene un punto de partida diferente. Encuentra el tuyo.</p>
          </div>
          <div class="grid grid-3">
            <div class="card">
              <div class="card-header colored" style="background: linear-gradient(135deg, #8b5cf6, #6366f1);">
                <span class="card-icon" aria-hidden="true">🏦</span>
                <div>
                  <h3 class="card-title">Empresa Financiera</h3>
                  <p class="card-subtitle">Bancos, seguros, inversión</p>
                </div>
              </div>
              <div class="card-body">
                <p class="text-sm text-muted mb-4">Prioridad: cumplimiento DORA desde enero 2025</p>
                <div class="flex-wrap">
                  <button class="chip chip-sm" data-view="frameworks" data-id="dora" aria-label="Ver DORA">🔷 DORA</button>
                  <button class="chip chip-sm" data-view="frameworks" data-id="nist-csf" aria-label="Ver NIST CSF">🏛️ NIST CSF</button>
                  <button class="chip chip-sm" data-view="frameworks" data-id="iso27001" aria-label="Ver ISO 27001">📜 ISO 27001</button>
                  <button class="chip chip-sm" data-view="frameworks" data-id="iso27005" aria-label="Ver ISO 27005">🎯 ISO 27005</button>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header colored" style="background: linear-gradient(135deg, #ef4444, #dc2626);">
                <span class="card-icon" aria-hidden="true">🏛️</span>
                <div>
                  <h3 class="card-title">Administración Pública</h3>
                  <p class="card-subtitle">AAPP y sector público español</p>
                </div>
              </div>
              <div class="card-body">
                <p class="text-sm text-muted mb-4">Prioridad: ENS obligatorio + transposición NIS2</p>
                <div class="flex-wrap">
                  <button class="chip chip-sm" data-view="regulations" data-id="ens" aria-label="Ver ENS">🏛️ ENS</button>
                  <button class="chip chip-sm" data-view="regulations" data-id="nis2" aria-label="Ver NIS2">🇪🇺 NIS2</button>
                  <button class="chip chip-sm" data-view="frameworks" data-id="iso27001" aria-label="Ver ISO 27001">📜 ISO 27001</button>
                  <button class="chip chip-sm" data-view="regulations" data-id="lopdgdd" aria-label="Ver LOPDGDD">📋 LOPDGDD</button>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-header colored" style="background: linear-gradient(135deg, #10b981, #059669);">
                <span class="card-icon" aria-hidden="true">🏢</span>
                <div>
                  <h3 class="card-title">Empresa con Datos Personales</h3>
                  <p class="card-subtitle">Retail, salud, RRHH, legal</p>
                </div>
              </div>
              <div class="card-body">
                <p class="text-sm text-muted mb-4">Prioridad: RGPD + LOPDGDD + seguridad robusta</p>
                <div class="flex-wrap">
                  <button class="chip chip-sm" data-view="regulations" data-id="gdpr" aria-label="Ver RGPD">🔒 RGPD</button>
                  <button class="chip chip-sm" data-view="regulations" data-id="lopdgdd" aria-label="Ver LOPDGDD">📋 LOPDGDD</button>
                  <button class="chip chip-sm" data-view="frameworks" data-id="iso27001" aria-label="Ver ISO 27001">📜 ISO 27001</button>
                  <button class="chip chip-sm" data-view="frameworks" data-id="cis-controls" aria-label="Ver CIS Controls">🛡️ CIS Controls</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Radar Chart + Quick Access -->
        <section class="grid grid-2 mb-8" aria-label="Cobertura regulatoria y acceso rápido">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title" id="radar-title">📊 Cobertura Regulatoria por Dimensión</h3>
            </div>
            <div class="card-body">
              <div style="position:relative; height:280px;">
                <canvas id="radar-chart" aria-label="Gráfico radar de cobertura regulatoria" role="img"></canvas>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">⚡ Acceso Rápido</h3>
            </div>
            <div class="card-body">
              <div class="section-header mt-2 mb-4">
                <h4 class="text-sm text-muted font-bold" style="text-transform:uppercase;letter-spacing:.06em;">Normativas</h4>
              </div>
              <div class="grid-auto-sm grid" style="grid-template-columns:repeat(2,1fr);gap:.5rem;margin-bottom:1rem;">
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="regulations" data-open="nis2">🇪🇺 NIS2</button>
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="regulations" data-open="dora">💼 DORA</button>
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="regulations" data-open="gdpr">🔒 RGPD</button>
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="regulations" data-open="ens">🏛️ ENS</button>
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="regulations" data-open="budapest">⚖️ Budapest</button>
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="regulations" data-open="lopdgdd">📋 LOPDGDD</button>
              </div>
              <div class="section-header mb-4">
                <h4 class="text-sm text-muted font-bold" style="text-transform:uppercase;letter-spacing:.06em;">Frameworks</h4>
              </div>
              <div class="grid" style="grid-template-columns:repeat(2,1fr);gap:.5rem;">
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="frameworks" data-open="nist-csf">🏛️ NIST CSF</button>
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="frameworks" data-open="iso27001">📜 ISO 27001</button>
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="frameworks" data-open="cis-controls">🛡️ CIS v8</button>
                <button class="btn btn-ghost" style="justify-content:flex-start;padding:.5rem .75rem;border:1px solid var(--color-border);border-radius:var(--radius-md);" data-view="frameworks" data-open="mitre-attack">⚔️ ATT&CK</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  /**
   * Inserta la vista en el DOM y inicializa Chart.js
   * @param {HTMLElement} container
   */
  mount(container) {
    this.#container = container;
    container.innerHTML = this.render();
    this.#initRadarChart();
  }

  /**
   * Inicializa el gráfico radar con Chart.js
   * @private
   */
  #initRadarChart() {
    const canvas = document.getElementById('radar-chart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.#radarChart) {
      this.#radarChart.destroy();
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    this.#radarChart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['Gestión\nde Riesgos', 'Protección\nde Datos', 'Respuesta\nIncidentes', 'Continuidad\nNegocio', 'Cadena de\nSuministro', 'Gobernanza'],
        datasets: [
          {
            label: 'NIS2',
            data: [90, 60, 95, 85, 80, 75],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.1)',
            pointBackgroundColor: '#3b82f6'
          },
          {
            label: 'DORA',
            data: [95, 50, 90, 95, 90, 85],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139,92,246,0.1)',
            pointBackgroundColor: '#8b5cf6'
          },
          {
            label: 'RGPD',
            data: [70, 100, 80, 40, 50, 70],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.1)',
            pointBackgroundColor: '#10b981'
          },
          {
            label: 'ENS',
            data: [85, 75, 80, 80, 60, 90],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.1)',
            pointBackgroundColor: '#ef4444'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: textColor, font: { size: 11 }, boxWidth: 12 } }
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25, color: textColor, font: { size: 10 }, backdropColor: 'transparent' },
            grid: { color: gridColor },
            angleLines: { color: gridColor },
            pointLabels: { color: textColor, font: { size: 10 } }
          }
        }
      }
    });
  }

  /**
   * Destruye los recursos de la vista
   */
  destroy() {
    if (this.#radarChart) {
      this.#radarChart.destroy();
      this.#radarChart = null;
    }
  }
}
