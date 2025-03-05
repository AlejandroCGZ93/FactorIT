import React, { createContext, useState, useEffect } from 'react';
import { User } from '../../types';
import { users } from '../../data/users';

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateVipStatus: (simulateDate: Date) => void;
  updateTotalPurchases: (amount: number) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const updateVipStatus = (simulateDate: Date) => {
    if (currentUser) {
      const currentMonth = simulateDate.getMonth();
      if (currentUser.lastPurchaseMonth !== currentMonth) {
        if (currentUser.totalPurchasesThisMonth >= 10000) {
          currentUser.isVip = true;
        } else {
          currentUser.isVip = false;
        }
        currentUser.totalPurchasesThisMonth = 0;
        currentUser.lastPurchaseMonth = currentMonth;
        setCurrentUser({ ...currentUser });
      }
    }
  };

  const updateTotalPurchases = (amount: number) => {
    if (currentUser) {
      currentUser.totalPurchasesThisMonth += amount;
      setCurrentUser({ ...currentUser });
    }
  };

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    updateVipStatus,
    updateTotalPurchases,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

