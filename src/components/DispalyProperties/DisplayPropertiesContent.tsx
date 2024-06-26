import styled from "styled-components";
import Computer from "./Computer/Computer";
import DisplayBackgorundOptionsContainer from "./DisplayBackgorundOptions/DisplayBackgorundOptionsContainer";
import { useCallback, useMemo } from "react";
import DisplayTabs from "./DisplayTabs/DisplayTabs";
import PannelButtonsContainer from "components/PanelButton/PannelButtonsContainer";
import { useMainScreenBackgroundSizeStore, useMainScreenBackgroundStore } from "components/MainScreen/store/store";
import { useApplyBackgroundSizeStore, useDisplayApplyBackgroundStore, useDisplayBackgroundSizeStore, useDisplayBackgroundStore, useDisplayModalStore } from "./store/store";

const DisplayWrapper = styled.div`
    width: 31.5rem;
    position: relative;
    background-color: ${({ theme }) => theme.colors.menu };
`

const DisplayMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 0.6rem;
    border-left: 2px solid ${({ theme }) => theme.colors.white };
    border-top: 2px solid ${({ theme }) => theme.colors.white };
    border-bottom: 2px solid ${({ theme }) => theme.colors.black };
    border-right: 2px solid ${({ theme }) => theme.colors.black };
    padding: 0.3rem;
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

    const { displayBackground } = useDisplayBackgroundStore(({ displayBackground }) => ({ 
        displayBackground 
    }))

    const {applyBackgroundSize, setApplyBackgroundSize} = useApplyBackgroundSizeStore(({ applyBackgroundSize, setApplyBackgroundSize }) => ({ 
        applyBackgroundSize, 
        setApplyBackgroundSize 
    }))

    const { displayBackgroundSize } = useDisplayBackgroundSizeStore(({ displayBackgroundSize }) => ({ displayBackgroundSize }))

    const { closeDisplayProperties } = useDisplayModalStore(({ closeDisplayProperties }) => ({ closeDisplayProperties }))

    const { setMainScreenBackgroundSize } = useMainScreenBackgroundSizeStore(({ mainScreenBackgroundSize, setMainScreenBackgroundSize }) => ({ 
        mainScreenBackgroundSize, 
        setMainScreenBackgroundSize 
    }))

    const isApplyAllowed = useMemo(() => {
        if (displayApplyBackground.fileName !== '[None]') {
            return displayApplyBackground.fileName !== displayBackground.fileName 
                || displayBackgroundSize !== applyBackgroundSize
        }
        return displayBackground.fileName != mainScreenSelectedBackground.fileName
    }, [displayApplyBackground, displayBackground, applyBackgroundSize, displayBackgroundSize, mainScreenSelectedBackground, mainScreenBackgroundList])


    const handleOk = useCallback(() => {
        setMainScreenSelectedBackground(displayBackground)
        setDisplayApplyBackground(displayBackground)
        setMainScreenBackgroundSize(displayBackgroundSize)
        setApplyBackgroundSize(displayBackgroundSize)
        closeDisplayProperties()
    }, [displayBackground, mainScreenBackgroundList, displayBackgroundSize])

    const handleApply = useCallback(() => {        
        setDisplayApplyBackground(displayBackground)
        setApplyBackgroundSize(displayBackgroundSize)
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
    ], [isApplyAllowed, displayBackground, displayBackgroundSize])

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