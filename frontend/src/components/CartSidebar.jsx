import React from 'react';
import { useCart } from '../context/CartContext';
import { getApiUrl } from '../utils/api';

const CartSidebar = () => {
  const {
    cart,
    isCartOpen,
    notification,
    closeCart,
    updateQty,
    removeFromCart,
    cartTotal,
    checkoutWA,
  } = useCart();

  return (
    <>
      <div 
        id="cart-overlay" 
        className={`cart-overlay ${isCartOpen ? 'active' : ''}`}
        onClick={closeCart}
      ></div>
      <div 
        id="cart-sidebar" 
        className={`cart-sidebar ${isCartOpen ? 'active' : ''}`}
      >
        <div className="cart-header">
          <h3>Keranjang <span id="cart-count">({cart.reduce((sum, item) => sum + item.qty, 0)})</span></h3>
          <button className="cart-close" onClick={closeCart}><i className="fas fa-times"></i></button>
          <div id="cart-notification" className={`cart-notification ${notification ? 'show' : ''}`}>
            {notification && <><i className="fas fa-check-circle"></i> {notification}</>}
          </div>
        </div>
        <div id="cart-items" className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="fas fa-shopping-cart"></i>
              <h4>Keranjang Kosong</h4>
              <p>Belum ada produk yang ditambahkan.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={getApiUrl(item.gambar) || '/img/placeholder.jpg'} 
                  alt={item.nama} 
                  className="cart-item-img" 
                  loading="lazy" 
                />
                <div className="cart-item-info">
                  <h4>{item.nama}</h4>
                  <div className="cart-item-price">Rp {item.harga.toLocaleString()}</div>
                  <div className="cart-item-qty">
                    <button onClick={() => updateQty(item.id, -1)}><i className="fas fa-minus"></i></button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)}><i className="fas fa-plus"></i></button>
                  </div>
                </div>
                <button 
                  className="cart-item-remove" 
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total Pembayaran</span>
            <strong id="cart-total">Rp {cartTotal.toLocaleString()}</strong>
          </div>
          <button className="btn-primary" onClick={checkoutWA}>
            <i className="fab fa-whatsapp"></i> Checkout via WhatsApp
          </button>
          <button className="btn-gold" onClick={closeCart}>
            <i className="fas fa-shopping-bag"></i> Lanjut Belanja
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
