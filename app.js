const fmt = new Intl.NumberFormat('es-CO');
const money = n => new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 }).format(n);

const demoRecords = [
  { id:1, comunidad:'Comunidad Energética Agroproductiva del Huila', municipio:'Palermo', proceso:'Refrigeración láctea', carga:'Tanque de frío 2.000 L', potencia:4.2, prioridad:'Alta', consumo:28, generacion:38, observacion:'Carga crítica para conservación de leche y reducción de pérdidas.' },
  { id:2, comunidad:'Asociación Rural Solar Sur', municipio:'Garzón', proceso:'Bombeo de agua', carga:'Bomba sumergible comunitaria', potencia:3.1, prioridad:'Alta', consumo:18, generacion:27, observacion:'Operar preferiblemente entre 10:00 a. m. y 2:00 p. m.' },
  { id:3, comunidad:'Cooperativa Agroindustrial Energía Limpia', municipio:'Pitalito', proceso:'Secado agroindustrial', carga:'Secador de café eficiente', potencia:5.8, prioridad:'Media', consumo:36, generacion:31, observacion:'Requiere programación por disponibilidad solar y priorización de carga.' },
  { id:4, comunidad:'Nodo Comunitario AgroEnergético', municipio:'La Plata', proceso:'Transformación de alimentos', carga:'Molino y empacadora', potencia:2.6, prioridad:'Media', consumo:16, generacion:23, observacion:'Proceso beneficiado para agregación de valor rural.' }
];

const products = [
  ['Plataforma inteligente', 'Plataforma funcional operativa', '1', 'URL, capturas, manual, repositorio, acta técnica'],
  ['Sistema de monitoreo energético', 'Sensores/fuentes integradas', '1', 'Logs, fichas técnicas, fotografías, informe de integración'],
  ['Dashboard comunitario e institucional', 'Dashboards implementados', '2', 'Capturas, reportes exportados, validación de usuarios'],
  ['Modelo de IA energética', 'Modelo documentado y validado', '1', 'Documento metodológico, código, métricas, recomendaciones'],
  ['Base de datos energética', 'Base estructurada y segura', '1', 'Diccionario de datos, registros, modelo entidad-relación'],
  ['Solución renovable productiva', 'Sistema operativo o fortalecido', '1', 'Diseño técnico, mediciones, acta, registro fotográfico'],
  ['Estrategia ASC', 'Estrategia implementada', '1', 'Talleres, actas, evaluaciones, material pedagógico'],
  ['Monitores energéticos', 'Monitores formados', '10-20', 'Certificados, práctica, acta de designación comunitaria']
];

const phases = [
  ['1-2', 'Alistamiento institucional', 'Alianza, comunidad energética y plan operativo'],
  ['2-4', 'Diagnóstico y línea base', 'Consumo, costos, cargas críticas y capacidades'],
  ['4-6', 'Diseño técnico', 'Solución renovable, sensores y arquitectura digital'],
  ['6-12', 'Desarrollo e integración', 'Plataforma, sensores, dashboard e IA beta'],
  ['10-18', 'Piloto y apropiación', 'Sistema operando y comunidad formada'],
  ['16-22', 'Validación integral', 'Informes técnico, social, económico y ambiental'],
  ['20-24', 'Sostenibilidad y escalamiento', 'Modelo posproyecto y ruta de réplica']
];

const roles = [
  ['IES ejecutora', 'Lidera la ejecución académica, científica, metodológica y CTeI.'],
  ['INFIHUILA', 'Aliado articulador territorial, financiero, institucional y de escalamiento.'],
  ['Comunidad energética', 'Actor territorial central, usuaria de la solución y corresponsable de sostenibilidad.'],
  ['SENA / aliado tecnológico', 'Soporte en sensores, plataforma, formación técnica e integración tecnológica.'],
  ['Entidades territoriales', 'Apoyo logístico, política pública, réplica y sostenibilidad territorial.']
];

const risks = [
  ['Marketplace disfrazado', 'Mitigación: centrar todos los módulos en energía, sensores, IA y uso productivo.'],
  ['TRL insuficiente', 'Mitigación: documentar prototipo, sensores, comunidad, pruebas y validación operativa.'],
  ['IA sin datos reales', 'Mitigación: iniciar con analítica descriptiva, reglas y modelos progresivos.'],
  ['Baja apropiación', 'Mitigación: monitores energéticos, talleres, manuales y decisiones basadas en datos.'],
  ['Sostenibilidad débil', 'Mitigación: fondo de mantenimiento, transferencia tecnológica y gobernanza comunitaria.']
];

let energySeries = {
  months:['Ene','Feb','Mar','Abr','May','Jun'],
  generation:[2450,2720,3100,3360,3520,3740],
  consumption:[3020,2940,2880,2760,2680,2600]
};

let alerts = [
  ['☀️', 'Operación sugerida en horario solar', 'Programar bombeo entre 10:00 a. m. y 2:00 p. m. por mayor generación renovable.'],
  ['⚠️', 'Sobreconsumo en refrigeración', 'Validar aislamiento del tanque de frío y frecuencia de apertura.'],
  ['🧠', 'Predicción de demanda alta', 'Mañana se estima incremento de consumo en proceso de transformación.'],
  ['🌱', 'Emisiones evitadas crecientes', 'La generación renovable del periodo evita aproximadamente 642 kg CO₂.']
];

function setupNav(){
  const btn = document.getElementById('navToggle');
  const nav = document.querySelector('.main-nav');
  if(btn && nav) btn.addEventListener('click', () => nav.classList.toggle('open'));
}

function setupReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const obs = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-visible'); }), { threshold:.12 });
  items.forEach(i => obs.observe(i));
}

function initHeroCounters(){
  const g = document.getElementById('heroGeneration');
  if(!g) return;
  animateNumber(g, 0, 1248, 1000, v => fmt.format(Math.round(v)));
  animateNumber(document.getElementById('heroSavings'), 0, 18, 1000, v => `${Math.round(v)}%`);
  animateNumber(document.getElementById('heroCo2'), 0, 642, 1000, v => fmt.format(Math.round(v)));
}

function animateNumber(el, from, to, ms, format){
  if(!el) return;
  const start = performance.now();
  function step(now){
    const p = Math.min(1, (now-start)/ms);
    el.textContent = format(from + (to-from)*(1 - Math.pow(1-p,3)));
    if(p<1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function getRecords(){ return JSON.parse(localStorage.getItem('agroenergia_records') || 'null') || demoRecords; }
function saveRecords(data){ localStorage.setItem('agroenergia_records', JSON.stringify(data)); }

function calcIPE(record){
  const criticidad = record.prioridad === 'Alta' ? 100 : record.prioridad === 'Media' ? 72 : 50;
  const disp = Math.min(100, (Number(record.generacion)/Math.max(1, Number(record.consumo))) * 82);
  const ahorro = Math.min(100, Number(record.generacion) * 2.2);
  const impacto = record.proceso.includes('Refrigeración') ? 94 : record.proceso.includes('Bombeo') ? 88 : 76;
  const co2 = Math.min(100, Number(record.generacion) * 1.8);
  return Math.round(.30*criticidad + .25*disp + .20*ahorro + .15*impacto + .10*co2);
}

function renderRecords(){
  const grid = document.getElementById('recordsGrid');
  if(!grid) return;
  const search = (document.getElementById('recordSearch')?.value || '').toLowerCase();
  const rows = getRecords().filter(r => `${r.comunidad} ${r.municipio} ${r.proceso} ${r.carga}`.toLowerCase().includes(search));
  grid.innerHTML = rows.map(r => {
    const score = calcIPE(r);
    return `<article class="record-card">
      <div class="card-title"><div><span class="tag ${r.prioridad === 'Alta' ? 'new' : ''}">${r.prioridad}</span><h3>${escapeHtml(r.carga)}</h3></div><span class="chip">IPE ${score}</span></div>
      <p class="muted">${escapeHtml(r.comunidad)} · ${escapeHtml(r.municipio)}</p>
      <div class="meta"><span><b>Proceso:</b> ${escapeHtml(r.proceso)}</span><span><b>Potencia:</b> ${r.potencia} kW</span><span><b>Consumo:</b> ${r.consumo} kWh/día</span><span><b>Generación:</b> ${r.generacion} kWh/día</span></div>
      <div class="score-bar" aria-label="Índice de priorización"><div style="width:${score}%"></div></div>
      <p>${escapeHtml(r.observacion || 'Registro energético sin observación adicional.')}</p>
      <button class="btn btn-outline small" onclick="deleteRecord(${r.id})">Eliminar</button>
    </article>`;
  }).join('') || `<div class="formula-card"><strong>No hay registros.</strong><p>Agrega una carga crítica o carga datos demo.</p></div>`;
}

function initPlatform(){
  const form = document.getElementById('energyForm');
  if(!form) return;
  renderRecords();
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const record = Object.fromEntries(fd.entries());
    record.id = Date.now();
    record.potencia = Number(record.potencia); record.consumo = Number(record.consumo); record.generacion = Number(record.generacion);
    const data = getRecords(); data.unshift(record); saveRecords(data); form.reset(); renderRecords();
  });
  document.getElementById('seedDemo')?.addEventListener('click', () => { saveRecords(demoRecords); renderRecords(); });
  document.getElementById('recordSearch')?.addEventListener('input', renderRecords);
  document.getElementById('clearRecords')?.addEventListener('click', () => { localStorage.removeItem('agroenergia_records'); renderRecords(); });
}

window.deleteRecord = function(id){ saveRecords(getRecords().filter(r => r.id !== id)); renderRecords(); };

function initDashboard(){
  if(!document.getElementById('kpiGrid')) return;
  renderKpis(); drawDashboardCharts(); renderAlerts(); updateImpactResult(3200,820,.164);
  document.getElementById('simulateMonth')?.addEventListener('click', () => {
    const next = `M${energySeries.months.length+1}`;
    const lastG = energySeries.generation.at(-1); const lastC = energySeries.consumption.at(-1);
    energySeries.months.push(next); energySeries.generation.push(lastG + Math.round(120 + Math.random()*260)); energySeries.consumption.push(Math.max(1900, lastC - Math.round(40 + Math.random()*120)));
    if(energySeries.months.length > 8){ energySeries.months.shift(); energySeries.generation.shift(); energySeries.consumption.shift(); }
    renderKpis(); drawDashboardCharts();
  });
  document.getElementById('addAlert')?.addEventListener('click', () => { alerts.unshift(['⚡','Nueva recomendación de eficiencia','Revisar carga crítica de mayor consumo y desplazar operación a horario de máxima generación.']); renderAlerts(); });
  document.getElementById('impactForm')?.addEventListener('submit', e => { e.preventDefault(); const fd = new FormData(e.target); updateImpactResult(+fd.get('kwh'), +fd.get('tarifa'), +fd.get('factor')); });
}

function renderKpis(){
  const gen = energySeries.generation.reduce((a,b)=>a+b,0);
  const cons = energySeries.consumption.reduce((a,b)=>a+b,0);
  const ahorro = Math.max(0, gen * 820);
  const co2 = gen * .164;
  const kpis = [
    ['Energía renovable', `${fmt.format(gen)} kWh`, 'Generación acumulada del piloto'],
    ['Consumo monitoreado', `${fmt.format(cons)} kWh`, 'Datos desde sensores/fuentes'],
    ['Ahorro estimado', money(ahorro), 'Tarifa de referencia COP/kWh'],
    ['CO₂ evitado', `${fmt.format(Math.round(co2))} kg`, 'Factor estimado de emisión'],
    ['Cargas críticas', '8', 'Refrigeración, bombeo, secado, acopio'],
    ['Reportes generados', '12', 'Meta mínima del proyecto'],
    ['Monitores formados', '16', 'Jóvenes y líderes comunitarios'],
    ['Disponibilidad', '96%', 'Meta ≥ 95% durante piloto']
  ];
  document.getElementById('kpiGrid').innerHTML = kpis.map(k => `<article class="kpi-card"><span>${k[0]}</span><strong>${k[1]}</strong><small>${k[2]}</small></article>`).join('');
}

function drawDashboardCharts(){
  drawLineChart('energyTrend', energySeries.months, [
    { label:'Generación', values: energySeries.generation },
    { label:'Consumo', values: energySeries.consumption }
  ]);
  drawBarChart('loadChart', ['Refrig.','Bombeo','Secado','Acopio','Transform.'], [34,22,18,15,11]);
  const trl = document.getElementById('trlProgress'); if(trl) trl.style.width = '78%';
}

function drawLineChart(id, labels, series){
  const canvas = document.getElementById(id); if(!canvas) return;
  const ctx = canvas.getContext('2d'); const w = canvas.width, h = canvas.height; ctx.clearRect(0,0,w,h);
  const pad = 54; const all = series.flatMap(s=>s.values); const max = Math.max(...all)*1.15; const min = Math.min(...all)*.85;
  ctx.strokeStyle='#DDE6E8'; ctx.lineWidth=1; ctx.font='16px Trebuchet MS'; ctx.fillStyle='#64748B';
  for(let i=0;i<5;i++){ const y=pad+(h-2*pad)*i/4; ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(w-pad,y); ctx.stroke(); }
  labels.forEach((l,i)=>{ const x=pad+(w-2*pad)*i/(labels.length-1); ctx.fillText(l,x-12,h-20); });
  const colors=['#006C72','#CCD400'];
  series.forEach((s,si)=>{ ctx.strokeStyle=colors[si]; ctx.lineWidth=5; ctx.beginPath(); s.values.forEach((v,i)=>{ const x=pad+(w-2*pad)*i/(labels.length-1); const y=h-pad-((v-min)/(max-min))*(h-2*pad); if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y); }); ctx.stroke(); s.values.forEach((v,i)=>{ const x=pad+(w-2*pad)*i/(labels.length-1); const y=h-pad-((v-min)/(max-min))*(h-2*pad); ctx.fillStyle=colors[si]; ctx.beginPath(); ctx.arc(x,y,6,0,Math.PI*2); ctx.fill(); }); });
  ctx.fillStyle='#006C72'; ctx.fillText('Generación', pad, 26); ctx.fillStyle='#6d7400'; ctx.fillText('Consumo', pad+130, 26);
}

function drawBarChart(id, labels, values){
  const canvas = document.getElementById(id); if(!canvas) return;
  const ctx = canvas.getContext('2d'); const w = canvas.width, h = canvas.height; ctx.clearRect(0,0,w,h);
  const pad=42; const max=Math.max(...values)*1.2; const bw=(w-2*pad)/values.length*.64;
  ctx.font='14px Trebuchet MS';
  values.forEach((v,i)=>{ const x=pad+(w-2*pad)*i/values.length+18; const bh=(v/max)*(h-90); const y=h-50-bh; const grd=ctx.createLinearGradient(0,y,0,h-50); grd.addColorStop(0,'#006C72'); grd.addColorStop(1,'#CCD400'); ctx.fillStyle=grd; roundRect(ctx,x,y,bw,bh,10); ctx.fill(); ctx.fillStyle='#1F2937'; ctx.fillText(`${v}%`,x+5,y-8); ctx.fillStyle='#64748B'; ctx.fillText(labels[i],x-4,h-20); });
}
function roundRect(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }

function renderAlerts(){
  const list = document.getElementById('alertsList'); if(!list) return;
  list.innerHTML = alerts.slice(0,6).map(a => `<div class="alert-item"><i>${a[0]}</i><div><strong>${a[1]}</strong><span>${a[2]}</span></div><span class="chip">IA</span></div>`).join('');
}

function updateImpactResult(kwh, tarifa, factor){
  const el = document.getElementById('impactResult'); if(!el) return;
  const ahorro = kwh * tarifa; const co2 = kwh * factor;
  el.style.display='block';
  el.innerHTML = `<strong>Ahorro estimado:</strong> ${money(ahorro)}<br><strong>CO₂ evitado:</strong> ${fmt.format(Math.round(co2))} kg/mes<br><strong>Equivalente anual:</strong> ${fmt.format(Math.round(co2*12/1000))} toneladas CO₂/año`;
}

function initReports(){
  const table = document.getElementById('productsTable'); if(!table) return;
  table.innerHTML = products.map(p => `<tr><td><strong>${p[0]}</strong></td><td>${p[1]}</td><td>${p[2]}</td><td>${p[3]}</td></tr>`).join('');
  document.getElementById('phasesGrid').innerHTML = phases.map((p,i)=>`<article class="phase-card"><strong>Meses ${p[0]}</strong><h3>Fase ${i+1}. ${p[1]}</h3><p>${p[2]}</p></article>`).join('');
  document.getElementById('roleList').innerHTML = roles.map(r=>`<div class="role-item"><strong>${r[0]}</strong><p>${r[1]}</p></div>`).join('');
  document.getElementById('riskList').innerHTML = risks.map(r=>`<div class="risk-item"><strong>${r[0]}</strong><p>${r[1]}</p></div>`).join('');
}

function escapeHtml(text){
  return String(text || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
}

document.addEventListener('DOMContentLoaded', () => { setupNav(); setupReveal(); initHeroCounters(); initPlatform(); initDashboard(); initReports(); });
