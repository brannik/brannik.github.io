(async()=>{
  const $=s=>document.querySelector(s);
  const response=await fetch('tactic.json');
  const data=await response.json();
  let difficulty='normal';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const render=()=>{
    const config=data.difficulty?.[difficulty]||{};
    const phases=config.phases||[];
    $('#phaseList').innerHTML=phases.map((phase,index)=>{
      const image=phase.image?`<img class="tactic-map" src="${esc(phase.image)}" alt="Тактическа карта – ${esc(phase.title||`Фаза ${index+1}`)}">`:`<div class="map-placeholder"><span>МЯСТО ЗА СТАТИЧНА КАРТА</span><small>Добави пътя до твоето изображение в tactic.json → image</small></div>`;
      const spells=(phase.spells||[]).map(spell=>`<article class="spell-card"><div class="spell-icon">${spell.icon?`<img src="${esc(spell.icon)}" alt="">`:'<span>ICON</span>'}</div><div><h3>${esc(spell.name||'Име на магията')}</h3><p>${esc(spell.description||'Добави описание на опасността и реакцията на рейда.')}</p></div></article>`).join('');
      return `<article class="phase-card"><div class="phase-heading"><span>ФАЗА ${index+1}</span><h2>${esc(phase.title||`Фаза ${index+1}`)}</h2></div>${image}<section class="phase-description"><h3>Описание на тактиката</h3><p>${esc(phase.description||'Тук добави описанието на фазата, позиционирането и действията на рейда.')}</p></section><section class="spell-section"><h3>Магии, за които да внимаваме</h3>${spells?`<div class="spell-list">${spells}</div>`:'<p class="empty-hint">Добави магии и техните икони в tactic.json → spells.</p>'}</section>${phase.notes?`<section class="guild-notes"><h3>Бележки на гилдията</h3><p>${esc(phase.notes)}</p></section>`:''}</article>`;
    }).join('')||'<p class="empty-hint">Няма добавени фази.</p>';
  };
  document.querySelectorAll('[data-diff]').forEach(button=>button.addEventListener('click',()=>{
    difficulty=button.dataset.diff;
    document.querySelectorAll('[data-diff]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
    render();
  }));
  $('#printBtn')?.addEventListener('click',()=>window.print());
  $('#discordBtn')?.addEventListener('click',()=>{
    const phases=data.difficulty?.[difficulty]?.phases||[];
    const text=`**${data.boss} – ${difficulty==='normal'?'Нормална':'Героична'}**\n`+phases.map((p,i)=>`**${p.title||`Фаза ${i+1}`}**\n${p.description||''}\n`+(p.spells||[]).map(s=>`• ${s.name}: ${s.description}`).join('\n')).join('\n\n');
    navigator.clipboard?.writeText(text).then(()=>alert('Текстът е копиран за Discord.')).catch(()=>alert('Копирането не е достъпно в този браузър.'));
  });
  render();
})();
