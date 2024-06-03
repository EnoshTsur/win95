export interface StartMenuState {
    readonly isOpen: boolean,
    readonly closeStartMenu: () => void
    readonly toggleStartMenu: () => void
}

export interface ClockUpdate {
    readonly time: string
    readonly updateTime: () => void
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

export interface OpenWindow {
    readonly id: string
    readonly zIndex: number;
}

export interface OpenedWindowsState {
    readonly openedWindows: ReadonlyArray<OpenWindow>
    readonly addWindow: (id: string) => void
    readonly removeWindow: (id: string) => void
    readonly moveToTop: (id: string) => void
}