import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProduk from './pages/admin/ManageProduk';
import ManageKategori from './pages/admin/ManageKategori';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <CartSidebar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/katalog" element={<Catalog />} />
          <Route path="/kontak" element={<Contact />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/produk" element={<ManageProduk />} />
          <Route path="/admin/kategori" element={<ManageKategori />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;

