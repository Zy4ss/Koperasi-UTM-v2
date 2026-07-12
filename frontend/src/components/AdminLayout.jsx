import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem('kopma_admin_token');
  const adminUser = localStorage.getItem('kopma_admin_user') || 'Admin';

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('kopma_admin_token');
    localStorage.removeItem('kopma_admin_user');
    navigate('/admin/login');
  };

  if (!token) return null;

  return (
    <div className="admin-body">
      <div className="admin-wrapper">
        <div 
          className={`admin-sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <aside className={`admin-sidebar ${isSidebarOpen ? 'active' : ''}`}>
          <div className="admin-sidebar-brand">
            <h3>
              <img src="/img/logo-koperasi.png" alt="Koperasi UTM" className="admin-logo-img" /> Koperasi <span>UTM</span>
            </h3>
            <span>Panel Administrasi</span>
          </div>
          <nav className="admin-sidebar-nav">
            <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-tachometer-alt"></i> <span>Dashboard</span>
            </NavLink>
            <NavLink to="/admin/produk" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-box"></i> <span>Kelola Produk</span>
            </NavLink>
            <NavLink to="/admin/kategori" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-tags"></i> <span>Kelola Kategori</span>
            </NavLink>
            <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
              <i className="fas fa-users"></i> <span>Kelola Admin</span>
            </NavLink>
          </nav>
          <div className="admin-sidebar-footer">
            <a href="#" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> <span>Logout</span></a>
          </div>
        </aside>
        
        <main className="admin-main">
          <header className="admin-header">
            <div className="admin-header-left">
              <button className="admin-sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <i className="fas fa-bars"></i>
              </button>
              <h2>{title}</h2>
            </div>
            <div className="admin-header-right">
              <span>Selamat datang, {adminUser}</span>
              <div className="admin-avatar"><i className="fas fa-user"></i></div>
            </div>
          </header>
          <div className="admin-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
