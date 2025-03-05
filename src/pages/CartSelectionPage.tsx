import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Gift, Crown } from 'lucide-react';
import { useCart } from '../context/cart/useCart';
import { CartType } from '../types';
import '../styles/CartSelectionPage.css';

const CartSelectionPage: React.FC = () => {
  const { createCart, isDatePromotional, isUserVip } = useCart();
  const navigate = useNavigate();
  
  const handleCreateCart = (type: CartType) => {
    createCart(type);
    navigate('/');
  };
  
  return (
    <div className="cart-selection-page">
      <div className="container">
        <h1 className="page-title">Selecciona un Tipo de Carrito</h1>
        
        <div className="cart-types-container">
          <div className="cart-type-card">
            <div className="cart-type-icon normal">
              <ShoppingCart size={32} />
            </div>
            <h2>Carrito Normal</h2>
            <p>Carrito estándar sin promociones especiales.</p>
            <ul className="cart-type-features">
              <li>Descuento de $100 al comprar más de 10 productos</li>
              <li>25% de descuento al comprar exactamente 4 productos</li>
            </ul>
            <button 
              className="select-cart-btn"
              onClick={() => handleCreateCart(CartType.NORMAL)}
            >
              Seleccionar
            </button>
          </div>
          
          <div className={`cart-type-card ${!isDatePromotional ? 'disabled' : ''}`}>
            <div className="cart-type-icon promotional">
              <Gift size={32} />
            </div>
            <h2>Carrito Promocional</h2>
            <p>Disponible solo en fechas especiales.</p>
            <ul className="cart-type-features">
              <li>Descuento de $300 al comprar más de 10 productos</li>
              <li>25% de descuento al comprar exactamente 4 productos</li>
            </ul>
            {isDatePromotional ? (
              <div className="cart-type-status available">
                ¡Promoción disponible hoy!
              </div>
            ) : (
              <div className="cart-type-status unavailable">
                No hay promociones disponibles hoy
              </div>
            )}
            <button 
              className="select-cart-btn"
              onClick={() => handleCreateCart(CartType.PROMOTIONAL)}
              disabled={!isDatePromotional}
            >
              Seleccionar
            </button>
          </div>
          
          <div className={`cart-type-card ${!isUserVip ? 'disabled' : ''}`}>
            <div className="cart-type-icon vip">
              <Crown size={32} />
            </div>
            <h2>Carrito VIP</h2>
            <p>Exclusivo para clientes VIP.</p>
            <ul className="cart-type-features">
              <li>Producto más barato gratis al comprar más de 10 productos</li>
              <li>Descuento adicional de $500 al comprar más de 10 productos</li>
              <li>25% de descuento al comprar exactamente 4 productos</li>
            </ul>
            {isUserVip ? (
              <div className="cart-type-status available">
                ¡Eres cliente VIP!
              </div>
            ) : (
              <div className="cart-type-status unavailable">
                No eres cliente VIP
              </div>
            )}
            <button 
              className="select-cart-btn"
              onClick={() => handleCreateCart(CartType.VIP)}
              disabled={!isUserVip}
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSelectionPage;