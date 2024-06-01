import Window from "components/Window/Window"
import DisplayPropertiesContent from "./DisplayPropertiesContent"
import { useCallback, useMemo, useState } from "react"
import DisplayContext from "./context/DisplayContext"
import { useBackgroundState, useDispaySettingsState } from "store/store"
import { ButtonProps } from "components/Button/Button"
import { BsQuestion } from 'react-icons/bs'
import { IoMdClose  } from "react-icons/io"


const DisplayProperties  = () => {
    
    const { setDisplaySettingsOpen } = useDispaySettingsState()

    const { selectedBackground, backgroundList, setApplyBackground } = useBackgroundState()

    const [wallpaper, setWallpaper] = useState(selectedBackground.fileName != '[None]' ? selectedBackground : backgroundList[0])
    
    const contextValue = useMemo(() => ({ wallpaper, setWallpaper }), [wallpaper, setWallpaper])

    const handleClose = useCallback(() => {
        setDisplaySettingsOpen(false)
        setApplyBackground(selectedBackground)
        setWallpaper(selectedBackground)
    }, [selectedBackground])

    const displayAlertButtons: ReadonlyArray<ButtonProps> = useMemo(() => [
        { children: <BsQuestion />},
        { children: <IoMdClose />, onClick: handleClose }
    ], [])
    

    return (
        <DisplayContext.Provider value={contextValue}>
            <Window title="Display properties" titleButtons={displayAlertButtons}>
                <DisplayPropertiesContent handleClose={handleClose}/>
            </Window>
        </DisplayContext.Provider>
    )
}

export default DisplayProperties