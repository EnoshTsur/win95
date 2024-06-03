import DisplayProperties from "components/DispalyProperties/DisplayProperties";
import { useDisplayPropertiesStore } from "components/DispalyProperties/store/store";
import ScreenMenu from "components/ScreenMenu/ScreenMenu";
import { useScreenMenuStore } from "components/ScreenMenu/store/store";
import MainScreenContainer from "containers/MainScreenContainer/MainScreenContainer";
import { screenItems } from "containers/MainScreenContainer/screen-items";
import { useMemo, useState } from "react";
import { useStartMenuState } from "store/store";
import styled from "styled-components";
import { useMainScreenApplyBackgroundStore, useMainScreenBackgroundStore } from "./store/store";

const ScreenWrapper = styled.div<{ backgroundurl: string }>`
    position: relative;
    height: 55rem;
    ${({ backgroundurl }) => backgroundurl !== '' && `background-image: url(${backgroundurl});`}
    ${({ backgroundurl }) => backgroundurl !== '' && `background-size: contain;`}
    background-position: center center;
    ${({ backgroundurl, theme }) => backgroundurl === '' && `background-color: ${theme.colors.windowsBg};`}
`

const MainScreen = () => {
    const [offset, setOffset] = useState({ x: 0,  y: 0})

    const { closeStartMenu } = useStartMenuState()

    const { isScreenMenuOpen, closeScreenMenu, openScreenMenu, } = useScreenMenuStore(({ 
        isScreenMenuOpen, 
        closeScreenMenu, 
        openScreenMenu 
    }) => ({ isScreenMenuOpen, closeScreenMenu, openScreenMenu}))

    const { isDisplayPropertiesOpen } = useDisplayPropertiesStore(({ isDisplayPropertiesOpen }) => ({ isDisplayPropertiesOpen }))


    const { applyBackground } = useMainScreenApplyBackgroundStore(({ applyBackground }) => ({ 
        applyBackground, 
    }))

    const { selectedBackground } = useMainScreenBackgroundStore(({ selectedBackground }) => ({ selectedBackground }))


    const mainScreenUrl = useMemo(() => isDisplayPropertiesOpen 
        ? applyBackground.url
        : selectedBackground.url
    , [isScreenMenuOpen, applyBackground, selectedBackground])


    const handleClick = () => {
        closeStartMenu()
        closeScreenMenu()
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setOffset({ x: e.clientX, y: e.clientY })
        openScreenMenu()
    };

    return (
        <ScreenWrapper onContextMenu={handleContextMenu} backgroundurl={mainScreenUrl} onClick={handleClick} >
                
                { isDisplayPropertiesOpen && <DisplayProperties /> }

                {
                    isScreenMenuOpen && ( <ScreenMenu offset={offset} /> )
                }
                <MainScreenContainer list={screenItems} />
        </ScreenWrapper>
    )
}

export default MainScreen