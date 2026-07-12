<?php
$navItems = [
  'beranda' => ['label' => 'Beranda', 'url' => 'index.php'],
  'profil'  => ['label' => 'Profil', 'url' => 'profil.php'],
  'katalog' => ['label' => 'Katalog', 'url' => 'katalog.php'],
  'kontak'  => ['label' => 'Kontak', 'url' => 'kontak.php'],
];
$active = $active ?? 'beranda';
?>
  <!-- NAVBAR -->
  <nav id="navbar">
    <div class="nav-inner container">
      <a href="index.php" class="nav-logo">
        <img src="img/logo-koperasi.png" alt="Koperasi UTM" class="nav-logo-img"> Koperasi UTM
      </a>
      <div id="nav-menu" class="nav-menu">
        <ul class="nav-menu-list">
<?php foreach ($navItems as $key => $item): ?>
          <li><a href="<?= $item['url'] ?>" class="nav-link<?= $active === $key ? ' active' : '' ?>"><?= $item['label'] ?></a></li>
<?php endforeach; ?>
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
