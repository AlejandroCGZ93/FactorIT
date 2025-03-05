import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/cart/useCart';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import '../styles/CartPage.css';

const CartPage: React.FC = () => {
  const { cart } = useCart();

  if (!cart) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Carrito de Compras</h1>
          <div className="empty-cart-container">
            <div className="empty-cart-icon">
              <ShoppingCart size={64} />
            </div>
            <h2>No tienes un carrito activo</h2>
            <p>Para comenzar a comprar, primero debes crear un carrito.</p>
            <Link to="/cart-selection" className="create-cart-btn">
              Crear Carrito
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="page-title">Carrito de Compras</h1>
          <div className="empty-cart-container">
            <div className="empty-cart-icon">
              <ShoppingCart size={64} />
            </div>
            <h2>Tu carrito está vacío</h2>
            <p>Agrega algunos productos para comenzar.</p>
            <Link to="/" className="continue-shopping-btn">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Carrito de Compras</h1>
        <div className="cart-container">
          <div className="cart-items">
            {cart.items.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
            <div className="continue-shopping">
              <Link to="/" className="continue-shopping-link">
                Continuar Comprando
              </Link>
            </div>
          </div>
          <div className="cart-summary-container">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
