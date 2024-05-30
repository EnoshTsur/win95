import { create } from 'zustand'
import { StartMenuState, ClockUpdate, BackgroundState, DisplaySettingsState, WindowsRightClickMenu } from './types'

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
    applyBackgroundUrl: '[None]',
    backgroundUrl: '[None]',
    setApplyBackgroundUrl: (url) => set((pre) => ({ ...pre, applyBackgroundUrl: url })),
    setBackgroundUrl: (url) => set((pre) => ({...pre, backgroundUrl: url }))
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