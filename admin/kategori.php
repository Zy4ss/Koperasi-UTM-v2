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
        <a href="index.php"><i class="fas fa-tachometer-alt"></i> <span>Dashboard</span></a>
        <a href="produk.php"><i class="fas fa-box"></i> <span>Kelola Produk</span></a>
        <a href="kategori.php" class="active"><i class="fas fa-tags"></i> <span>Kelola Kategori</span></a>
      </nav>
      <div class="admin-sidebar-footer">
        <a href="login.php"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="admin-main">
      <header class="admin-header">
        <h2>Kelola Kategori</h2>
        <div class="admin-header-right">
          <span>Selamat datang, Admin</span>
          <div class="admin-avatar"><i class="fas fa-user"></i></div>
        </div>
      </header>

      <div class="admin-content">
        <div class="admin-table-wrap">
          <div class="admin-table-header">
            <h3><i class="fas fa-tags" style="color:var(--primary);margin-right:8px"></i> Daftar Kategori</h3>
            <button class="btn-primary btn-sm" onclick="tambahKategori()"><i class="fas fa-plus"></i> Tambah Kategori</button>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kategori</th>
                <th>Tipe</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><strong>Retail</strong></td>
                <td><span class="badge badge-primary">Kategori Utama</span></td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editKategori(1)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusKategori(1)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td><strong style="margin-left:24px">— Makanan</strong></td>
                <td><span class="badge badge-accent">Subkategori</span></td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editKategori(2)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusKategori(2)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td><strong style="margin-left:24px">— Minuman</strong></td>
                <td><span class="badge badge-accent">Subkategori</span></td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editKategori(3)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusKategori(3)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td><strong>Konsinyasi</strong></td>
                <td><span class="badge badge-premium">Kategori Utama</span></td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editKategori(4)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusKategori(4)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td><strong>Lainnya</strong></td>
                <td><span class="badge badge-primary">Kategori Utama</span></td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editKategori(5)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusKategori(5)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="../admin/js/script.js"></script>
  <script>
    function tambahKategori() {
      Swal.fire({
        title: 'Tambah Kategori',
        html: `
          <input id="swal-nama" class="swal2-input" placeholder="Nama kategori">
          <select id="swal-tipe" class="swal2-input" style="padding:10px">
            <option value="utama">Kategori Utama</option>
            <option value="sub">Subkategori</option>
          </select>
        `,
        confirmButtonText: 'Simpan',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonColor: '#0F5132',
        cancelButtonColor: '#6C757D',
        preConfirm: () => {
          const nama = document.getElementById('swal-nama').value;
          if (!nama) { Swal.showValidationMessage('Nama kategori harus diisi'); }
          return nama;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Berhasil!', 'Kategori berhasil ditambahkan.', 'success');
        }
      });
    }
    function editKategori(id) {
      Swal.fire({
        title: 'Edit Kategori',
        input: 'text',
        inputValue: 'Retail',
        inputPlaceholder: 'Nama kategori',
        confirmButtonText: 'Simpan',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonColor: '#0F5132',
        cancelButtonColor: '#6C757D'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Berhasil!', 'Kategori berhasil diperbarui.', 'success');
        }
      });
    }
    function hapusKategori(id) {
      Swal.fire({
        title: 'Yakin ingin menghapus?',
        text: 'Kategori yang dihapus tidak dapat dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6C757D',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Terhapus!', 'Kategori berhasil dihapus.', 'success');
        }
      });
    }
  </script>
</body>
</html>
