import { Background, BackgroundSize } from "components/MainScreen/store/types"

export interface DisplayBackgroundSelection {
    readonly activeSelectedIndex: number
    readonly activeSelectedChunk: number
}

export interface DisplayModalStore {
    readonly isDisplayPropertiesOpen: boolean
    readonly openDisplayProperties: () => void
    readonly closeDisplayProperties: () => void
}

export interface DisplayBackgroundStore {
    readonly displayBackground: Background
    readonly displayBackgroundSelection:  DisplayBackgroundSelection
    readonly displayBackgroundSize: BackgroundSize
    readonly setDisplayBackgroundSize: (backgroundSize: BackgroundSize) => void
    readonly setDisplayBackground: (displayBackground: Background) => void
    readonly setDisplayBackgroundSelection: (selection: DisplayBackgroundSelection) => void
    readonly setDisplayBackgroundActiveIndex: (index: number) => void
    readonly setDisplayBackgroundActiveChunk: (index: number) => void
}

export interface DisplayApplyBackgroundStore {
    readonly displayApplyBackground: Background
    readonly displayApplyBackgroundSize: BackgroundSize
    readonly setDisplayApplyBackgroundSize: (backgroundSize: BackgroundSize) => void
    readonly setDisplayApplyBackground: (applyObj: Background) => void
}