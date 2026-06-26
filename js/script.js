/* ===== DATA PRODUK (from API) ===== */
let produkData = [];
let produkLoaded = false;

async function loadProduk() {
  try {
    const res = await fetch('api/produk.php?arsip=0');
    produkData = await res.json();
    produkLoaded = true;
  } catch (e) {
    console.error('Gagal memuat produk:', e);
    produkLoaded = true;
  }
}

/* ===== CART (Session-based via localStorage) ===== */
let cart = JSON.parse(localStorage.getItem('kopma_cart')) || [];

function saveCart() {
  localStorage.setItem('kopma_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  if (total > 0) {
    badge.textContent = total;
    badge.classList.add('show');
  } else {
    badge.classList.remove('show');
  }
}

function addToCart(id, qty = 1) {
  const produk = produkData.find(p => p.id === id);
  if (!produk) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, nama: produk.nama, harga: produk.harga, gambar: produk.gambar, qty });
  }
  saveCart();
  renderCartItems();
  openCart();
  showCartNotification(`${produk.nama} ditambahkan ke keranjang`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCartItems();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }
  saveCart();
  renderCartItems();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.harga * item.qty, 0);
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <h4>Keranjang Kosong</h4>
        <p>Belum ada produk yang ditambahkan ke keranjang.</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = 'Rp 0';
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.gambar}" alt="${item.nama}" class="cart-item-img" loading="lazy">
      <div class="cart-item-info">
        <h4>${item.nama}</h4>
        <div class="cart-item-price">Rp ${item.harga.toLocaleString()}</div>
        <div class="cart-item-qty">
          <button onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
          <span>${item.qty}</span>
          <button onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
    </div>
  `).join('');
  if (totalEl) totalEl.textContent = `Rp ${getCartTotal().toLocaleString()}`;
}

function openCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar) sidebar.classList.add('active');
  if (overlay) overlay.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar) sidebar.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

/* ===== WHATSAPP CHECKOUT ===== */
function checkoutWA() {
  if (cart.length === 0) {
    alert('Keranjang masih kosong');
    return;
  }
  const noAdmin = '6285727877235';
  let pesan = `Halo Admin KOPMA UTM,\n\nSaya ingin memesan produk berikut:\n\n`;
  cart.forEach((item, i) => {
    pesan += `${i + 1}. ${item.nama}\n   Jumlah: ${item.qty}\n`;
  });
  pesan += `\nTotal Pembayaran: Rp ${getCartTotal().toLocaleString()}\n\n`;
  pesan += `Nama Pemesan:\nFakultas:\nProgram Studi:\n\nTerima kasih.`;
  const url = `https://wa.me/${noAdmin}?text=${encodeURIComponent(pesan)}`;
  window.open(url, '_blank');
}

/* ===== NOTIFICATION ===== */
function showNotification(msg) {
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${msg}</span>
  `;
  toast.style.cssText = `
    position: fixed; top: 100px; right: 24px; z-index: 10003;
    background: var(--primary, #0F5132); color: #fff;
    padding: 14px 22px; border-radius: 12px; font-size: 14px;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px rgba(15,81,50,0.3);
    transform: translateX(120%); transition: transform 0.4s ease;
    font-family: 'Poppins', sans-serif; max-width: 360px;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    toast.style.transform = 'translateX(120%)';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function showCartNotification(msg) {
  const el = document.getElementById('cart-notification');
  if (!el) return;
  el.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 2500);
}

/* ===== DOM REFS ===== */
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const scrollBar = document.getElementById('scroll-bar');
const backToTop = document.getElementById('back-to-top');
const productsGrid = document.getElementById('products-grid');
const catalogResults = document.getElementById('catalog-results');
const modal = document.getElementById('product-modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

/* ===== LOADING ===== */
document.body.classList.add('loading');

function hideLoading() {
  if (loadingScreen) loadingScreen.classList.add('loaded');
  document.body.classList.remove('loading');
  initAOS();
  initScrollAnimations();
}

window.addEventListener('load', () => {
  setTimeout(hideLoading, 800);
});

setTimeout(hideLoading, 8000);

/* ===== AOS ===== */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }
}

/* ===== SCROLL HANDLER ===== */
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (navbar) navbar.classList.toggle('scrolled', sy > 50);
  if (scrollBar) scrollBar.style.width = Math.min((sy / docHeight) * 100, 100) + '%';
  if (backToTop) backToTop.classList.toggle('visible', sy > 400);

  if (navbar && navMenu) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const section = document.querySelector(link.getAttribute('href') || '');
      if (section) {
        const rect = section.getBoundingClientRect();
        link.classList.toggle('active', rect.top <= 200 && rect.bottom >= 200);
      }
    });
  }
});

/* ===== NAVBAR HAMBURGER ===== */
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
  });
});

// Nav menu close button
const navMenuClose = document.querySelector('.nav-menu-close');
if (navMenuClose) {
  navMenuClose.addEventListener('click', () => {
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
  });
}

/* ===== BACK TO TOP ===== */
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => observer.observe(el));
}

/* ===== SCROLL REVEAL ANIMATION ===== */
function initScrollAnimations() {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => observer.observe(el));
}

/* ===== HOME PRODUCTS ===== */
function renderHomeProducts() {
  if (!productsGrid) return;
  const latest = produkData.slice(0, 6);
  productsGrid.innerHTML = latest.map(p => `
    <div class="product-card" data-aos="fade-up" data-aos-delay="${p.id * 50}">
      <div class="product-img-wrap">
        <img src="${p.gambar || 'img/placeholder.jpg'}" alt="${p.nama}" loading="lazy">
        <span class="product-badge ${(p.kategori || '').toLowerCase()}">${p.kategori}</span>
        ${p.tag ? `<span class="product-tag tag-${p.tag.toLowerCase().replace(/\s+/g, '-')}">${p.tag}</span>` : ''}
      </div>
      <div class="product-body">
        <h3>${p.nama}</h3>
        <div class="product-price">Rp ${p.harga.toLocaleString()}</div>
        <p class="product-desc">${p.deskripsi}</p>
        <div class="product-actions">
          <button class="btn-outline btn-sm" onclick="openModal(${p.id})"><i class="fas fa-eye"></i></button>
          <button class="btn-primary btn-sm" onclick="addToCart(${p.id})"><i class="fas fa-shopping-cart"></i> Tambah</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ===== CATALOG ===== */
let currentFilter = 'Semua Produk';
let currentSubFilter = 'Semua';
let currentSort = 'terbaru';
let searchQuery = '';

function renderCatalog() {
  if (!catalogResults) return;
  let filtered = [...produkData];

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.nama.toLowerCase().includes(q) ||
      p.deskripsi.toLowerCase().includes(q) ||
      p.kategori.toLowerCase().includes(q)
    );
  }

  if (currentFilter !== 'Semua Produk') {
    if (currentSubFilter !== 'Semua') {
      filtered = filtered.filter(p => p.kategori === currentFilter && p.subkategori === currentSubFilter);
    } else {
      filtered = filtered.filter(p => p.kategori === currentFilter);
    }
  }

  switch (currentSort) {
    case 'nama-asc': filtered.sort((a, b) => a.nama.localeCompare(b.nama)); break;
    case 'nama-desc': filtered.sort((a, b) => b.nama.localeCompare(a.nama)); break;
    case 'harga-termurah': filtered.sort((a, b) => a.harga - b.harga); break;
    case 'harga-tertinggi': filtered.sort((a, b) => b.harga - a.harga); break;
    default: filtered.sort((a, b) => a.id - b.id); break;
  }

  if (filtered.length === 0) {
    catalogResults.innerHTML = `
      <div class="catalog-empty">
        <i class="fas fa-search"></i>
        <h3>Produk Tidak Ditemukan</h3>
        <p>Coba gunakan kata kunci atau filter lain.</p>
      </div>
    `;
    return;
  }

  catalogResults.innerHTML = filtered.map(p => `
    <div class="product-card" data-aos="fade-up" data-aos-delay="${p.id * 40}">
      <div class="product-img-wrap">
        <img src="${p.gambar || 'img/placeholder.jpg'}" alt="${p.nama}" loading="lazy">
        <span class="product-badge ${(p.kategori || '').toLowerCase()}">${p.kategori}${p.subkategori ? ' • ' + p.subkategori : ''}</span>
        ${p.tag ? `<span class="product-tag tag-${p.tag.toLowerCase().replace(/\s+/g, '-')}">${p.tag}</span>` : ''}
      </div>
      <div class="product-body">
        <h3>${p.nama}</h3>
        <div class="product-price">Rp ${p.harga.toLocaleString()}</div>
        <p class="product-desc">${p.deskripsi}</p>
        <div class="product-actions">
          <button class="btn-outline btn-sm" onclick="openModal(${p.id})"><i class="fas fa-eye"></i> Detail</button>
          <button class="btn-primary btn-sm" onclick="addToCart(${p.id})"><i class="fas fa-shopping-cart"></i> Keranjang</button>
        </div>
      </div>
    </div>
  `).join('');
  if (typeof AOS !== 'undefined') AOS.refresh();
}

function setFilter(filter) {
  currentFilter = filter;
  currentSubFilter = 'Semua';
  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.closest('.filter-select')) return;
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  document.querySelectorAll('.filter-select').forEach(el => {
    const label = el.querySelector('.custom-select-trigger span');
    const defaultOpt = el.querySelector('.custom-select-option.selected');
    label.textContent = el.dataset.category;
  });
  renderCatalog();
}

function setSubFilter(category, subkategori) {
  currentFilter = category;
  currentSubFilter = subkategori;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    if (btn.closest('.filter-select')) return;
    btn.classList.remove('active');
  });
  renderCatalog();
}

function setSort(sort) {
  currentSort = sort;
  renderCatalog();
}

/* ===== CUSTOM SELECT ===== */
function initCustomSelect(container) {
  const trigger = container.querySelector('.custom-select-trigger');
  const menu = container.querySelector('.custom-select-menu');
  const options = container.querySelectorAll('.custom-select-option');
  if (!trigger || !menu || !options.length) return;

  const label = trigger.querySelector('span');
  let currentIndex = 0;

  function selectOption(opt) {
    const value = opt.dataset.value;
    const text = opt.querySelector('span').textContent;
    label.textContent = text;
    options.forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    menu.classList.remove('open');
    trigger.classList.remove('active');

    const category = container.dataset.category;
    if (category) {
      setSubFilter(category, value);
    } else {
      setSort(value);
    }
  }

  function updateHighlight(index) {
    options.forEach(o => o.classList.remove('highlighted'));
    if (index >= 0 && index < options.length) {
      options[index].classList.add('highlighted');
      options[index].scrollIntoView({ block: 'nearest' });
    }
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const opening = !menu.classList.contains('open');
    menu.classList.toggle('open');
    trigger.classList.toggle('active');
    if (opening) {
      currentIndex = Array.from(options).findIndex(o => o.classList.contains('selected'));
      if (currentIndex < 0) currentIndex = 0;
      updateHighlight(currentIndex);
    }
  });

  options.forEach((opt) => {
    opt.addEventListener('click', () => selectOption(opt));
  });

  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!menu.classList.contains('open')) {
        menu.classList.add('open');
        trigger.classList.add('active');
        currentIndex = Array.from(options).findIndex(o => o.classList.contains('selected'));
        if (currentIndex < 0) currentIndex = 0;
        updateHighlight(currentIndex);
        return;
      }
      if (e.key === 'ArrowDown') {
        currentIndex = Math.min(currentIndex + 1, options.length - 1);
      } else {
        currentIndex = Math.max(currentIndex - 1, 0);
      }
      updateHighlight(currentIndex);
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (menu.classList.contains('open') && currentIndex >= 0) {
        selectOption(options[currentIndex]);
      }
    }
    if (e.key === 'Escape') {
      menu.classList.remove('open');
      trigger.classList.remove('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      menu.classList.remove('open');
      trigger.classList.remove('active');
    }
  });
}

/* ===== SEARCH ===== */
function handleSearch(e) {
  searchQuery = e.target.value;
  renderCatalog();
}

/* ===== MODAL ===== */
let modalQty = 1;

function updateModalQty(delta) {
  modalQty = Math.max(1, modalQty + delta);
  const el = document.getElementById('modal-qty');
  if (el) el.value = modalQty;
}

function openModal(id) {
  const p = produkData.find(pr => pr.id === id);
  if (!p || !modal || !modalBody) return;
  modalQty = 1;
  modalBody.innerHTML = `
    <img src="${p.gambar || 'img/placeholder.jpg'}" alt="${p.nama}" class="modal-img">
    <div class="modal-body">
      <h2>${p.nama}</h2>
      <div class="modal-price">Rp ${p.harga.toLocaleString()}</div>
      <div class="modal-category"><span>${p.kategori}${p.subkategori ? ' • ' + p.subkategori : ''}</span></div>
      ${p.tag ? `<div class="modal-tag"><span class="tag-badge tag-${p.tag.toLowerCase().replace(/\s+/g, '-')}">${p.tag}</span></div>` : ''}
      <p class="modal-desc">${p.deskripsi}</p>
      <div class="modal-qty">
        <label>Jumlah</label>
        <div class="qty-control">
          <button onclick="updateModalQty(-1)"><i class="fas fa-minus"></i></button>
          <input type="number" id="modal-qty" value="1" min="1" oninput="modalQty = Math.max(1, parseInt(this.value) || 1); this.value = modalQty;">
          <button onclick="updateModalQty(1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-primary" onclick="addToCart(${p.id}, modalQty)"><i class="fas fa-shopping-cart"></i> Tambah ke Keranjang</button>
      </div>
    </div>
  `;
  modal.classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeModal() {
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeCart(); } });

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', async () => {
  await loadProduk();

  // Apply filter from URL param
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');
  if (filterParam && filterParam !== 'Semua Produk') {
    setFilter(filterParam);
  }

  renderHomeProducts();
  renderCatalog();
  updateCartBadge();

  // Cart sidebar events
  const cartToggle = document.querySelector('.cart-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.querySelector('.cart-close');
  if (cartToggle) cartToggle.addEventListener('click', () => { renderCartItems(); openCart(); });
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);

  // Search input
  const searchInput = document.getElementById('catalog-search-input');
  if (searchInput) searchInput.addEventListener('input', handleSearch);

  // Custom selects (sort + filter)
  document.querySelectorAll('.custom-select').forEach(initCustomSelect);
});
