import { useState } from "react"
import { useBackgroundState, useDispaySettingsState } from "store/store"
import { wallpaperListData } from "../context/DisplayContext"

const useDisplayAlert = () => {
    const { backgroundUrl } = useBackgroundState()
    const [wallpaper, setWallpaper] = useState(backgroundUrl != '' ? backgroundUrl : wallpaperListData[0])

    return {
        wallpaper,
        setWallpaper,
    }
}

export default useDisplayAlert