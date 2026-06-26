<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Koperasi Universitas Trunojoyo Madura</title>
  <link rel="icon" type="image/png" href="img/logo-koperasi.png">
  <meta name="description" content="Katalog digital Koperasi Mahasiswa Universitas Trunojoyo Madura. Menyediakan berbagai kebutuhan mahasiswa dengan pelayanan mudah, cepat, dan terpercaya.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css">
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <!-- LOADING SCREEN -->
  <div id="loading-screen">
    <div class="loader-icon">
      <img src="img/logo-koperasi.png" alt="Koperasi UTM" class="loader-logo-img">
    </div>
    <p class="loader-text">Koperasi UTM</p>
    <p class="loader-sub">Koperasi Universitas Trunojoyo Madura</p>
    <div class="loader-bar">
      <div class="loader-bar-fill"></div>
    </div>
  </div>

  <?php $active = 'beranda';
  include 'inc/navbar.php'; ?>

  <!-- HERO -->
  <section id="hero" class="hero">
    <div class="hero-decor-circle"></div>
    <div class="hero-grid-pattern"></div>
    <div class="hero-decor-line"></div>
    <div class="container hero-grid">
      <div class="hero-text" data-aos="fade-right" data-aos-duration="1000">
        <h1 class="hero-title">
          <span class="hero-title-accent">Koperasi</span><br>
          <span class="hero-title-sub">Universitas Trunojoyo Madura</span>
        </h1>
        <p class="hero-tagline">Dari Anggota, Oleh Anggota, Untuk Anggota</p>
        <p class="hero-desc">
          Menyediakan berbagai kebutuhan mahasiswa dengan pelayanan yang mudah, cepat, dan terpercaya.
        </p>
        <div class="hero-actions">
          <a href="katalog.php" class="btn-primary">Jelajahi Produk <i class="fas fa-arrow-right"></i></a>
          <a href="kontak.php" class="btn-outline">Hubungi Kami <i class="fas fa-phone-alt"></i></a>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      <span>Scroll</span>
      <i class="fas fa-chevron-down"></i>
    </div>
  </section>

  <!-- TENTANG KOPERASI -->
  <section id="tentang" class="section about" data-aos="fade-up">
    <div class="container">
      <div class="about-grid">
        <div class="about-image" data-aos="fade-right" data-aos-delay="100">
          <div class="about-img-wrapper">
            <img src="img/layanan/koperasi.jpeg" alt="Kegiatan Koperasi Mahasiswa" loading="lazy">
            <div class="about-badge-exp">
              <strong>Sejak 1997</strong>
              <span>Melayani Mahasiswa</span>
            </div>
          </div>
        </div>
        <div class="about-text" data-aos="fade-left" data-aos-delay="200">
          <span class="section-tag">Tentang Koperasi UTM</span>
          <h2>Koperasi Universitas Trunojoyo Madura</h2>
          <p>Koperasi UTM adalah koperasi yang berorientasi pada pelayanan mahasiswa, mendukung ekonomi kreatif mahasiswa, dan menyediakan berbagai kebutuhan sehari-hari di lingkungan kampus.</p>
          <p>Sebagai wadah pengembangan ekonomi mahasiswa, Koperasi UTM berkomitmen untuk memberikan pelayanan terbaik dengan harga yang terjangkau dan produk yang berkualitas.</p>
          <div class="about-features">
            <div class="about-feature-item"><i class="fas fa-check-circle"></i> Berorientasi pada mahasiswa</div>
            <div class="about-feature-item"><i class="fas fa-check-circle"></i> Mendukung ekonomi kreatif</div>
            <div class="about-feature-item"><i class="fas fa-check-circle"></i> Harga terjangkau</div>
            <div class="about-feature-item"><i class="fas fa-check-circle"></i> Produk berkualitas</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATISTIK -->
  <section id="layanan" class="section services">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag">Layanan</span>
        <h2>Layanan Koperasi UTM</h2>
        <p>Berbagai layanan yang tersedia untuk memenuhi kebutuhan seluruh civitas akademika Universitas Trunojoyo Madura.</p>
      </div>
      <div class="services-grid">
        <div class="service-card" data-aos="fade-up" data-aos-delay="0">
          <div class="service-img">
            <img src="img/layanan/minimarket.jpeg" alt="Mini Market" loading="lazy">
          </div>
          <div class="service-info">
            <h3>Mini Market</h3>
            <p>Kebutuhan pokok dan perlengkapan sehari-hari dengan harga terjangkau.</p>
          </div>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="300">
          <div class="service-img">
            <img src="img/layanan/koperasi.jpeg" alt="Cafe Time Secret Space" loading="lazy">
          </div>
          <div class="service-info">
            <h3>Cafe Time Secret Space</h3>
            <p>Tempat nongkrong santai dengan berbagai menu kopi dan minuman kekinian, serta spot aesthetic untuk foto dan bersantai.</p>
          </div>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="100">
          <div class="service-img">
            <i class="fas fa-tshirt"></i>
          </div>
          <div class="service-info">
            <h3>Merchandise</h3>
            <p>Beragam merchandise eksklusif Universitas Trunojoyo Madura.</p>
          </div>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="150">
          <div class="service-img">
            <i class="fas fa-cookie-bite"></i>
          </div>
          <div class="service-info">
            <h3>Snack &amp; Minuman</h3>
            <p>Aneka cemilan dan minuman segar untuk menemani aktivitas perkuliahan.</p>
          </div>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="200">
          <div class="service-img">
            <i class="fas fa-pen-fancy"></i>
          </div>
          <div class="service-info">
            <h3>Alat Tulis</h3>
            <p>Perlengkapan kuliah lengkap mulai dari pulpen, buku, hingga aksesoris kantor.</p>
          </div>
        </div>
        <div class="service-card" data-aos="fade-up" data-aos-delay="250">
          <div class="service-img">
            <i class="fas fa-file-invoice"></i>
          </div>
          <div class="service-info">
            <h3>Pembayaran STNK</h3>
            <p>Layanan pembayaran pajak STNK kendaraan bermotor dengan proses cepat.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- KATEGORI -->
  <section id="kategori" class="section categories">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag">Kategori</span>
        <h2>Kategori Produk</h2>
        <p>Berbagai pilihan produk yang tersedia untuk memenuhi kebutuhan Anda di lingkungan kampus.</p>
      </div>
      <div class="categories-grid">
        <div class="category-card" data-aos="fade-up" data-aos-delay="0">
          <div class="category-icon"><i class="fas fa-shopping-bag"></i></div>
          <h3>Retail</h3>
          <p>Produk kebutuhan sehari-hari seperti makanan ringan, minuman, dan perlengkapan kuliah yang tersedia langsung.</p>
          <a href="katalog.php?filter=Retail" class="btn-outline btn-sm" style="margin-top:16px">Lihat Produk</a>
        </div>
        <div class="category-card" data-aos="fade-up" data-aos-delay="100">
          <div class="category-icon"><i class="fas fa-handshake"></i></div>
          <h3>Konsinyasi</h3>
          <p>Produk titipan UMKM dan mitra lokal Madura, mendukung ekonomi kreatif mahasiswa dan masyarakat sekitar.</p>
          <a href="katalog.php?filter=Konsinyasi" class="btn-outline btn-sm" style="margin-top:16px">Lihat Produk</a>
        </div>
        <div class="category-card" data-aos="fade-up" data-aos-delay="200">
          <div class="category-icon"><i class="fas fa-coffee"></i></div>
          <h3>Cafe</h3>
          <p>Menu kopi, minuman kekinian, dan cemilan ringan yang tersedia di area kampus.</p>
          <a href="katalog.php?filter=Cafe" class="btn-outline btn-sm" style="margin-top:16px">Lihat Produk</a>
        </div>
      </div>
    </div>
  </section>

  <!-- PRODUK TERBARU -->
  <section id="produk" class="section latest-products">
    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <span class="section-tag">Produk</span>
        <h2>Produk Terbaru</h2>
        <p>Beberapa produk pilihan yang tersedia di Koperasi UTM. Klik untuk melihat detail dan melakukan pemesanan.</p>
      </div>
      <div id="products-grid" class="products-grid"></div>
      <div style="text-align:center;margin-top:40px" data-aos="fade-up">
        <a href="katalog.php" class="btn-primary">Lihat Semua Produk <i class="fas fa-arrow-right"></i></a>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section" data-aos="fade-up">
    <div class="container">
      <div class="cta-card">
        <h2>"DARI ANGGOTA, OLEH ANGGOTA, UNTUK ANGGOTA"</h2>
        <p>Jelajahi seluruh katalog produk Koperasi UTM dan temukan kebutuhan Anda.</p>
        <a href="katalog.php" class="btn-primary"><i class="fas fa-shopping-bag"></i> Jelajahi Katalog</a>
      </div>
    </div>
  </section>

  <?php include 'inc/footer.php'; ?>