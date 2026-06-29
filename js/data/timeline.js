/**
 * @fileoverview Datos del timeline histórico de normativas y frameworks de ciberseguridad
 * @module data/timeline
 */

/** @type {Array<Object>} */
export const timelineData = [
  {
    id: 't001',
    year: 1995,
    title: 'Directiva 95/46/CE - Primera ley europea de protección de datos',
    description: 'La Directiva 95/46/CE del Parlamento Europeo sentó las bases del derecho a la protección de datos en la UE. Aunque fue derogada por el RGPD, estableció los principios fundamentales que siguen vigentes hoy: finalidad limitada, consentimiento, derechos de los interesados y transferencias internacionales seguras.',
    category: 'protección de datos',
    color: '#10b981'
  },
  {
    id: 't002',
    year: 2001,
    title: 'Convenio de Budapest sobre Ciberdelincuencia',
    description: 'Primer tratado internacional sobre delitos cometidos a través de internet, adoptado por el Consejo de Europa. Establece tipos penales armonizados (acceso ilícito, interceptación ilegal, fraude informático) y mecanismos de cooperación policial y judicial internacional 24/7.',
    category: 'marco legal',
    color: '#f59e0b'
  },
  {
    id: 't003',
    year: 2005,
    title: 'ISO/IEC 27001:2005 - Primera versión certificable',
    description: 'Publicación de la primera versión de ISO 27001 como norma certificable para Sistemas de Gestión de Seguridad de la Información (SGSI), evolucionando desde el estándar británico BS 7799-2. Marca el inicio de las certificaciones formales de seguridad de la información a nivel internacional.',
    category: 'framework',
    color: '#10b981'
  },
  {
    id: 't004',
    year: 2007,
    title: 'Directiva NIS (precursora) - Primeras conversaciones en la UE',
    description: 'La Comisión Europea inicia los primeros trabajos formales hacia una regulación de seguridad de redes y sistemas de información, como respuesta a incidentes que afectaron infraestructuras críticas europeas y los primeros grandes ciberataques de Estado (Estonia 2007).',
    category: 'normativa UE',
    color: '#3b82f6'
  },
  {
    id: 't005',
    year: 2010,
    title: 'ENS - Esquema Nacional de Seguridad (RD 3/2010)',
    description: 'Publicación del primer Esquema Nacional de Seguridad en España mediante el Real Decreto 3/2010. Establece el marco de seguridad para las Administraciones Públicas españolas con principios, categorías de sistemas y medidas de seguridad obligatorias para los servicios públicos electrónicos.',
    category: 'normativa nacional',
    color: '#ef4444'
  },
  {
    id: 't006',
    year: 2013,
    title: 'ISO/IEC 27001:2013 e inicio de MITRE ATT&CK',
    description: 'Revisión significativa de ISO 27001 con 114 controles en 14 dominios. El mismo año, MITRE Corporation inicia internamente el proyecto ATT&CK (Adversarial Tactics, Techniques & Common Knowledge) como base de conocimiento de comportamientos de adversarios basada en observaciones reales del mundo.',
    category: 'framework',
    color: '#10b981'
  },
  {
    id: 't007',
    year: 2014,
    title: 'NIST Cybersecurity Framework 1.0',
    description: 'El NIST publica la versión 1.0 del Cybersecurity Framework, desarrollado por mandato de la Orden Ejecutiva 13636 del presidente Obama. El marco introduce las 5 funciones (Identify, Protect, Detect, Respond, Recover) y se convierte en referencia global para la gestión de riesgos de ciberseguridad.',
    category: 'framework',
    color: '#3b82f6'
  },
  {
    id: 't008',
    year: 2015,
    title: 'MITRE ATT&CK publicado públicamente',
    description: 'MITRE hace pública la primera versión de ATT&CK para Enterprise, transformando la forma en que la industria documenta y comparte conocimiento sobre técnicas de ataque. Permite a los defensores priorizar controles basándose en comportamientos reales de adversarios.',
    category: 'framework',
    color: '#dc2626'
  },
  {
    id: 't009',
    year: 2016,
    title: 'RGPD y Directiva NIS1 aprobados',
    description: 'Año fundamental para la ciberseguridad europea: aprobación del Reglamento General de Protección de Datos (UE 2016/679) con un período de adaptación de 2 años, y la primera Directiva NIS (2016/1148) sobre seguridad de redes y sistemas de información. Ambas marcan el inicio de la era de la regulación digital europea.',
    category: 'normativa UE',
    color: '#3b82f6'
  },
  {
    id: 't010',
    year: 2017,
    title: 'Grandes ciberataques globales: WannaCry y NotPetya',
    description: 'Los ataques masivos de ransomware WannaCry (mayo) y NotPetya (junio) afectan a miles de organizaciones globalmente, causando daños estimados en miles de millones de euros. Estos incidentes aceleran la adopción de regulaciones de ciberseguridad y evidencian la necesidad de resiliencia operativa.',
    category: 'marco legal',
    color: '#6b7280'
  },
  {
    id: 't011',
    year: 2018,
    title: 'RGPD en aplicación y LOPDGDD en España',
    description: 'El RGPD comienza a aplicarse el 25 de mayo de 2018. España aprueba en diciembre la LOPDGDD (LO 3/2018), adaptando el ordenamiento jurídico español al RGPD y añadiendo el innovador Título X sobre derechos digitales de ciudadanos y trabajadores. La AEPD comienza a imponer las primeras sanciones.',
    category: 'protección de datos',
    color: '#10b981'
  },
  {
    id: 't012',
    year: 2018,
    title: 'NIST CSF 1.1 - Actualización',
    description: 'El NIST publica la versión 1.1 del Cybersecurity Framework con mejoras en la gestión de riesgos de la cadena de suministro, autenticación e identidad, y divulgación de vulnerabilidades. Refuerza la orientación sobre medición y comunicación de riesgos cibernéticos.',
    category: 'framework',
    color: '#3b82f6'
  },
  {
    id: 't013',
    year: 2019,
    title: 'COBIT 2019 - Revisión del marco de gobernanza TI',
    description: 'ISACA publica COBIT 2019, sustituyendo a COBIT 5. Introduce factores de diseño para personalizar el marco según el contexto organizacional, mayor alineación con estándares modernos y un sistema de objetivos de gobernanza y gestión más flexible. Se convierte en el marco de referencia para la gobernanza TI corporativa.',
    category: 'framework',
    color: '#6366f1'
  },
  {
    id: 't014',
    year: 2019,
    title: 'ENISA Cybersecurity Act - Agencia UE de Ciberseguridad fortalecida',
    description: 'El Reglamento de Ciberseguridad UE 2019/881 (Cybersecurity Act) refuerza el mandato de ENISA, otorgándole carácter permanente y nuevas funciones. Introduce el European Cybersecurity Certification Framework para productos, servicios y procesos TIC, fundamental para la futura certificación de productos de seguridad.',
    category: 'normativa UE',
    color: '#3b82f6'
  },
  {
    id: 't015',
    year: 2020,
    title: 'SolarWinds y cadena de suministro - Punto de inflexión',
    description: 'El ataque a SolarWinds (descubierto en diciembre) expone las vulnerabilidades de la cadena de suministro software. El ataque, atribuido a actores estatales rusos, comprometió a agencias gubernamentales de EE.UU. y miles de empresas globalmente, acelerando los requisitos regulatorios sobre seguridad de terceros proveedores.',
    category: 'marco legal',
    color: '#6b7280'
  },
  {
    id: 't016',
    year: 2021,
    title: 'CIS Controls v8 y TIBER-EU',
    description: 'El Center for Internet Security publica CIS Controls v8, reduciendo de 20 a 18 controles e introduciendo los Implementation Groups. El BCE publica el framework TIBER-EU para pruebas de penetración guiadas por amenazas en el sector financiero europeo, precursor directo de las TLPT de DORA.',
    category: 'framework',
    color: '#f59e0b'
  },
  {
    id: 't017',
    year: 2022,
    title: 'ISO/IEC 27001:2022 - Revisión mayor',
    description: 'Publicación de la versión 2022 de ISO 27001, con la reorganización del Anexo A de 114 controles en 14 dominios a 93 controles en 4 dominios (organizativos, personas, físicos, tecnológicos). Se añaden 11 nuevos controles incluyendo inteligencia de amenazas, seguridad cloud y codificación segura.',
    category: 'framework',
    color: '#10b981'
  },
  {
    id: 't018',
    year: 2022,
    title: 'Directiva NIS2 aprobada',
    description: 'El Parlamento Europeo y el Consejo aprueban la Directiva NIS2 (2022/2555), derogando NIS1. Amplía significativamente el alcance (más sectores y entidades), refuerza los requisitos de gestión de riesgos y notificación de incidentes, endurece las sanciones y establece responsabilidad directiva en ciberseguridad.',
    category: 'normativa UE',
    color: '#3b82f6'
  },
  {
    id: 't019',
    year: 2022,
    title: 'Reglamento DORA aprobado',
    description: 'Aprobación del Reglamento DORA (2022/2554) específico para la resiliencia operativa digital del sector financiero. Establece requisitos uniformes de gestión del riesgo TIC, notificación de incidentes, TLPT y supervisión de proveedores TIC críticos, aplicables desde enero 2025.',
    category: 'normativa UE',
    color: '#8b5cf6'
  },
  {
    id: 't020',
    year: 2022,
    title: 'ENS actualizado (RD 311/2022)',
    description: 'España actualiza el Esquema Nacional de Seguridad mediante el Real Decreto 311/2022, alineándolo con ISO 27001:2013, RGPD y el nuevo entorno de amenazas. Incorpora medidas para servicios cloud, dispositivos móviles, y refuerza los requisitos de auditoría y certificación.',
    category: 'normativa nacional',
    color: '#ef4444'
  },
  {
    id: 't021',
    year: 2023,
    title: 'CRA - Cyber Resilience Act propuesto',
    description: 'La Comisión Europea propone el Reglamento de Ciberresiliencia (CRA) para establecer requisitos de ciberseguridad para productos con elementos digitales (IoT, software, hardware). Será el primer marco regulatorio horizontal para la seguridad de productos digitales en la UE.',
    category: 'normativa UE',
    color: '#3b82f6'
  },
  {
    id: 't022',
    year: 2024,
    title: 'NIST CSF 2.0 - Nueva función Govern',
    description: 'El NIST publica la versión 2.0 del Cybersecurity Framework en febrero, la primera revisión mayor desde 2014. Introduce la función "Govern" como sexta función principal, reconociendo que la gobernanza es prerequisito de toda estrategia de ciberseguridad efectiva. Amplía su aplicabilidad a organizaciones de todos los tamaños y sectores.',
    category: 'framework',
    color: '#3b82f6'
  },
  {
    id: 't023',
    year: 2024,
    title: 'Transposición NIS2 - Plazo octubre 2024',
    description: 'Los Estados miembro de la UE deben transponer la Directiva NIS2 a sus ordenamientos nacionales antes del 17 de octubre de 2024. España inicia el proceso legislativo para adaptar su regulación de ciberseguridad, con implicaciones para miles de entidades esenciales e importantes.',
    category: 'normativa nacional',
    color: '#ef4444'
  },
  {
    id: 't024',
    year: 2025,
    title: 'DORA en plena aplicación - Sector financiero',
    description: 'Desde el 17 de enero de 2025, el Reglamento DORA es plenamente aplicable a todas las entidades financieras de la UE: bancos, aseguradoras, empresas de inversión, proveedores de criptoactivos y más. El sector financiero europeo entra en una nueva era de supervisión de resiliencia operativa digital.',
    category: 'normativa UE',
    color: '#8b5cf6'
  }
];
