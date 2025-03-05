import { User } from '../types';

export const users: User[] = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    password: '123456',
    isVip: false,
    lastPurchaseMonth: new Date().getMonth(),
    totalPurchasesThisMonth: 0
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@example.com',
    password: '123456',
    isVip: false,
    lastPurchaseMonth: new Date().getMonth(),
    totalPurchasesThisMonth: 0
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    password: '123456',
    isVip: false,
    lastPurchaseMonth: new Date().getMonth() - 1,
    totalPurchasesThisMonth: 0
  }
];