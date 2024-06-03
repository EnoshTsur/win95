import { create } from "zustand";
import { WallpaperStore, DisplayPropertiesStore, BackgroundSizeStore } from "./types";

export const useDisplayPropertiesStore = create<DisplayPropertiesStore>((set) => ({
    isDisplayPropertiesOpen: false,
    openDisplayProperties: () => set((pre) => ({ ...pre, isDisplayPropertiesOpen: true })),
    closeDisplayProperties: () => set((pre) => ({ ...pre, isDisplayPropertiesOpen: false }))
}))

export const useWallpaperStore = create<WallpaperStore>((set) => ({
    wallpaper: { fileName: '[None]', url: ''},
    wallpaperSelection: { activeSelectedIndex: 0, activeSelectedChunk: 0 },
    setWallpaper: (wallpaper) =>  set((pre) => ({...pre, wallpaper })),
    setWallpaperSelection: (selection) => set((pre) => ({ ...pre, wallpaperSelection: selection })),
    setWallpaperActiveIndex: (index) => set((pre) => ({...pre, wallpaperSelection: { ...pre.wallpaperSelection, activeSelectedIndex: index }})),
    setWallpaperActiveChunk: (index) => set((pre) => ({...pre, wallpaperSelection: { ...pre.wallpaperSelection, activeSelectedChunk: index }})),
}))

export const useBackgroundSizeStore = create<BackgroundSizeStore>((set) => ({
    backgroundSize: 'cover',
    setBackgroundSize: (backgroundSize) => set((pre) => ({...pre, backgroundSize }))
}))