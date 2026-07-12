import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { apiFetch } from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiFetch('/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {loading ? (
        <div style={{ color: 'var(--text-muted)' }}>Memuat dashboard...</div>
      ) : stats ? (
        <>
          <div className="admin-stats">
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><i className="fas fa-box"></i></div>
              <div className="admin-stat-info">
                <h4>Total Produk</h4>
                <strong>{stats.totalProduk}</strong>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><i className="fas fa-tags"></i></div>
              <div className="admin-stat-info">
                <h4>Total Kategori</h4>
                <strong>{stats.totalKategori}</strong>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><i className="fas fa-shopping-bag"></i></div>
              <div className="admin-stat-info">
                <h4>Produk Retail</h4>
                <strong>{stats.retailCount}</strong>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><i className="fas fa-handshake"></i></div>
              <div className="admin-stat-info">
                <h4>Produk Konsinyasi</h4>
                <strong>{stats.konsinyasiCount}</strong>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon"><i className="fas fa-archive"></i></div>
              <div className="admin-stat-info">
                <h4>Produk Diarsipkan</h4>
                <strong>{stats.arsipCount}</strong>
              </div>
            </div>
          </div>

          <div className="admin-table-wrap" style={{ marginTop: '30px' }}>
            <div className="admin-table-header">
              <h3><i className="fas fa-box" style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Produk Terbaru</h3>
              <Link to="/admin/produk" className="btn-primary btn-sm"><i className="fas fa-plus"></i> Kelola Produk</Link>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Tag</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {stats.produkTerbaru && stats.produkTerbaru.length > 0 ? (
                  stats.produkTerbaru.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.nama}</strong></td>
                      <td><span className="badge badge-primary">{p.kategori}</span></td>
                      <td>Rp {p.harga.toLocaleString()}</td>
                      <td>
                        {p.tag ? (
                          <span className={`tag-badge tag-${p.tag.toLowerCase().replace(/\s+/g, '-')}`}>
                            {p.tag}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>
                        )}
                      </td>
                      <td>
                        {p.arsip ? (
                          <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                            <i className="fas fa-archive"></i> Diarsipkan
                          </span>
                        ) : (
                          <span style={{ color: 'var(--primary)', fontSize: '13px' }}>
                            <i className="fas fa-check-circle"></i> Aktif
                          </span>
                        )}
                      </td>
                      <td>
                        <Link to={`/admin/produk?edit=${p.id}`} className="admin-btn-sm admin-btn-edit">
                          <i className="fas fa-edit"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Belum ada produk</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div style={{ color: 'var(--text-muted)' }}>Gagal memuat data dashboard.</div>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
