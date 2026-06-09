/* ===== DATA PRODUK ===== */
const produkData = [
  {
    id: 1, nama: 'Indomie Goreng', harga: 3500, stok: 50,
    kategori: 'Retail', subkategori: 'Makanan',
    gambar: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&q=80',
    deskripsi: 'Indomie Goreng rasa original, mie instan favorit semua kalangan. Cocok untuk menemani aktivitas kuliah.'
  },
  {
    id: 2, nama: 'Kopiko 78°C', harga: 5000, stok: 40,
    kategori: 'Retail', subkategori: 'Minuman',
    gambar: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&q=80',
    deskripsi: 'Kopi kemasan dengan rasa yang nikmat dan menyegarkan. Praktis dibawa ke kampus.'
  },
  {
    id: 3, nama: 'Aqua 600ml', harga: 3000, stok: 100,
    kategori: 'Retail', subkategori: 'Minuman',
    gambar: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300&q=80',
    deskripsi: 'Air mineral berkualitas untuk kebutuhan hidrasi sehari-hari di lingkungan kampus.'
  },
  {
    id: 4, nama: 'Oreo Original', harga: 8000, stok: 35,
    kategori: 'Retail', subkategori: 'Makanan',
    gambar: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&q=80',
    deskripsi: 'Biskuit dengan krim vanilla yang lezat. Camilan favorit saat belajar atau nongkrong.'
  },
  {
    id: 5, nama: 'Good Day Cappuccino', harga: 4500, stok: 45,
    kategori: 'Retail', subkategori: 'Minuman',
    gambar: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=80',
    deskripsi: 'Kopi cappuccino instan dengan rasa creamy dan aroma yang menggoda.'
  },
  {
    id: 6, nama: 'Keripik Singkong Pedas', harga: 10000, stok: 25,
    kategori: 'Konsinyasi', subkategori: '',
    gambar: 'https://images.unsplash.com/photo-1566478989037-eec170784d6b?w=300&q=80',
    deskripsi: 'Keripik singkong produksi UMKM lokal dengan bumbu pedas yang menggugah selera.'
  },
  {
    id: 7, nama: 'Madu Murni 250ml', harga: 45000, stok: 15,
    kategori: 'Konsinyasi', subkategori: '',
    gambar: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&q=80',
    deskripsi: 'Madu murni dari peternak lebah Madura. Kaya manfaat untuk kesehatan.'
  },
  {
    id: 8, nama: 'Buku Tulis Sidu 42 Lembar', harga: 5000, stok: 80,
    kategori: 'Lainnya', subkategori: '',
    gambar: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=300&q=80',
    deskripsi: 'Buku tulis berkualitas untuk mencatat materi kuliah dan tugas sehari-hari.'
  },
  {
    id: 9, nama: 'Pulpen Standard AE7', harga: 3000, stok: 100,
    kategori: 'Lainnya', subkategori: '',
    gambar: 'https://images.unsplash.com/photo-1583485088059-9f1a5f3d44f3?w=300&q=80',
    deskripsi: 'Pulpen standar dengan tinta hitam yang halus dan tidak mudah luntur.'
  },
  {
    id: 10, nama: 'Pocari Sweat 500ml', harga: 6500, stok: 30,
    kategori: 'Retail', subkategori: 'Minuman',
    gambar: 'https://images.unsplash.com/photo-1580933073521-dc49ac0d5e95?w=300&q=80',
    deskripsi: 'Minuman isotonik untuk mengembalikan kesegaran setelah beraktivitas.'
  },
  {
    id: 11, nama: 'Tempat Pensil Kanvas', harga: 15000, stok: 20,
    kategori: 'Lainnya', subkategori: '',
    gambar: 'https://images.unsplash.com/photo-1581686671838-20b599b24c7e?w=300&q=80',
    deskripsi: 'Tempat pensil berbahan kanvas yang kokoh dan stylish untuk kebutuhan kuliah.'
  },
  {
    id: 12, nama: 'Stik Keju Renyah', harga: 12000, stok: 18,
    kategori: 'Konsinyasi', subkategori: '',
    gambar: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80',
    deskripsi: 'Stik keju renyah produksi UMKM lokal, camilan gurih yang sulit berhenti dimakan.'
  }
];

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
  showNotification(`${produk.nama} ditambahkan ke keranjang`);
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
window.addEventListener('load', () => {
  setTimeout(() => {
    if (loadingScreen) loadingScreen.classList.add('loaded');
    document.body.classList.remove('loading');
    initAOS();
    initCounters();
    initScrollAnimations();
  }, 2200);
});

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

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (isNaN(target)) return;
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(target * eased).toLocaleString();
    if (t < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
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
        <img src="${p.gambar}" alt="${p.nama}" loading="lazy">
        <span class="product-badge ${p.kategori.toLowerCase()}">${p.kategori}</span>
      </div>
      <div class="product-body">
        <h3>${p.nama}</h3>
        <div class="product-price">Rp ${p.harga.toLocaleString()}</div>
        <p class="product-desc">${p.deskripsi}</p>
        <div class="product-meta">
          <div class="product-stock ${p.stok > 0 ? 'in-stock' : 'out-stock'}">
            <i class="fas fa-circle"></i> ${p.stok > 0 ? 'Tersedia' : 'Habis'}
          </div>
        </div>
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
    if (currentFilter === 'Makanan' || currentFilter === 'Minuman') {
      filtered = filtered.filter(p => p.subkategori === currentFilter);
    } else if (currentFilter === 'Retail') {
      filtered = filtered.filter(p => p.kategori === 'Retail');
    } else if (currentFilter === 'Konsinyasi') {
      filtered = filtered.filter(p => p.kategori === 'Konsinyasi');
    } else if (currentFilter === 'Lainnya') {
      filtered = filtered.filter(p => p.kategori === 'Lainnya');
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
        <img src="${p.gambar}" alt="${p.nama}" loading="lazy">
        <span class="product-badge ${p.kategori.toLowerCase()}">${p.kategori}${p.subkategori ? ' • ' + p.subkategori : ''}</span>
      </div>
      <div class="product-body">
        <h3>${p.nama}</h3>
        <div class="product-price">Rp ${p.harga.toLocaleString()}</div>
        <p class="product-desc">${p.deskripsi}</p>
        <div class="product-meta">
          <div class="product-stock ${p.stok > 0 ? 'in-stock' : 'out-stock'}">
            <i class="fas fa-circle"></i> Stok: ${p.stok}
          </div>
        </div>
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
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderCatalog();
}

function setSort(sort) {
  currentSort = sort;
  renderCatalog();
}

/* ===== SEARCH ===== */
function handleSearch(e) {
  searchQuery = e.target.value;
  renderCatalog();
}

/* ===== MODAL ===== */
function openModal(id) {
  const p = produkData.find(pr => pr.id === id);
  if (!p || !modal || !modalBody) return;
  modalBody.innerHTML = `
    <img src="${p.gambar}" alt="${p.nama}" class="modal-img">
    <div class="modal-body">
      <h2>${p.nama}</h2>
      <div class="modal-price">Rp ${p.harga.toLocaleString()}</div>
      <div class="modal-category"><span>${p.kategori}${p.subkategori ? ' • ' + p.subkategori : ''}</span></div>
      <div class="modal-stock ${p.stok > 0 ? 'available' : 'unavailable'}">
        <i class="fas fa-${p.stok > 0 ? 'check-circle' : 'times-circle'}"></i>
        ${p.stok > 0 ? `Stok tersedia: ${p.stok}` : 'Stok habis'}
      </div>
      <p class="modal-desc">${p.deskripsi}</p>
      <div class="modal-qty">
        <label>Jumlah:</label>
        <div class="qty-control">
          <button onclick="modalQtyChange(-1)"><i class="fas fa-minus"></i></button>
          <input type="number" id="modal-qty-input" value="1" min="1" max="${p.stok}">
          <button onclick="modalQtyChange(1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-primary" onclick="addToCartFromModal(${p.id})"><i class="fas fa-shopping-cart"></i> Tambah ke Keranjang</button>
      </div>
    </div>
  `;
  // Store current product id for modal
  modal.dataset.productId = id;
  modal.classList.add('active');
  document.body.classList.add('no-scroll');
}

function modalQtyChange(delta) {
  const input = document.getElementById('modal-qty-input');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  const max = parseInt(input.max);
  if (val < 1) val = 1;
  if (val > max) val = max;
  input.value = val;
}

function addToCartFromModal(id) {
  const input = document.getElementById('modal-qty-input');
  const qty = input ? parseInt(input.value) : 1;
  addToCart(id, qty);
  closeModal();
}

function closeModal() {
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('no-scroll');
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); closeCart(); } });

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
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

  // Sort select
  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) sortSelect.addEventListener('change', (e) => setSort(e.target.value));
});
