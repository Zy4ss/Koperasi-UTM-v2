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

  <?php $active = 'profil';
  include 'inc/navbar.php'; ?>

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
          <img src="img/layanan/cakra.jpeg" alt="Kegiatan Koperasi UTM" loading="lazy">
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
        <div class="gallery-item" data-aos="fade-up" data-aos-delay="150">
          <img src="img/kegiatan/RAT Tahun Buku 2025.webp" alt="Kegiatan Rapat" loading="lazy">
          <div class="gallery-overlay"><span>RAT Tahun Buku 2025</span></div>
        </div>
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

  <?php include 'inc/footer.php'; ?>