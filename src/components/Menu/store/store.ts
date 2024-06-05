import { create } from "zustand";
import { ScreenMenuStore } from "./types";

export const useScreenMenuStore = create<ScreenMenuStore>((set) => ({
    isScreenMenuOpen: false,
    openScreenMenu: () => set((pre) => ({ ...pre, isScreenMenuOpen: true })),
    closeScreenMenu: () => set((pre) => ({ ...pre, isScreenMenuOpen: false }))
}))