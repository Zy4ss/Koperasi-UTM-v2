import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { apiFetch } from '../../utils/api';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Tambah Admin');
  const [editId, setEditId] = useState('');
  
  // Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/users');
      const data = await res.json();
      setUsers(data || []);
      setSelectedIds([]); // Reset selection on fetch
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(users.map(u => u.id));
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
    if (!window.confirm(`Yakin ingin menghapus ${selectedIds.length} admin terpilih?`)) return;
    
    setIsBulkProcessing(true);
    try {
      const res = await apiFetch('/api/users/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds })
      });
      if (res.ok) {
        setSelectedIds([]);
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus admin');
      }
    } catch (err) {
      alert('Koneksi gagal');
    } finally {
      setIsBulkProcessing(false);
    }
  };

  const handleOpenTambahModal = () => {
    setModalTitle('Tambah Admin');
    setEditId('');
    setUsername('');
    setPassword('');
    setIsModalOpen(true);
    document.body.classList.add('no-scroll');
  };

  const handleOpenEditModal = (user) => {
    setModalTitle('Edit Admin');
    setEditId(user.id);
    setUsername(user.username);
    setPassword(''); // Don't fill password
    setIsModalOpen(true);
    document.body.classList.add('no-scroll');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const handleSimpanUser = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editId) {
        response = await apiFetch(`/api/users/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
      } else {
        response = await apiFetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
      }

      const result = await response.json();
      if (response.status === 200 || response.status === 201) {
        if (window.Swal) {
          window.Swal.fire('Berhasil', result.message, 'success');
        } else {
          alert(result.message);
        }
        handleCloseModal();
        fetchUsers();
      } else {
        if (window.Swal) {
          window.Swal.fire('Gagal', result.error || 'Terjadi kesalahan', 'error');
        } else {
          alert(result.error || 'Terjadi kesalahan');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Koneksi gagal');
    }
  };

  const handleHapusUser = (id) => {
    if (window.Swal) {
      window.Swal.fire({
        title: 'Yakin ingin menghapus?',
        text: 'Admin ini tidak akan bisa login lagi.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6C757D',
        confirmButtonText: 'Ya, Hapus!',
        cancelButtonText: 'Batal'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await apiFetch(`/api/users/${id}`, { method: 'DELETE' });
          const data = await res.json();
          if (res.status === 200) {
            window.Swal.fire('Terhapus!', data.message, 'success');
            fetchUsers();
          } else {
            window.Swal.fire('Gagal!', data.error, 'error');
          }
        }
      });
    } else {
      if (window.confirm('Yakin ingin menghapus admin ini?')) {
        apiFetch(`/api/users/${id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
            if (data.error) alert(data.error);
            else fetchUsers();
          });
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
          <td><div className="skeleton skeleton-text short"></div></td>
          <td><div className="skeleton skeleton-btn"></div></td>
        </tr>
      ))}
    </>
  );

  return (
    <AdminLayout title="Kelola Admin">
      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <h3><i className="fas fa-users" style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Daftar Admin</h3>
          <button className="btn-primary btn-sm" onClick={handleOpenTambahModal}>
            <i className="fas fa-plus"></i> Tambah Admin
          </button>
        </div>

        {selectedIds.length > 0 && (
          <div style={{ background: 'rgba(15, 81, 50, 0.1)', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '14px' }}>{selectedIds.length} admin terpilih</span>
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
                    checked={users.length > 0 && selectedIds.length === users.length}
                  />
                </th>
                <th>ID</th>
                <th>Username</th>
                <th>Dibuat Pada</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? renderSkeletonRows() : users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Tidak ada data admin</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(u.id)}
                        onChange={() => toggleSelect(u.id)}
                      />
                    </td>
                    <td>#{u.id}</td>
                    <td><strong>{u.username}</strong></td>
                    <td>{new Date(u.created_at).toLocaleDateString('id-ID')}</td>
                    <td>
                      <button 
                        className="admin-btn-sm admin-btn-edit" 
                        onClick={() => handleOpenEditModal(u)}
                        title="Edit"
                        style={{ marginRight: '4px' }}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button 
                        className="admin-btn-sm admin-btn-delete" 
                        onClick={() => handleHapusUser(u.id)}
                        title="Hapus"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal active">
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <button className="modal-close" type="button" onClick={handleCloseModal}><i className="fas fa-times"></i></button>
            <div style={{ padding: '32px' }}>
              <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '20px', color: 'var(--text)', marginBottom: '20px' }}>
                {modalTitle}
              </h3>
              <form onSubmit={handleSimpanUser}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>Username</label>
                  <input 
                    type="text" 
                    placeholder="Masukkan username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                    style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>
                    Password {editId && <span style={{color: 'var(--text-muted)'}}>(Kosongkan jika tidak ingin diubah)</span>}
                  </label>
                  <input 
                    type="password" 
                    placeholder="Masukkan password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!editId}
                    style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                  />
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}><i className="fas fa-save"></i> Simpan</button>
                  <button type="button" className="btn-outline" onClick={handleCloseModal} style={{ justifyContent: 'center' }}>Batal</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ManageUser;
