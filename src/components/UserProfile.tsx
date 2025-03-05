import React from 'react';
import { useAuth } from '../context/auth/useAuth';
import '../styles/UserProfile.css';

const UserProfile: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="user-profile">
      <h2>Perfil del Usuario</h2>
      <p>Nombre: {currentUser.name}</p>
      <p>Compras este mes: {currentUser.totalPurchasesThisMonth}</p>
    </div>
  );
};

export default UserProfile;
