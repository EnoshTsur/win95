import { create } from "zustand";
import { ApplyBackgroundSizeStore, DisplayApplyBackgroundStore, DisplayBackgroundSizeStore, DisplayBackgroundStore, DisplayModalStore } from "./types";
import { initialBackgroundList } from "components/MainScreen/store/store";

export const useDisplayModalStore = create<DisplayModalStore>((set) => ({
    isDisplayPropertiesOpen: false,
    openDisplayProperties: () => set((pre) => ({ ...pre, isDisplayPropertiesOpen: true })),
    closeDisplayProperties: () => set((pre) => ({ ...pre, isDisplayPropertiesOpen: false }))
}))

export const useDisplayBackgroundStore = create<DisplayBackgroundStore>((set) => ({
    displayBackground: { fileName: '[None]', url: ''},
    displayBackgroundSelection: { activeSelectedIndex: 0, activeSelectedChunk: 0 },
    setDisplayBackground: (displayBackground) =>  set((pre) => ({...pre, displayBackground })),
    setDisplayBackgroundSelection: (selection) => set((pre) => ({ ...pre, displayBackgroundSelection: selection })),
    setDisplayBackgroundActiveIndex: (index) => set((pre) => ({
        ...pre, 
        displayBackgroundSelection: { ...pre.displayBackgroundSelection, activeSelectedIndex: index }
    })),
    setDisplayBackgroundActiveChunk: (index) => set((pre) => ({
        ...pre, 
        wallpaperSelection: { ...pre.displayBackgroundSelection, activeSelectedChunk: index }
    })),
}))

export const useDisplayApplyBackgroundStore = create<DisplayApplyBackgroundStore>((set) => ({
    displayApplyBackground: initialBackgroundList[0],
    setDisplayApplyBackground: (applyObj) => set((pre) => ({ ...pre, displayApplyBackground: applyObj })),
}))

export const useDisplayBackgroundSizeStore = create<DisplayBackgroundSizeStore>((set) => ({
    displayBackgroundSize: 'cover',
    setDisplayBackgroundSize: (backgroundSize) => set((pre) => ({...pre, displayBackgroundSize: backgroundSize}))
}))

export const useApplyBackgroundSizeStore = create<ApplyBackgroundSizeStore>((set) => ({
    applyBackgroundSize: 'cover',
    setApplyBackgroundSize: (backgroundSize) => set((pre) => ({...pre, applyBackgroundSize: backgroundSize}))
}))
