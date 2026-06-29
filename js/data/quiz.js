/**
 * @fileoverview Banco de preguntas para el quiz de ciberseguridad
 * @module data/quiz
 */

/** @type {Array<Object>} */
export const quizData = [
  // ========== BÁSICO (10 preguntas) ==========
  {
    id: 'q001',
    question: '¿Cuál es el plazo máximo para notificar una brecha de seguridad de datos personales a la autoridad de control según el RGPD?',
    options: [
      '24 horas desde que se conoce la brecha',
      '48 horas desde que se conoce la brecha',
      '72 horas desde que se conoce la brecha',
      '7 días desde que se conoce la brecha'
    ],
    correctAnswer: 2,
    explanation: 'El artículo 33 del RGPD establece que el responsable del tratamiento notificará una violación de datos personales a la autoridad de control competente sin dilación indebida y, de ser posible, a más tardar 72 horas después de que haya tenido constancia de ella.',
    difficulty: 'básico',
    topic: 'GDPR'
  },
  {
    id: 'q002',
    question: '¿A qué edad mínima puede una persona dar su consentimiento para el tratamiento de datos personales en servicios de la sociedad de la información según la LOPDGDD española?',
    options: ['13 años', '14 años', '16 años', '18 años'],
    correctAnswer: 1,
    explanation: 'La LOPDGDD fijó en 14 años la edad mínima de consentimiento en España (artículo 7). El RGPD dejó a los Estados miembro elegir entre 13 y 16 años. Países como Alemania y España eligieron 14, mientras que el Reino Unido eligió 13.',
    difficulty: 'básico',
    topic: 'LOPDGDD'
  },
  {
    id: 'q003',
    question: '¿Cuántas categorías de seguridad define el Esquema Nacional de Seguridad (ENS)?',
    options: ['2 (Alta y Básica)', '3 (Alta, Media y Básica)', '4 (Crítica, Alta, Media y Básica)', '5 niveles del 1 al 5'],
    correctAnswer: 1,
    explanation: 'El ENS establece 3 categorías de seguridad según el impacto que tendría un incidente sobre la organización: ALTA (perjuicio muy grave), MEDIA (perjuicio grave) y BÁSICA (perjuicio limitado). Cada dimensión de seguridad (disponibilidad, confidencialidad, integridad, autenticidad, trazabilidad) se valora en niveles ALTO, MEDIO o BAJO.',
    difficulty: 'básico',
    topic: 'ENS'
  },
  {
    id: 'q004',
    question: '¿Cuántas funciones principales tiene el NIST Cybersecurity Framework 2.0?',
    options: ['4 funciones (ID, PR, DE, RS)', '5 funciones (ID, PR, DE, RS, RC)', '6 funciones (GV, ID, PR, DE, RS, RC)', '7 funciones incluyendo "Test"'],
    correctAnswer: 2,
    explanation: 'NIST CSF 2.0 (publicado en febrero 2024) introduce 6 funciones: Govern (GV, nueva en v2.0), Identify (ID), Protect (PR), Detect (DE), Respond (RS) y Recover (RC). La versión 1.1 solo tenía 5 funciones; la adición de "Govern" enfatiza la importancia de la gobernanza en ciberseguridad.',
    difficulty: 'básico',
    topic: 'NIST CSF'
  },
  {
    id: 'q005',
    question: '¿En qué año entró en vigor el Convenio de Budapest sobre Ciberdelincuencia?',
    options: ['1999', '2001', '2004', '2007'],
    correctAnswer: 2,
    explanation: 'El Convenio de Budapest fue abierto a la firma el 23 de noviembre de 2001 y entró en vigor el 1 de julio de 2004, tras alcanzar las 5 ratificaciones necesarias. Es el primer tratado internacional sobre delitos cometidos a través de internet.',
    difficulty: 'básico',
    topic: 'Budapest'
  },
  {
    id: 'q006',
    question: '¿Cuál de estos no es un principio del tratamiento de datos según el RGPD?',
    options: [
      'Minimización de datos',
      'Limitación de la finalidad',
      'Maximización de la seguridad',
      'Integridad y confidencialidad'
    ],
    correctAnswer: 2,
    explanation: 'Los 6 principios del RGPD (artículo 5) son: licitud, lealtad y transparencia; limitación de la finalidad; minimización de datos; exactitud; limitación del plazo de conservación; e integridad y confidencialidad. "Maximización de la seguridad" no es un principio del RGPD.',
    difficulty: 'básico',
    topic: 'GDPR'
  },
  {
    id: 'q007',
    question: '¿Qué norma ISO es la única certificable dentro de la familia ISO 27000?',
    options: ['ISO 27001', 'ISO 27002', 'ISO 27005', 'ISO 27017'],
    correctAnswer: 0,
    explanation: 'ISO/IEC 27001 es la única norma de la familia ISO 27000 que contiene requisitos certificables (usa el lenguaje normativo "debe"). ISO 27002 es una guía de buenas prácticas, ISO 27005 proporciona directrices de gestión de riesgos, e ISO 27017 ofrece controles para servicios cloud. Solo ISO 27001 permite obtener una certificación formal.',
    difficulty: 'básico',
    topic: 'ISO 27001'
  },
  {
    id: 'q008',
    question: '¿Cuándo es de aplicación el Reglamento DORA (Digital Operational Resilience Act)?',
    options: [
      'Desde su publicación en el DOUE en diciembre 2022',
      'Desde el 17 de enero de 2025',
      'Desde octubre de 2024, como NIS2',
      'Desde el 1 de enero de 2026'
    ],
    correctAnswer: 1,
    explanation: 'DORA fue publicado en el Diario Oficial de la UE el 27 de diciembre de 2022, entró en vigor el 16 de enero de 2023 y es aplicable desde el 17 de enero de 2025. Las entidades financieras tuvieron 2 años de periodo transitorio para adaptarse.',
    difficulty: 'básico',
    topic: 'DORA'
  },
  {
    id: 'q009',
    question: '¿Cuál es la principal diferencia entre NIS2 y DORA?',
    options: [
      'NIS2 es un reglamento y DORA es una directiva',
      'NIS2 aplica a todos los sectores críticos mientras DORA es específica para el sector financiero',
      'DORA aplica a nivel mundial y NIS2 solo en España',
      'NIS2 es más reciente que DORA'
    ],
    correctAnswer: 1,
    explanation: 'NIS2 es una Directiva de aplicación general a sectores esenciales e importantes (energía, transporte, sanidad, digital, etc.), mientras que DORA es un Reglamento específicamente diseñado para el sector financiero. Como Reglamento, DORA es directamente aplicable sin necesidad de transposición nacional, mientras que NIS2 requería transposición antes de octubre de 2024.',
    difficulty: 'básico',
    topic: 'NIS2'
  },
  {
    id: 'q010',
    question: '¿Qué significa SGSI en el contexto de ISO 27001?',
    options: [
      'Sistema de Gestión de Seguridad Informática',
      'Sistema de Gestión de Seguridad de la Información',
      'Sistema de Gobernanza de la Seguridad Integral',
      'Sistema de Garantía de Seguridad de la Información'
    ],
    correctAnswer: 1,
    explanation: 'SGSI significa Sistema de Gestión de Seguridad de la Información (en inglés: ISMS - Information Security Management System). ISO 27001 especifica los requisitos para establecer, implementar, mantener y mejorar continuamente un SGSI dentro del contexto de la organización.',
    difficulty: 'básico',
    topic: 'ISO 27001'
  },

  // ========== INTERMEDIO (12 preguntas) ==========
  {
    id: 'q011',
    question: '¿Cuántos controles contiene el Anexo A de ISO 27001:2022?',
    options: ['114 controles en 14 dominios', '93 controles en 4 dominios', '100 controles en 5 dominios', '156 controles en 18 dominios'],
    correctAnswer: 1,
    explanation: 'La versión 2022 de ISO 27001 redujo el número de controles de 114 (versión 2013) a 93, reorganizados en 4 dominios (antes eran 14): A.5 Controles organizativos (37), A.6 Controles de personas (8), A.7 Controles físicos (14) y A.8 Controles tecnológicos (34). Se añadieron 11 controles nuevos y varios se fusionaron o actualizaron.',
    difficulty: 'intermedio',
    topic: 'ISO 27001'
  },
  {
    id: 'q012',
    question: '¿Qué son las TLPT en el contexto del Reglamento DORA?',
    options: [
      'Transferencias de Liquidez para Provisiones Técnicas',
      'Pruebas de Penetración Guiadas por Amenazas (Threat-Led Penetration Testing)',
      'Tecnologías de Localización y Prevención de Tráfico',
      'Sistemas de Testeo de Latencia en Plataformas Transaccionales'
    ],
    correctAnswer: 1,
    explanation: 'TLPT (Threat-Led Penetration Testing) son pruebas de penetración guiadas por inteligencia de amenazas específicas de la organización. DORA exige a las entidades financieras significativas realizar TLPT al menos cada 3 años. Estas pruebas simulan ataques reales de actores sofisticados para evaluar la resiliencia real de sistemas críticos.',
    difficulty: 'intermedio',
    topic: 'DORA'
  },
  {
    id: 'q013',
    question: '¿Cuál es la sanción máxima para entidades "esenciales" bajo NIS2?',
    options: [
      '5.000.000 € o 1% del volumen de negocio mundial',
      '7.000.000 € o 1,4% del volumen de negocio mundial',
      '10.000.000 € o 2% del volumen de negocio mundial',
      '20.000.000 € o 4% del volumen de negocio mundial'
    ],
    correctAnswer: 2,
    explanation: 'NIS2 distingue entre entidades esenciales e importantes. Para entidades esenciales: hasta 10.000.000 € o el 2% del volumen de negocio anual mundial (la cifra más alta). Para entidades importantes: hasta 7.000.000 € o el 1,4%. El régimen sancionador del RGPD (máx. 20M€/4%) es más severo para brechas de datos personales.',
    difficulty: 'intermedio',
    topic: 'NIS2'
  },
  {
    id: 'q014',
    question: '¿Qué táctica de MITRE ATT&CK describe las técnicas usadas por los atacantes para moverse por la red comprometida tras el acceso inicial?',
    options: ['Persistence', 'Privilege Escalation', 'Lateral Movement', 'Command and Control'],
    correctAnswer: 2,
    explanation: 'Lateral Movement (Movimiento lateral, TA0008) comprende las técnicas que los adversarios utilizan para entrar y controlar sistemas remotos de la red objetivo. Incluye técnicas como Pass-the-Hash, Pass-the-Ticket, uso de RDP, WMI, o PSExec para pivotar entre sistemas comprometidos.',
    difficulty: 'intermedio',
    topic: 'MITRE ATT&CK'
  },
  {
    id: 'q015',
    question: '¿Cuál es el proceso de 8 pasos que describe ISO 27005:2022 para la gestión de riesgos?',
    options: [
      'Planificar, Hacer, Verificar, Actuar (PDCA)',
      'Identificar, Analizar, Evaluar, Tratar, Aceptar, Comunicar, Monitorizar, Revisar',
      'Contexto, Identificación, Análisis, Evaluación, Tratamiento, Aceptación, Comunicación, Seguimiento',
      'Inventario, Amenazas, Vulnerabilidades, Impacto, Probabilidad, Riesgo, Controles, Residual'
    ],
    correctAnswer: 2,
    explanation: 'ISO 27005:2022 describe el proceso de gestión de riesgos con 8 etapas: 1) Establecimiento del contexto, 2) Identificación de riesgos, 3) Análisis de riesgos, 4) Evaluación de riesgos, 5) Tratamiento de riesgos, 6) Aceptación de riesgos residuales, 7) Comunicación y consulta (transversal), y 8) Seguimiento y revisión (transversal). Las dos últimas son continuas.',
    difficulty: 'intermedio',
    topic: 'ISO 27005'
  },
  {
    id: 'q016',
    question: '¿Cuántos controles tiene la versión 8 de los CIS Controls?',
    options: ['14 controles', '18 controles', '20 controles', '27 controles'],
    correctAnswer: 1,
    explanation: 'CIS Controls v8 (mayo 2021) redujo los controles de 20 (versión 7) a 18 controles. También introdujo el concepto de Implementation Groups (IG1, IG2, IG3) para escalar la implementación según el tamaño y madurez de la organización, y consolidó algunos controles de la versión anterior.',
    difficulty: 'intermedio',
    topic: 'CIS Controls'
  },
  {
    id: 'q017',
    question: '¿Qué derechos digitales reconoce específicamente la LOPDGDD que no están en el RGPD?',
    options: [
      'Derecho de acceso y rectificación de datos',
      'Derecho a la desconexión digital en el ámbito laboral',
      'Derecho al olvido de datos inexactos',
      'Derecho a la portabilidad de datos'
    ],
    correctAnswer: 1,
    explanation: 'La LOPDGDD (Título X) reconoce derechos digitales específicos que van más allá del RGPD, como el derecho a la desconexión digital en el ámbito laboral (art. 88), el derecho a la intimidad ante el uso de dispositivos digitales en el trabajo (art. 87), la intimidad frente a videovigilancia y geolocalización laboral (art. 89-90) y el derecho a la educación digital (art. 83).',
    difficulty: 'intermedio',
    topic: 'LOPDGDD'
  },
  {
    id: 'q018',
    question: '¿Qué arquitectura de 6 capas propone el framework SABSA?',
    options: [
      'Física, Lógica, Aplicación, Datos, Proceso, Gestión',
      'Contextual, Conceptual, Lógica, Física, Componente, Operacional',
      'Estratégica, Táctica, Operacional, Técnica, Implementación, Monitorización',
      'Gobernanza, Riesgo, Cumplimiento, Arquitectura, Operaciones, Auditoría'
    ],
    correctAnswer: 1,
    explanation: 'SABSA define 6 capas de arquitectura de seguridad: 1) Contextual (visión de negocio), 2) Conceptual (visión del arquitecto/CISO), 3) Lógica (visión del diseñador), 4) Física (visión del constructor/ingeniero), 5) Componente (visión del implementador/tecnólogo) y 6) Operacional (visión del gestor). Cada capa responde a diferentes preguntas (qué, por qué, qué servicios, cómo funciona, con qué, cómo se gestiona).',
    difficulty: 'intermedio',
    topic: 'SABSA'
  },
  {
    id: 'q019',
    question: '¿Cuántos dominios (o procesos principales) tiene COBIT 2019?',
    options: ['3 dominios (Plan, Build, Run)', '5 dominios (EDM, APO, BAI, DSS, MEA)', '6 dominios incluyendo "Monitor"', '7 dominios según la última versión'],
    correctAnswer: 1,
    explanation: 'COBIT 2019 mantiene 5 dominios: EDM (Evaluar, Dirigir y Monitorizar - gobernanza), APO (Alinear, Planificar y Organizar), BAI (Construir, Adquirir e Implementar), DSS (Entregar, Dar Servicio y Soporte) y MEA (Monitorizar, Evaluar y Valorar). Los 4 últimos son dominios de gestión; EDM es el único dominio de gobernanza.',
    difficulty: 'intermedio',
    topic: 'COBIT'
  },
  {
    id: 'q020',
    question: '¿Qué plazo tiene una entidad financiera bajo DORA para enviar la alerta temprana tras detectar un incidente TIC grave?',
    options: ['1 hora desde la detección', '4 horas desde la clasificación del incidente', '24 horas desde la detección', '72 horas desde la detección'],
    correctAnswer: 1,
    explanation: 'DORA (art. 19) establece un proceso de notificación en fases: alerta temprana en 4 horas desde que el incidente se clasifica como grave (no desde la detección), notificación intermedia en 72 horas con evaluación inicial, e informe final en 1 mes. Es diferente al RGPD que cuenta desde que se tiene "constancia" de la brecha.',
    difficulty: 'intermedio',
    topic: 'DORA'
  },
  {
    id: 'q021',
    question: '¿Cuántos "Implementation Groups" (IG) define CIS Controls v8 y qué representan?',
    options: [
      '2 grupos: básico y avanzado',
      '3 grupos según madurez y recursos de ciberseguridad de la organización',
      '4 grupos basados en el tamaño de la empresa',
      '5 grupos alineados con los niveles de madurez de NIST'
    ],
    correctAnswer: 1,
    explanation: 'CIS Controls v8 define 3 Implementation Groups: IG1 (higiene básica para cualquier organización, 56 salvaguardas), IG2 (para organizaciones con equipo TI dedicado, 130 salvaguardas adicionales) e IG3 (para organizaciones maduras con expertos en ciberseguridad, 23 salvaguardas adicionales). Cada IG incluye todas las salvaguardas del grupo anterior.',
    difficulty: 'intermedio',
    topic: 'CIS Controls'
  },
  {
    id: 'q022',
    question: '¿Qué es la Declaración de Aplicabilidad (DA/SoA) en el contexto del ENS e ISO 27001?',
    options: [
      'Un documento que declara que la organización es aplicable al cumplimiento del estándar',
      'Un informe de auditoría que certifica la conformidad del sistema',
      'Un documento que justifica la selección y estado de implantación de los controles de seguridad aplicables',
      'La política de seguridad aprobada por la dirección'
    ],
    correctAnswer: 2,
    explanation: 'La Declaración de Aplicabilidad (Statement of Applicability o SoA en ISO 27001) es un documento clave del SGSI que lista todos los controles del Anexo A, indica si cada uno es aplicable o no, justifica la inclusión o exclusión, y describe el estado de implementación. En el ENS cumple una función similar, relacionando las medidas del Anexo II con la organización.',
    difficulty: 'intermedio',
    topic: 'ISO 27001'
  },

  // ========== AVANZADO (10 preguntas) ==========
  {
    id: 'q023',
    question: 'En DORA, ¿cuál es la consecuencia de que un proveedor TIC crítico de terceros no cumpla con los requisitos de supervisión directa de la UE?',
    options: [
      'Solo se le aplican advertencias formales sin consecuencias económicas',
      'Hasta 1% de su volumen de negocio diario medio mundial aplicable hasta 6 meses',
      'La entidad financiera contratante recibe la sanción en lugar del proveedor',
      'Automáticamente pierde la autorización para operar en la UE'
    ],
    correctAnswer: 1,
    explanation: 'DORA (art. 35) establece que para los proveedores TIC críticos de terceros que incumplan, el "lead overseer" (EBA, ESMA o EIOPA según el tipo) puede imponer multas de hasta el 1% del volumen de negocio diario medio mundial del año anterior. Esta sanción puede aplicarse durante un máximo de 6 meses consecutivos hasta que el proveedor cese el incumplimiento.',
    difficulty: 'avanzado',
    topic: 'DORA'
  },
  {
    id: 'q024',
    question: '¿Qué diferencia existe entre las técnicas T1059.001 (PowerShell) y T1059.003 (Windows Command Shell) en MITRE ATT&CK desde la perspectiva de detección?',
    options: [
      'No hay diferencia operativa entre ambas desde el punto de vista defensivo',
      'PowerShell genera más telemetría detectable (ScriptBlock logging, transcription) que cmd.exe, aunque ambas pueden ofuscar comandos',
      'Windows Command Shell es más peligrosa porque no puede ser monitorizada',
      'Solo PowerShell puede ejecutar código en memoria sin tocar disco'
    ],
    correctAnswer: 1,
    explanation: 'Bajo la táctica Execution (T1059 - Command and Scripting Interpreter), PowerShell (T1059.001) ofrece capacidades avanzadas pero genera mayor telemetría: Script Block Logging (evento 4104), Module Logging (4103), y Transcription permiten detectar ejecución maliciosa. Sin embargo, los atacantes usan AMSI bypass, codificación Base64 o downgrade a v2 para evadir detección. cmd.exe (T1059.003) genera menos telemetría por defecto pero es más limitado funcionalmente.',
    difficulty: 'avanzado',
    topic: 'MITRE ATT&CK'
  },
  {
    id: 'q025',
    question: 'En el contexto de NIS2, ¿qué criterio determina si una entidad es "esencial" versus "importante"?',
    options: [
      'Solo el sector al que pertenece (las energéticas son siempre esenciales)',
      'El tamaño de la empresa (más de 250 empleados = esencial)',
      'Una combinación de sector, tamaño (empleados y facturación) y si opera infraestructura crítica identificada por el Estado',
      'Exclusivamente si ha sufrido un incidente de seguridad previo notificado'
    ],
    correctAnswer: 2,
    explanation: 'NIS2 clasifica una entidad como esencial o importante en función de: (1) el sector en que opera (Anexo I para esenciales, Anexo II para importantes), (2) el tamaño (grande: >250 empleados o >50M€ facturación; mediana: >50 empleados o >10M€) y (3) criterios adicionales como ser identificada como operador de infraestructura crítica. Las entidades del Anexo I que sean grandes son automáticamente esenciales; las medianas del Anexo I y todas las del Anexo II son importantes.',
    difficulty: 'avanzado',
    topic: 'NIS2'
  },
  {
    id: 'q026',
    question: '¿Cuál es la base legal correcta para el tratamiento de datos de salud de empleados por parte de una empresa para gestionar bajas laborales?',
    options: [
      'Consentimiento del empleado (art. 6.1.a + art. 9.2.a RGPD)',
      'Intereses legítimos del empleador (art. 6.1.f RGPD)',
      'Obligación legal + tratamiento necesario en el ámbito del Derecho laboral (art. 6.1.c + art. 9.2.b RGPD)',
      'Ejecución de un contrato laboral (art. 6.1.b RGPD)'
    ],
    correctAnswer: 2,
    explanation: 'Los datos de salud son categoría especial (art. 9 RGPD). Para gestionar bajas laborales, la base legal es doble: art. 6.1.c (obligación legal derivada del ET y LGSS) como base general y art. 9.2.b (tratamiento necesario para el cumplimiento de obligaciones en el ámbito del Derecho laboral y de la seguridad y protección social) como excepción para datos especiales. El consentimiento NO es adecuado en contextos laborales por el desequilibrio de poder.',
    difficulty: 'avanzado',
    topic: 'GDPR'
  },
  {
    id: 'q027',
    question: '¿Qué es el "Protocolo de Berlín" en el contexto del Convenio de Budapest y cuál es su relevancia actual?',
    options: [
      'Una enmienda al Convenio que añade ciberterrorismo como delito tipificado',
      'El Segundo Protocolo Adicional (CETS 224) que moderniza la cooperación internacional para acceso transfronterizo a datos',
      'Un acuerdo bilateral entre Alemania y Francia para intercambio de inteligencia de amenazas',
      'Las directrices del ENISA para implementar el Convenio de Budapest en la UE'
    ],
    correctAnswer: 1,
    explanation: 'El Segundo Protocolo Adicional al Convenio de Budapest (CETS No. 224, conocido como Protocolo de Budapest II o "Protocolo de Berlín" en algunos círculos) fue abierto a la firma en 2022. Moderniza la cooperación internacional permitiendo el acceso transfronterizo directo a datos de suscriptores y tráfico almacenados, establece canales directos entre autoridades y proveedores de servicios en emergencias, y regula la videoconferencia para toma de declaraciones entre países.',
    difficulty: 'avanzado',
    topic: 'Budapest'
  },
  {
    id: 'q028',
    question: '¿En qué se diferencia el enfoque de gestión de riesgos "orientado a eventos" del "orientado a activos" en ISO 27005:2022?',
    options: [
      'El orientado a eventos es más antiguo y ha sido reemplazado por el orientado a activos',
      'El orientado a activos parte de identificar y valorar activos/amenazas/vulnerabilidades; el orientado a eventos parte de escenarios de ataque/fallo predefinidos',
      'Solo el enfoque orientado a activos es compatible con MAGERIT',
      'No hay diferencia práctica; son nomenclaturas distintas para el mismo proceso'
    ],
    correctAnswer: 1,
    explanation: 'ISO 27005:2022 introduce explícitamente dos enfoques: (1) Orientado a activos: identifica activos, valora sus dimensiones de seguridad, mapea amenazas relevantes y vulnerabilidades → calcula riesgo por combinación. Compatible con MAGERIT. (2) Orientado a eventos (basado en escenarios): parte de escenarios de amenaza predefinidos o históricos y evalúa su impacto y probabilidad directamente. Este segundo enfoque es más ágil para organizaciones que ya conocen bien sus amenazas.',
    difficulty: 'avanzado',
    topic: 'ISO 27005'
  },
  {
    id: 'q029',
    question: '¿Qué implica la "responsabilidad proactiva" (accountability) del RGPD para un responsable del tratamiento?',
    options: [
      'Que el responsable debe publicar todos sus tratamientos de datos en el BOE',
      'Que el responsable debe demostrar activamente el cumplimiento, no solo cumplirlo, mediante políticas, medidas técnicas y documentación verificable',
      'Que el responsable es personalmente responsable con su patrimonio de las multas impuestas',
      'Que el responsable debe contratar un seguro de responsabilidad civil por brechas de datos'
    ],
    correctAnswer: 1,
    explanation: 'El principio de "responsabilidad proactiva" o "accountability" del art. 5.2 RGPD exige que el responsable no solo cumpla los principios de protección de datos, sino que sea capaz de demostrarlo. Esto implica: mantener el RAT (art. 30), realizar DPIAs (art. 35), designar DPO cuando proceda (art. 37), implementar privacy by design y by default (art. 25), y tener políticas y procedimientos documentados. Es un cambio paradigmático del enfoque reactivo de la Directiva 95/46.',
    difficulty: 'avanzado',
    topic: 'GDPR'
  },
  {
    id: 'q030',
    question: '¿Qué diferencia técnica existe entre una Evaluación de Impacto en Protección de Datos (EIPD/DPIA) y un análisis de riesgo de seguridad convencional?',
    options: [
      'La DPIA es idéntica a un análisis de riesgos de seguridad; solo cambia el nombre',
      'La DPIA evalúa el riesgo desde la perspectiva de los derechos y libertades de los interesados, incluyendo riesgos no-técnicos como discriminación o pérdida de control sobre datos',
      'El análisis de riesgos de seguridad siempre requiere consulta previa a la autoridad de control',
      'La DPIA solo aplica a tratamientos digitales; el análisis de seguridad también aplica a ficheros en papel'
    ],
    correctAnswer: 1,
    explanation: 'Aunque comparten metodología parcial, la DPIA (art. 35 RGPD) y un análisis de riesgos ISO 27005 tienen perspectivas distintas: la DPIA evalúa riesgos para los DERECHOS Y LIBERTADES de las personas físicas (no solo para la organización), incluyendo riesgos como discriminación, pérdida de autonomía, daño reputacional o exclusión social. También requiere involucrar al DPO, recabar opinión de los interesados y, si el riesgo residual es alto, consultar a la autoridad de control. Un análisis de seguridad clásico evalúa riesgos para la CIA de los activos de información de la organización.',
    difficulty: 'avanzado',
    topic: 'GDPR'
  },
  {
    id: 'q031',
    question: '¿Cuál es la función "Govern" que NIST CSF 2.0 añade sobre la versión 1.1 y por qué es significativa?',
    options: [
      'Es simplemente un renombrado de la función "Identify"; no supone cambios reales',
      'Establece la estrategia, expectativas y política de ciberseguridad como responsabilidad de la dirección, reconociendo que la gobernanza debe preceder a todas las demás funciones',
      'Se centra únicamente en cumplimiento regulatorio y auditorías externas',
      'Es una función opcional para grandes corporaciones; las PYMEs pueden omitirla'
    ],
    correctAnswer: 1,
    explanation: 'La función "Govern" (GV) de NIST CSF 2.0 es una adición estratégica que reconoce que la ciberseguridad es una cuestión de gobernanza empresarial, no solo técnica. Cubre: contexto organizacional, estrategia de gestión de riesgos, roles y responsabilidades de ciberseguridad, política de ciberseguridad, supervisión por parte de la dirección, y gestión de riesgos en la cadena de suministro. Al situarla como primera función, NIST enfatiza que sin gobernanza adecuada, las demás funciones carecen de dirección estratégica.',
    difficulty: 'avanzado',
    topic: 'NIST CSF'
  },
  {
    id: 'q032',
    question: '¿Qué obligación específica impone el ENS a los sistemas de categoría ALTA respecto a las auditorías de seguridad?',
    options: [
      'Auditoría cada 3 años, igual que para las categorías MEDIA y BÁSICA',
      'Auditoría cada 2 años (frente a cada 3 años para MEDIA y BÁSICA), con revisión anual de métricas de seguridad',
      'Auditoría anual obligatoria y certificación formal por entidad acreditada por ENAC',
      'No existe obligación de auditoría formal; es suficiente con el autodiagnóstico'
    ],
    correctAnswer: 1,
    explanation: 'El ENS (Real Decreto 311/2022) exige en su artículo 31 que los sistemas sean auditados de forma regular: los sistemas de categoría ALTA deben auditarse cada 2 años, mientras que los de categoría MEDIA y BÁSICA pueden auditarse cada 3 años. La auditoría puede conducir a una Certificación de Conformidad con el ENS emitida por entidades de certificación acreditadas por ENAC, o a un Informe de Conformidad para sistemas BÁSICA. El CCN-STIC-802 proporciona la guía de auditoría.',
    difficulty: 'avanzado',
    topic: 'ENS'
  }
];
