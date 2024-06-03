export interface Background {
    readonly fileName: string
    readonly url: string
}

export interface WallpaperSelection {
    readonly activeSelectedIndex: number
    readonly activeSelectedChunk: number

}

export interface WallpaperStore {
    readonly wallpaper: Background
    readonly wallpaperSelection:  WallpaperSelection
    readonly setWallpaper: (wallpaper: Background) => void
    readonly setWallpaperSelection: (selection: WallpaperSelection) => void
    readonly setWallpaperActiveIndex: (index: number) => void
    readonly setWallpaperActiveChunk: (index: number) => void
}

export interface BackgroundStore {
    readonly backgroundList: ReadonlyArray<Background>
    readonly selectedBackground: Background
    readonly addUserBackground: (userUpload: Background) => void
    readonly setSelectedBackground: (backgroundObj: Background) => void
}

export interface ApplyBackgroundStore {
    readonly applyBackground: Background
    readonly setApplyBackground: (applyObj: Background) => void
}