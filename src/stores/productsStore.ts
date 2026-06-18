import { create } from "zustand";
import type { Product } from "../types";

interface ProductsState {
  products: Product[];
  favorites: string[];
  setProducts: (products: Product[]) => void;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  getProductById: (productId: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  favorites: [],

  setProducts: (products: Product[]) =>
    set({
      products,
    }),

  addFavorite: (productId: string) =>
    set((state) =>
      state.favorites.includes(productId)
        ? state
        : {
            favorites: [...state.favorites, productId],
          }
    ),

  removeFavorite: (productId: string) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== productId),
    })),

  isFavorite: (productId: string) => {
    return get().favorites.includes(productId);
  },

  getProductById: (productId: string) => {
    return get().products.find((product) => product.id === productId);
  },

  getProductsByCategory: (category: string) => {
    return get().products.filter((product) => product.category === category);
  },
}));
