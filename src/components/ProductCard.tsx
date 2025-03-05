import React from 'react';
import { useCart } from '../context/cart/useCart';
import { Product } from '../types';
import '../styles/ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  const isInCart = cart?.items.some(item => item.product.id === product.id);
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
        
        <div className="product-stock">
          <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
          </span>
        </div>
        
        <button 
          className={`add-to-cart-btn ${isInCart ? 'in-cart' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0 || !cart}
        >
          {isInCart ? 'Agregar más' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;