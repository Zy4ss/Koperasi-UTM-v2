<!DOCTYPE html>
<html lang="id">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Koperasi Universitas Trunojoyo Madura</title>
  <link rel="icon" type="image/png" href="img/logo-koperasi.png">
  <meta name="description" content="Hubungi Koperasi Mahasiswa Universitas Trunojoyo Madura. Alamat, WhatsApp, email, dan media sosial.">
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
          <li><a href="katalog.php" class="nav-link">Katalog</a></li>
          <li><a href="kontak.php" class="nav-link active">Kontak</a></li>
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
      <h1 data-aos="fade-up">Hubungi Kami</h1>
      <p data-aos="fade-up" data-aos-delay="50">Kami siap melayani Anda</p>
      <div class="breadcrumb" data-aos="fade-up" data-aos-delay="100">
        <a href="index.php">Beranda</a>
        <i class="fas fa-chevron-right"></i>
        <span>Kontak</span>
      </div>
    </div>
  </section>

  <!-- CONTACT -->
  <section class="contact-page">
    <div class="container">
      <div class="contact-wrap">
        <div class="contact-info-card" data-aos="fade-right">
          <h3>Informasi Kontak</h3>
          <p>Jangan ragu untuk menghubungi kami melalui kontak di bawah ini.</p>

          <div class="contact-detail-item">
            <div class="contact-detail-icon"><i class="fas fa-map-marker-alt"></i></div>
            <div class="contact-detail-text">
              <h4>Alamat</h4>
              <p>Sekretariat Koperasi UTM<br>Gedung Cakra, Kampus Universitas Trunojoyo Madura<br>Jl. Raya Telang PO BOX 2 Kamal, Bangkalan 69162</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-detail-icon"><i class="fab fa-whatsapp"></i></div>
            <div class="contact-detail-text">
              <h4>WhatsApp</h4>
              <p>+62 811-3300-676</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-detail-icon"><i class="fas fa-envelope"></i></div>
            <div class="contact-detail-text">
              <h4>Email</h4>
              <p>koperasitrunojoyo@gmail.com</p>
            </div>
          </div>

          <div class="contact-detail-item">
            <div class="contact-detail-icon"><i class="fab fa-instagram"></i></div>
            <div class="contact-detail-text">
              <h4>Instagram</h4>
              <p>@koperasiutm</p>
            </div>
          </div>
        </div>

        <div class="contact-form-card" data-aos="fade-left" data-aos-delay="100">
          <h3>Kirim Pesan</h3>
          <form action="#" method="POST">
            <div class="form-group">
              <input type="text" name="nama" placeholder="Nama Lengkap" required>
            </div>
            <div class="form-group">
              <input type="email" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
              <input type="text" name="subjek" placeholder="Subjek">
            </div>
            <div class="form-group">
              <textarea name="pesan" placeholder="Tulis pesan Anda..." required></textarea>
            </div>
            <button type="submit" class="btn-primary"><i class="fas fa-paper-plane"></i> Kirim Pesan</button>
          </form>
        </div>
      </div>

      <div class="map-wrap" data-aos="fade-up" data-aos-delay="50">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.615379733752!2d112.7271187!3d-7.1172706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd803dd04854303%3A0xa436f3258944c98f!2sGedung%20Cakra%20-%20UTM!5e0!3m2!1sid!2sid!4v1710000000000" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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