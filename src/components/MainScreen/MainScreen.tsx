import Alert from "components/Alert/Alert";
import DisplayAlertContent from "components/DispalyAlertContent/DisplayAlertContent";
import MainScreenContainer from "containers/MainScreenContainer/MainScreenContainer";
import { screenItems } from "containers/MainScreenContainer/screen-items";
import { useState } from "react";
import { useBackgroundState, useDispaySettingsState, useStartMenuState, useWindowsRightClickMenuState } from "store/store";
import styled from "styled-components";

const ScreenWrapper = styled.div<{ backgroundurl: string }>`
    position: relative;
    height: 40rem;
    background-color: ${({ theme }) => theme.colors.windowsBg};
    background-image: ${({ backgroundurl }) => backgroundurl !== '[None]' ? `url(${backgroundurl})` : 'none'}; 
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
    bordre-top: 1px solid white;
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
    const { isOpen: displayOpen, setDisplaySettingsOpen } = useDispaySettingsState()
    const { isOpen: rightMenuOpen, toggleRightMenu, closeRightMenu } = useWindowsRightClickMenuState()

    const { backgroundUrl } = useBackgroundState()

    const handleClick = () => {
        closeStartMenu()
        closeRightMenu()
    }

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setOffset({ x: e.clientX, y: e.clientY })
        toggleRightMenu()
    };

    const handleCloseDispaly = () => {
        setDisplaySettingsOpen(false)
    }

    return (
        <ScreenWrapper onContextMenu={handleContextMenu} backgroundurl={backgroundUrl} onClick={handleClick} >

            { rightMenuOpen && (
                <ScreenMenu x={offset.x} y={offset.y} >
                    <ScreenMenuItem onClick={() => setDisplaySettingsOpen(true)}>
                        Dispaly Settings
                    </ScreenMenuItem>
                </ScreenMenu>
            )
            }

            { displayOpen && (
                <Alert title="Display properties" onClose={handleCloseDispaly}>
                    <DisplayAlertContent />
                </Alert>
                )
            }
            <MainScreenContainer list={screenItems} />
        </ScreenWrapper>
    )
}

export default MainScreen