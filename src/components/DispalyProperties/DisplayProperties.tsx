import Window from "components/Window/Window"
import DisplayPropertiesContent from "./DisplayPropertiesContent"
import { useCallback, useEffect, useMemo } from "react"
import { useBackgroundState, useDispaySettingsState } from "store/store"
import { ButtonProps } from "components/Button/Button"
import { BsQuestion } from 'react-icons/bs'
import { IoMdClose  } from "react-icons/io"


const DisplayProperties  = () => {
    
    const { setDisplaySettingsOpen } = useDispaySettingsState()

    const { selectedBackground, backgroundList, setApplyBackground, setWallpaper } = useBackgroundState()

    useEffect(() => {
        setWallpaper(selectedBackground.fileName !== '[None]' ? selectedBackground : backgroundList[0])
    }, [])
    
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
            <Window title="Display properties" titleButtons={displayAlertButtons}>
                <DisplayPropertiesContent handleClose={handleClose}/>
            </Window>
    )
}

export default DisplayProperties