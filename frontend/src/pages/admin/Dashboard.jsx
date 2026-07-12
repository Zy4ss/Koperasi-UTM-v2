import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { apiFetch, getApiUrl } from '../../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiFetch('/api/stats');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const renderSkeletonCards = () => (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="admin-stat-card">
          <div className="skeleton skeleton-img"></div>
          <div className="admin-stat-info" style={{ flex: 1 }}>
            <div className="skeleton skeleton-text short"></div>
            <div className="skeleton skeleton-text" style={{ height: '24px' }}></div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <AdminLayout title="Dashboard">
      <div className="admin-stats">
        {loadingStats ? renderSkeletonCards() : stats ? (
          <>
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
          </>
        ) : (
          <div style={{ color: 'var(--text-muted)' }}>Gagal memuat statistik.</div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
