import Alert from "components/Alert/Alert"
import useDisplayAlert from "./hooks/useDisplayAlert"
import DisplayAlertContent from "./DisplayAlertContent"
import { useCallback, useMemo } from "react"
import DisplayContext from "./context/DisplayContext"
import { useBackgroundState, useDispaySettingsState } from "store/store"

const DisplayAlert = () => {
    
    const { setDisplaySettingsOpen } = useDispaySettingsState()
    const { selectedBackground, setApplyBackground } = useBackgroundState()

    const { 
        wallpaper,
        setWallpaper,
    } = useDisplayAlert()
    
    const contextValue = useMemo(() => ({ wallpaper, setWallpaper }), [wallpaper, setWallpaper])

    const handleClose = useCallback(() => {
        setDisplaySettingsOpen(false)
        setApplyBackground(selectedBackground)
        setWallpaper(selectedBackground)
    }, [selectedBackground])
    

    return (
        <DisplayContext.Provider value={contextValue}>
            <Alert title="Display properties" onClose={handleClose}>
                <DisplayAlertContent handleClose={handleClose}/>
            </Alert>
        </DisplayContext.Provider>
    )
}

export default DisplayAlert