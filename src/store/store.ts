import { create } from 'zustand'
import { StartMenuState, ClockUpdate, DisplaySettingsState, WindowsRightClickMenu, OpenedWindowsState } from './types'
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
