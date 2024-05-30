import blackThatchWallpaper from '../../../assets/black-thatch-wallpaper.png'
import blueRivetsWallpaper from '../../../assets/blue-rivets-wallpaper.png'
import bubblesWallpaper from '../../../assets/bubbles-wallpaper.jpg'
import carvedStonedWallpaper from '../../../assets/craved-stoned-wallpaper.png'

import { createContext } from "react";

export const patterListData: ReadonlyArray<string> = [
    '[None]', 'Bricks', 'Buttons', 'Cargo Net', 'Circuits'
]

export const wallpaperListData: ReadonlyArray<string> = [
    '[None]', 'Black Thatch', 'Blue Rivets', 'Bubbles', 'Carved Stoned'
]

export const mapToWallPaper = (wallpaper: string) => {
    switch (wallpaper) {
        case 'Black Thatch':
            return blackThatchWallpaper
        case 'Blue Rivets':
            return blueRivetsWallpaper
        case 'Bubbles':
            return bubblesWallpaper
        case 'Carved Stoned':
            return carvedStonedWallpaper
        default:
            return ''
    }
}


const DisplayContext = createContext<{
    wallpaper: string,
    setWallpaper: React.Dispatch<React.SetStateAction<string>>
}>({
    wallpaper: wallpaperListData[0],
    setWallpaper: (value: React.SetStateAction<string>) => {}
})

export default DisplayContext