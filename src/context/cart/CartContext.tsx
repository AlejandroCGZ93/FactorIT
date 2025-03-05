import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Cart, CartItem, CartType, Product } from '../../types';
import { promotionalDates } from '../../data/promotionalDates';
import { useAuth } from '../auth/useAuth';

interface CartContextType {
  cart: Cart | null;
  createCart: (type: CartType) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  completeCart: () => void;
  calculateTotal: () => number;
  simulateDate: Date;
  setSimulateDate: (date: Date) => void;
  currentUser: number;
  setCurrentUser: (userId: number) => void;
  isDatePromotional: boolean;
  isUserVip: boolean;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [simulateDate, setSimulateDate] = useState<Date>(new Date());
  const [currentUser, setCurrentUser] = useState<number>(1);
  const { currentUser: authUser } = useAuth();

  // Se utiliza useMemo para recalcular solo cuando simulateDate cambie.
  const isDatePromotional = useMemo(() => {
    return promotionalDates.some(
      promoDate =>
        promoDate.date.getDate() === simulateDate.getDate() &&
        promoDate.date.getMonth() === simulateDate.getMonth()
    );
  }, [simulateDate]);

  const isUserVip = authUser?.isVip || false;

  // Limpia el carrito después de 24 horas si no se completa
  useEffect(() => {
    if (!cart || cart.completed) return;
    const cartAge = new Date().getTime() - cart.createdAt.getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    if (cartAge > twentyFourHours) {
      setCart(null);
    }
  }, [cart]);

  // Función auxiliar para actualizar el carrito
  const updateCartState = useCallback((updatedCart: Cart) => {
    setCart({ ...updatedCart, updatedAt: new Date() });
  }, []);

  const createCart = useCallback((type: CartType) => {
    let finalCartType = type;
    if (type === CartType.PROMOTIONAL && !isDatePromotional) {
      finalCartType = CartType.NORMAL;
    }
    if (type === CartType.VIP && !isUserVip) {
      finalCartType = CartType.NORMAL;
    }
    const newCart: Cart = {
      id: uuidv4(),
      items: [],
      type: finalCartType,
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false
    };
    setCart(newCart);
  }, [isDatePromotional, isUserVip]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    if (!cart) return;
    setCart(prevCart => {
      if (!prevCart) return null;
      const existingItemIndex = prevCart.items.findIndex(
        item => item.product.id === product.id
      );
      let updatedItems: CartItem[];
      if (existingItemIndex >= 0) {
        const existingItem = prevCart.items[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          alert('No hay suficiente stock disponible');
          return prevCart;
        }
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = { ...existingItem, quantity: newQuantity };
      } else {
        if (quantity > product.stock) {
          alert('No hay suficiente stock disponible');
          return prevCart;
        }
        updatedItems = [...prevCart.items, { product, quantity }];
      }
      return { ...prevCart, items: updatedItems, updatedAt: new Date() };
    });
  }, [cart]);

  const removeFromCart = useCallback((productId: string) => {
    if (!cart) return;
    setCart(prevCart => {
      if (!prevCart) return null;
      const updatedItems = prevCart.items.filter(item => item.product.id !== productId);
      return { ...prevCart, items: updatedItems, updatedAt: new Date() };
    });
  }, [cart]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (!cart) return;
    setCart(prevCart => {
      if (!prevCart) return null;
      const updatedItems = prevCart.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      return { ...prevCart, items: updatedItems, updatedAt: new Date() };
    });
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart(null);
  }, []);

  const completeCart = useCallback(() => {
    if (!cart) return;
    updateCartState({ ...cart, completed: true });
  }, [cart, updateCartState]);

  const calculateTotal = useCallback((): number => {
    if (!cart || cart.items.length === 0) return 0;

    const subtotal = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const totalProducts = cart.items.reduce(
      (count, item) => count + item.quantity,
      0
    );

    let finalTotal = subtotal;

    if (totalProducts === 4) {
      finalTotal = subtotal * 0.75;
    } else if (totalProducts > 10) {
      switch (cart.type) {
        case CartType.NORMAL:
          finalTotal = subtotal - 100;
          break;
        case CartType.PROMOTIONAL:
          finalTotal = subtotal - 300;
          break;
        case CartType.VIP:
          finalTotal = subtotal - 500;
          break;
      }
    }
    return Math.max(0, finalTotal);
  }, [cart]);

  const value = {
    cart,
    createCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    completeCart,
    calculateTotal,
    simulateDate,
    setSimulateDate,
    currentUser,
    setCurrentUser,
    isDatePromotional,
    isUserVip
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
