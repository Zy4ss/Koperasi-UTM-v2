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
        <a href="produk.php" class="active"><i class="fas fa-box"></i> <span>Kelola Produk</span></a>
        <a href="kategori.php"><i class="fas fa-tags"></i> <span>Kelola Kategori</span></a>
      </nav>
      <div class="admin-sidebar-footer">
        <a href="login.php"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a>
      </div>
    </aside>

    <!-- MAIN -->
    <main class="admin-main">
      <header class="admin-header">
        <h2>Kelola Produk</h2>
        <div class="admin-header-right">
          <span>Selamat datang, Admin</span>
          <div class="admin-avatar"><i class="fas fa-user"></i></div>
        </div>
      </header>

      <div class="admin-content">
        <div class="admin-table-wrap">
          <div class="admin-table-header">
            <h3><i class="fas fa-box" style="color:var(--primary);margin-right:8px"></i> Daftar Produk</h3>
            <button class="btn-primary btn-sm" onclick="showTambahProduk()"><i class="fas fa-plus"></i> Tambah Produk</button>
          </div>

          <div style="margin-bottom:16px">
            <input type="text" id="search-produk" placeholder="Cari produk..." style="width:100%;max-width:360px;padding:10px 16px;border:2px solid var(--border);border-radius:100px;font-size:14px;font-family:inherit;background:var(--surface);color:var(--text);outline:none" oninput="cariProduk(this.value)">
          </div>

          <table class="admin-table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><img src="https://images.unsplash.com/photo-1612927601601-6638404737ce?w=60&q=80" style="width:44px;height:44px;border-radius:8px;object-fit:cover" alt="Produk"></td>
                <td><strong>Indomie Goreng</strong></td>
                <td><span class="badge badge-primary">Retail</span></td>
                <td>Rp 3.500</td>
                <td>50</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editProduk(1)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusProduk(1)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td><img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=60&q=80" style="width:44px;height:44px;border-radius:8px;object-fit:cover" alt="Produk"></td>
                <td><strong>Kopiko 78°C</strong></td>
                <td><span class="badge badge-primary">Retail</span></td>
                <td>Rp 5.000</td>
                <td>40</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editProduk(2)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusProduk(2)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td><img src="https://images.unsplash.com/photo-1566478989037-eec170784d6b?w=60&q=80" style="width:44px;height:44px;border-radius:8px;object-fit:cover" alt="Produk"></td>
                <td><strong>Keripik Singkong Pedas</strong></td>
                <td><span class="badge badge-premium">Konsinyasi</span></td>
                <td>Rp 10.000</td>
                <td>25</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editProduk(3)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusProduk(3)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td><img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=60&q=80" style="width:44px;height:44px;border-radius:8px;object-fit:cover" alt="Produk"></td>
                <td><strong>Madu Murni 250ml</strong></td>
                <td><span class="badge badge-premium">Konsinyasi</span></td>
                <td>Rp 45.000</td>
                <td>15</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editProduk(4)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusProduk(4)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
              <tr>
                <td><img src="https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=60&q=80" style="width:44px;height:44px;border-radius:8px;object-fit:cover" alt="Produk"></td>
                <td><strong>Buku Tulis Sidu 42 Lbr</strong></td>
                <td><span class="badge badge-accent">Lainnya</span></td>
                <td>Rp 5.000</td>
                <td>80</td>
                <td>
                  <button class="admin-btn-sm admin-btn-edit" onclick="editProduk(5)"><i class="fas fa-edit"></i></button>
                  <button class="admin-btn-sm admin-btn-delete" onclick="hapusProduk(5)"><i class="fas fa-trash"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>

  <!-- MODAL TAMBAH/EDIT PRODUK -->
  <div id="modal-produk" class="modal">
    <div class="modal-overlay" onclick="closeModalProduk()"></div>
    <div class="modal-content" style="max-width:560px">
      <button class="modal-close" onclick="closeModalProduk()"><i class="fas fa-times"></i></button>
      <div style="padding:32px">
        <h3 style="font-family:'Montserrat',sans-serif;font-size:22px;color:var(--text);margin-bottom:20px" id="modal-produk-title">Tambah Produk</h3>
        <form id="form-produk">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Nama Produk</label>
              <input type="text" placeholder="Nama produk" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none">
            </div>
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Harga</label>
              <input type="number" placeholder="Harga" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Stok</label>
              <input type="number" placeholder="Stok" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none">
            </div>
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Kategori</label>
              <select style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none;background:var(--bg)">
                <option>Retail — Makanan</option>
                <option>Retail — Minuman</option>
                <option>Konsinyasi</option>
                <option>Lainnya</option>
              </select>
            </div>
          </div>
          <div style="margin-bottom:16px">
            <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Deskripsi</label>
            <textarea rows="3" placeholder="Deskripsi produk" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none;resize:vertical"></textarea>
          </div>
          <div style="margin-bottom:20px">
            <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Foto Produk</label>
            <div style="border:2px dashed var(--border);border-radius:12px;padding:24px;text-align:center;cursor:pointer;transition:all 0.3s;background:var(--surface)">
              <i class="fas fa-cloud-upload-alt" style="font-size:32px;color:var(--text-muted);margin-bottom:8px"></i>
              <p style="font-size:13px;color:var(--text-muted)">Klik untuk upload gambar</p>
            </div>
          </div>
          <div style="display:flex;gap:10px">
            <button type="submit" class="btn-primary" style="flex:1;justify-content:center"><i class="fas fa-save"></i> Simpan</button>
            <button type="button" class="btn-outline" onclick="closeModalProduk()" style="justify-content:center">Batal</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="../admin/js/script.js"></script>
  <script>
    function showTambahProduk() {
      document.getElementById('modal-produk-title').textContent = 'Tambah Produk';
      document.getElementById('modal-produk').classList.add('active');
      document.body.classList.add('no-scroll');
    }
    function closeModalProduk() {
      document.getElementById('modal-produk').classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
    function editProduk(id) {
      document.getElementById('modal-produk-title').textContent = 'Edit Produk';
      document.getElementById('modal-produk').classList.add('active');
      document.body.classList.add('no-scroll');
    }
    function hapusProduk(id) {
      Swal.fire({
        title: 'Yakin ingin menghapus?',
        text: 'Data yang dihapus tidak dapat dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6C757D',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Terhapus!', 'Produk berhasil dihapus.', 'success');
        }
      });
    }
    function cariProduk(val) {
      const rows = document.querySelectorAll('.admin-table tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(val.toLowerCase()) ? '' : 'none';
      });
    }
  </script>
</body>
</html>
