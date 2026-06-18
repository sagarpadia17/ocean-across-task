import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (product: Product) =>
        set((state) => ({
          favorites: state.favorites.some((p) => p.id === product.id)
            ? state.favorites
            : [...state.favorites, product],
        })),

      removeFavorite: (productId: string) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        })),

      isFavorite: (productId: string) =>
        get().favorites.some((p) => p.id === productId),

      toggleFavorite: (product: Product) => {
        const already = get().favorites.some((p) => p.id === product.id);
        if (already) {
          set((state) => ({
            favorites: state.favorites.filter((p) => p.id !== product.id),
          }));
        } else {
          set((state) => ({ favorites: [...state.favorites, product] }));
        }
      },
    }),
    { name: "favorites-storage" }
  )
);
