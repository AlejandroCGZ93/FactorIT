export interface Product {
  id: string;          
  name: string;        
  price: number;
  description: string;
  image: string;       
  stock: number;      
}


export interface CartItem {
  product: Product;
  quantity: number;
}

export enum CartType {
  NORMAL = 'NORMAL',
  PROMOTIONAL = 'PROMOTIONAL',
  VIP = 'VIP'
}

export interface Cart {
  id: string;
  items: CartItem[];
  type: CartType;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isVip: boolean;
  lastPurchaseMonth?: number;
  totalPurchasesThisMonth: number;
}

export interface PromotionalDate {
  date: Date;
  name: string;
}