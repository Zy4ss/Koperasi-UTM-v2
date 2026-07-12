import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to admin dashboard
    const token = localStorage.getItem('kopma_admin_token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await apiFetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('kopma_admin_token', data.api_token);
        localStorage.setItem('kopma_admin_user', data.username);
        navigate('/admin');
      } else {
        setError(data.message || 'Username atau password salah');
      }
    } catch (err) {
      setError('Koneksi ke backend gagal.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-body" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg)', padding: '20px' }}>
      <div className="admin-login-card" style={{ backgroundColor: 'var(--card-bg)', borderRadius: 'var(--radius-xl)', padding: '40px', width: '100%', maxWidth: '400px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
        <div className="login-logo" style={{ textAlign: 'center', marginBottom: '28px' }}>
          <img src="/img/logo-koperasi.png" alt="Koperasi UTM" style={{ height: '50px', marginBottom: '8px' }} />
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '22px', color: 'var(--text)' }}>Koperasi UTM</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Panel Administrasi</p>
        </div>
        
        {error && (
          <div className="login-error" style={{ backgroundColor: '#fef2f2', color: '#dc2626', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
            <i className="fas fa-exclamation-circle" style={{ marginRight: '6px' }}></i> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label htmlFor="username" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Masukkan username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
              style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '4px' }}>Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Masukkan password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              style={{ width: '100%', padding: '12px 14px', border: '2px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Memproses...' : <><i className="fas fa-sign-in-alt" style={{ marginRight: '6px' }}></i> Masuk</>}
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/" style={{ fontSize: '13px', color: 'var(--text-muted)' }}><i className="fas fa-arrow-left"></i> Kembali ke Beranda</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
