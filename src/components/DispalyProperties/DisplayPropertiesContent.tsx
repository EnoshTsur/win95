import styled from "styled-components";
import Computer from "./Computer/Computer";
import DisplayBackgorundOptionsContainer from "./DisplayBackgorundOptions/DisplayBackgorundOptionsContainer";
import { useCallback, useMemo } from "react";
import DisplayTabs from "./DisplayTabs/DisplayTabs";
import PannelButtonsContainer from "components/PanelButton/PannelButtonsContainer";
import { useMainScreenBackgroundSizeStore, useMainScreenBackgroundStore } from "components/MainScreen/store/store";
import { useDisplayApplyBackgroundStore, useDisplayBackgroundStore, useDisplayModalStore } from "./store/store";

const DisplayWrapper = styled.div`
    width: 500px;
    position: relative;
`

const DisplayMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
    border-left: 2px solid ${({ theme }) => theme.colors.white };
    border-top: 2px solid ${({ theme }) => theme.colors.white };
    border-bottom: 2px solid ${({ theme }) => theme.colors.black };
    border-right: 2px solid ${({ theme }) => theme.colors.black };
    padding: 5px;
`   

interface DisplayAlertContentProps {
    readonly handleClose: () => void
}


const DisplayPropertiesContent = ({ handleClose }: DisplayAlertContentProps) => {

    const { displayApplyBackground, setDisplayApplyBackground } = useDisplayApplyBackgroundStore(({ 
        displayApplyBackground, 
        setDisplayApplyBackground 
    }) => ({ 
        displayApplyBackground, 
        setDisplayApplyBackground,
    }))

    const {mainScreenBackgroundList, mainScreenSelectedBackground, setMainScreenSelectedBackground} = useMainScreenBackgroundStore(({ 
        mainScreenBackgroundList, 
        mainScreenSelectedBackground, 
        setMainScreenSelectedBackground 
    }) => ({
        mainScreenBackgroundList,
        mainScreenSelectedBackground,
        setMainScreenSelectedBackground
    }))

    const { displayBackground, displayBackgroundSize } = useDisplayBackgroundStore(({ displayBackground, displayBackgroundSize }) => ({ 
        displayBackground, 
        displayBackgroundSize 
    }))

    const { closeDisplayProperties } = useDisplayModalStore(({ closeDisplayProperties }) => ({ closeDisplayProperties }))

    const { mainScreenBackgroundSize, setMainScreenBackgroundSize } = useMainScreenBackgroundSizeStore(({ mainScreenBackgroundSize, setMainScreenBackgroundSize }) => ({ 
        mainScreenBackgroundSize, 
        setMainScreenBackgroundSize 
    }))

    const { displayApplyBackgroundSize, setDisplayApplyBackgroundSize } = useDisplayApplyBackgroundStore(({ displayApplyBackgroundSize, setDisplayApplyBackgroundSize }) => ({ 
        displayApplyBackgroundSize,
        setDisplayApplyBackgroundSize 
    }))

    const isApplyAllowed = useMemo(() => {
        if (displayApplyBackground.fileName !== '[None]') {
            return displayApplyBackground.fileName !== displayBackground.fileName 
                || displayBackgroundSize !== displayApplyBackgroundSize
        }
        return displayBackground.fileName != mainScreenSelectedBackground.fileName
    }, [displayApplyBackground, displayBackground, displayApplyBackgroundSize, displayBackgroundSize, mainScreenSelectedBackground])


    const handleOk = useCallback(() => {
        setMainScreenSelectedBackground(displayBackground)
        setDisplayApplyBackground(displayBackground)
        closeDisplayProperties()
        setMainScreenBackgroundSize(displayBackgroundSize)
    }, [displayBackground, mainScreenBackgroundList, displayBackgroundSize])

    const handleApply = useCallback(() => {        
        debugger
        setDisplayApplyBackground(displayBackground)
        setDisplayApplyBackgroundSize(displayBackgroundSize)
    }, [displayBackground, displayBackgroundSize])

    const buttonsData = useMemo(() => [
        {
            children: 'Ok',
            onClick: handleOk,
        },
        {
            children: 'Cancel',
            onClick: handleClose
        },
        {
            children: 'Apply',
            onClick: handleApply,
            disabled: !isApplyAllowed
        }
    ], [isApplyAllowed, displayBackground])

    return (
            <DisplayWrapper>
                <DisplayTabs />
                <DisplayMain>
                    <Computer />
                    <DisplayBackgorundOptionsContainer />
                </DisplayMain>
                <PannelButtonsContainer data={buttonsData} style={{ justifyContent: 'flex-end'}}/>
            </DisplayWrapper>
    )
}

export default DisplayPropertiesContent