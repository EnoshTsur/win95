export interface StartMenuState {
    readonly isOpen: boolean,
    readonly closeStartMenu: () => void
    readonly toggleStartMenu: () => void
}

export interface ClockUpdate {
    readonly time: string
    readonly updateTime: () => void
}

export interface UserBackgroundUpload {
    readonly fileName: string
    readonly url: string
}

export interface BackgroundState {
    readonly backgroundList: ReadonlyArray<UserBackgroundUpload>
    readonly applyBackground: UserBackgroundUpload
    readonly selectedBackground: UserBackgroundUpload
    readonly addUserBackground: (userUpload: UserBackgroundUpload) => void
    readonly setApplyBackground: (applyObj: UserBackgroundUpload) => void
    readonly setSelectedBackground: (backgroundObj: UserBackgroundUpload) => void
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