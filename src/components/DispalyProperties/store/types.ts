export interface Background {
    readonly fileName: string
    readonly url: string
}

export interface WallpaperSelection {
    readonly activeSelectedIndex: number
    readonly activeSelectedChunk: number
}

export interface DisplayPropertiesStore {
    readonly isDisplayPropertiesOpen: boolean
    readonly openDisplayProperties: () => void
    readonly closeDisplayProperties: () => void
}

export interface WallpaperStore {
    readonly wallpaper: Background
    readonly wallpaperSelection:  WallpaperSelection
    readonly setWallpaper: (wallpaper: Background) => void
    readonly setWallpaperSelection: (selection: WallpaperSelection) => void
    readonly setWallpaperActiveIndex: (index: number) => void
    readonly setWallpaperActiveChunk: (index: number) => void
}

export type BackgroundSize = 'cover' | 'center'

export interface BackgroundSizeStore {
    readonly backgroundSize: BackgroundSize
    readonly setBackgroundSize: (backgroundSize: BackgroundSize) => void
}