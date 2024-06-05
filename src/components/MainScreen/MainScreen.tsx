import DisplayProperties from "components/DispalyProperties/DisplayProperties";
import { useApplyBackgroundSizeStore, useDisplayApplyBackgroundStore, useDisplayModalStore } from "components/DispalyProperties/store/store";
import ScreenMenu from "components/Menu/Menu";
import { useScreenMenuStore } from "components/Menu/store/store";
import MainScreenContainer from "components/MainScreen/MainScreenContainer";
import { useMemo, useRef, useState } from "react";
import { useStartMenuState } from "store/store";
import styled from "styled-components";
import { useMainScreenBackgroundSizeStore, useMainScreenBackgroundStore, useMainScreenItemsStore } from "./store/store";
import useScreenMenuItems from "components/Menu/useScreenMenuItems";
import { useFileExplorerStore } from "components/FileExplorer/store/store";
import FileExplorer from "components/FileExplorer/FileExplorer";
import useFileExplorer from "components/FileExplorer/hooks/useFileExplorer";

const ScreenWrapper = styled.div<{ backgroundurl: string, backgroundsize: string }>`
    position: relative;
    height: 55rem;
    ${({ backgroundurl }) => backgroundurl !== '' && `background-image: url(${backgroundurl});`}
    ${({ backgroundurl, backgroundsize }) => backgroundurl !== '' && `background-size: ${backgroundsize};`}
    background-position: center center;
    background-repeat: no-repeat;
    background-color: ${({ theme }) => theme.colors.windowsBg};
`

const MainScreen = () => {

    useFileExplorer()
    
    const [offset, setOffset] = useState({ x: 0,  y: 0})

    const ref = useRef(null)

    const { screenMenuItems } = useScreenMenuItems()

    const { closeStartMenu } = useStartMenuState()

    const { isScreenMenuOpen, closeScreenMenu, openScreenMenu, } = useScreenMenuStore(({ 
        isScreenMenuOpen, 
        closeScreenMenu, 
        openScreenMenu 
    }) => ({ isScreenMenuOpen, closeScreenMenu, openScreenMenu}))

    const { isDisplayPropertiesOpen } = useDisplayModalStore(({ isDisplayPropertiesOpen }) => ({ isDisplayPropertiesOpen }))


    const { displayApplyBackground } = useDisplayApplyBackgroundStore(({ displayApplyBackground }) => ({ 
        displayApplyBackground, 
    }))

    const {applyBackgroundSize} = useApplyBackgroundSizeStore(({ applyBackgroundSize }) => ({ applyBackgroundSize }))

    const { mainScreenSelectedBackground } = useMainScreenBackgroundStore(({ mainScreenSelectedBackground }) => ({ mainScreenSelectedBackground }))

    const { mainScreenBackgroundSize } = useMainScreenBackgroundSizeStore(({ mainScreenBackgroundSize }) => ({ mainScreenBackgroundSize }))

    const { setMainScreenActiveItem } = useMainScreenItemsStore(({ setMainScreenActiveItem }) => ({ setMainScreenActiveItem }))

    const { activeExplorer, openExplorers } = useFileExplorerStore(({ activeExplorer, openExplorers }) => ({ activeExplorer, openExplorers }))

    const mainScreenUrl = useMemo(() => isDisplayPropertiesOpen 
        ? displayApplyBackground.url
        : mainScreenSelectedBackground.url
    , [isDisplayPropertiesOpen, displayApplyBackground, mainScreenSelectedBackground])

    const backgroundSize = useMemo(() => isDisplayPropertiesOpen 
    ? applyBackgroundSize
    : mainScreenBackgroundSize
    , [isDisplayPropertiesOpen, applyBackgroundSize, mainScreenBackgroundSize])


    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        closeStartMenu()
        closeScreenMenu()
        if (e.target === ref.current) {
            setMainScreenActiveItem(-1)
        }
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setOffset({ x: e.clientX, y: e.clientY })
        openScreenMenu()
    };


    return (
        <ScreenWrapper ref={ref} onContextMenu={handleContextMenu} backgroundurl={mainScreenUrl} backgroundsize={backgroundSize} onClick={handleClick} >
                { isDisplayPropertiesOpen && <DisplayProperties /> }
                { activeExplorer !== '' && openExplorers.map(({ id }) => (
                    <FileExplorer key={id} />
                ))}

                {
                    isScreenMenuOpen && ( <ScreenMenu menuItems={screenMenuItems} offset={offset} /> )
                }
                <MainScreenContainer />
        </ScreenWrapper>
    )
}

export default MainScreen