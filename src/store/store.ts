import { create } from 'zustand'
import { StartMenuState, ClockUpdate, BackgroundState, DisplaySettingsState, WindowsRightClickMenu, OpenedWindowsState } from './types'
import blackThatchUrl from '../assets/black-thatch-wallpaper.png'
import blueRivetsUrl from '../assets/blue-rivets-wallpaper.png'
import bubblesUrl from '../assets/bubbles-wallpaper.jpg'
import cravedStonedUrl from '../assets/craved-stoned-wallpaper.png'
import { moveOpenWindowToTop, popOpenWindow } from 'utils/functions'


const timeSupplier = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    return `${hours}:${minutes} ${Number(hours) > 12 ? 'PM' : 'AM'}`
}

export const useStartMenuState = create<StartMenuState>((set) => ({
    isOpen: false,
    closeStartMenu: () => set((pre) => ({ ...pre, isOpen: false })),
    toggleStartMenu: () => set((pre) => ({...pre, isOpen: !pre.isOpen }))

}))

export const useClockState = create<ClockUpdate>((set) => ({
    time: timeSupplier(),
    updateTime: () => set((pre) => ({ ...pre, time: timeSupplier() }))
}))

export const useBackgroundState = create<BackgroundState>((set) => ({
    applyBackground: { fileName: '[None]', url: ''},
    backgroundList: [
        { fileName: '[None]', url: ''},
        { fileName: 'Black Thatch', url: blackThatchUrl },
        { fileName: 'Blue Rivets', url: blueRivetsUrl }, 
        { fileName: 'Bubbles', url: bubblesUrl },
        { fileName: 'Carved Stoned', url: cravedStonedUrl }
    ],
    selectedBackground: { fileName: '[None]', url: ''},
    addUserBackground: (userUpload) => set((pre) => pre.backgroundList
        .find(({ fileName }) =>  userUpload.fileName === fileName) == null 
        ? ({...pre, backgroundList: [ userUpload, ...pre.backgroundList]})
        : pre
    ),
    setApplyBackground: (applyObj) => set((pre) => ({ ...pre, applyBackground: applyObj })),
    setSelectedBackground: (backgroundObj) => set((pre) => ({...pre, selectedBackground: backgroundObj })), 
}))

export const useDispaySettingsState = create<DisplaySettingsState>((set) => ({
    isOpen: false,
    toggleDispalySettings: () => set((pre) => ({ ...pre, isOpen: !pre.isOpen })),
    setDisplaySettingsOpen: (open) => set((pre) => ({...pre, isOpen: open }))
}))

export const useWindowsRightClickMenuState = create<WindowsRightClickMenu>((set) => ({
    isOpen: false,
    closeRightMenu: () => set((pre) => ({...pre, isOpen: false })),
    toggleRightMenu: () => set((pre) => ({...pre, isOpen: !pre.isOpen }))
}))

export const useOpenWindowState = create<OpenedWindowsState>((set) => ({
    openedWindows: [],
    addWindow: (id) => set((pre) => ({ ...pre, openedWindows: [{ id, zIndex: pre.openedWindows.length + 1 }, ...pre.openedWindows] })),
    removeWindow: (id) => set((pre) => ({ ...pre, openedWindows: popOpenWindow(pre.openedWindows)(id) })),
    moveToTop: (id) => set((pre) => ({...pre, openedWindows: moveOpenWindowToTop(pre.openedWindows)(id) }))
}))
