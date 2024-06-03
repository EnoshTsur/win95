import { create } from "zustand";
import { Background, MainScreenBackgroundSizeStore, MainScreenBackgroundStore } from "./types";
import blackThatchUrl from '../../../assets/black-thatch-wallpaper.png'
import blueRivetsUrl from '../../../assets/blue-rivets-wallpaper.png'
import bubblesUrl from '../../../assets/bubbles-wallpaper.jpg'
import cravedStonedUrl from '../../../assets/craved-stoned-wallpaper.png'

export const initialBackgroundList: ReadonlyArray<Background> = [
    { fileName: '[None]', url: ''},
    { fileName: 'Black Thatch', url: blackThatchUrl },
    { fileName: 'Blue Rivets', url: blueRivetsUrl }, 
    { fileName: 'Bubbles', url: bubblesUrl },
    { fileName: 'Carved Stoned', url: cravedStonedUrl }
]

export const useMainScreenBackgroundStore = create<MainScreenBackgroundStore>((set) => ({
    mainScreenBackgroundList: initialBackgroundList,
    mainScreenSelectedBackground: initialBackgroundList[0],
    addUserBackground: (userUpload) => set((pre) => pre.mainScreenBackgroundList
        .find(({ fileName }) =>  userUpload.fileName === fileName) == null 
            ? ({...pre, mainScreenBackgroundList: [ ...pre.mainScreenBackgroundList.slice(0, 1), userUpload, ...pre.mainScreenBackgroundList.slice(1)]})
            : pre
    ),
    setMainScreenSelectedBackground: (backgroundObj) => set((pre) => ({...pre, mainScreenSelectedBackground: backgroundObj }))
}))

export const useMainScreenBackgroundSizeStore = create<MainScreenBackgroundSizeStore>((set) => ({
    mainScreenBackgroundSize: 'cover',
    setMainScreenBackgroundSize: (backgroundSize) => set((pre) => ({...pre, mainScreenBackgroundSize: backgroundSize }))
}))

