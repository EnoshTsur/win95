export interface Background {
    readonly fileName: string
    readonly url: string
}

export type BackgroundSize = 'contain' | 'cover'

export interface MainScreenBackgroundStore {
    readonly mainScreenBackgroundList: ReadonlyArray<Background>
    readonly mainScreenSelectedBackground: Background
    readonly addUserBackground: (userUpload: Background) => void
    readonly setMainScreenSelectedBackground: (backgroundObj: Background) => void
}

export interface MainScreenBackgroundSizeStore {
    readonly mainScreenBackgroundSize: BackgroundSize
    readonly setMainScreenBackgroundSize: (backgroundSize: BackgroundSize) => void
}
