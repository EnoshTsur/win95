import Window from "components/Window/Window"
import DisplayPropertiesContent from "./DisplayPropertiesContent"
import { useCallback, useEffect, useMemo } from "react"
import { ButtonProps } from "components/Button/Button"
import { BsQuestion } from 'react-icons/bs'
import { IoMdClose  } from "react-icons/io"
import { useMainScreenBackgroundStore } from "components/MainScreen/store/store"
import { useDisplayApplyBackgroundStore, useDisplayBackgroundStore, useDisplayModalStore } from "./store/store"


const DisplayProperties  = () => {
    
    const { setDisplayApplyBackground } = useDisplayApplyBackgroundStore(({ setDisplayApplyBackground }) => ({ setDisplayApplyBackground }))

    const { mainScreenBackgroundList, mainScreenSelectedBackground } = useMainScreenBackgroundStore(({ mainScreenBackgroundList, mainScreenSelectedBackground }) => ({ 
        mainScreenBackgroundList, 
        mainScreenSelectedBackground 
    }))

    const { setDisplayBackground } = useDisplayBackgroundStore(({ setDisplayBackground }) => ({ setDisplayBackground }))

    const { closeDisplayProperties } = useDisplayModalStore(({ closeDisplayProperties }) => ({ closeDisplayProperties }))

    useEffect(() => {
        setDisplayBackground(mainScreenSelectedBackground.fileName !== '[None]' ? mainScreenSelectedBackground : mainScreenBackgroundList[0])
    }, [])
    
    const handleClose = useCallback(() => {
        closeDisplayProperties()
        setDisplayApplyBackground(mainScreenSelectedBackground)
        setDisplayBackground(mainScreenSelectedBackground)
    }, [mainScreenSelectedBackground])

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