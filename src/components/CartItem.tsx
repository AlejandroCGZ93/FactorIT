import React from 'react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/cart/useCart';
import { Trash2 } from 'lucide-react';
import '../styles/CartItem.css';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  const handleQuantityChange = (quantity: number) => {
    if (quantity <= item.product.stock) {
      updateQuantity(item.product.id, quantity);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
        <div className="cart-item-details">
          <h3 className="cart-item-name">{item.product.name}</h3>
          <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="cart-item-actions">
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="cart-item-quantity">{item.quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
        >
          +
        </button>
        <button className="cart-item-remove" onClick={handleRemove}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;