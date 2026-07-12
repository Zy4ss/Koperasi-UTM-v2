<?php
require_once '_auth.php';
require_once '../inc/db.php';

$totalProduk = $conn->query("SELECT COUNT(*) AS c FROM produk")->fetch_assoc()['c'];
$totalKategori = $conn->query("SELECT COUNT(*) AS c FROM kategori")->fetch_assoc()['c'];
$retailCount = $conn->query("SELECT COUNT(*) AS c FROM produk WHERE kategori='Retail'")->fetch_assoc()['c'];
$konsinyasiCount = $conn->query("SELECT COUNT(*) AS c FROM produk WHERE kategori='Konsinyasi'")->fetch_assoc()['c'];
$arsipCount = $conn->query("SELECT COUNT(*) AS c FROM produk WHERE arsip=1")->fetch_assoc()['c'];
$produkTerbaru = $conn->query("SELECT * FROM produk ORDER BY id DESC LIMIT 5");
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard - Koperasi UTM</title>
  <link rel="icon" type="image/png" href="../img/logo-koperasi.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body class="admin-body">
  <div class="admin-wrapper">
    <aside class="admin-sidebar">
      <div class="admin-sidebar-brand">
        <h3><img src="../img/logo-koperasi.png" alt="Koperasi UTM" class="admin-logo-img"> Koperasi <span>UTM</span></h3>
        <span>Panel Administrasi</span>
      </div>
      <nav class="admin-sidebar-nav">
        <a href="index.php" class="active"><i class="fas fa-tachometer-alt"></i> <span>Dashboard</span></a>
        <a href="produk.php"><i class="fas fa-box"></i> <span>Kelola Produk</span></a>
        <a href="kategori.php"><i class="fas fa-tags"></i> <span>Kelola Kategori</span></a>
      </nav>
      <div class="admin-sidebar-footer">
        <a href="logout.php"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a>
      </div>
    </aside>
    <main class="admin-main">
      <header class="admin-header">
        <h2>Dashboard</h2>
        <div class="admin-header-right">
          <span>Selamat datang, Admin</span>
          <div class="admin-avatar"><i class="fas fa-user"></i></div>
        </div>
      </header>
      <div class="admin-content">
        <div class="admin-stats">
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="0">
            <div class="admin-stat-icon"><i class="fas fa-box"></i></div>
            <div class="admin-stat-info">
              <h4>Total Produk</h4>
              <strong><?= $totalProduk ?></strong>
            </div>
          </div>
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="50">
            <div class="admin-stat-icon"><i class="fas fa-tags"></i></div>
            <div class="admin-stat-info">
              <h4>Total Kategori</h4>
              <strong><?= $totalKategori ?></strong>
            </div>
          </div>
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="100">
            <div class="admin-stat-icon"><i class="fas fa-shopping-bag"></i></div>
            <div class="admin-stat-info">
              <h4>Produk Retail</h4>
              <strong><?= $retailCount ?></strong>
            </div>
          </div>
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="150">
            <div class="admin-stat-icon"><i class="fas fa-handshake"></i></div>
            <div class="admin-stat-info">
              <h4>Produk Konsinyasi</h4>
              <strong><?= $konsinyasiCount ?></strong>
            </div>
          </div>
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="200">
            <div class="admin-stat-icon"><i class="fas fa-archive"></i></div>
            <div class="admin-stat-info">
              <h4>Produk Diarsipkan</h4>
              <strong><?= $arsipCount ?></strong>
            </div>
          </div>
        </div>

        <div class="admin-table-wrap">
          <div class="admin-table-header">
            <h3><i class="fas fa-box" style="color:var(--primary);margin-right:8px"></i> Produk Terbaru</h3>
            <a href="produk.php" class="btn-primary btn-sm"><i class="fas fa-plus"></i> Tambah Produk</a>
          </div>
          <table class="admin-table">
            <thead>
              <tr><th>Produk</th><th>Kategori</th><th>Harga</th><th>Tag</th><th>Status</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              <?php while ($p = $produkTerbaru->fetch_assoc()): ?>
              <tr>
                <td><strong><?= htmlspecialchars($p['nama']) ?></strong></td>
                <td><span class="badge badge-primary"><?= htmlspecialchars($p['kategori']) ?></span></td>
                <td>Rp <?= number_format($p['harga']) ?></td>
                <td><?= $p['tag'] ? '<span class="tag-badge tag-'.str_replace(' ', '-', strtolower($p['tag'])).'">'.htmlspecialchars($p['tag']).'</span>' : '<span style="color:var(--text-muted);font-size:12px">—</span>' ?></td>
                <td><?= $p['arsip'] ? '<span style="color:var(--text-muted);font-size:13px"><i class="fas fa-archive"></i> Diarsipkan</span>' : '<span style="color:var(--primary);font-size:13px"><i class="fas fa-check-circle"></i> Aktif</span>' ?></td>
                <td><a href="produk.php" class="admin-btn-sm admin-btn-edit"><i class="fas fa-edit"></i></a></td>
              </tr>
              <?php endwhile; ?>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="../admin/js/script.js"></script>
</body>
</html>
