import React, { useEffect } from 'react';

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.AOS) {
      setTimeout(() => {
        window.AOS.refresh();
      }, 500);
    }
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>Profil Koperasi UTM</h1>
          <p>Mengenal lebih dekat Koperasi Universitas Trunojoyo Madura</p>
          <div className="breadcrumb">
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>Beranda</span>
            <i className="fas fa-chevron-right" style={{ fontSize: '10px', margin: '0 8px' }}></i>
            <span style={{ color: '#fff' }}>Profil</span>
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section className="profile-about">
        <div className="container">
          <div className="profile-content">
            <span className="section-tag">Tentang Kami</span>
            <h2>Koperasi Universitas Trunojoyo Madura</h2>
            <div className="profile-img-wrap">
              <img src="/img/layanan/cakra.jpeg" alt="Kegiatan Koperasi UTM" loading="lazy" />
            </div>
            <div className="profile-text">
              <p>Koperasi UTM berdiri sebagai wadah pengembangan ekonomi mahasiswa di lingkungan Universitas Trunojoyo Madura. Berawal dari keprihatinan terhadap mahalnya harga kebutuhan pokok di sekitar kampus, sekelompok mahasiswa berinisiatif mendirikan koperasi yang menyediakan kebutuhan sehari-hari dengan harga terjangkau.</p>
              <p>Sejak tahun 1997, Koperasi UTM telah berkembang menjadi salah satu unit kegiatan mahasiswa yang aktif dan memberikan manfaat nyata bagi seluruh civitas akademika UTM, termasuk mahasiswa, dosen, dan tenaga kependidikan.</p>
              <p>Kami berkomitmen untuk terus berinovasi dalam memberikan pelayanan terbaik, mendukung ekonomi kreatif mahasiswa, dan memperkuat kebersamaan di lingkungan kampus.</p>
            </div>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="visimisi">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Visi & Misi</span>
            <h2>Visi dan Misi Koperasi UTM</h2>
            <p>Pedoman dan arah pengembangan koperasi dalam melayani mahasiswa Universitas Trunojoyo Madura.</p>
          </div>
          <div className="vm-inner">
            <div className="vm-visi-block">
              <div className="vm-visi-marker"><i className="fas fa-bullseye"></i> Visi</div>
              <blockquote>Koperasi UTM menjadi Koperasi Nasional.</blockquote>
            </div>
            <div className="vm-misi-block">
              <div className="vm-visi-marker vm-misi-marker"><i className="fas fa-flag-checkered"></i> Misi</div>
              <div className="vm-misi-list">
                <div className="vm-misi-item">
                  <div className="vm-misi-num">1</div>
                  <div className="vm-misi-text">Memberi Layanan, Menyediakan Produk, Jasa serta Kebutuhan Anggota.</div>
                </div>
                <div className="vm-misi-item">
                  <div className="vm-misi-num">2</div>
                  <div className="vm-misi-text">Membantu Menciptakan Peluang Usaha Bagi Anggota.</div>
                </div>
                <div className="vm-misi-item">
                  <div className="vm-misi-num">3</div>
                  <div className="vm-misi-text">Menjadi Organisasi yang Transparan dengan Good Corporate Governance.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRUKTUR ORGANISASI Susunan Pengurus */}
      <section className="struktur">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Struktur Organisasi</span>
            <h2>Susunan Pengurus</h2>
            <p>Susunan kepengurusan Koperasi Universitas Trunojoyo Madura periode 2025/2026.</p>
          </div>
          <div className="struktur-tree">
            <div className="tree-level tree-level-1">
              <div className="tree-node">
                <div className="struktur-card ketua">
                  <div className="struktur-avatar"><img src="/img/pengurus/FAIDAL.jpeg" alt="Faidal" /></div>
                  <h4>Ketua</h4>
                  <p className="struktur-nama">Faidal</p>
                </div>
              </div>
            </div>
            <div className="tree-connector"></div>
            <div className="tree-level tree-level-2">
              <div className="tree-node">
                <div className="struktur-card bendahara">
                  <div className="struktur-avatar"><img src="/img/pengurus/TRIMULYANI BUDIANINGSIH.jpeg" alt="Trimulyani Budianingsih" /></div>
                  <h4>Bendahara</h4>
                  <p className="struktur-nama">Trimulyani Budianingsih</p>
                </div>
              </div>
              <div className="tree-node">
                <div className="struktur-card sekretaris">
                  <div className="struktur-avatar"><img src="/img/pengurus/R AYU FAUZIYAH FIERDAUS.jpeg" alt="R Ayu Fauziyah Fierdaus" /></div>
                  <h4>Sekretaris</h4>
                  <p className="struktur-nama">R Ayu Fauziyah Fierdaus</p>
                </div>
              </div>
              <div className="tree-node">
                <div className="struktur-card pengawas">
                  <div className="struktur-avatar"><img src="/img/pengurus/R SRI KENTJANAWATI.jpeg" alt="R Sri Kentjanawati" /></div>
                  <h4>Pengawas</h4>
                  <p className="struktur-nama">R Sri Kentjanawati</p>
                </div>
              </div>
            </div>
            <div className="tree-connector tree-connector-split"></div>
            <div className="tree-level tree-level-3">
              <div className="tree-node">
                <div className="struktur-card sie1">
                  <div className="struktur-avatar"><img src="/img/pengurus/MOH AJIB.jpeg" alt="Moh. Ajib" /></div>
                  <h4>Sie Perlengkapan</h4>
                  <p className="struktur-nama">Moh. Ajib</p>
                </div>
              </div>
              <div className="tree-node">
                <div className="struktur-card sie2">
                  <div className="struktur-avatar"><img src="/img/pengurus/ABD HALIM.jpeg" alt="Abd. Halim" /></div>
                  <h4>Sie Usaha</h4>
                  <p className="struktur-nama">Abd. Halim</p>
                </div>
              </div>
              <div className="tree-node">
                <div className="struktur-card sie2">
                  <div className="struktur-avatar"><img src="/img/pengurus/ANISAH.jpeg" alt="Anisah" /></div>
                  <h4>Sie Usaha</h4>
                  <p className="struktur-nama">Anisah</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALERI */}
      <section className="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Galeri</span>
            <h2>Galeri Kegiatan</h2>
            <p>Dokumentasi kegiatan dan aktivitas Koperasi UTM di lingkungan Universitas Trunojoyo Madura.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="/img/kegiatan/RAT Tahun Buku 2025.webp" alt="Kegiatan Rapat" loading="lazy" />
              <div className="gallery-overlay"><span>RAT Tahun Buku 2025</span></div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80" alt="Kegiatan Koperasi" loading="lazy" />
              <div className="gallery-overlay"><span>Kegiatan Pelayanan</span></div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80" alt="Tim Koperasi" loading="lazy" />
              <div className="gallery-overlay"><span>Tim Koperasi UTM</span></div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80" alt="Produk Koperasi" loading="lazy" />
              <div className="gallery-overlay"><span>Produk Koperasi</span></div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&q=80" alt="Suasana Kampus" loading="lazy" />
              <div className="gallery-overlay"><span>Suasana Kampus</span></div>
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&q=80" alt="Event Koperasi" loading="lazy" />
              <div className="gallery-overlay"><span>Event Koperasi</span></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
