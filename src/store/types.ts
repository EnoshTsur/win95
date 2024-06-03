export interface StartMenuState {
    readonly isOpen: boolean,
    readonly closeStartMenu: () => void
    readonly toggleStartMenu: () => void
}

export interface ClockUpdate {
    readonly time: string
    readonly updateTime: () => void
}

export interface Background {
    readonly fileName: string
    readonly url: string
}

export interface WallpaperSelection {
    readonly activeSelectedIndex: number
    readonly activeSelectedChunk: number
}

export interface BackgroundState {
    readonly backgroundList: ReadonlyArray<Background>
    readonly applyBackground: Background
    readonly selectedBackground: Background
    readonly wallpaper: Background
    readonly wallpaperSelection:  WallpaperSelection
    readonly addUserBackground: (userUpload: Background) => void
    readonly setApplyBackground: (applyObj: Background) => void
    readonly setSelectedBackground: (backgroundObj: Background) => void
    readonly setWallpaper: (wallpaper: Background) => void
    readonly setWallpaperSelection: (selection: WallpaperSelection) => void
    readonly setWallpaperActiveIndex: (index: number) => void
    readonly setWallpaperActiveChunk: (index: number) => void
        
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