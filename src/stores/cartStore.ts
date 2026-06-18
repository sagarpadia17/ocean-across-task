import { create } from "zustand";
import type { CartItem, Product } from "../types";

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.productId === product.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  total: (item.quantity + quantity) * item.price,
                }
              : item
          ),
        };
      }

      const newCartItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
        total: product.price * quantity,
      };

      return { cartItems: [...state.cartItems, newCartItem] };
    }),

  removeFromCart: (productId: string) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.productId !== productId),
    })),

  updateQuantity: (productId: string, quantity: number) =>
    set((state) => ({
      cartItems:
        quantity <= 0
          ? state.cartItems.filter((item) => item.productId !== productId)
          : state.cartItems.map((item) =>
              item.productId === productId
                ? {
                    ...item,
                    quantity,
                    total: quantity * item.price,
                  }
                : item
            ),
    })),

  clearCart: () => set({ cartItems: [] }),

  getTotalPrice: () => {
    return get().cartItems.reduce((total, item) => total + item.total, 0);
  },

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },
}));
