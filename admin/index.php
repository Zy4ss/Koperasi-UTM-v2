<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Koperasi Universitas Trunojoyo Madura</title>
  <link rel="icon" type="image/png" href="../img/logo-koperasi.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
  <link rel="stylesheet" href="../css/style.css">
</head>
<body class="admin-body">
  <div class="admin-wrapper">
    <!-- SIDEBAR -->
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
        <a href="login.php"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="admin-main">
      <header class="admin-header">
        <h2>Dashboard</h2>
        <div class="admin-header-right">
          <span>Selamat datang, Admin</span>
          <div class="admin-avatar"><i class="fas fa-user"></i></div>
        </div>
      </header>

      <div class="admin-content">
        <!-- STATS -->
        <div class="admin-stats">
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="0">
            <div class="admin-stat-icon"><i class="fas fa-box"></i></div>
            <div class="admin-stat-info">
              <h4>Total Produk</h4>
              <strong>48</strong>
            </div>
          </div>
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="50">
            <div class="admin-stat-icon"><i class="fas fa-tags"></i></div>
            <div class="admin-stat-info">
              <h4>Total Kategori</h4>
              <strong>5</strong>
            </div>
          </div>
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="100">
            <div class="admin-stat-icon"><i class="fas fa-shopping-bag"></i></div>
            <div class="admin-stat-info">
              <h4>Produk Retail</h4>
              <strong>32</strong>
            </div>
          </div>
          <div class="admin-stat-card" data-aos="fade-up" data-aos-delay="150">
            <div class="admin-stat-icon"><i class="fas fa-handshake"></i></div>
            <div class="admin-stat-info">
              <h4>Produk Konsinyasi</h4>
              <strong>16</strong>
            </div>
          </div>
        </div>

        <!-- CHART -->
        <div class="admin-chart-wrap" data-aos="fade-up">
          <h3><i class="fas fa-chart-line" style="color:var(--primary);margin-right:8px"></i> Grafik Penjualan Tahunan</h3>
          <div style="height:320px">
            <canvas id="adminChart"></canvas>
          </div>
        </div>

        <!-- TABLE -->
        <div class="admin-table-wrap" data-aos="fade-up">
          <div class="admin-table-header">
            <h3><i class="fas fa-box" style="color:var(--primary);margin-right:8px"></i> Produk Terbaru</h3>
            <a href="produk.php" class="btn-primary btn-sm"><i class="fas fa-plus"></i> Tambah Produk</a>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Indomie Goreng</strong></td>
                <td><span class="badge badge-primary">Retail</span></td>
                <td>Rp 3.500</td>
                <td>50</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td><strong>Kopiko 78°C</strong></td>
                <td><span class="badge badge-primary">Retail</span></td>
                <td>Rp 5.000</td>
                <td>40</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td><strong>Keripik Singkong Pedas</strong></td>
                <td><span class="badge badge-premium">Konsinyasi</span></td>
                <td>Rp 10.000</td>
                <td>25</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td><strong>Madu Murni 250ml</strong></td>
                <td><span class="badge badge-premium">Konsinyasi</span></td>
                <td>Rp 45.000</td>
                <td>15</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td><strong>Buku Tulis Sidu</strong></td>
                <td><span class="badge badge-accent">Lainnya</span></td>
                <td>Rp 5.000</td>
                <td>80</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script>AOS.init({ duration: 600, once: true })</script>
  <script src="js/script.js"></script>
</body>
</html>
