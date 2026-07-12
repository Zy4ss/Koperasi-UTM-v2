import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('kopma_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    localStorage.setItem('kopma_cart', JSON.stringify(cart));
  }, [cart]);

  const openCart = () => {
    setIsCartOpen(true);
    document.body.classList.add('no-scroll');
  };

  const closeCart = () => {
    setIsCartOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, {
        id: product.id,
        nama: product.nama,
        harga: product.harga,
        gambar: product.gambar,
        qty: qty
      }];
    });

    // Show toast notification
    showToastNotification(`${product.nama} ditambahkan ke keranjang`);
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === id);
      if (!item) return prevCart;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        return prevCart.filter((i) => i.id !== id);
      }
      return prevCart.map((i) =>
        i.id === id ? { ...i, qty: newQty } : i
      );
    });
  };

  const showToastNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification('');
    }, 2500);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  
  const cartTotal = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  const checkoutWA = () => {
    if (cart.length === 0) {
      alert('Keranjang masih kosong');
      return;
    }
    const noAdmin = '6285727877235';
    let pesan = `Halo Admin KOPMA UTM,\n\nSaya ingin memesan produk berikut:\n\n`;
    cart.forEach((item, i) => {
      pesan += `${i + 1}. ${item.nama}\n   Jumlah: ${item.qty}\n`;
    });
    pesan += `\nTotal Pembayaran: Rp ${cartTotal.toLocaleString()}\n\n`;
    pesan += `Nama Pemesan:\nFakultas:\nProgram Studi:\n\nTerima kasih.`;
    const url = `https://wa.me/${noAdmin}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        notification,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQty,
        cartCount,
        cartTotal,
        checkoutWA,
        clearCart,
        showToastNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
