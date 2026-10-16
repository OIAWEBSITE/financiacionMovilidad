// Datos ficticios para la maqueta. Reemplazar cuando OIA entregue la información oficial.
const supports = [
  {id:1,title:'Lorem Ipsum Dolor',tag:'Beca con compromiso',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non augue vel nisi posuere tempus.',student:'Estudiante nuevo',coverage:'Lorem ipsum dolor sit amet, 50% consectetur.',program:'Aplica para 1 programa',level:'Pregrado',faculty:'Ingeniería',mobility:'Intercambio'},
  {id:2,title:'Consectetur Adipiscing',tag:'Beca con compromiso',description:'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',student:'Estudiante nuevo',coverage:'Lorem ipsum dolor sit amet, 75% consectetur.',program:'Aplica para 4 programas',level:'Pregrado',faculty:'Ciencias Sociales',mobility:'Intercambio'},
  {id:3,title:'Tempor Incididunt',tag:'Apoyo económico',description:'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',student:'Estudiante antiguo',coverage:'Lorem ipsum dolor sit amet, 30% consectetur.',program:'Aplica para 2 programas',level:'Maestría',faculty:'Ingeniería',mobility:'Investigación'},
  {id:4,title:'Magna Aliqua Ut',tag:'Préstamo',description:'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',student:'Estudiante antiguo',coverage:'Lorem ipsum dolor sit amet, 40% consectetur.',program:'Aplica para 5 programas',level:'Pregrado',faculty:'Administración',mobility:'Práctica'},
  {id:5,title:'Minim Veniam Quis',tag:'Descuento',description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',student:'Estudiante nuevo',coverage:'Lorem ipsum dolor sit amet, 25% consectetur.',program:'Aplica para 3 programas',level:'Maestría',faculty:'Administración',mobility:'Intercambio'},
  {id:6,title:'Nostrud Exercitation',tag:'Apoyo económico',description:'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',student:'Estudiante antiguo',coverage:'Lorem ipsum dolor sit amet, 60% consectetur.',program:'Aplica para 6 programas',level:'Doctorado',faculty:'Ciencias Sociales',mobility:'Investigación'},
  {id:7,title:'Ullamco Laboris Nisi',tag:'Beca con compromiso',description:'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',student:'Estudiante nuevo',coverage:'Lorem ipsum dolor sit amet, 80% consectetur.',program:'Aplica para 7 programas',level:'Doctorado',faculty:'Ingeniería',mobility:'Investigación'},
  {id:8,title:'Aliquip Ex Ea',tag:'Préstamo',description:'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',student:'Estudiante antiguo',coverage:'Lorem ipsum dolor sit amet, 35% consectetur.',program:'Aplica para 8 programas',level:'Maestría',faculty:'Ciencias Sociales',mobility:'Práctica'}
];

const filters = [
  {label:'Tipo de Estudiante',key:'student',options:['Estudiante nuevo','Estudiante antiguo']},
  {label:'Nivel Académico',key:'level',options:['Pregrado','Maestría','Doctorado']},
  {label:'Facultad',key:'faculty',options:['Ingeniería','Ciencias Sociales','Administración']},
  {label:'Tipo de Movilidad',key:'mobility',options:['Intercambio','Investigación','Práctica']}
];
const selected = Object.fromEntries(filters.map(f=>[f.key,new Set()]));
const filterContainer = document.getElementById('filters-container');
const cardsGrid = document.getElementById('cards-grid');
const resultCount = document.getElementById('results-count');
const clearButton = document.getElementById('clear-filters');
const emptyState = document.getElementById('empty-state');

filters.forEach(({label,key,options})=>{
  const details=document.createElement('details');details.className='filter-group';
  const summary=document.createElement('summary');summary.textContent=label;details.appendChild(summary);
  const optionsBox=document.createElement('div');optionsBox.className='filter-options';
  options.forEach(option=>{
    const optionLabel=document.createElement('label');optionLabel.className='filter-option';
    const input=document.createElement('input');input.type='checkbox';input.value=option;input.setAttribute('aria-label',`${label}: ${option}`);
    input.addEventListener('change',()=>{input.checked?selected[key].add(option):selected[key].delete(option);render();});
    optionLabel.append(input,document.createTextNode(option));optionsBox.appendChild(optionLabel);
  });
  details.appendChild(optionsBox);filterContainer.appendChild(details);
});

const icon=(glyph)=>{const span=document.createElement('span');span.className='meta-icon';span.setAttribute('aria-hidden','true');span.textContent=glyph;return span;};
const metadata=(glyph,text)=>{const p=document.createElement('p');p.className='meta';p.append(icon(glyph),document.createTextNode(text));return p;};
function createCard(item){
  const article=document.createElement('article');article.className='support-card';
  const tag=document.createElement('span');tag.className='tag';tag.textContent=item.tag;
  const title=document.createElement('h3');title.textContent=item.title;
  const desc=document.createElement('p');desc.className='description';desc.textContent=item.description;
  const footer=document.createElement('div');footer.className='card-footer';
  footer.append(metadata('♧',item.student),metadata('%',item.coverage),metadata('▣',item.program));
  const level=document.createElement('div');level.className='level';level.textContent=item.level;
  footer.appendChild(level);article.append(tag,title,desc,footer);return article;
}
function render(){
  const visible=supports.filter(item=>filters.every(({key})=>selected[key].size===0||selected[key].has(item[key])));
  cardsGrid.replaceChildren(...visible.map(createCard));
  resultCount.textContent=`MOSTRANDO ${visible.length} DE ${supports.length} RESULTADOS`;
  emptyState.hidden=visible.length>0;
  clearButton.disabled=!filters.some(({key})=>selected[key].size>0);
}
clearButton.addEventListener('click',()=>{
  filters.forEach(({key})=>selected[key].clear());
  filterContainer.querySelectorAll('input[type="checkbox"]').forEach(input=>input.checked=false);
  render();
});
render();
