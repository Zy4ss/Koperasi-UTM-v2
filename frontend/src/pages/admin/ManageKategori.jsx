import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { apiFetch } from '../../utils/api';

const ManageKategori = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/kategori');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTambahKategori = () => {
    if (window.Swal) {
      window.Swal.fire({
        title: 'Tambah Kategori',
        html: `
          <input id="swal-nama" class="swal2-input" placeholder="Nama kategori" style="box-sizing:border-box">
          <select id="swal-tipe" class="swal2-input" style="padding:10px; box-sizing:border-box">
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
          if (!nama) {
            window.Swal.showValidationMessage('Nama kategori harus diisi');
          }
          return {
            nama,
            tipe: document.getElementById('swal-tipe').value,
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await apiFetch('/api/kategori', {
            method: 'POST',
            body: JSON.stringify(result.value),
          });
          const data = await res.json();
          window.Swal.fire('Berhasil!', data.message || 'Kategori berhasil ditambahkan.', 'success');
          fetchCategories();
        }
      });
    } else {
      const nama = prompt('Nama Kategori:');
      const tipe = prompt('Tipe (utama/sub):', 'utama');
      if (nama && ['utama', 'sub'].includes(tipe)) {
        apiFetch('/api/kategori', {
          method: 'POST',
          body: JSON.stringify({ nama, tipe }),
        }).then(() => fetchCategories());
      }
    }
  };

  const handleEditKategori = (id, currentNama, currentTipe) => {
    if (window.Swal) {
      window.Swal.fire({
        title: 'Edit Kategori',
        html: `
          <input id="swal-nama" class="swal2-input" placeholder="Nama kategori" value="${currentNama}" style="box-sizing:border-box">
          <select id="swal-tipe" class="swal2-input" style="padding:10px; box-sizing:border-box">
            <option value="utama" ${currentTipe === 'utama' ? 'selected' : ''}>Kategori Utama</option>
            <option value="sub" ${currentTipe === 'sub' ? 'selected' : ''}>Subkategori</option>
          </select>
        `,
        confirmButtonText: 'Simpan',
        showCancelButton: true,
        cancelButtonText: 'Batal',
        confirmButtonColor: '#0F5132',
        cancelButtonColor: '#6C757D',
        preConfirm: () => {
          const nama = document.getElementById('swal-nama').value;
          if (!nama) {
            window.Swal.showValidationMessage('Nama kategori harus diisi');
          }
          return {
            nama,
            tipe: document.getElementById('swal-tipe').value,
          };
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await apiFetch(`/api/kategori/${id}`, {
            method: 'PUT',
            body: JSON.stringify(result.value),
          });
          const data = await res.json();
          window.Swal.fire('Berhasil!', data.message || 'Kategori berhasil diperbarui.', 'success');
          fetchCategories();
        }
      });
    } else {
      const nama = prompt('Edit Nama Kategori:', currentNama);
      const tipe = prompt('Edit Tipe (utama/sub):', currentTipe);
      if (nama && ['utama', 'sub'].includes(tipe)) {
        apiFetch(`/api/kategori/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ nama, tipe }),
        }).then(() => fetchCategories());
      }
    }
  };

  const handleHapusKategori = (id) => {
    if (window.Swal) {
      window.Swal.fire({
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
          const res = await apiFetch(`/api/kategori/${id}`, {
            method: 'DELETE',
          });
          const data = await res.json();
          window.Swal.fire('Terhapus!', data.message || 'Kategori berhasil dihapus.', 'success');
          fetchCategories();
        }
      });
    } else {
      if (window.confirm('Yakin ingin menghapus kategori ini?')) {
        apiFetch(`/api/kategori/${id}`, {
          method: 'DELETE',
        }).then(() => fetchCategories());
      }
    }
  };

  return (
    <AdminLayout title="Kelola Kategori">
      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <h3><i className="fas fa-tags" style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Daftar Kategori</h3>
          <button className="btn-primary btn-sm" onClick={handleTambahKategori}>
            <i className="fas fa-plus"></i> Tambah Kategori
          </button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Kategori</th>
              <th>Tipe</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Memuat kategori...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Tidak ada kategori</td>
              </tr>
            ) : (
              categories.map((k, i) => {
                const badgeClass = k.tipe === 'utama' ? 'badge-primary' : 'badge-accent';
                const indentStyle = k.tipe === 'sub' ? { marginLeft: '24px' } : {};
                
                return (
                  <tr key={k.id}>
                    <td>{i + 1}</td>
                    <td>
                      <strong style={indentStyle}>{k.nama}</strong>
                    </td>
                    <td>
                      <span className={`badge ${badgeClass}`}>
                        {k.tipe === 'utama' ? 'Kategori Utama' : 'Subkategori'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="admin-btn-sm admin-btn-edit" 
                        onClick={() => handleEditKategori(k.id, k.nama, k.tipe)}
                        title="Edit"
                        style={{ marginRight: '4px' }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="admin-btn-sm admin-btn-delete" 
                        onClick={() => handleHapusKategori(k.id)}
                        title="Hapus"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default ManageKategori;
