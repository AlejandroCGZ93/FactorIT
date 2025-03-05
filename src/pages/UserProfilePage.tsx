import React from 'react';
import { useAuth } from '../context/auth/useAuth';
import '../styles/UserProfilePage.css';

const UserProfilePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="user-profile-page">
      <div className="container">
        <h1>Perfil del Usuario</h1>
        <div className="user-profile-card">
          <h2>{currentUser.name}</h2>
          <p>Email: {currentUser.email}</p>
          <p>Compras este mes: {currentUser.totalPurchasesThisMonth}</p>
          <p>Status: {currentUser.isVip ? 'VIP' : 'Normal'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
