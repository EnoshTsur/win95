import { create } from "zustand";
import { FreecellWindowStore } from "./types";

export const useFreecellWindowStore = create<FreecellWindowStore>((set) => ({
    isFreecellOpen: false,
    setFreecellOpen: (value) => set({ isFreecellOpen: value })
}))