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

  <!-- PRODUCT MODAL -->
  <div id="product-modal" class="modal">
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button id="modal-close" class="modal-close"><i class="fas fa-times"></i></button>
      <div id="modal-body"></div>
    </div>
  </div>

  <!-- CART SIDEBAR -->
  <div id="cart-overlay" class="cart-overlay"></div>
  <div id="cart-sidebar" class="cart-sidebar">
    <div class="cart-header">
      <h3>Keranjang <span id="cart-count"></span></h3>
      <button class="cart-close"><i class="fas fa-times"></i></button>
      <div id="cart-notification" class="cart-notification"></div>
    </div>
    <div id="cart-items" class="cart-items">
      <div class="cart-empty">
        <i class="fas fa-shopping-cart"></i>
        <h4>Keranjang Kosong</h4>
        <p>Belum ada produk yang ditambahkan.</p>
      </div>
    </div>
    <div class="cart-footer">
      <div class="cart-total">
        <span>Total Pembayaran</span>
        <strong id="cart-total">Rp 0</strong>
      </div>
      <button class="btn-primary" onclick="checkoutWA()"><i class="fab fa-whatsapp"></i> Checkout via WhatsApp</button>
      <button class="btn-gold" onclick="closeCart()"><i class="fas fa-shopping-bag"></i> Lanjut Belanja</button>
    </div>
  </div>

  <!-- BACK TO TOP -->
  <button id="back-to-top" class="back-to-top"><i class="fas fa-arrow-up"></i></button>

  <!-- FLOATING WHATSAPP -->
  <a href="https://wa.me/6285727877235" target="_blank" class="floating-wa" aria-label="WhatsApp">
    <i class="fab fa-whatsapp"></i>
  </a>

  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="js/script.js"></script>
</body>
</html>
