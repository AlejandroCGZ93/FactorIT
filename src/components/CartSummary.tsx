import React from 'react';
import { useCart } from '../context/cart/useCart';
import { useAuth } from '../context/auth/useAuth';
import { CartType } from '../types';
import '../styles/CartSummary.css';


const CartSummary: React.FC = () => {
  const { cart, calculateTotal, completeCart, clearCart } = useCart();
  const { updateTotalPurchases } = useAuth();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-summary empty-cart">
        <p>No hay productos en el carrito</p>
      </div>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  );

  const discount = subtotal - calculateTotal();
  const total = calculateTotal();

  const totalItems = cart.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const getCartTypeLabel = () => {
    switch (cart.type) {
      case CartType.NORMAL:
        return 'Normal';
      case CartType.PROMOTIONAL:
        return 'Promocional';
      case CartType.VIP:
        return 'VIP';
      default:
        return 'Desconocido';
    }
  };

  const handleCompleteCart = () => {
    completeCart();
    updateTotalPurchases(total);
    alert('¡Compra completada con éxito!');
    clearCart();
  };

  return (
    <div className="cart-summary">
      <h2 className="summary-title">Resumen del Carrito</h2>
      <div className="cart-type">
        <span className="cart-type-label">Tipo de Carrito:</span>
        <span className={`cart-type-value ${cart.type.toLowerCase()}`}>
          {getCartTypeLabel()}
        </span>
      </div>
      <div className="summary-row">
        <span>Productos:</span>
        <span>{totalItems}</span>
      </div>
      <div className="summary-row">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="summary-row discount">
          <span>Descuento:</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
      )}
      <div className="summary-row total">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button
        className="complete-btn"
        onClick={handleCompleteCart}
        disabled={cart.items.length === 0}
      >
        Completar Compra
      </button>
      <button
        className="clear-btn"
        onClick={clearCart}
        disabled={cart.items.length === 0}
      >
        Vaciar Carrito
      </button>
    </div>
  );
};

export default CartSummary;
