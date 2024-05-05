import { create } from "zustand";

export const useCartStore = create((set: any) => ({
  carts: [],
  setCarts: (value: any[]) =>
    set((state: any[]) => ({
      ...state,
      carts: value,
    })),
}));
