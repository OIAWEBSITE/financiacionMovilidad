
// ==================================================
// CONVENIOS STUDY ABROAD - UNIVERSIDAD DE LOS ANDES
// ==================================================

// DATOS DE PRUEBA
// IMPORTANTE:
// Los nombres, facultades, niveles y programas son
// ficticios y se utilizan únicamente para la maqueta.
// Reemplazar cuando OIA entregue la información oficial.

const convenios = [
  {
    id: 1,
    title: 'Convenio Study Abroad 01',
    tag: 'Study Abroad',
    description: 'Información del convenio pendiente por diligenciar.',
    university: 'Universidad por confirmar',
    faculty: 'Ingeniería',
    program: 'Ingeniería de Sistemas',
    level: 'Pregrado',
    requirements: 'Requisitos pendientes por confirmar'
  },
  {
    id: 2,
    title: 'Convenio Study Abroad 02',
    tag: 'Study Abroad',
    description: 'Información del convenio pendiente por diligenciar.',
    university: 'Universidad por confirmar',
    faculty: 'Administración',
    program: 'Administración',
    level: 'Pregrado',
    requirements: 'Requisitos pendientes por confirmar'
  },
  {
    id: 3,
    title: 'Convenio Study Abroad 03',
    tag: 'Study Abroad',
    description: 'Información del convenio pendiente por diligenciar.',
    university: 'Universidad por confirmar',
    faculty: 'Ciencias Sociales',
    program: 'Psicología',
    level: 'Pregrado',
    requirements: 'Requisitos pendientes por confirmar'
  },
  {
    id: 4,
    title: 'Convenio Study Abroad 04',
    tag: 'Study Abroad',
    description: 'Información del convenio pendiente por diligenciar.',
    university: 'Universidad por confirmar',
    faculty: 'Ingeniería',
    program: 'Ingeniería Industrial',
    level: 'Pregrado',
    requirements: 'Requisitos pendientes por confirmar'
  },
  {
    id: 5,
    title: 'Convenio Study Abroad 05',
    tag: 'Study Abroad',
    description: 'Información del convenio pendiente por diligenciar.',
    university: 'Universidad por confirmar',
    faculty: 'Arquitectura y Diseño',
    program: 'Arquitectura',
    level: 'Pregrado',
    requirements: 'Requisitos pendientes por confirmar'
  },
  {
    id: 6,
    title: 'Convenio Study Abroad 06',
    tag: 'Study Abroad',
    description: 'Información del convenio pendiente por diligenciar.',
    university: 'Universidad por confirmar',
    faculty: 'Ingeniería',
    program: 'Ingeniería de Sistemas',
    level: 'Maestría',
    requirements: 'Requisitos pendientes por confirmar'
  },
  {
    id: 7,
    title: 'Convenio Study Abroad 07',
    tag: 'Study Abroad',
    description: 'Información del convenio pendiente por diligenciar.',
    university: 'Universidad por confirmar',
    faculty: 'Administración',
    program: 'Administración',
    level: 'Maestría',
    requirements: 'Requisitos pendientes por confirmar'
  },
  {
    id: 8,
    title: 'Convenio Study Abroad 08',
    tag: 'Study Abroad',
    description: 'Información del convenio pendiente por diligenciar.',
    university: 'Universidad por confirmar',
    faculty: 'Ciencias Sociales',
    program: 'Psicología',
    level: 'Maestría',
    requirements: 'Requisitos pendientes por confirmar'
  }
];

// ==================================================
// CONFIGURACIÓN DE FILTROS
// ==================================================

const filters = [
  {
    label: 'Nivel Académico',
    key: 'level',
    options: [...new Set(convenios.map(item => item.level))].sort()
  },
  {
    label: 'Facultad',
    key: 'faculty',
    options: [...new Set(convenios.map(item => item.faculty))].sort()
  },
  {
    label: 'Programa',
    key: 'program',
    options: [...new Set(convenios.map(item => item.program))].sort()
  }
];

// ==================================================
// ESTADO DE FILTROS SELECCIONADOS
// ==================================================

const selected = Object.fromEntries(
  filters.map(filter => [filter.key, new Set()])
);

// ==================================================
// ELEMENTOS HTML
// ==================================================

const filterContainer = document.getElementById('filters-container');
const cardsGrid = document.getElementById('cards-grid');
const resultCount = document.getElementById('results-count');
const clearButton = document.getElementById('clear-filters');
const emptyState = document.getElementById('empty-state');

// ==================================================
// CREACIÓN DE FILTROS
// ==================================================

filters.forEach(({ label, key, options }) => {

  const details = document.createElement('details');
  details.className = 'filter-group';

  const summary = document.createElement('summary');
  summary.textContent = label;

  details.appendChild(summary);

  const optionsBox = document.createElement('div');
  optionsBox.className = 'filter-options';

  options.forEach(option => {

    const optionLabel = document.createElement('label');
    optionLabel.className = 'filter-option';

    const input = document.createElement('input');

    input.type = 'checkbox';
    input.value = option;

    input.setAttribute(
      'aria-label',
      `${label}: ${option}`
    );

    input.addEventListener('change', () => {

      if (input.checked) {
        selected[key].add(option);
      } else {
        selected[key].delete(option);
      }

      render();

    });

    optionLabel.append(
      input,
      document.createTextNode(option)
    );

    optionsBox.appendChild(optionLabel);

  });

  details.appendChild(optionsBox);
  filterContainer.appendChild(details);

});

// ==================================================
// ICONOS Y METADATOS
// ==================================================

function icon(glyph) {

  const span = document.createElement('span');

  span.className = 'meta-icon';
  span.setAttribute('aria-hidden', 'true');
  span.textContent = glyph;

  return span;
}

function metadata(glyph, text) {

  const p = document.createElement('p');
  p.className = 'meta';

  p.append(
    icon(glyph),
    document.createTextNode(text)
  );

  return p;
}

// ==================================================
// CREACIÓN DE TARJETAS
// ==================================================

function createCard(item) {

  const article = document.createElement('article');
  article.className = 'support-card';

  // Etiqueta
  const tag = document.createElement('span');
  tag.className = 'tag';
  tag.textContent = item.tag;

  // Nombre del convenio
  const title = document.createElement('h3');
  title.textContent = item.title;

  // Descripción
  const desc = document.createElement('p');
  desc.className = 'description';
  desc.textContent = item.description;

  // Pie de tarjeta
  const footer = document.createElement('div');
  footer.className = 'card-footer';

  footer.append(
    metadata('♧', item.university),
    metadata('▣', item.faculty),
    metadata('⌑', item.program),
    metadata('✓', item.requirements)
  );

  // Nivel académico
  const level = document.createElement('div');
  level.className = 'level';
  level.textContent = item.level;

  footer.appendChild(level);

  article.append(
    tag,
    title,
    desc,
    footer
  );

  return article;
}

// ==================================================
// RENDERIZADO Y FILTRADO
// ==================================================

function render() {

  const visible = convenios.filter(item => {

    return filters.every(({ key }) => {

      return (
        selected[key].size === 0 ||
        selected[key].has(item[key])
      );

    });

  });

  cardsGrid.replaceChildren(
    ...visible.map(createCard)
  );

  // Contador
  resultCount.textContent =
    `MOSTRANDO ${visible.length} DE ${convenios.length} RESULTADOS`;

  // Estado vacío
  emptyState.hidden = visible.length > 0;

  // Botón limpiar
  clearButton.disabled = !filters.some(
    ({ key }) => selected[key].size > 0
  );

}

// ==================================================
// LIMPIAR FILTROS
// ==================================================

clearButton.addEventListener('click', () => {

  filters.forEach(({ key }) => {
    selected[key].clear();
  });

  filterContainer
    .querySelectorAll('input[type="checkbox"]')
    .forEach(input => {
      input.checked = false;
    });

  render();

});

// ==================================================
// INICIALIZACIÓN
// ==================================================

render();
