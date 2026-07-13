import React, { useState, useEffect } from 'react';
import { apiFetch, getApiUrl } from '../utils/api';

const Profile = () => {
  const [pengurusList, setPengurusList] = useState([]);
  const [settings, setSettings] = useState({
    about_tag: 'Tentang Kami',
    about_title: 'Koperasi Universitas Trunojoyo Madura',
    about_desc: 'Koperasi UTM berdiri sebagai wadah pengembangan ekonomi mahasiswa di lingkungan Universitas Trunojoyo Madura. Berawal dari keprihatinan terhadap mahalnya harga kebutuhan pokok di sekitar kampus, sekelompok mahasiswa berinisiatif mendirikan koperasi yang menyediakan kebutuhan sehari-hari dengan harga terjangkau.\n\nSejak tahun 1997, Koperasi UTM telah berkembang menjadi salah satu unit kegiatan mahasiswa yang aktif dan memberikan manfaat nyata bagi seluruh civitas akademika UTM, termasuk mahasiswa, dosen, dan tenaga kependidikan.\n\nKami berkomitmen untuk terus berinovasi dalam memberikan pelayanan terbaik, mendukung ekonomi kreatif mahasiswa, dan memperkuat kebersamaan di lingkungan kampus.',
    visi: 'Koperasi UTM menjadi Koperasi Nasional.',
    misi: 'Memberi Layanan, Menyediakan Produk, Jasa serta Kebutuhan Anggota.\nMembantu Menciptakan Peluang Usaha Bagi Anggota.\nMenjadi Organisasi yang Transparan dengan Good Corporate Governance.',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        const [pengurusRes, settingsRes] = await Promise.all([
          apiFetch('/api/pengurus'),
          apiFetch('/api/settings'),
        ]);

        if (pengurusRes.ok) {
          const pengurusData = await pengurusRes.json();
          setPengurusList(pengurusData || []);
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          setSettings(prev => ({ ...prev, ...settingsData }));
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    if (window.AOS) {
      setTimeout(() => {
        window.AOS.refresh();
      }, 500);
    }
  }, []);

  const level1 = pengurusList.filter(p => p.level === 1);
  const level2 = pengurusList.filter(p => p.level === 2);
  const level3 = pengurusList.filter(p => p.level === 3);

  // Fallbacks if database is empty
  const hasDbPengurus = pengurusList.length > 0;

  const misiItems = settings.misi.split('\n').filter(m => m.trim() !== '');

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <div className="container">
          <h1>Profil Koperasi UTM</h1>
          <p>Mengenal lebih dekat Koperasi Universitas Trunojoyo Madura</p>
          <div className="breadcrumb">
            <span>Beranda</span>
            <i className="fas fa-chevron-right"></i>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Profil</span>
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section className="profile-about">
        <div className="container">
          <div className="profile-content">
            <span className="section-tag">{settings.about_tag}</span>
            <h2>{settings.about_title}</h2>
            <div className="profile-img-wrap">
              <img src="/img/layanan/cakra.jpeg" alt="Kegiatan Koperasi UTM" loading="lazy" />
            </div>
            <div className="profile-text" style={{ whiteSpace: 'pre-line' }}>
              {settings.about_desc}
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
              <blockquote>{settings.visi}</blockquote>
            </div>
            <div className="vm-misi-block">
              <div className="vm-visi-marker vm-misi-marker"><i className="fas fa-flag-checkered"></i> Misi</div>
              <div className="vm-misi-list">
                {misiItems.map((m, index) => (
                  <div key={index} className="vm-misi-item">
                    <div className="vm-misi-num">{index + 1}</div>
                    <div className="vm-misi-text">{m}</div>
                  </div>
                ))}
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
            <p>Susunan kepengurusan Koperasi Universitas Trunojoyo Madura.</p>
          </div>
          <div className="struktur-tree">
            {hasDbPengurus ? (
              <>
                {/* Level 1 (Ketua) */}
                {level1.length > 0 && (
                  <div className="tree-level tree-level-1">
                    {level1.map(p => (
                      <div key={p.id} className="tree-node">
                        <div className="struktur-card ketua">
                          <div className="struktur-avatar">
                            <img src={p.foto ? getApiUrl(p.foto) : '/img/layanan/avatar.png'} alt={p.nama} onError={(e) => { e.target.src = '/img/layanan/avatar.png' }} />
                          </div>
                          <h4>{p.jabatan}</h4>
                          <p className="struktur-nama">{p.nama}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Level 2 (BPH) */}
                {level2.length > 0 && (
                  <>
                    <div className="tree-connector"></div>
                    <div className="tree-level tree-level-2">
                      {level2.map(p => (
                        <div key={p.id} className="tree-node">
                          <div className="struktur-card bendahara">
                            <div className="struktur-avatar">
                              <img src={p.foto ? getApiUrl(p.foto) : '/img/layanan/avatar.png'} alt={p.nama} onError={(e) => { e.target.src = '/img/layanan/avatar.png' }} />
                            </div>
                            <h4>{p.jabatan}</h4>
                            <p className="struktur-nama">{p.nama}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Level 3 (Divisi/Sie) */}
                {level3.length > 0 && (
                  <>
                    <div className="tree-connector tree-connector-split"></div>
                    <div className="tree-level tree-level-3">
                      {level3.map(p => (
                        <div key={p.id} className="tree-node">
                          <div className="struktur-card sie1">
                            <div className="struktur-avatar">
                              <img src={p.foto ? getApiUrl(p.foto) : '/img/layanan/avatar.png'} alt={p.nama} onError={(e) => { e.target.src = '/img/layanan/avatar.png' }} />
                            </div>
                            <h4>{p.jabatan}</h4>
                            <p className="struktur-nama">{p.nama}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              // Hardcoded Fallback Structure
              <>
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
              </>
            )}
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
