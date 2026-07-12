import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { apiFetch } from '../../utils/api';

const ManageSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    hero_title_accent: '',
    hero_title_sub: '',
    hero_tagline: '',
    hero_desc: '',
    about_tag: '',
    about_title: '',
    about_desc: '',
    about_year: '',
    about_badge_text: '',
    visi: '',
    misi: '',
  });

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await apiFetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      });
      if (res.ok) {
        alert('Setelan website berhasil disimpan');
      } else {
        alert('Gagal menyimpan setelan');
      }
    } catch (err) {
      alert('Koneksi gagal');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Setelan Umum Website">
        <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Memuat setelan...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Setelan Umum Website">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* HERO SECTION SETTINGS */}
        <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)', margin: '0 0 20px 0', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            <i className="fas fa-home" style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Setelan Hero (Halaman Utama)
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Judul Aksen (Bold Hijau)</label>
              <input 
                type="text" 
                name="hero_title_accent"
                value={settings.hero_title_accent}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Judul Sub (Teks Bawah)</label>
              <input 
                type="text" 
                name="hero_title_sub"
                value={settings.hero_title_sub}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Tagline Slogan</label>
            <input 
              type="text" 
              name="hero_tagline"
              value={settings.hero_tagline}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '0' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Deskripsi Singkat</label>
            <textarea 
              name="hero_desc"
              rows="3"
              value={settings.hero_desc}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical' }}
            ></textarea>
          </div>
        </div>

        {/* ABOUT SECTION SETTINGS */}
        <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)', margin: '0 0 20px 0', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            <i className="fas fa-info-circle" style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Setelan Tentang Kami
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Label Tag (Kecil di Atas)</label>
              <input 
                type="text" 
                name="about_tag"
                value={settings.about_tag}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Tahun Berdiri</label>
              <input 
                type="text" 
                name="about_year"
                value={settings.about_year}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Teks Lencana Badge</label>
              <input 
                type="text" 
                name="about_badge_text"
                value={settings.about_badge_text}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Judul Tentang</label>
            <input 
              type="text" 
              name="about_title"
              value={settings.about_title}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '0' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Konten Deskripsi Tentang</label>
            <textarea 
              name="about_desc"
              rows="5"
              value={settings.about_desc}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.6' }}
            ></textarea>
          </div>
        </div>

        {/* VISION MISSION SETTINGS */}
        <div style={{ background: 'var(--card-bg)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)', margin: '0 0 20px 0', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            <i className="fas fa-bullseye" style={{ color: 'var(--primary)', marginRight: '8px' }}></i> Setelan Visi & Misi
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Visi Koperasi</label>
            <input 
              type="text" 
              name="visi"
              value={settings.visi}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '0' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>Misi Koperasi (Pemisah Baris Baru)</label>
            <textarea 
              name="misi"
              rows="6"
              value={settings.misi}
              onChange={handleChange}
              required
              placeholder="Masukkan setiap misi di baris baru"
              style={{ width: '100%', padding: '11px 14px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.6' }}
            ></textarea>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>TIPS: Tekan ENTER untuk memisahkan butir-butir misi. Setiap baris baru otomatis dihitung menjadi satu nomor misi.</p>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '40px' }}>
          <button type="submit" className="btn-primary" disabled={saving} style={{ padding: '14px 40px', fontSize: '15px', fontWeight: 600 }}>
            {saving ? <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Menyimpan...</> : <><i className="fas fa-save" style={{ marginRight: '8px' }}></i> Simpan Semua Setelan</>}
          </button>
        </div>

      </form>
    </AdminLayout>
  );
};

export default ManageSettings;
