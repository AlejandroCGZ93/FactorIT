
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/cart/useCart';
import { useAuth } from '../context/auth/useAuth';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { cart, calculateTotal } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();


  const totalItems = cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/user-profile');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>E-Commerce</h1>
          </Link>
          
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Productos</Link>
              </li>
              <li>
                <Link to="/cart-selection">Crear Carrito</Link>
              </li>
              <li>
                <Link to="/date-simulator">Simulador de Fecha</Link>
              </li>
            </ul>
          </nav>
          
          <div className="header-actions">
            {currentUser && (
              <div className="user-profile-icon" onClick={handleProfileClick}>
                <User size={24} />
              </div>
            )}
            
            <Link to="/cart" className="header-icon cart-icon">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </Link>
            
            {cart && (
              <div className="cart-total">
                ${calculateTotal().toFixed(2)}
              </div>
            )}
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;