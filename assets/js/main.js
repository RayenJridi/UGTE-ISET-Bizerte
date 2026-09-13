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
 document.querySelectorAll('.doc-item .check').forEach((box,i)=>{const k='item-'+i;if(saved[k])mark(box);box.addEventListener('click',()=>{saved[k]=!saved[k];saved[k]?mark(box):unmark(box);localStorage.setItem(key,JSON.stringify(saved))})});
 function mark(box){box.style.background='var(--teal)';box.innerHTML='<span style="color:#fff;font-weight:900">✓</span>'}function unmark(box){box.style.background='transparent';box.innerHTML=''}
});
