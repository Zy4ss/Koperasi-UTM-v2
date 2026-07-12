<?php require_once '_auth.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kelola Kategori - Koperasi UTM</title>
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
        <a href="index.php"><i class="fas fa-tachometer-alt"></i> <span>Dashboard</span></a>
        <a href="produk.php"><i class="fas fa-box"></i> <span>Kelola Produk</span></a>
        <a href="kategori.php" class="active"><i class="fas fa-tags"></i> <span>Kelola Kategori</span></a>
      </nav>
      <div class="admin-sidebar-footer">
        <a href="logout.php"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a>
      </div>
    </aside>
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
              <tr><th>No</th><th>Nama Kategori</th><th>Tipe</th><th>Aksi</th></tr>
            </thead>
            <tbody id="kategori-tbody"></tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script>
    async function loadKategori() {
      const res = await fetch('../api/kategori.php');
      const data = await res.json();
      const tbody = document.getElementById('kategori-tbody');
      tbody.innerHTML = data.map((k, i) => {
        const badgeClass = k.tipe === 'utama' ? 'badge-primary' : 'badge-accent';
        const indent = k.tipe === 'sub' ? 'style="margin-left:24px"' : '';
        return `<tr>
          <td>${i + 1}</td>
          <td><strong ${indent}>${k.nama}</strong></td>
          <td><span class="badge ${badgeClass}">${k.tipe === 'utama' ? 'Kategori Utama' : 'Subkategori'}</span></td>
          <td>
            <button class="admin-btn-sm admin-btn-edit" onclick="editKategori(${k.id}, '${k.nama}', '${k.tipe}')"><i class="fas fa-edit"></i></button>
            <button class="admin-btn-sm admin-btn-delete" onclick="hapusKategori(${k.id})"><i class="fas fa-trash"></i></button>
          </td>
        </tr>`;
      }).join('');
    }

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
      }).then(async (result) => {
        if (result.isConfirmed) {
          const fd = new FormData();
          fd.append('action', 'create');
          fd.append('nama', result.value);
          fd.append('tipe', document.getElementById('swal-tipe').value);
          await fetch('../api/kategori.php', { method: 'POST', body: fd });
          Swal.fire('Berhasil!', 'Kategori berhasil ditambahkan.', 'success');
          loadKategori();
        }
      });
    }

    function editKategori(id, nama, tipe) {
      Swal.fire({
        title: 'Edit Kategori',
        html: `
          <input id="swal-nama" class="swal2-input" placeholder="Nama kategori" value="${nama}">
          <select id="swal-tipe" class="swal2-input" style="padding:10px">
            <option value="utama" ${tipe === 'utama' ? 'selected' : ''}>Kategori Utama</option>
            <option value="sub" ${tipe === 'sub' ? 'selected' : ''}>Subkategori</option>
          </select>
        `,
        confirmButtonText: 'Simpan',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonColor: '#0F5132',
        cancelButtonColor: '#6C757D',
        preConfirm: () => {
          const n = document.getElementById('swal-nama').value;
          if (!n) { Swal.showValidationMessage('Nama kategori harus diisi'); }
          return n;
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const fd = new FormData();
          fd.append('action', 'update');
          fd.append('id', id);
          fd.append('nama', result.value);
          fd.append('tipe', document.getElementById('swal-tipe').value);
          await fetch('../api/kategori.php', { method: 'POST', body: fd });
          Swal.fire('Berhasil!', 'Kategori berhasil diperbarui.', 'success');
          loadKategori();
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          const fd = new FormData();
          fd.append('action', 'delete');
          fd.append('id', id);
          await fetch('../api/kategori.php', { method: 'POST', body: fd });
          Swal.fire('Terhapus!', 'Kategori berhasil dihapus.', 'success');
          loadKategori();
        }
      });
    }

    loadKategori();
  </script>
</body>
</html>
