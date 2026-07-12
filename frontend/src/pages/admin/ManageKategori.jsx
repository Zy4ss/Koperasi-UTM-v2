import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { apiFetch } from '../../utils/api';

const ManageKategori = () => {
  const [kategoris, setKategoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  const fetchKategoris = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/kategori');
      const data = await res.json();
      setKategoris(data || []);
      setSelectedIds([]);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategoris();
  }, []);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(kategoris.map(k => k.id));
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Yakin ingin menghapus ${selectedIds.length} kategori terpilih?`)) return;
    
    setIsBulkProcessing(true);
    try {
      const res = await apiFetch('/api/kategori/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchKategoris();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus kategori');
      }
    } catch (err) {
      alert('Koneksi gagal');
    } finally {
      setIsBulkProcessing(false);
    }
  };

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
          fetchKategoris();
        }
      });
    } else {
      const nama = prompt('Nama Kategori:');
      const tipe = prompt('Tipe (utama/sub):', 'utama');
      if (nama && ['utama', 'sub'].includes(tipe)) {
        apiFetch('/api/kategori', {
          method: 'POST',
          body: JSON.stringify({ nama, tipe }),
        }).then(() => fetchKategoris());
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
          fetchKategoris();
        }
      });
    } else {
      const nama = prompt('Edit Nama Kategori:', currentNama);
      const tipe = prompt('Edit Tipe (utama/sub):', currentTipe);
      if (nama && ['utama', 'sub'].includes(tipe)) {
        apiFetch(`/api/kategori/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ nama, tipe }),
        }).then(() => fetchKategoris());
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
          fetchKategoris();
        }
      });
    } else {
      if (window.confirm('Yakin ingin menghapus kategori ini?')) {
        apiFetch(`/api/kategori/${id}`, {
          method: 'DELETE',
        }).then(() => fetchKategoris());
      }
    }
  };

  const renderSkeletonRows = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <tr key={i}>
          <td><input type="checkbox" disabled /></td>
          <td><div className="skeleton skeleton-text short"></div></td>
          <td><div className="skeleton skeleton-text"></div></td>
          <td><div className="skeleton skeleton-badge"></div></td>
          <td><div className="skeleton skeleton-btn"></div></td>
        </tr>
      ))}
    </>
  );

  return (
    <AdminLayout title="Kelola Kategori">
      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <h3><i className="fas fa-tags" style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Daftar Kategori</h3>
          <button className="btn-primary btn-sm" onClick={handleTambahKategori}>
            <i className="fas fa-plus"></i> Tambah Kategori
          </button>
        </div>

        {selectedIds.length > 0 && (
          <div style={{ background: 'rgba(15, 81, 50, 0.1)', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '14px' }}>{selectedIds.length} kategori terpilih</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="btn-primary btn-sm" 
                onClick={handleBulkDelete} 
                disabled={isBulkProcessing}
                style={{ background: '#dc3545' }}
              >
                {isBulkProcessing ? 'Memproses...' : <><i className="fas fa-trash"></i> Hapus</>}
              </button>
            </div>
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    onChange={toggleSelectAll} 
                    checked={kategoris.length > 0 && selectedIds.length === kategoris.length}
                  />
                </th>
                <th>No</th>
                <th>Nama Kategori</th>
                <th>Tipe</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? renderSkeletonRows() : kategoris.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Tidak ada kategori</td>
                </tr>
              ) : (
                kategoris.map((k, i) => {
                  const badgeClass = k.tipe === 'utama' ? 'badge-primary' : 'badge-accent';
                  const indentStyle = k.tipe === 'sub' ? { marginLeft: '24px' } : {};
                  
                  return (
                    <tr key={k.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(k.id)}
                          onChange={() => toggleSelect(k.id)}
                        />
                      </td>
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
      </div>
    </AdminLayout>
  );
};

export default ManageKategori;
