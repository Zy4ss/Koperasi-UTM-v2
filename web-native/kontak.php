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

<?php $active = 'kontak'; include 'inc/navbar.php'; ?>

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

<?php include 'inc/footer.php'; ?>