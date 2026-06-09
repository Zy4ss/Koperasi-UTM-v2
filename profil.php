<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Koperasi Universitas Trunojoyo Madura</title>
  <link rel="icon" type="image/png" href="img/logo-koperasi.png">
  <meta name="description" content="Profil Koperasi Mahasiswa Universitas Trunojoyo Madura — sejarah, visi, misi, dan galeri kegiatan.">
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
          <li><a href="profil.php" class="nav-link active">Profil</a></li>
          <li><a href="katalog.php" class="nav-link">Katalog</a></li>
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
      <h1 data-aos="fade-up">Profil Koperasi UTM</h1>
      <p data-aos="fade-up" data-aos-delay="50">Mengenal lebih dekat Koperasi Mahasiswa Universitas Trunojoyo Madura</p>
      <div class="breadcrumb" data-aos="fade-up" data-aos-delay="100">
        <a href="index.php">Beranda</a>
        <i class="fas fa-chevron-right"></i>
        <span>Profil</span>
      </div>
    </div>
  </section>

  <!-- TENTANG -->
  <section class="profile-about">
    <div class="container">
      <div class="profile-grid">
        <div class="profile-text" data-aos="fade-right">
          <span class="section-tag">Tentang Kami</span>
          <h2>Koperasi Mahasiswa Universitas Trunojoyo Madura</h2>
          <p>Koperasi UTM berdiri sebagai wadah pengembangan ekonomi mahasiswa di lingkungan Universitas Trunojoyo Madura. Berawal dari keprihatinan terhadap mahalnya harga kebutuhan pokok di sekitar kampus, sekelompok mahasiswa berinisiatif mendirikan koperasi yang menyediakan kebutuhan sehari-hari dengan harga terjangkau.</p>
          <p>Sejak tahun 2018, Koperasi UTM telah berkembang menjadi salah satu unit kegiatan mahasiswa yang aktif dan memberikan manfaat nyata bagi seluruh civitas akademika UTM, termasuk mahasiswa, dosen, dan tenaga kependidikan.</p>
          <p>Kami berkomitmen untuk terus berinovasi dalam memberikan pelayanan terbaik, mendukung ekonomi kreatif mahasiswa, dan memperkuat kebersamaan di lingkungan kampus.</p>
        </div>
        <div class="profile-img-wrap" data-aos="fade-left" data-aos-delay="100">
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" alt="Kegiatan Koperasi UTM" loading="lazy">
        </div>
      </div>
    </div>
  </section>

  <!-- VISI MISI -->
  <section class="visimisi">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag">Visi & Misi</span>
        <h2>Visi dan Misi Koperasi UTM</h2>
        <p>Pedoman dan arah pengembangan koperasi dalam melayani mahasiswa Universitas Trunojoyo Madura.</p>
      </div>
      <div class="vm-inner">
        <div class="vm-visi-block" data-aos="fade-up" data-aos-delay="0">
          <div class="vm-visi-marker"><i class="fas fa-bullseye"></i> Visi</div>
          <blockquote>Koperasi UTM menjadi Koperasi Nasional.</blockquote>
        </div>
        <div class="vm-misi-block" data-aos="fade-up" data-aos-delay="100">
          <div class="vm-visi-marker vm-misi-marker"><i class="fas fa-flag-checkered"></i> Misi</div>
          <div class="vm-misi-list">
            <div class="vm-misi-item">
              <div class="vm-misi-num">1</div>
              <div class="vm-misi-text">Memberi Layanan, Menyediakan Produk, Jasa serta Kebutuhan Anggota.</div>
            </div>
            <div class="vm-misi-item">
              <div class="vm-misi-num">2</div>
              <div class="vm-misi-text">Membantu Menciptakan Peluang Usaha Bagi Anggota.</div>
            </div>
            <div class="vm-misi-item">
              <div class="vm-misi-num">3</div>
              <div class="vm-misi-text">Menjadi Organisasi yang Transparan dengan Good Corporate Governance.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GALERI -->
  <section class="gallery">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag">Galeri</span>
        <h2>Galeri Kegiatan</h2>
        <p>Dokumentasi kegiatan dan aktivitas Koperasi UTM di lingkungan Universitas Trunojoyo Madura.</p>
      </div>
      <div class="gallery-grid">
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="0">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80" alt="Kegiatan Koperasi" loading="lazy">
          <div class="gallery-overlay"><span>Kegiatan Pelayanan</span></div>
        </div>
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="50">
          <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80" alt="Tim Koperasi" loading="lazy">
          <div class="gallery-overlay"><span>Tim Koperasi UTM</span></div>
        </div>
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="100">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80" alt="Produk Koperasi" loading="lazy">
          <div class="gallery-overlay"><span>Produk Koperasi</span></div>
        </div>
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="150">
          <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80" alt="Kegiatan Rapat" loading="lazy">
          <div class="gallery-overlay"><span>Rapat Pengurus</span></div>
        </div>
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="200">
          <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80" alt="Suasana Kampus" loading="lazy">
          <div class="gallery-overlay"><span>Suasana Kampus</span></div>
        </div>
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="250">
          <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80" alt="Event Koperasi" loading="lazy">
          <div class="gallery-overlay"><span>Event Koperasi</span></div>
        </div>
      </div>
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