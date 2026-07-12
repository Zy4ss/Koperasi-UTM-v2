import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { apiFetch, getApiUrl } from '../../utils/api';

const ManagePengurus = () => {
  const [pengurusList, setPengurusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);

  // Form Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Tambah Pengurus');
  const [editId, setEditId] = useState('');
  
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [level, setLevel] = useState(3);
  const [urutan, setUrutan] = useState(0);
  const [fotoFile, setFotoFile] = useState(null);
  const [fotoPreview, setFotoPreview] = useState('');

  const fetchPengurus = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/pengurus');
      if (res.ok) {
        const data = await res.json();
        setPengurusList(data || []);
        setSelectedIds([]);
      }
    } catch (err) {
      console.error('Error fetching pengurus:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPengurus();
  }, []);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(pengurusList.map(p => p.id));
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
    if (!window.confirm(`Yakin ingin menghapus ${selectedIds.length} pengurus terpilih?`)) return;
    
    setIsBulkProcessing(true);
    try {
      const res = await apiFetch('/api/pengurus/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchPengurus();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus pengurus');
      }
    } catch (err) {
      alert('Koneksi gagal');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleOpenTambahModal = () => {
    setModalTitle('Tambah Pengurus');
    setEditId('');
    setNama('');
    setJabatan('');
    setLevel(3);
    setUrutan(0);
    setFotoFile(null);
    setFotoPreview('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    setModalTitle('Edit Pengurus');
    setEditId(p.id);
    setNama(p.nama);
    setJabatan(p.jabatan);
    setLevel(p.level);
    setUrutan(p.urutan);
    setFotoFile(null);
    setFotoPreview(p.foto ? getApiUrl(p.foto) : '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSimpan = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('nama', nama);
    fd.append('jabatan', jabatan);
    fd.append('level', level);
    fd.append('urutan', urutan);
    if (fotoFile) {
      fd.append('foto', fotoFile);
    }

    try {
      let res;
      if (editId) {
        res = await apiFetch(`/api/pengurus/${editId}`, {
          method: 'POST', // Use POST to support FormData upload with file payload
          body: fd
        });
      } else {
        res = await apiFetch('/api/pengurus', {
          method: 'POST',
          body: fd
        });
      }

      if (res.ok) {
        setIsModalOpen(false);
        fetchPengurus();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menyimpan pengurus');
      }
    } catch (err) {
      alert('Koneksi gagal');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus pengurus ini?')) return;
    try {
      const res = await apiFetch(`/api/pengurus/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchPengurus();
      } else {
        alert('Gagal menghapus pengurus');
      }
    } catch (err) {
      alert('Koneksi gagal');
    }
  };

  const getLevelLabel = (lvl) => {
    switch (lvl) {
      case 1: return 'Tingkat 1 (Ketua)';
      case 2: return 'Tingkat 2 (Pengurus Inti/BPH)';
      case 3: return 'Tingkat 3 (Sie/Divisi)';
      default: return 'Tingkat 3';
    }
  };

  const renderSkeletonRows = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <tr key={i}>
          <td><input type="checkbox" disabled /></td>
          <td><div className="skeleton skeleton-text" style={{ width: '30px' }}></div></td>
          <td>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="skeleton" style={{ width: '40px', height: '40px', borderRadius: '50%' }}></div>
              <div className="skeleton skeleton-text" style={{ width: '120px' }}></div>
            </div>
          </td>
          <td><div className="skeleton skeleton-text" style={{ width: '100px' }}></div></td>
          <td><div className="skeleton skeleton-text" style={{ width: '120px' }}></div></td>
          <td><div className="skeleton skeleton-text" style={{ width: '30px' }}></div></td>
          <td>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '4px' }}></div>
              <div className="skeleton" style={{ width: '32px', height: '32px', borderRadius: '4px' }}></div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <AdminLayout title="Kelola Struktur Pengurus">
      <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        
        {/* Header Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>Daftar Pengurus Koperasi UTM</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>Kelola posisi, level struktur, dan foto para pengurus koperasi</p>
          </div>
          <button onClick={handleOpenTambahModal} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fas fa-plus"></i> Tambah Pengurus
          </button>
        </div>

        {/* Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--primary-light)', padding: '12px 24px', borderRadius: '12px', marginBottom: '20px', animation: 'fadeIn 0.3s' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>
              {selectedIds.length} pengurus terpilih
            </span>
            <button 
              onClick={handleBulkDelete}
              disabled={isBulkProcessing}
              className="btn-outline" 
              style={{ padding: '6px 12px', fontSize: '13px', borderColor: '#dc3545', color: '#dc3545', backgroundColor: '#fff' }}
            >
              <i className="fas fa-trash"></i> Hapus Terpilih
            </button>
          </div>
        )}

        {/* Table Wrap */}
        <div className="admin-table-wrap" style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '16px' }}>
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>
                  <input 
                    type="checkbox" 
                    onChange={toggleSelectAll} 
                    checked={pengurusList.length > 0 && selectedIds.length === pengurusList.length} 
                  />
                </th>
                <th style={{ width: '50px' }}>No</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Tingkat/Level</th>
                <th style={{ width: '80px' }}>Urutan</th>
                <th style={{ width: '120px' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? renderSkeletonRows() : pengurusList.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    Belum ada data pengurus. Klik Tambah Pengurus untuk memulai.
                  </td>
                </tr>
              ) : (
                pengurusList.map((p, index) => (
                  <tr key={p.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(p.id)} 
                        onChange={() => toggleSelect(p.id)} 
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={p.foto ? getApiUrl(p.foto) : '/img/layanan/avatar.png'} 
                          alt={p.nama} 
                          style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }} 
                          onError={(e) => { e.target.src = '/img/layanan/avatar.png' }}
                        />
                        <span style={{ fontWeight: 600, color: 'var(--text)' }}>{p.nama}</span>
                      </div>
                    </td>
                    <td>{p.jabatan}</td>
                    <td>
                      <span style={{ 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 600,
                        backgroundColor: p.level === 1 ? 'rgba(15, 81, 50, 0.1)' : p.level === 2 ? 'rgba(0, 123, 255, 0.1)' : 'rgba(108, 117, 125, 0.1)',
                        color: p.level === 1 ? 'var(--primary)' : p.level === 2 ? '#0056b3' : '#495057'
                      }}>
                        {getLevelLabel(p.level)}
                      </span>
                    </td>
                    <td>{p.urutan}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button 
                          onClick={() => handleOpenEditModal(p)}
                          className="btn-outline btn-sm" 
                          style={{ padding: '6px 10px' }}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id)}
                          className="btn-outline btn-sm" 
                          style={{ padding: '6px 10px', color: '#dc3545', borderColor: 'rgba(220,53,69,0.2)' }}
                          title="Hapus"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      {isModalOpen && (
        <div className="modal active">
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <button className="modal-close" onClick={handleCloseModal}><i className="fas fa-times"></i></button>
            <div style={{ padding: '32px' }}>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '22px', color: 'var(--text)', marginBottom: '24px' }}>
                {modalTitle}
              </h3>
              <form onSubmit={handleSimpan}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Nama Lengkap</label>
                  <input 
                    type="text" 
                    placeholder="Nama lengkap pengurus" 
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required 
                    style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Jabatan</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Ketua, Bendahara, Sie Usaha" 
                    value={jabatan}
                    onChange={(e) => setJabatan(e.target.value)}
                    required 
                    style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Tingkat (Struktur Tree)</label>
                    <select 
                      value={level}
                      onChange={(e) => setLevel(parseInt(e.target.value))}
                      style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                    >
                      <option value={1}>Tingkat 1 (Ketua)</option>
                      <option value={2}>Tingkat 2 (Pengurus Inti/BPH)</option>
                      <option value={3}>Tingkat 3 (Sie/Divisi)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Urutan Tampilan</label>
                    <input 
                      type="number" 
                      min="0"
                      value={urutan}
                      onChange={(e) => setUrutan(parseInt(e.target.value) || 0)}
                      required 
                      style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Foto Pengurus</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {fotoPreview ? (
                        <img src={fotoPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <i className="fas fa-user" style={{ fontSize: '24px', color: 'var(--text-muted)' }}></i>
                      )}
                    </div>
                    <div>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ fontSize: '13px' }}
                      />
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '4px 0 0' }}>Ukuran maks 5MB, format JPG/PNG</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  <button type="button" onClick={handleCloseModal} className="btn-outline" style={{ padding: '10px 20px' }}>Batal</button>
                  <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManagePengurus;
