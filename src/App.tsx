import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/cart/CartContext';
import { AuthProvider } from './context/auth/AuthContext';
import Header from './components/Header';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CartSelectionPage from './pages/CartSelectionPage';
import DateSimulatorPage from './pages/DateSimulatorPage';
import UserProfilePage from './pages/UserProfilePage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './context/auth/useAuth';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <div className="app">
      {currentUser && location.pathname !== '/login' && <Header />}
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/cart-selection" element={<ProtectedRoute><CartSelectionPage /></ProtectedRoute>} />
          <Route path="/date-simulator" element={<ProtectedRoute><DateSimulatorPage /></ProtectedRoute>} />
          <Route path="/user-profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to={currentUser ? "/product" : "/login"} />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;