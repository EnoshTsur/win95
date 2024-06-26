export interface Background {
    readonly fileName: string
    readonly url: string
}

export type BackgroundSize = 'contain' | 'cover'

export interface ScreenIcon {
    readonly activeIcon: string
    readonly icon: string
}

export interface ScreenItem {
    readonly label: string
    readonly icon: ScreenIcon
    readonly onClick?: () => void
    readonly onDoubleClick?: () => void
}

export interface MainScreenBackgroundStore {
    readonly mainScreenBackgroundList: ReadonlyArray<Background>
    readonly mainScreenSelectedBackground: Background
    readonly addUserBackground: (userUpload: Background) => void
    readonly setMainScreenSelectedBackground: (backgroundObj: Background) => void
    readonly setMainScreenBackgrounds: (backgrounds: ReadonlyArray<Background>) => void
}

export interface MainScreenBackgroundSizeStore {
    readonly mainScreenBackgroundSize: BackgroundSize
    readonly setMainScreenBackgroundSize: (backgroundSize: BackgroundSize) => void
}

export interface MainScreenItemsStore {
    readonly mainScreenItems: ReadonlyArray<ScreenItem>
    readonly mainScreenActiveItem: number
    readonly addItem: (item: ScreenItem) => void
    readonly setMainScreenActiveItem: (index: number) => void
    readonly setMainScreenItems: (items: ReadonlyArray<ScreenItem>) => void
    readonly arrangeByName: () => void
    readonly autoArrange: () => void
}
