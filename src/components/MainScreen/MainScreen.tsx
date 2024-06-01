import DisplayProperties from "components/DispalyProperties/DisplayProperties";
import MainScreenContainer from "containers/MainScreenContainer/MainScreenContainer";
import { screenItems } from "containers/MainScreenContainer/screen-items";
import { useMemo, useState } from "react";
import { useBackgroundState, useDispaySettingsState, useStartMenuState, useWindowsRightClickMenuState } from "store/store";
import styled from "styled-components";

const ScreenWrapper = styled.div<{ backgroundurl: string }>`
    position: relative;
    height: 55rem;
    ${({ backgroundurl }) => backgroundurl !== '' && `background-image: url(${backgroundurl});`}
    ${({ backgroundurl }) => backgroundurl !== '' && `background-size: contain;`}
    background-position: center center;
    ${({ backgroundurl, theme }) => backgroundurl === '' && `background-color: ${theme.colors.windowsBg};`}
`

const ScreenMenu = styled.div<{ x: number, y: number }>`
    position: absolute;
    top: ${({ y }) => y}px;
    left: ${({ x }) => x}px;
    background-color: ${({ theme }) => theme.colors.menu};
    padding: 5px;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid white;
    border-top: 1px solid white;
`
const ScreenMenuItem = styled.div`
    font-family: mslevi;
    letter-spacing: 1px;
    font-weight: 500;

    &:hover {
        cursor: pointer;
        background-color: ${({ theme }) => theme.colors.buttonFace};
    }
`

const MainScreen = () => {
    const [offset, setOffset] = useState({ x: 0,  y: 0})
    const { closeStartMenu } = useStartMenuState()
    const { setDisplaySettingsOpen } = useDispaySettingsState()
    const { isOpen: rightMenuOpen, toggleRightMenu, closeRightMenu } = useWindowsRightClickMenuState()
    const { isOpen: isDisplayPropertiesOpen } = useDispaySettingsState()

    const { selectedBackground, applyBackground } = useBackgroundState()


    const mainScreenUrl = useMemo(() => isDisplayPropertiesOpen 
        ? applyBackground.url
        : selectedBackground.url
    , [isDisplayPropertiesOpen, applyBackground, selectedBackground])


    const handleClick = () => {
        closeStartMenu()
        closeRightMenu()
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setOffset({ x: e.clientX, y: e.clientY })
        toggleRightMenu()
    };

    return (
        <ScreenWrapper onContextMenu={handleContextMenu} backgroundurl={mainScreenUrl} onClick={handleClick} >
                
                { isDisplayPropertiesOpen && <DisplayProperties /> }

                {
                    rightMenuOpen && (
                        <ScreenMenu x={offset.x} y={offset.y} >
                            <ScreenMenuItem onClick={() => setDisplaySettingsOpen(true)}>
                                Dispaly Settings
                            </ScreenMenuItem>
                        </ScreenMenu>
                    )
                }
                <MainScreenContainer list={screenItems} />
        </ScreenWrapper>
    )
}

export default MainScreen