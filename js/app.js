'use strict';

import { AppController } from './controllers/AppController.js';

async function bootstrap() {
  try {
    const app = new AppController();
    await app.init();
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
      window.__app = app;
    }
  } catch (err) {
    console.error('[app] Error al iniciar la aplicacion:', err);
    document.getElementById('app-root').innerHTML = `
      <div class="empty-state">
        <span aria-hidden="true">warning</span>
        <h2>Error al cargar la aplicacion</h2>
        <p>${err.message}</p>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}