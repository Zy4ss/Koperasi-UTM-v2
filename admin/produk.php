<?php require_once '_auth.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kelola Produk - Koperasi UTM</title>
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
        <a href="produk.php" class="active"><i class="fas fa-box"></i> <span>Kelola Produk</span></a>
        <a href="kategori.php"><i class="fas fa-tags"></i> <span>Kelola Kategori</span></a>
      </nav>
      <div class="admin-sidebar-footer">
        <a href="logout.php"><i class="fas fa-sign-out-alt"></i> <span>Logout</span></a>
      </div>
    </aside>
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
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <button class="btn-outline btn-sm" onclick="toggleArsipView()" id="btn-arsip-view"><i class="fas fa-archive"></i> Lihat Arsip</button>
              <button class="btn-primary btn-sm" onclick="showTambahProduk()"><i class="fas fa-plus"></i> Tambah Produk</button>
            </div>
          </div>
          <div style="margin-bottom:16px">
            <input type="text" id="search-produk" placeholder="Cari produk..." oninput="cariProduk(this.value)" style="width:100%;max-width:360px;padding:10px 16px;border:2px solid var(--border);border-radius:100px;font-size:14px;font-family:inherit;background:var(--surface);color:var(--text);outline:none;box-sizing:border-box">
          </div>
          <div style="overflow-x:auto">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody id="produk-tbody"></tbody>
            </table>
          </div>
          <div id="pagination-wrap" style="display:flex;justify-content:center;gap:6px;margin-top:20px;flex-wrap:wrap"></div>
        </div>
      </div>
    </main>
  </div>

  <div id="modal-produk" class="modal">
    <div class="modal-overlay" onclick="closeModalProduk()"></div>
    <div class="modal-content" style="max-width:560px;max-height:90vh;overflow-y:auto">
      <button class="modal-close" onclick="closeModalProduk()"><i class="fas fa-times"></i></button>
      <div style="padding:32px">
        <h3 style="font-family:'Montserrat',sans-serif;font-size:22px;color:var(--text);margin-bottom:20px" id="modal-produk-title">Tambah Produk</h3>
        <form id="form-produk" onsubmit="simpanProduk(event)">
          <input type="hidden" id="edit-id" value="">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Nama Produk</label>
              <input type="text" id="field-nama" placeholder="Nama produk" required style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none;background:var(--surface);color:var(--text);box-sizing:border-box">
            </div>
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Harga</label>
              <input type="number" id="field-harga" placeholder="Harga" required min="0" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none;background:var(--surface);color:var(--text);box-sizing:border-box">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Tag</label>
              <select id="field-tag" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none;background:var(--surface);color:var(--text);box-sizing:border-box">
                <option value="">— Tidak ada —</option>
                <option value="Best Seller">Best Seller</option>
                <option value="New">New</option>
                <option value="Promo">Promo</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Kategori</label>
              <select id="field-kategori" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none;background:var(--surface);color:var(--text);box-sizing:border-box" onchange="updateSubkategori()">
                <option value="Retail">Retail</option>
                <option value="Konsinyasi">Konsinyasi</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Subkategori</label>
              <select id="field-subkategori" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none;background:var(--surface);color:var(--text);box-sizing:border-box">
                <option value="">Tidak ada</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Foto Produk</label>
              <input type="file" id="field-gambar" accept="image/*" style="width:100%;padding:8px 14px;border:2px solid var(--border);border-radius:8px;font-size:13px;font-family:inherit;outline:none;background:var(--surface);color:var(--text);box-sizing:border-box">
              <div id="gambar-preview" style="margin-top:8px;display:none">
                <img src="" style="width:80px;height:80px;border-radius:8px;object-fit:cover;border:1px solid var(--border)">
              </div>
            </div>
          </div>
          <div style="margin-bottom:20px">
            <label style="display:block;font-size:13px;font-weight:500;color:var(--text);margin-bottom:4px">Deskripsi</label>
            <textarea id="field-deskripsi" rows="3" placeholder="Deskripsi produk" style="width:100%;padding:11px 14px;border:2px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;outline:none;resize:vertical;background:var(--surface);color:var(--text);box-sizing:border-box"></textarea>
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
  <script>
    let showArsip = false;
    let currentPage = 1;
    let totalPages = 1;
    let searchQuery = '';

    function toggleArsipView() {
      showArsip = !showArsip;
      document.getElementById('btn-arsip-view').innerHTML = showArsip
        ? '<i class="fas fa-eye"></i> Lihat Produk Aktif'
        : '<i class="fas fa-archive"></i> Lihat Arsip';
      currentPage = 1;
      loadProduk();
    }

    async function loadProduk() {
      const arsipVal = showArsip ? 1 : 0;
      let url = `../api/produk.php?arsip=${arsipVal}`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      } else {
        url += `&page=${currentPage}&per_page=7`;
      }
      const res = await fetch(url);
      const json = await res.json();
      const data = json.data;
      totalPages = searchQuery ? 1 : json.total_pages;
      const tbody = document.getElementById('produk-tbody');

      if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted)">Tidak ada produk</td></tr>';
        renderPagination();
        return;
      }

      tbody.innerHTML = data.map(p => {
        const badgeClass = p.kategori === 'Konsinyasi' ? 'badge-premium' : p.kategori === 'Lainnya' ? 'badge-accent' : 'badge-primary';
        const img = p.gambar ? `<img src="${p.gambar.startsWith('upload/') ? '../' + p.gambar : p.gambar}" style="width:44px;height:44px;border-radius:8px;object-fit:cover" alt="${p.nama}">` : '<div style="width:44px;height:44px;border-radius:8px;background:var(--border);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:14px"><i class="fas fa-box"></i></div>';
        const tagHtml = p.tag ? `<span class="tag-badge tag-${p.tag.toLowerCase().replace(/\s+/g, '-')}">${p.tag}</span>` : '<span style="color:var(--text-muted);font-size:12px">—</span>';
        return `<tr>
          <td>${img}</td>
          <td><strong>${p.nama}</strong></td>
          <td><span class="badge ${badgeClass}">${p.kategori}${p.subkategori ? ' — ' + p.subkategori : ''}</span></td>
          <td>Rp ${Number(p.harga).toLocaleString()}</td>
          <td>${tagHtml}</td>
          <td>${p.arsip ? '<span style="color:var(--text-muted);font-size:13px"><i class="fas fa-archive"></i> Diarsipkan</span>' : '<span style="color:var(--primary);font-size:13px"><i class="fas fa-check-circle"></i> Aktif</span>'}</td>
          <td>
            <button class="admin-btn-sm admin-btn-edit" onclick="editProduk(${p.id})" title="Edit"><i class="fas fa-edit"></i></button>
            <button class="admin-btn-sm ${p.arsip ? 'admin-btn-edit' : 'admin-btn-delete'}" onclick="arsipProduk(${p.id}, ${p.arsip})" title="${p.arsip ? 'Aktifkan' : 'Arsipkan'}">
              <i class="fas ${p.arsip ? 'fa-eye' : 'fa-archive'}"></i>
            </button>
            <button class="admin-btn-sm admin-btn-delete" onclick="hapusProduk(${p.id})" title="Hapus"><i class="fas fa-trash"></i></button>
          </td>
        </tr>`;
      }).join('');
      renderPagination();
    }

    function renderPagination() {
      const wrap = document.getElementById('pagination-wrap');
      if (totalPages <= 1) { wrap.innerHTML = ''; return; }
      let html = '';
      if (currentPage > 1) html += `<button class="btn-outline btn-sm" onclick="goToPage(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;
      for (let i = 1; i <= totalPages; i++) {
        html += `<button class="btn-${i === currentPage ? 'primary' : 'outline'} btn-sm" onclick="goToPage(${i})" style="${i === currentPage ? '' : ''}">${i}</button>`;
      }
      if (currentPage < totalPages) html += `<button class="btn-outline btn-sm" onclick="goToPage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
      wrap.innerHTML = html;
    }

    function goToPage(page) {
      currentPage = page;
      loadProduk();
    }

    function showTambahProduk() {
      document.getElementById('modal-produk-title').textContent = 'Tambah Produk';
      document.getElementById('form-produk').reset();
      document.getElementById('edit-id').value = '';
      document.getElementById('field-tag').value = '';
      document.getElementById('gambar-preview').style.display = 'none';
      document.getElementById('modal-produk').classList.add('active');
      document.body.classList.add('no-scroll');
    }

    function closeModalProduk() {
      document.getElementById('modal-produk').classList.remove('active');
      document.body.classList.remove('no-scroll');
    }

    async function editProduk(id) {
      const all = await fetch('../api/produk.php');
      const json = await all.json();
      const data = json.data || json;
      const p = Array.isArray(data) ? data.find(d => d.id == id) : null;
      if (!p) return;
      document.getElementById('modal-produk-title').textContent = 'Edit Produk';
      document.getElementById('edit-id').value = p.id;
      document.getElementById('field-nama').value = p.nama;
      document.getElementById('field-harga').value = p.harga;
      document.getElementById('field-tag').value = p.tag || '';
      document.getElementById('field-kategori').value = p.kategori;
      document.getElementById('field-subkategori').value = p.subkategori || '';
      document.getElementById('field-gambar').value = '';
      document.getElementById('field-deskripsi').value = p.deskripsi || '';
      const preview = document.getElementById('gambar-preview');
      if (p.gambar) {
        preview.querySelector('img').src = p.gambar.startsWith('upload/') ? '../' + p.gambar : p.gambar;
        preview.style.display = 'block';
      } else {
        preview.style.display = 'none';
      }
      updateSubkategori();
      document.getElementById('modal-produk').classList.add('active');
      document.body.classList.add('no-scroll');
    }

    function updateSubkategori() {
      const kat = document.getElementById('field-kategori').value;
      const sub = document.getElementById('field-subkategori');
      sub.disabled = kat !== 'Retail';
      if (kat !== 'Retail') sub.value = '';
    }

    async function simpanProduk(e) {
      e.preventDefault();
      const id = document.getElementById('edit-id').value;
      const fd = new FormData();
      fd.append('nama', document.getElementById('field-nama').value);
      fd.append('harga', document.getElementById('field-harga').value);
      fd.append('tag', document.getElementById('field-tag').value);
      fd.append('kategori', document.getElementById('field-kategori').value);
      fd.append('subkategori', document.getElementById('field-subkategori').value);
      fd.append('deskripsi', document.getElementById('field-deskripsi').value);

      const fileInput = document.getElementById('field-gambar');
      if (fileInput.files.length > 0) {
        fd.append('gambar', fileInput.files[0]);
      }

      if (id) {
        fd.append('action', 'update');
        fd.append('id', id);
      } else {
        fd.append('action', 'create');
      }

      const res = await fetch('../api/produk.php', { method: 'POST', body: fd });
      const result = await res.json();
      if (result.error) {
        Swal.fire('Gagal', result.error, 'error');
        return;
      }
      Swal.fire('Berhasil', result.message, 'success');
      closeModalProduk();
      loadProduk();
    }

    function arsipProduk(id, current) {
      const newArsip = current ? 0 : 1;
      const label = newArsip ? 'diarsipkan' : 'diaktifkan';
      Swal.fire({
        title: `${newArsip ? 'Arsipkan' : 'Aktifkan'} produk ini?`,
        text: `Produk akan ${label}.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: newArsip ? '#6C757D' : '#0F5132',
        cancelButtonColor: '#6C757D',
        confirmButtonText: `Ya, ${label}!`,
        cancelButtonText: 'Batal'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const fd = new FormData();
          fd.append('action', 'archive');
          fd.append('id', id);
          fd.append('arsip', newArsip);
          await fetch('../api/produk.php', { method: 'POST', body: fd });
          Swal.fire('Berhasil!', `Produk berhasil ${label}.`, 'success');
          loadProduk();
        }
      });
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
      }).then(async (result) => {
        if (result.isConfirmed) {
          const fd = new FormData();
          fd.append('action', 'delete');
          fd.append('id', id);
          await fetch('../api/produk.php', { method: 'POST', body: fd });
          Swal.fire('Terhapus!', 'Produk berhasil dihapus.', 'success');
          loadProduk();
        }
      });
    }

    function cariProduk(val) {
      searchQuery = val;
      currentPage = 1;
      loadProduk();
    }

    loadProduk();
  </script>
</body>
</html>
