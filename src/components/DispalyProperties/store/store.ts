import { create } from "zustand";
import { BackgroundStore, WallpaperStore, Background, ApplyBackgroundStore } from "./types";
import blackThatchUrl from '../../../assets/black-thatch-wallpaper.png'
import blueRivetsUrl from '../../../assets/blue-rivets-wallpaper.png'
import bubblesUrl from '../../../assets/bubbles-wallpaper.jpg'
import cravedStonedUrl from '../../../assets/craved-stoned-wallpaper.png'

export const useWallpaperStore = create<WallpaperStore>((set) => ({
    wallpaper: { fileName: '[None]', url: ''},
    wallpaperSelection: { activeSelectedIndex: 0, activeSelectedChunk: 0 },
    setWallpaper: (wallpaper) =>  set((pre) => ({...pre, wallpaper })),
    setWallpaperSelection: (selection) => set((pre) => ({ ...pre, wallpaperSelection: selection })),
    setWallpaperActiveIndex: (index) => set((pre) => ({...pre, wallpaperSelection: { ...pre.wallpaperSelection, activeSelectedIndex: index }})),
    setWallpaperActiveChunk: (index) => set((pre) => ({...pre, wallpaperSelection: { ...pre.wallpaperSelection, activeSelectedChunk: index }})),
}))

const initialBackgroundList: ReadonlyArray<Background> = [
        { fileName: '[None]', url: ''},
        { fileName: 'Black Thatch', url: blackThatchUrl },
        { fileName: 'Blue Rivets', url: blueRivetsUrl }, 
        { fileName: 'Bubbles', url: bubblesUrl },
        { fileName: 'Carved Stoned', url: cravedStonedUrl }
]

export const useBackgroundStore = create<BackgroundStore>((set) => ({
    backgroundList: initialBackgroundList,
    selectedBackground: initialBackgroundList[0],
    addUserBackground: (userUpload) => set((pre) => pre.backgroundList
        .find(({ fileName }) =>  userUpload.fileName === fileName) == null 
            ? ({...pre, backgroundList: [ userUpload, ...pre.backgroundList]})
            : pre
    ),
    setSelectedBackground: (backgroundObj) => set((pre) => ({...pre, selectedBackground: backgroundObj }))
}))

export const useApplyBackgroundStore = create<ApplyBackgroundStore>((set) => ({
    applyBackground: initialBackgroundList[0],
    setApplyBackground: (applyObj) => set((pre) => ({ ...pre, applyBackground: applyObj })),
}))