import { useState } from "react"
import { useBackgroundState } from "store/store"

const useDisplayAlert = () => {
    const { selectedBackground, backgroundList } = useBackgroundState()
    const [wallpaper, setWallpaper] = useState(selectedBackground.fileName != '[None]' ? selectedBackground : backgroundList[0])

    return {
        wallpaper,
        setWallpaper,
    }
}

export default useDisplayAlert