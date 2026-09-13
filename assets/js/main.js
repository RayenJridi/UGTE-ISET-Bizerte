document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.querySelector('.nav-toggle'),nav=document.querySelector('.main-nav');
 if(toggle&&nav)toggle.addEventListener('click',()=>nav.classList.toggle('open'));
 const current=document.body.dataset.page;
 document.querySelectorAll('.main-nav a[data-page]').forEach(a=>{if(a.dataset.page===current)a.classList.add('active')});
 document.querySelectorAll('.folder').forEach(folder=>{
  const buttons=folder.querySelectorAll('.folder-tabs button');const panes=folder.querySelectorAll('.pane');
  buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));panes.forEach(p=>p.classList.remove('active'));btn.classList.add('active');const p=folder.querySelector('#'+btn.dataset.target);if(p)p.classList.add('active')}));
 });
 document.querySelectorAll('.faq-item').forEach(item=>{const q=item.querySelector('.faq-q');if(q)q.addEventListener('click',()=>{const open=item.classList.contains('open');document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));if(!open)item.classList.add('open')})});
 const key='ugte-checklist-'+(current||'page');let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){}
 const boxes=[...document.querySelectorAll('.doc-item .check')];
 function updateProgress(){const done=boxes.filter(b=>b.classList.contains('checked')).length,total=boxes.length,pct=total?Math.round(done/total*100):0;const count=document.getElementById('checklist-count'),bar=document.getElementById('checklist-progress');if(count)count.textContent=done+' / '+total;if(bar)bar.style.width=pct+'%'}
 function setBox(box,checked){box.classList.toggle('checked',checked);box.setAttribute('aria-checked',checked?'true':'false')}
 boxes.forEach((box,i)=>{const k='item-'+i;if(saved[k])setBox(box,true);const toggle=()=>{saved[k]=!saved[k];setBox(box,saved[k]);localStorage.setItem(key,JSON.stringify(saved));updateProgress()};box.addEventListener('click',toggle);box.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}})});
 const reset=document.getElementById('reset-checklist');if(reset)reset.addEventListener('click',()=>{saved={};localStorage.removeItem(key);boxes.forEach(b=>setBox(b,false));updateProgress()});updateProgress();
});
