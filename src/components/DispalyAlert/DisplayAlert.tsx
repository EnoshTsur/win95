import Alert from "components/Alert/Alert"
import useDisplayAlert from "./hooks/useDisplayAlert"
import DisplayAlertContent from "./DisplayAlertContent"
import { useCallback, useMemo } from "react"
import DisplayContext from "./context/DisplayContext"
import { useBackgroundState, useDispaySettingsState } from "store/store"

const DisplayAlert = () => {
    
    const { setDisplaySettingsOpen } = useDispaySettingsState()
    const { backgroundUrl, setApplyBackgroundUrl } = useBackgroundState()

    const { 
        wallpaper,
        setWallpaper,
    } = useDisplayAlert()
    
    const contextValue = useMemo(() => ({ wallpaper, setWallpaper }), [wallpaper, setWallpaper])

    const handleClose = useCallback(() => {
        setDisplaySettingsOpen(false)
        setApplyBackgroundUrl(backgroundUrl)
        setWallpaper(backgroundUrl)
    }, [backgroundUrl])
    

    return (
        <DisplayContext.Provider value={contextValue}>
            <Alert title="Display properties" onClose={handleClose}>
                <DisplayAlertContent handleClose={handleClose}/>
            </Alert>
        </DisplayContext.Provider>
    )
}

export default DisplayAlert