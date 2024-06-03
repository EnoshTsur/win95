import { create } from "zustand";
import { Background, MainScreenApplyBackgroundStore, MainScreenBackgroundStore } from "./types";
import blackThatchUrl from '../../../assets/black-thatch-wallpaper.png'
import blueRivetsUrl from '../../../assets/blue-rivets-wallpaper.png'
import bubblesUrl from '../../../assets/bubbles-wallpaper.jpg'
import cravedStonedUrl from '../../../assets/craved-stoned-wallpaper.png'

const initialBackgroundList: ReadonlyArray<Background> = [
    { fileName: '[None]', url: ''},
    { fileName: 'Black Thatch', url: blackThatchUrl },
    { fileName: 'Blue Rivets', url: blueRivetsUrl }, 
    { fileName: 'Bubbles', url: bubblesUrl },
    { fileName: 'Carved Stoned', url: cravedStonedUrl }
]

export const useMainScreenBackgroundStore = create<MainScreenBackgroundStore>((set) => ({
    backgroundList: initialBackgroundList,
    selectedBackground: initialBackgroundList[0],
    addUserBackground: (userUpload) => set((pre) => pre.backgroundList
        .find(({ fileName }) =>  userUpload.fileName === fileName) == null 
            ? ({...pre, backgroundList: [ ...pre.backgroundList.slice(0, 1), userUpload, ...pre.backgroundList.slice(1)]})
            : pre
    ),
    setSelectedBackground: (backgroundObj) => set((pre) => ({...pre, selectedBackground: backgroundObj }))
}))

export const useMainScreenApplyBackgroundStore = create<MainScreenApplyBackgroundStore>((set) => ({
    applyBackground: initialBackgroundList[0],
    setApplyBackground: (applyObj) => set((pre) => ({ ...pre, applyBackground: applyObj })),
}))
