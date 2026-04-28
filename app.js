/* =========================================================
   AgroConecta Sur - Lógica frontend Vanilla JavaScript
   Datos simulados en memoria + localStorage para prototipo

   Evolución futura:
   - Reemplazar arrays JSON por fetch('/api/ofertas') y fetch('/api/demandas')
   - Implementar backend Node.js + Express con controladores por módulo
   - Persistir información en PostgreSQL, MySQL o Firebase
   - Usar JWT para autenticación real y middleware de roles/permisos
   - Conectar las gráficas Canvas a endpoints de analítica institucional
   ========================================================= */

const usuarios = [
  { id: 1, nombre: 'Administrador INFIHUILA', rol: 'INFIHUILA', permisos: ['crear', 'editar', 'consultar', 'validar'] },
  { id: 2, nombre: 'Analista USCO', rol: 'USCO', permisos: ['consultar'] },
  { id: 3, nombre: 'Gobernación del Huila', rol: 'Gobernación del Huila', permisos: ['consultar'] },
  { id: 4, nombre: 'Productor regional', rol: 'Productor', permisos: ['crearOferta'] },
  { id: 5, nombre: 'Comprador institucional', rol: 'Comprador', permisos: ['crearDemanda'] }
];

const ofertasBase = [
  { id: 101, tipo: 'Oferta', nombre: 'Queso campesino artesanal', departamento: 'Huila', municipio: 'Pitalito', categoria: 'Lácteos', cantidad: 1200, unidad: 'kg/mes', precio: 16800000, actor: 'Asociación Láctea del Sur' },
  { id: 102, tipo: 'Oferta', nombre: 'Leche cruda refrigerada', departamento: 'Caquetá', municipio: 'Florencia', categoria: 'Lácteos', cantidad: 18000, unidad: 'litros/mes', precio: 34200000, actor: 'Cooperativa Lechera Caqueteña' },
  { id: 103, tipo: 'Oferta', nombre: 'Café especial orgánico', departamento: 'Huila', municipio: 'La Plata', categoria: 'Orgánicos', cantidad: 800, unidad: 'kg/mes', precio: 24000000, actor: 'Red Cafetera del Occidente' },
  { id: 104, tipo: 'Oferta', nombre: 'Plátano hartón', departamento: 'Putumayo', municipio: 'Mocoa', categoria: 'Producción Agrícola', cantidad: 9000, unidad: 'kg/mes', precio: 13500000, actor: 'Asoproductores Putumayo' },
  { id: 105, tipo: 'Oferta', nombre: 'Yuca fresca seleccionada', departamento: 'Amazonas', municipio: 'Leticia', categoria: 'Producción Agrícola', cantidad: 4500, unidad: 'kg/mes', precio: 7200000, actor: 'Comunidad Agroamazónica' },
  { id: 106, tipo: 'Oferta', nombre: 'Yogur natural regional', departamento: 'Huila', municipio: 'Garzón', categoria: 'Lácteos', cantidad: 6000, unidad: 'unidades/mes', precio: 18000000, actor: 'Lácteos del Centro' },
  { id: 107, tipo: 'Oferta', nombre: 'Cacao orgánico fermentado', departamento: 'Caquetá', municipio: 'Belén de los Andaquíes', categoria: 'Orgánicos', cantidad: 1000, unidad: 'kg/mes', precio: 15000000, actor: 'Cacao Paz Caquetá' },
  { id: 108, tipo: 'Oferta', nombre: 'Piña oro miel', departamento: 'Putumayo', municipio: 'Puerto Asís', categoria: 'Producción Agrícola', cantidad: 7000, unidad: 'kg/mes', precio: 12600000, actor: 'Agroalianza Putumayo' }
];

const demandasBase = [
  { id: 201, tipo: 'Demanda', nombre: 'Queso fresco para operador alimentario', departamento: 'Huila', municipio: 'Neiva', categoria: 'Lácteos', cantidad: 900, unidad: 'kg/mes', precio: 14400000, actor: 'Operador Alimentario Sur' },
  { id: 202, tipo: 'Demanda', nombre: 'Leche para programa institucional', departamento: 'Caquetá', municipio: 'Florencia', categoria: 'Lácteos', cantidad: 12000, unidad: 'litros/mes', precio: 24000000, actor: 'Comprador Institucional Caquetá' },
  { id: 203, tipo: 'Demanda', nombre: 'Café especial para tienda regional', departamento: 'Huila', municipio: 'Neiva', categoria: 'Orgánicos', cantidad: 350, unidad: 'kg/mes', precio: 12250000, actor: 'Comercializadora Huila Café' },
  { id: 204, tipo: 'Demanda', nombre: 'Frutas y tubérculos para abastecimiento', departamento: 'Amazonas', municipio: 'Leticia', categoria: 'Producción Agrícola', cantidad: 5000, unidad: 'kg/mes', precio: 10000000, actor: 'Operador Logístico Amazónico' },
  { id: 205, tipo: 'Demanda', nombre: 'Cacao orgánico para transformación', departamento: 'Caquetá', municipio: 'San Vicente del Caguán', categoria: 'Orgánicos', cantidad: 650, unidad: 'kg/mes', precio: 9750000, actor: 'Chocolatería Regional' },
  { id: 206, tipo: 'Demanda', nombre: 'Plátano para canal Horeca', departamento: 'Putumayo', municipio: 'Puerto Asís', categoria: 'Producción Agrícola', cantidad: 3500, unidad: 'kg/mes', precio: 6650000, actor: 'Distribuidora Surcolombiana' }
];

const oportunidades = [
  { producto: 'Queso campesino', oferta: 'Asociación Láctea del Sur', demanda: 'Operador Alimentario Sur', departamento: 'Huila', valor: 14400000, estado: 'Prioritaria' },
  { producto: 'Leche cruda', oferta: 'Cooperativa Lechera Caqueteña', demanda: 'Comprador Institucional Caquetá', departamento: 'Caquetá', valor: 24000000, estado: 'En análisis' },
  { producto: 'Cacao orgánico', oferta: 'Cacao Paz Caquetá', demanda: 'Chocolatería Regional', departamento: 'Caquetá', valor: 9750000, estado: 'Validación técnica' },
  { producto: 'Plátano hartón', oferta: 'Asoproductores Putumayo', demanda: 'Distribuidora Surcolombiana', departamento: 'Putumayo', valor: 6650000, estado: 'Potencial' }
];

const departments = ['Huila', 'Caquetá', 'Putumayo', 'Amazonas'];
const categories = ['Lácteos', 'Producción Agrícola', 'Orgánicos'];
const chartPalette = ['#006C72', '#CCD400', '#004651', '#6BA5A8', '#A4AD00', '#1F2937'];

const formatCurrency = value => new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0
}).format(value);

const shortCurrency = value => {
  if (value >= 1000000000) return `$${(value / 1000000000).toFixed(1)} MM`;
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)} M`;
  return `$${Math.round(value / 1000)} K`;
};

function getStoredPublications() {
  const stored = JSON.parse(localStorage.getItem('agroPublicaciones') || '[]');
  return [...ofertasBase, ...demandasBase, ...stored];
}

function savePublication(publication) {
  const stored = JSON.parse(localStorage.getItem('agroPublicaciones') || '[]');
  stored.push(publication);
  localStorage.setItem('agroPublicaciones', JSON.stringify(stored));
}

function handleLogin() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const role = document.getElementById('roleSelect').value;
    const userName = document.getElementById('userName').value.trim();
    const message = document.getElementById('loginMessage');

    if (!role || !userName) {
      message.textContent = 'Completa el rol y el nombre de usuario.';
      return;
    }

    const user = usuarios.find(item => item.rol === role) || { rol: role, permisos: [] };
    localStorage.setItem('agroSession', JSON.stringify({ nombre: userName, rol: role, permisos: user.permisos }));
    message.textContent = `Acceso simulado autorizado como ${role}.`;

    if (role === 'INFIHUILA' || role === 'USCO' || role === 'Gobernación del Huila') {
      window.location.href = 'dashboard_infihuila.html';
    } else {
      window.location.href = 'marketplace.html';
    }
  });
}

function applySessionLabel() {
  const label = document.getElementById('sessionLabel');
  const session = JSON.parse(localStorage.getItem('agroSession') || 'null');
  if (label && session) {
    label.textContent = session.rol === 'INFIHUILA'
      ? `Panel administrativo · ${session.nombre}`
      : `Modo consulta · ${session.rol}`;
  }

  document.querySelectorAll('#logoutBtn').forEach(button => {
    button.addEventListener('click', () => {
      localStorage.removeItem('agroSession');
      window.location.href = 'index.html';
    });
  });
}

function renderMarketplace() {
  const grid = document.getElementById('marketplaceGrid');
  if (!grid) return;

  const department = document.getElementById('departmentFilter').value;
  const category = document.getElementById('categoryFilter').value;
  const type = document.getElementById('typeFilter').value;
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');

  const publications = getStoredPublications().filter(item => {
    const matchDepartment = department === 'Todos' || item.departamento === department;
    const matchCategory = category === 'Todas' || item.categoria === category;
    const matchType = type === 'Todos' || item.tipo === type;
    return matchDepartment && matchCategory && matchType;
  });

  grid.innerHTML = '';
  publications.forEach(item => {
    const card = document.createElement('article');
    card.className = 'publication-card';
    card.innerHTML = `
      <div class="card-footer">
        <span class="badge ${item.tipo === 'Oferta' ? 'badge-offer' : 'badge-demand'}">${item.tipo}</span>
        <span class="badge badge-neutral">${item.categoria}</span>
      </div>
      <h3>${item.nombre}</h3>
      <div class="card-meta">
        <span><strong>Departamento:</strong> ${item.departamento}</span>
        <span><strong>Municipio:</strong> ${item.municipio}</span>
        <span><strong>Cantidad:</strong> ${item.cantidad.toLocaleString('es-CO')}</span>
        <span><strong>Unidad:</strong> ${item.unidad}</span>
        <span><strong>Valor:</strong> ${formatCurrency(item.precio)}</span>
        <span><strong>Actor:</strong> ${item.actor}</span>
      </div>
      <div class="card-footer">
        <small>Publicación #${item.id}</small>
        <button class="btn btn-outline small" type="button" onclick="alert('Detalle simulado: ${item.nombre} · ${item.actor}')">Ver detalle</button>
      </div>
    `;
    grid.appendChild(card);
  });

  resultsCount.textContent = `${publications.length} resultado${publications.length === 1 ? '' : 's'}`;
  emptyState.classList.toggle('hidden', publications.length > 0);
}

function initMarketplaceEvents() {
  if (!document.getElementById('marketplaceGrid')) return;

  ['departmentFilter', 'categoryFilter', 'typeFilter'].forEach(id => {
    document.getElementById(id).addEventListener('change', renderMarketplace);
  });

  document.getElementById('clearFiltersBtn').addEventListener('click', () => {
    document.getElementById('departmentFilter').value = 'Todos';
    document.getElementById('categoryFilter').value = 'Todas';
    document.getElementById('typeFilter').value = 'Todos';
    renderMarketplace();
  });

  const form = document.getElementById('publicationForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const publication = {
      id: Date.now(),
      tipo: document.getElementById('pubType').value,
      nombre: document.getElementById('pubName').value.trim(),
      departamento: document.getElementById('pubDepartment').value,
      municipio: document.getElementById('pubMunicipality').value.trim(),
      categoria: document.getElementById('pubCategory').value,
      cantidad: Number(document.getElementById('pubQuantity').value),
      unidad: document.getElementById('pubUnit').value.trim(),
      precio: Number(document.getElementById('pubPrice').value),
      actor: document.getElementById('pubActor').value.trim()
    };

    savePublication(publication);
    form.reset();
    document.getElementById('publicationMessage').textContent = 'Publicación agregada correctamente en localStorage.';
    renderMarketplace();
  });

  renderMarketplace();
}

function calculateDashboardKpis() {
  const kpiProductores = document.getElementById('kpiProductores');
  if (!kpiProductores) return;

  const publications = getStoredPublications();
  const ofertas = publications.filter(item => item.tipo === 'Oferta');
  const demandas = publications.filter(item => item.tipo === 'Demanda');
  const productores = new Set(ofertas.map(item => item.actor));
  const compradores = new Set(demandas.map(item => item.actor));
  const territory = new Set(publications.map(item => item.departamento));
  const totalValue = publications.reduce((sum, item) => sum + Number(item.precio || 0), 0);

  document.getElementById('kpiProductores').textContent = productores.size;
  document.getElementById('kpiCompradores').textContent = compradores.size;
  document.getElementById('kpiOfertas').textContent = ofertas.length;
  document.getElementById('kpiDemandas').textContent = demandas.length;
  document.getElementById('kpiValor').textContent = formatCurrency(totalValue);
  document.getElementById('kpiDepartamentos').textContent = territory.size;
  const totalValueBadge = document.getElementById('totalValueBadge');
  if (totalValueBadge) totalValueBadge.textContent = formatCurrency(totalValue);
}

function renderOpportunities() {
  const tbody = document.getElementById('opportunitiesTable');
  if (!tbody) return;
  tbody.innerHTML = oportunidades.map(item => `
    <tr>
      <td>${item.producto}</td>
      <td>${item.oferta}</td>
      <td>${item.demanda}</td>
      <td>${item.departamento}</td>
      <td>${formatCurrency(item.valor)}</td>
      <td><span class="badge badge-neutral">${item.estado}</span></td>
    </tr>
  `).join('');
}

function renderTerritoryAnalysis() {
  const wrapper = document.getElementById('territoryAnalysis');
  if (!wrapper) return;

  const publications = getStoredPublications();
  wrapper.innerHTML = departments.map(department => {
    const items = publications.filter(item => item.departamento === department);
    const value = items.reduce((sum, item) => sum + item.precio, 0);
    const offers = items.filter(item => item.tipo === 'Oferta').length;
    const demands = items.filter(item => item.tipo === 'Demanda').length;
    return `
      <article class="territory-card">
        <strong>${department}</strong>
        <span>${items.length} publicaciones · ${offers} ofertas · ${demands} demandas</span>
        <span>${formatCurrency(value)}</span>
      </article>
    `;
  }).join('');
}

/* =========================
   Motor simple de gráficas Canvas
   Sin librerías externas: ideal para prototipo institucional liviano.
   ========================= */
function setupCanvas(canvas) {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.getAttribute('width');
  const height = canvas.getAttribute('height');
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.scale(ratio, ratio);
  return { ctx, width: Number(width), height: Number(height) };
}

function drawBase(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = '#DCE3E6';
  ctx.lineWidth = 1;
  for (let i = 1; i <= 4; i++) {
    const y = 42 + i * ((height - 92) / 4);
    ctx.beginPath();
    ctx.moveTo(56, y);
    ctx.lineTo(width - 22, y);
    ctx.stroke();
  }
}

function drawBarChart(canvasId, labels, values, titleFormatter = shortCurrency) {
  const canvas = document.getElementById(canvasId);
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  drawBase(ctx, width, height);
  const max = Math.max(...values, 1);
  const plotW = width - 96;
  const plotH = height - 110;
  const barGap = 22;
  const barW = Math.max(34, (plotW - barGap * (values.length - 1)) / values.length);

  values.forEach((value, i) => {
    const x = 58 + i * (barW + barGap);
    const h = (value / max) * plotH;
    const y = height - 50 - h;
    ctx.fillStyle = chartPalette[i % chartPalette.length];
    ctx.beginPath();
    ctx.roundRect(x, y, barW, h, 10);
    ctx.fill();

    ctx.fillStyle = '#1F2937';
    ctx.font = '700 13px Trebuchet MS';
    ctx.textAlign = 'center';
    ctx.fillText(titleFormatter(value), x + barW / 2, y - 10);
    ctx.fillStyle = '#64748B';
    ctx.font = '700 12px Trebuchet MS';
    ctx.fillText(labels[i], x + barW / 2, height - 24);
  });
}

function drawGroupedColumnChart(canvasId, labels, offers, demands) {
  const canvas = document.getElementById(canvasId);
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  drawBase(ctx, width, height);
  const max = Math.max(...offers, ...demands, 1);
  const plotW = width - 110;
  const plotH = height - 110;
  const groupW = plotW / labels.length;
  const barW = Math.min(42, groupW / 4);

  labels.forEach((label, i) => {
    const center = 68 + groupW * i + groupW / 2;
    [offers[i], demands[i]].forEach((value, j) => {
      const h = (value / max) * plotH;
      const x = center + (j === 0 ? -barW - 4 : 4);
      const y = height - 50 - h;
      ctx.fillStyle = j === 0 ? '#006C72' : '#CCD400';
      ctx.beginPath();
      ctx.roundRect(x, y, barW, h, 8);
      ctx.fill();
      ctx.fillStyle = '#1F2937';
      ctx.font = '800 12px Trebuchet MS';
      ctx.textAlign = 'center';
      ctx.fillText(value, x + barW / 2, y - 8);
    });
    ctx.fillStyle = '#64748B';
    ctx.font = '700 12px Trebuchet MS';
    ctx.fillText(label, center, height - 24);
  });

  ctx.fillStyle = '#006C72'; ctx.fillRect(width - 180, 22, 12, 12);
  ctx.fillStyle = '#1F2937'; ctx.fillText('Ofertas', width - 135, 32);
  ctx.fillStyle = '#CCD400'; ctx.fillRect(width - 92, 22, 12, 12);
  ctx.fillStyle = '#1F2937'; ctx.fillText('Demandas', width - 35, 32);
}

function drawPieChart(canvasId, labels, values) {
  const canvas = document.getElementById(canvasId);
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  const total = values.reduce((a, b) => a + b, 0) || 1;
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.34;
  let start = -Math.PI / 2;

  values.forEach((value, i) => {
    const angle = (value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + angle);
    ctx.closePath();
    ctx.fillStyle = chartPalette[i % chartPalette.length];
    ctx.fill();
    start += angle;
  });

  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.58, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.fillStyle = '#004651';
  ctx.font = '900 28px Trebuchet MS';
  ctx.textAlign = 'center';
  ctx.fillText(total, cx, cy - 4);
  ctx.font = '700 13px Trebuchet MS';
  ctx.fillStyle = '#64748B';
  ctx.fillText('publicaciones', cx, cy + 20);

  const legend = document.getElementById('categoryLegend');
  if (legend) {
    legend.innerHTML = labels.map((label, i) => {
      const pct = Math.round((values[i] / total) * 100);
      return `<span class="legend-item"><i class="legend-dot" style="--dot-color:${chartPalette[i % chartPalette.length]}"></i>${label}: ${pct}%</span>`;
    }).join('');
  }
}

function drawTrendChart(canvasId, labels, values) {
  const canvas = document.getElementById(canvasId);
  const setup = setupCanvas(canvas);
  if (!setup) return;
  const { ctx, width, height } = setup;
  drawBase(ctx, width, height);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const plotW = width - 100;
  const plotH = height - 112;
  const points = values.map((value, i) => {
    const x = 60 + (plotW / (values.length - 1)) * i;
    const y = height - 52 - ((value - min) / (max - min || 1)) * plotH;
    return { x, y, value };
  });

  ctx.beginPath();
  points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = '#006C72';
  ctx.lineWidth = 4;
  ctx.stroke();

  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = i === points.length - 1 ? '#CCD400' : '#006C72';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#64748B';
    ctx.font = '700 12px Trebuchet MS';
    ctx.textAlign = 'center';
    ctx.fillText(labels[i], p.x, height - 24);
  });

  const last = points[points.length - 1];
  ctx.fillStyle = '#004651';
  ctx.font = '900 14px Trebuchet MS';
  ctx.fillText(shortCurrency(last.value), last.x, last.y - 16);
}

function renderDashboardCharts() {
  if (!document.getElementById('chartDepartmentValue')) return;
  const publications = getStoredPublications();
  const valueByDepartment = departments.map(dep => publications
    .filter(item => item.departamento === dep)
    .reduce((sum, item) => sum + Number(item.precio || 0), 0));

  const categoryCounts = categories.map(cat => publications.filter(item => item.categoria === cat).length);
  const offersByDepartment = departments.map(dep => publications.filter(item => item.departamento === dep && item.tipo === 'Oferta').length);
  const demandsByDepartment = departments.map(dep => publications.filter(item => item.departamento === dep && item.tipo === 'Demanda').length);
  const totalValue = publications.reduce((sum, item) => sum + Number(item.precio || 0), 0);
  const trend = [0.52, 0.61, 0.68, 0.78, 0.86, 1].map(factor => Math.round(totalValue * factor));

  drawBarChart('chartDepartmentValue', departments, valueByDepartment);
  drawPieChart('chartCategoryPie', categories, categoryCounts);
  drawGroupedColumnChart('chartOfferDemand', departments, offersByDepartment, demandsByDepartment);
  drawTrendChart('chartTrend', ['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr'], trend);
}

function initApp() {
  handleLogin();
  applySessionLabel();
  initMarketplaceEvents();
  calculateDashboardKpis();
  renderDashboardCharts();
  renderOpportunities();
  renderTerritoryAnalysis();
}

document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('resize', () => {
  window.clearTimeout(window.__agroResizeTimer);
  window.__agroResizeTimer = window.setTimeout(renderDashboardCharts, 160);
});
