// Product Listing: filtering, searching & sorting
document.addEventListener('DOMContentLoaded', () => {
  const PRODUCTS = [
    { id:1, name:'Laptop Pro 14"', category:'electronics', price:1200, rating:4.7, desc:'Lightweight laptop' },
    { id:2, name:'Wireless Headphones', category:'electronics', price:80, rating:4.2, desc:'Comfortable & clear audio' },
    { id:3, name:'JavaScript Book', category:'books', price:29, rating:4.8, desc:'Beginner -> Advanced' },
    { id:4, name:'React Guide', category:'books', price:25, rating:4.6, desc:'Hands-on React' },
    { id:5, name:'Mechanical Keyboard', category:'electronics', price:100, rating:4.5, desc:'Tactile switches' },
    { id:6, name:'Notebook', category:'stationery', price:6, rating:4.1, desc:'100 pages ruled' }
  ];

  const grid = document.getElementById('grid');
  const categorySel = document.getElementById('category');
  const sortSel = document.getElementById('sort');
  const searchInput = document.getElementById('search');

  function populateCategories() {
    const cats = new Set(PRODUCTS.map(p => p.category));
    cats.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c; opt.textContent = capitalize(c);
      categorySel.appendChild(opt);
    });
  }

  function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

  function render() {
    const q = (searchInput.value || '').toLowerCase();
    let list = PRODUCTS.filter(p => {
      const cat = categorySel.value;
      if(cat !== 'all' && p.category !== cat) return false;
      if(q && !(p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))) return false;
      return true;
    });

    const sortBy = sortSel.value;
    if(sortBy === 'price-asc') list.sort((a,b)=>a.price-b.price);
    else if(sortBy === 'price-desc') list.sort((a,b)=>b.price-a.price);
    else if(sortBy === 'rating-desc') list.sort((a,b)=>b.rating-a.rating);

    grid.innerHTML = '';
    if(list.length === 0){
      grid.innerHTML = '<p class="muted">No products match your criteria.</p>';
      return;
    }

    for(const p of list){
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${escapeHtml(p.name)}</h3>
        <p class="muted">${capitalize(p.category)} • ${escapeHtml(p.desc)}</p>
        <p class="price">$${p.price.toFixed(2)} <span style="float:right">⭐ ${p.rating}</span></p>
      `;
      grid.appendChild(card);
    }
  }

  function escapeHtml(str){
    return String(str).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
  }

  searchInput.addEventListener('input', render);
  categorySel.addEventListener('change', render);
  sortSel.addEventListener('change', render);

  populateCategories();
  render();
});
