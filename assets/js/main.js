// UGTE ISET Bizerte — سلوكيات مشتركة بين الصفحات

document.addEventListener('DOMContentLoaded', () => {

  // فتح/غلق القائمة في الجوال
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // تفعيل الرابط الحالي في القائمة
  const current = document.body.getAttribute('data-page');
  if (current) {
    document.querySelectorAll('.main-nav a').forEach(a => {
      if (a.getAttribute('data-page') === current) a.classList.add('active');
    });
  }

  // نظام التبويبات (folder-tabs) داخل صفحات الوثائق
  document.querySelectorAll('.folder').forEach(folder => {
    const buttons = folder.querySelectorAll('.folder-tabs button');
    const panes = folder.querySelectorAll('.pane');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = folder.querySelector('#' + btn.dataset.target);
        if (target) target.classList.add('active');
      });
    });
  });

  // أسئلة شائعة قابلة للطي
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // تفعيل قائمة التحقق الشخصية (checklist) بالنقر — تُحفظ محليًا حسب الصفحة
  const storeKey = 'ugte-checklist-' + (current || 'page');
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(storeKey) || '{}'); } catch (e) { saved = {}; }

  document.querySelectorAll('.doc-item .check').forEach((box, i) => {
    box.style.cursor = 'pointer';
    const key = 'item-' + i;
    if (saved[key]) markChecked(box);
    box.addEventListener('click', () => {
      const isChecked = box.classList.toggle('is-checked');
      if (isChecked) markChecked(box); else unmarkChecked(box);
      saved[key] = isChecked;
      localStorage.setItem(storeKey, JSON.stringify(saved));
    });
  });

  function markChecked(box) {
    box.style.background = 'var(--teal)';
    box.innerHTML = '<span style="color:#fff;font-size:14px;display:block;text-align:center;line-height:18px;">✓</span>';
    box.classList.add('is-checked');
  }
  function unmarkChecked(box) {
    box.style.background = 'transparent';
    box.innerHTML = '';
  }

});
