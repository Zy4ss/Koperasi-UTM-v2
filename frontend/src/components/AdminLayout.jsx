import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, title }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const token = localStorage.getItem('kopma_admin_token');
  const adminUser = localStorage.getItem('kopma_admin_user') || 'Admin';
  const role = localStorage.getItem('kopma_admin_role') || 'petugas';

  const [openMenus, setOpenMenus] = useState({
    master: pathname.includes('/admin/produk') || pathname.includes('/admin/kategori'),
    website: pathname.includes('/admin/pengurus') || pathname.includes('/admin/settings'),
    security: pathname.includes('/admin/users'),
  });

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    } else if (role === 'petugas') {
      if (pathname.includes('/admin/settings') || pathname.includes('/admin/pengurus') || pathname.includes('/admin/users')) {
        navigate('/admin');
      }
    }
  }, [token, role, pathname, navigate]);

  useEffect(() => {
    setOpenMenus({
      master: pathname.includes('/admin/produk') || pathname.includes('/admin/kategori'),
      website: pathname.includes('/admin/pengurus') || pathname.includes('/admin/settings'),
      security: pathname.includes('/admin/users'),
    });
  }, [pathname]);

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('kopma_admin_token');
    localStorage.removeItem('kopma_admin_user');
    localStorage.removeItem('kopma_admin_role');
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

            {/* Collapse Master Data */}
            <div className={`admin-sidebar-collapse ${openMenus.master ? 'open' : ''}`}>
              <button type="button" className="collapse-trigger" onClick={() => toggleMenu('master')}>
                <i className="fas fa-database"></i> <span>Master Data</span>
                <i className={`fas fa-chevron-${openMenus.master ? 'down' : 'right'} chevron-icon`}></i>
              </button>
              <div className="collapse-menu">
                <NavLink to="/admin/produk" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="fas fa-box"></i> <span>Kelola Produk</span>
                </NavLink>
                <NavLink to="/admin/kategori" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="fas fa-tags"></i> <span>Kelola Kategori</span>
                </NavLink>
              </div>
            </div>

            {/* Collapse Website Settings (Hidden for petugas) */}
            {role !== 'petugas' && (
              <div className={`admin-sidebar-collapse ${openMenus.website ? 'open' : ''}`}>
              <button type="button" className="collapse-trigger" onClick={() => toggleMenu('website')}>
                <i className="fas fa-cogs"></i> <span>Setelan Website</span>
                <i className={`fas fa-chevron-${openMenus.website ? 'down' : 'right'} chevron-icon`}></i>
              </button>
              <div className="collapse-menu">
                <NavLink to="/admin/settings-hero" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="fas fa-home"></i> <span>Setelan Hero</span>
                </NavLink>
                <NavLink to="/admin/settings-about" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="fas fa-info-circle"></i> <span>Setelan Tentang</span>
                </NavLink>
                <NavLink to="/admin/settings-identity" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="fas fa-bullseye"></i> <span>Setelan Visi Misi</span>
                </NavLink>
                <NavLink to="/admin/settings-checkout" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="fas fa-shopping-bag"></i> <span>Setelan Checkout</span>
                </NavLink>
                <NavLink to="/admin/pengurus" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="fas fa-sitemap"></i> <span>Kelola Pengurus</span>
                </NavLink>
              </div>
            </div>
            )}

            {/* Collapse Security (Hidden for petugas) */}
            {role !== 'petugas' && (
              <div className={`admin-sidebar-collapse ${openMenus.security ? 'open' : ''}`}>
              <button type="button" className="collapse-trigger" onClick={() => toggleMenu('security')}>
                <i className="fas fa-shield-alt"></i> <span>Keamanan</span>
                <i className={`fas fa-chevron-${openMenus.security ? 'down' : 'right'} chevron-icon`}></i>
              </button>
              <div className="collapse-menu">
                <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
                  <i className="fas fa-users"></i> <span>Kelola Admin</span>
                </NavLink>
              </div>
            </div>
            )}
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
