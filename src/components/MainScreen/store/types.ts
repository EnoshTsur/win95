export interface Background {
    readonly fileName: string
    readonly url: string
}

export type BackgroundSize = 'center' | 'cover'

export interface MainScreenBackgroundStore {
    readonly mainScreenBackgroundList: ReadonlyArray<Background>
    readonly mainScreenSelectedBackground: Background
    readonly addUserBackground: (userUpload: Background) => void
    readonly setMainScreenSelectedBackground: (backgroundObj: Background) => void
}

export interface MainScreenBackgroundSizeStore {
}
