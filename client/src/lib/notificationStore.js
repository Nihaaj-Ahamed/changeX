import { create } from "zustand";
import apiRequest from "./apiRequest";

export const useNotificationStore = create((set, get) => ({
  number: 0,
  activeChatId: null,
  setActiveChatId: (id) => set({ activeChatId: id }),
  fetch: async () => {
    try {
      const res = await apiRequest("/users/notification");
      set({ number: typeof res.data === "number" ? res.data : 0 });
    } catch (err) {
      console.error("Failed to fetch notification count:", err);
    }
  },
  increase: () => {
    set((prev) => ({ number: prev.number + 1 }));
  },
  decrease: () => {
    set((prev) => ({ number: Math.max(0, prev.number - 1) }));
  },
  reset: () => {
    set({ number: 0 });
  },
}));