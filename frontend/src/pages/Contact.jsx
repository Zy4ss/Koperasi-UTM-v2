import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    subjek: '',
    pesan: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending message
    alert(`Terima kasih ${formData.nama}, pesan Anda telah dikirim!`);
    setFormData({ nama: '', email: '', subjek: '', pesan: '' });
  };

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>Hubungi Kami</h1>
          <p>Kami siap melayani Anda</p>
          <div className="breadcrumb">
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Beranda</span>
            <i className="fas fa-chevron-right" style={{ fontSize: '10px', margin: '0 8px' }}></i>
            <span style={{ color: '#fff' }}>Kontak</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-page">
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-info-card">
              <h3>Informasi Kontak</h3>
              <p>Jangan ragu untuk menghubungi kami melalui kontak di bawah ini.</p>

              <div className="contact-detail-item">
                <div className="contact-detail-icon"><i className="fas fa-map-marker-alt"></i></div>
                <div className="contact-detail-text">
                  <h4>Alamat</h4>
                  <p>Sekretariat Koperasi UTM<br />Gedung Cakra, Kampus Universitas Trunojoyo Madura<br />Jl. Raya Telang PO BOX 2 Kamal, Bangkalan 69162</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon"><i className="fab fa-whatsapp"></i></div>
                <div className="contact-detail-text">
                  <h4>WhatsApp</h4>
                  <p>+62 811-3300-676</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon"><i className="fas fa-envelope"></i></div>
                <div className="contact-detail-text">
                  <h4>Email</h4>
                  <p>koperasitrunojoyo@gmail.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon"><i className="fab fa-instagram"></i></div>
                <div className="contact-detail-text">
                  <h4>Instagram</h4>
                  <p>@koperasiutm</p>
                </div>
              </div>
            </div>

            <div className="contact-form-card">
              <h3>Kirim Pesan</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="nama" 
                    placeholder="Nama Lengkap" 
                    value={formData.nama}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="subjek" 
                    placeholder="Subjek" 
                    value={formData.subjek}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea 
                    name="pesan" 
                    placeholder="Tulis pesan Anda..." 
                    value={formData.pesan}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary"><i className="fas fa-paper-plane"></i> Kirim Pesan</button>
              </form>
            </div>
          </div>

          <div className="map-wrap">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.615379733752!2d112.7271187!3d-7.1172706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd803dd04854303%3A0xa436f3258944c98f!2sGedung%20Cakra%20-%20UTM!5e0!3m2!1sid!2sid!4v1710000000000" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Gedung Cakra"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
