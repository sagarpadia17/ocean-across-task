import { create } from "zustand";
import type { CartItem } from "../types";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  status: string;
  shippingAddress: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],

  addOrder: (order: Order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),

  updateOrderStatus: (orderId: string, status: string) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              updatedAt: new Date(),
            }
          : order
      ),
    })),

  getOrderById: (orderId: string) => {
    return get().orders.find((order) => order.id === orderId);
  },

  getUserOrders: (userId: string) => {
    return get().orders.filter((order) => order.userId === userId);
  },

  clearOrders: () =>
    set({
      orders: [],
    }),
}));
