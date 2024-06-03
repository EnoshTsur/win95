import { create } from "zustand";
import { Background, MainScreenBackgroundSizeStore, MainScreenBackgroundStore, MainScreenItemsStore, ScreenItem } from "./types";
import blackThatchUrl from '../../../assets/black-thatch-wallpaper.png'
import blueRivetsUrl from '../../../assets/blue-rivets-wallpaper.png'
import bubblesUrl from '../../../assets/bubbles-wallpaper.jpg'
import cravedStonedUrl from '../../../assets/craved-stoned-wallpaper.png'
import emptyTrashIcon from '../../../assets/empty-trash.png';
import emptyTrashActive from '../../../assets/empty-trash-active.png'
import myComputerIcon from '../../../assets/my-computer.png';
import myComputerActiveIcon from '../../../assets/my-computer-active.png';
import networkNeighborhoodIcon from '../../../assets/network-neighborhood.png'
import networkNeighborhoodActive from '../../../assets/network-neighborhood-active.png'
import folderIcon from '../../../assets/folder.png'
import folderActive from '../../../assets/folder-active.png'
import inboxIcon from '../../../assets/inbox.png'
import inboxActive from '../../../assets/inbox-active.png'

export const initialBackgroundList: ReadonlyArray<Background> = [
    { fileName: '[None]', url: ''},
    { fileName: 'Black Thatch', url: blackThatchUrl },
    { fileName: 'Blue Rivets', url: blueRivetsUrl }, 
    { fileName: 'Bubbles', url: bubblesUrl },
    { fileName: 'Carved Stoned', url: cravedStonedUrl }
]

export const initialScreenItems: ReadonlyArray<ScreenItem> = [
    {
        icon: { icon: myComputerIcon, activeIcon: myComputerActiveIcon },
        label: 'My Computer',
        onClick: (e) => {
            e.preventDefault()
        },
    },
    {
        icon: { icon: networkNeighborhoodIcon, activeIcon: networkNeighborhoodActive },
        label: 'Network Neighborhood',
        onClick: (e) => {
            e.preventDefault()
        },
    },
    {
        icon: { icon: inboxIcon, activeIcon: inboxActive},
        label: 'Inbox',
        onClick: (e) => {
            e.preventDefault()
        },
    },
    {
        icon: { icon: emptyTrashIcon, activeIcon: emptyTrashActive},
        label: 'Recycle Bin',
        onClick: (e) => {
            e.preventDefault()
        },
    },
    {
        icon: { icon: folderIcon, activeIcon: folderActive},
        label: 'Online Services',
        onClick: (e) => {
            e.preventDefault()
        },
    }
]

export const useMainScreenItemsStore = create<MainScreenItemsStore>((set) => ({
    mainScreenActiveItem: -1,
    mainScreenItems: initialScreenItems,
    setMainScreenActiveItem: (index) => set((pre) => ({...pre, mainScreenActiveItem: index}))
}))

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

