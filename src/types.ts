// Product interface for grocery items
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  stock: number;
  rating?: number;
  reviews?: number;
  discount?: number;
}

// CartItem interface for items in the shopping cart
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  total: number;
}

// User interface for authenticated users
export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  pincode?: string;
  profileImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Order status enum
export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PROCESSING: "PROCESSING",
  SHIPPED: "SHIPPED",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
  FAILED: "FAILED",
} as const;
