import { create } from "zustand";
import { Background, MainScreenBackgroundSizeStore, MainScreenBackgroundStore, MainScreenItemsStore, ScreenItem } from "./types";
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

export const useMainScreenItemsStore = create<MainScreenItemsStore>((set) => ({
    mainScreenActiveItem: -1,
    mainScreenItems: [],
    addItem: (item) => set((pre) => ({ ...pre, mainScreenItems: [...pre.mainScreenItems, item ]})),
    setMainScreenActiveItem: (index) => set((pre) => ({...pre, mainScreenActiveItem: index})),
    setMainScreenItems: (items) => set((pre) => ({...pre, mainScreenItems: items })),
    arrangeByName: () => set((pre) => ({...pre, mainScreenItems: [...pre.mainScreenItems].sort((x, y) => x.label.localeCompare(y.label))})),
    autoArrange: () => set((pre) => ({...pre, mainScreenItems: pre.mainScreenItems }))
}))

export const useMainScreenBackgroundStore = create<MainScreenBackgroundStore>((set) => ({
    mainScreenBackgroundList: initialBackgroundList,
    mainScreenSelectedBackground: initialBackgroundList[0],
    addUserBackground: (userUpload) => set((pre) => pre.mainScreenBackgroundList
        .find(({ fileName }) =>  userUpload.fileName === fileName) == null 
            ? ({...pre, mainScreenBackgroundList: [ ...pre.mainScreenBackgroundList.slice(0, 1), userUpload, ...pre.mainScreenBackgroundList.slice(1)]})
            : pre
    ),
    setMainScreenSelectedBackground: (backgroundObj) => set((pre) => ({...pre, mainScreenSelectedBackground: backgroundObj })),
    setMainScreenBackgrounds: (backgrounds) => set((pre) => ({...pre, mainScreenBackgroundList: backgrounds }))
}))

export const useMainScreenBackgroundSizeStore = create<MainScreenBackgroundSizeStore>((set) => ({
    mainScreenBackgroundSize: 'cover',
    setMainScreenBackgroundSize: (backgroundSize) => set((pre) => ({...pre, mainScreenBackgroundSize: backgroundSize }))
}))

