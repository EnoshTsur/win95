import { createContext } from "react";
import { DisplayContextTypes } from './types';

export const patterListData: ReadonlyArray<string> = [
    '[None]', 'Bricks', 'Buttons', 'Cargo Net', 'Circuits'
]

const DisplayContext = createContext<DisplayContextTypes>({
    wallpaper: { fileName: '', url: ''},
    setWallpaper: () => {}
})

export default DisplayContext