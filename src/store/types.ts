export interface StartMenuState {
    readonly isOpen: boolean,
    readonly closeStartMenu: () => void
    readonly toggleStartMenu: () => void
}

export interface ClockStore {
    readonly time: string
    readonly fullTime: string
    readonly updateTime: () => void
    readonly updateFullTime: () => void
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