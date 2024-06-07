export interface FreecellWindowStore {
    readonly isFreecellOpen: boolean
    readonly setFreecellOpen: (value: boolean) => void
}