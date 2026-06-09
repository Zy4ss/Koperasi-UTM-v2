<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Koperasi Universitas Trunojoyo Madura</title>
  <link rel="icon" type="image/png" href="img/logo-koperasi.png">
  <meta name="description" content="Katalog produk Koperasi Mahasiswa Universitas Trunojoyo Madura. Cari dan pesan kebutuhan Anda melalui WhatsApp.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <!-- LOADING SCREEN -->
  <div id="loading-screen">
    <div class="loader-icon"><img src="img/logo-koperasi.png" alt="Koperasi UTM" class="loader-logo-img"></div>
    <p class="loader-text">Koperasi UTM</p>
    <p class="loader-sub">Koperasi Universitas Trunojoyo Madura</p>
    <div class="loader-bar">
      <div class="loader-bar-fill"></div>
    </div>
  </div>

  <!-- NAVBAR -->
  <nav id="navbar">
    <div class="nav-inner container">
      <a href="index.php" class="nav-logo">
        <img src="img/logo-koperasi.png" alt="Koperasi UTM" class="nav-logo-img"> Koperasi UTM
      </a>
      <div id="nav-menu" class="nav-menu">
        <button class="nav-menu-close" onclick="document.getElementById('nav-menu').classList.remove('active');document.querySelector('.hamburger')?.classList.remove('active')">✕</button>
        <ul class="nav-menu-list">
          <li><a href="index.php" class="nav-link">Beranda</a></li>
          <li><a href="profil.php" class="nav-link">Profil</a></li>
          <li><a href="katalog.php" class="nav-link active">Katalog</a></li>
          <li><a href="kontak.php" class="nav-link">Kontak</a></li>
        </ul>
      </div>
      <div class="nav-actions">
        <button class="cart-btn" aria-label="Keranjang">
          <i class="fas fa-shopping-bag"></i>
          <span class="cart-badge">0</span>
        </button>
        <button id="hamburger" class="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
  <div id="scroll-bar" class="scroll-bar"></div>

  <!-- PAGE HERO -->
  <section class="page-hero">
    <div class="container">
      <h1 data-aos="fade-up">Katalog Produk</h1>
      <p data-aos="fade-up" data-aos-delay="50">Temukan kebutuhan Anda di Koperasi UTM</p>
      <div class="breadcrumb" data-aos="fade-up" data-aos-delay="100">
        <a href="index.php">Beranda</a>
        <i class="fas fa-chevron-right"></i>
        <span>Katalog</span>
      </div>
    </div>
  </section>

  <!-- CATALOG -->
  <section class="catalog-page">
    <div class="container">
      <!-- TOOLBAR -->
      <div class="catalog-toolbar" data-aos="fade-up">
        <div class="catalog-search">
          <i class="fas fa-search"></i>
          <input type="text" id="catalog-search-input" placeholder="Cari produk..." autocomplete="off">
        </div>
        <select id="catalog-sort" class="catalog-sort">
          <option value="terbaru">Terbaru</option>
          <option value="nama-asc">Nama A-Z</option>
          <option value="nama-desc">Nama Z-A</option>
          <option value="harga-termurah">Harga Termurah</option>
          <option value="harga-tertinggi">Harga Tertinggi</option>
        </select>
      </div>

      <!-- FILTERS -->
      <div class="catalog-filters" data-aos="fade-up" data-aos-delay="50">
        <button class="filter-btn active" data-filter="Semua Produk" onclick="setFilter('Semua Produk')">Semua Produk</button>
        <button class="filter-btn" data-filter="Retail" onclick="setFilter('Retail')">Retail</button>
        <button class="filter-btn" data-filter="Makanan" onclick="setFilter('Makanan')">Makanan</button>
        <button class="filter-btn" data-filter="Minuman" onclick="setFilter('Minuman')">Minuman</button>
        <button class="filter-btn" data-filter="Konsinyasi" onclick="setFilter('Konsinyasi')">Konsinyasi</button>
        <button class="filter-btn" data-filter="Lainnya" onclick="setFilter('Lainnya')">Lainnya</button>
      </div>

      <!-- RESULTS -->
      <div id="catalog-results" class="catalog-results"></div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <img src="img/logo-koperasi.png" alt="Koperasi UTM" class="footer-logo-img">
        <h3>Koperasi UTM</h3>
        <p>Koperasi Universitas Trunojoyo Madura — Dari Anggota, Oleh Anggota, Untuk Anggota.</p>
        <div class="footer-social">
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
          <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div class="footer-links">
        <h4>Navigasi</h4>
        <a href="index.php">Beranda</a>
        <a href="profil.php">Profil</a>
        <a href="katalog.php">Katalog</a>
        <a href="kontak.php">Kontak</a>
      </div>
      <div class="footer-links">
        <h4>Kategori</h4>
        <a href="katalog.php?filter=Retail">Retail</a>
        <a href="katalog.php?filter=Konsinyasi">Konsinyasi</a>
        <a href="katalog.php?filter=Lainnya">Lainnya</a>
      </div>
      <div class="footer-links">
        <h4>Kontak</h4>
        <div class="footer-contact-item"><i class="fas fa-map-marker-alt"></i><span>Jl. Raya Telang PO BOX 2 Kamal, Bangkalan 69162</span></div>
        <div class="footer-contact-item"><i class="fas fa-phone-alt"></i><span>+62 811-3300-676</span></div>
        <div class="footer-contact-item"><i class="fas fa-envelope"></i><span>koperasitrunojoyo@gmail.com</span></div>
        <div class="footer-contact-item"><i class="fab fa-instagram"></i><span>@koperasiutm</span></div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 UKMFT-ITC. All rights reserved.</p>
    </div>
  </footer>

  <!-- MODAL -->
  <div id="product-modal" class="modal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button id="modal-close" class="modal-close"><i class="fas fa-times"></i></button>
      <div id="modal-body"></div>
    </div>
  </div>

  <!-- CART -->
  <div id="cart-overlay" class="cart-overlay"></div>
  <div id="cart-sidebar" class="cart-sidebar">
    <div class="cart-header">
      <h3>Keranjang <span id="cart-count"></span></h3>
      <button class="cart-close"><i class="fas fa-times"></i></button>
    </div>
    <div id="cart-items" class="cart-items">
      <div class="cart-empty"><i class="fas fa-shopping-cart"></i>
        <h4>Keranjang Kosong</h4>
        <p>Belum ada produk yang ditambahkan.</p>
      </div>
    </div>
    <div class="cart-footer">
      <div class="cart-total"><span>Total Pembayaran</span><strong id="cart-total">Rp 0</strong></div>
      <button class="btn-primary" onclick="checkoutWA()"><i class="fab fa-whatsapp"></i> Checkout via WhatsApp</button>
      <button class="btn-gold" onclick="closeCart()"><i class="fas fa-shopping-bag"></i> Lanjut Belanja</button>
    </div>
  </div>

  <button id="back-to-top" class="back-to-top"><i class="fas fa-arrow-up"></i></button>
  <a href="https://wa.me/6285727877235" target="_blank" class="floating-wa" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="js/script.js"></script>
</body>

</html>