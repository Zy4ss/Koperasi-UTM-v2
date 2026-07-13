import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { apiFetch, getApiUrl } from '../utils/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();

  // Form details
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  // Request State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [checkoutMethod, setCheckoutMethod] = useState('direct');

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Fetch checkout method to determine if we need email
    apiFetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.checkout_method) {
          setCheckoutMethod(data.checkout_method);
        }
      })
      .catch(() => console.error('Failed to fetch settings'));

    // Redirect to home if cart empty (unless success is true)
    if (cart.length === 0 && !success) {
      navigate('/');
    }
  }, [cart, navigate, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const res = await apiFetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama,
          whatsapp,
          email,
          items: cart.map(item => ({
            nama: item.nama,
            harga: item.harga,
            qty: item.qty
          }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        clearCart();
        
        if (data.checkout_method === 'direct' && data.redirect_url) {
          window.open(data.redirect_url, '_blank');
          navigate('/');
        } else {
          setSuccess(true);
        }
      } else {
        const errData = await res.json();
        alert(errData.error || 'Gagal memproses checkout. Silakan coba lagi.');
      }
    } catch (err) {
      alert('Koneksi gagal. Silakan periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="checkout-success-page" style={{ padding: '160px 0 100px', background: 'var(--bg)', textAlign: 'center', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(15,81,50,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifycontent: 'center', margin: '0 auto 24px', fontSize: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <i className="fas fa-check-double"></i>
          </div>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '28px', fontWeight: 800, color: 'var(--text)', marginBottom: '16px' }}>Pesanan Berhasil Diproses!</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '32px' }}>
            Terima kasih telah berbelanja. Detail pesanan dan invoice resmi telah dikirim ke WhatsApp (via Fonnte) dan email <strong>{email}</strong> Anda secara otomatis. Admin kami akan segera memproses barang pesanan Anda.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '14px 32px', fontSize: '15px' }}>
            Kembali Ke Beranda
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page" style={{ padding: '160px 0 100px', background: 'var(--bg)', minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '32px', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>Konfirmasi Pemesanan</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '40px' }}>Lengkapi data diri Anda untuk menyelesaikan pemesanan barang koperasi.</p>

        <div className="checkout-grid-mobile">
          
          {/* BUYER DATA FORM */}
          <div style={{ background: 'var(--card-bg)', padding: '40px', borderRadius: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <i className="fas fa-user-edit" style={{ marginRight: '8px', color: 'var(--primary)' }}></i> Data Diri Pembeli
            </h3>
            
            <form id="checkout-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama lengkap Anda"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Nomor WhatsApp (Aktif)</label>
                <input 
                  type="text" 
                  placeholder="Contoh: 081234567890"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                />
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Pastikan nomor WhatsApp aktif untuk menerima update status pesanan.</p>
              </div>

              {checkoutMethod === 'advanced' && (
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Alamat Email</label>
                  <input 
                    type="email" 
                    placeholder="Contoh: nama@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={checkoutMethod === 'advanced'}
                    style={{ width: '100%', padding: '12px 16px', border: '2px solid var(--border)', borderRadius: '8px', fontSize: '14px', outline: 'none', backgroundColor: 'var(--surface)', color: 'var(--text)', boxSizing: 'border-box' }}
                  />
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Invoice resmi akan dikirimkan secara otomatis ke email ini.</p>
                </div>
              )}
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div style={{ background: 'var(--card-bg)', padding: '40px', borderRadius: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', height: 'fit-content' }}>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <i className="fas fa-shopping-cart" style={{ marginRight: '8px', color: 'var(--primary)' }}></i> Ringkasan Belanja
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', flex: 1, maxHeight: '350px', overflowY: 'auto', paddingRight: '8px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <img 
                    src={getApiUrl(item.gambar) || '/img/placeholder.jpg'} 
                    alt={item.nama}
                    style={{ width: '56px', height: '56px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--border)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', margin: '0 0 4px 0' }}>{item.nama}</h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.qty} x Rp {item.harga.toLocaleString()}</span>
                  </div>
                  <strong style={{ fontSize: '14px', color: 'var(--text)' }}>Rp {(item.harga * item.qty).toLocaleString()}</strong>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Subtotal Produk</span>
                <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>Rp {cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Biaya Layanan</span>
                <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600 }}>GRATIS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>Total</span>
                <strong style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>Rp {cartTotal.toLocaleString()}</strong>
              </div>
              
              <button 
                type="submit" 
                form="checkout-form"
                className="btn-primary" 
                disabled={loading}
                style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 600, justifyContent: 'center', display: 'flex', alignItems: 'center' }}
              >
                {loading ? (
                  <><i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i> Memproses...</>
                ) : (
                  <><i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i> Konfirmasi & Bayar</>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Checkout;
