import Window from "components/Window/Window"
import DisplayPropertiesContent from "./DisplayPropertiesContent"
import { useCallback, useEffect, useMemo } from "react"
import { ButtonProps } from "components/Button/Button"
import { BsQuestion } from 'react-icons/bs'
import { IoMdClose  } from "react-icons/io"
import { useApplyBackgroundStore, useBackgroundStore, useDisplayPropertiesStore, useWallpaperStore } from "./store/store"


const DisplayProperties  = () => {
    
    const { setApplyBackground } = useApplyBackgroundStore(({ setApplyBackground }) => ({ setApplyBackground }))

    const { backgroundList, selectedBackground } = useBackgroundStore(({ backgroundList, selectedBackground }) => ({ backgroundList, selectedBackground }))

    const { setWallpaper } = useWallpaperStore(({ setWallpaper }) => ({ setWallpaper }))

    const { closeDisplayProperties } = useDisplayPropertiesStore(({ closeDisplayProperties }) => ({ closeDisplayProperties }))

    useEffect(() => {
        setWallpaper(selectedBackground.fileName !== '[None]' ? selectedBackground : backgroundList[0])
    }, [])
    
    const handleClose = useCallback(() => {
        closeDisplayProperties()
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