import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "../types";

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isInCart: (productId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product: Product, quantity: number) =>
        set((state) => {
          const finalPrice = product.discount
            ? product.price * (1 - product.discount / 100)
            : product.price;

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
                      total: (item.quantity + quantity) * finalPrice,
                    }
                  : item
              ),
            };
          }

          const newCartItem: CartItem = {
            id: `${product.id}-${Date.now()}`,
            productId: product.id,
            name: product.name,
            price: finalPrice,
            quantity,
            image: product.image,
            category: product.category,
            total: finalPrice * quantity,
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
                    ? { ...item, quantity, total: quantity * item.price }
                    : item
                ),
        })),

      clearCart: () => set({ cartItems: [] }),

      getTotalPrice: () =>
        get().cartItems.reduce((total, item) => total + item.total, 0),

      getTotalItems: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),

      isInCart: (productId: string) =>
        get().cartItems.some((item) => item.productId === productId),
    }),
    { name: "cart-storage" }
  )
);
