export interface Background {
    readonly fileName: string
    readonly url: string
}

export type BackgroundSize = 'center' | 'cover'

export interface MainScreenBackgroundStore {
    readonly backgroundList: ReadonlyArray<Background>
    readonly selectedBackground: Background
    readonly addUserBackground: (userUpload: Background) => void
    readonly setSelectedBackground: (backgroundObj: Background) => void
}

export interface MainScreenApplyBackgroundStore {
    readonly applyBackground: Background
    readonly setApplyBackground: (applyObj: Background) => void
}
