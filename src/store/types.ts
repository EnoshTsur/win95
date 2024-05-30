export interface StartMenuState {
    readonly isOpen: boolean,
    readonly closeStartMenu: () => void
    readonly toggleStartMenu: () => void
}

export interface ClockUpdate {
    readonly time: string
    readonly updateTime: () => void
}

export interface BackgroundState {
    readonly backgroundUrl: string
    readonly setBackgroundUrl: (url: string) => void
}

export interface DisplaySettingsState {
    readonly isOpen: boolean
    readonly setDisplaySettingsOpen: (open: boolean) => void
    readonly toggleDispalySettings: () => void
}

export interface WindowsRightClickMenu {
    readonly isOpen: boolean,
    readonly closeRightMenu: () => void
    readonly toggleRightMenu: () => void
}