# CyberRegs

CyberRegs es una plataforma educativa web en español orientada a la ciberseguridad, el cumplimiento normativo y los marcos de referencia. Su objetivo es ayudar a usuarios y profesionales a entender de forma visual y práctica las principales normativas, frameworks y buenas prácticas relacionadas con la seguridad de la información.

## ¿Qué ofrece?

La aplicación presenta información organizada en varias secciones:

- Inicio: visión general del proyecto y del contexto regulatorio.
- Normativas: explicaciones detalladas sobre marcos como NIS2, DORA, GDPR y el Convenio de Budapest.
- Frameworks: contenidos sobre marcos como NIST CSF 2.0, ISO 27001, ISO 27002 y ISO 27005.
- Comparador: comparación entre distintos marcos y regulaciones.
- Timeline: línea temporal de eventos y obligaciones relevantes.
- Quiz: cuestionario interactivo para reforzar el aprendizaje.
- Mi progreso: seguimiento del avance del usuario.

## Contenido principal

El proyecto integra contenidos técnicos y regulatorios sobre:

- Ciberseguridad y resiliencia operativa.
- Cumplimiento normativo y obligaciones de notificación.
- Gestión de riesgos y controles de seguridad.
- Privacidad y protección de datos personales.
- Seguridad en la cadena de suministro.
- Buenas prácticas de auditoría, continuidad y respuesta a incidentes.

## Características

- Interfaz web sencilla y responsive.
- Búsqueda global de contenidos.
- Modo oscuro.
- Navegación por vistas basada en JavaScript.
- Datos organizados en archivos JavaScript para facilitar su mantenimiento.
- Diseño orientado a la educación y al aprendizaje progresivo.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript modular
- Chart.js para visualizaciones
- Arquitectura SPA (Single Page Application) sin framework adicional

## Estructura del proyecto

```text
assets/          Archivos estáticos y recursos visuales
css/              Estilos del sitio
js/               Lógica de la aplicación
  app.js          Punto de entrada
  controllers/    Controladores de vistas
  data/           Contenidos y datos del proyecto
  models/         Modelos de datos
  services/       Servicios auxiliares
  views/          Vistas de la interfaz
index.html        Página principal
```

## Cómo ejecutar el proyecto

Como es una aplicación web estática, puedes abrirlo directamente en el navegador o servirlo localmente.

### Opción 1: abrir directamente

Abre el archivo `index.html` en tu navegador.

### Opción 2: servirlo localmente

Desde la raíz del proyecto, puedes ejecutar:

```bash
python -m http.server 8000
```

Y luego abrir:

```text
http://localhost:8000/
```

## Notas

Este proyecto está pensado como una herramienta educativa y de referencia para personas interesadas en ciberseguridad, cumplimiento normativo y marcos de gobierno de TI.

## Autor

Proyecto web desarrollado como plataforma de aprendizaje sobre normativas y frameworks de ciberseguridad.
