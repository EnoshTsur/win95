import { UserBackgroundUpload } from "store/types"

export interface DisplayContextTypes {
    readonly wallpaper: UserBackgroundUpload
    readonly setWallpaper: React.Dispatch<React.SetStateAction<UserBackgroundUpload>>
}