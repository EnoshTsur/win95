import styled from "styled-components";
import Computer from "./Computer/Computer";
import DisplayBackgorundOptionsContainer from "./DisplayBackgorundOptions/DisplayBackgorundOptionsContainer";
import DisplayContext, { mapToWallPaper, wallpaperListData } from "./context/DisplayContext";
import { useCallback, useMemo, useState } from "react";
import { useBackgroundState, useDispaySettingsState } from "store/store";
import PanelButton from "components/PanelButton/PanelButton";

const DisplayWrapper = styled.div`
    width: 500px;
    position: relative;
`
const TabsArea = styled.div`
    height: 39px;
`

const TabsContainer = styled.div`
    display: flex;
    gap; 2px;
    padding-left: 10px;
    top: 10px;
    position: absolute;
    background: ${({ theme }) => theme.colors.menu};
    z-index: 10;
`

const TabItem = styled.div<{ chosen: number }>`
    display: flex;
    padding: 5px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-top: 2px solid ${({ theme }) => theme.colors.white};
    border-right: 2px solid ${({ theme }) => theme.colors.darkShadow};
    border-bottom: ${({ theme, chosen }) => chosen === 0 ? 'none' : `2px solid ${theme.colors.white}` };
    font-family: mslevi;
    font-size: 14px;

    &:hover{
        cursor: ${({ chosen }) => chosen === 0 ? 'inherit' : 'pointer'};
        background-color: ${({ theme }) => theme.colors.buttonFace}
    }
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

const tabs = ['Background', 'Screen Saver', 'Appearance', 'Settings']

const DisplayAlertContent = () => {

    const [ wallpaper, setWallpaper ] = useState(wallpaperListData[0])
    const { backgroundUrl, setBackgroundUrl } = useBackgroundState()
    const { setDisplaySettingsOpen } = useDispaySettingsState()

    const isTheSameWallpaper = useMemo(() => mapToWallPaper(wallpaper) === backgroundUrl, [wallpaper, backgroundUrl])

    const handleOk = () => {
        if (!isTheSameWallpaper) {
            setBackgroundUrl(mapToWallPaper(wallpaper))
        }
        setDisplaySettingsOpen(false)
    }

    const handleApply = () => {
        setBackgroundUrl(mapToWallPaper(wallpaper))
    }

    const handleCancel = () => {
        setDisplaySettingsOpen(false)
    }

    return (
        <DisplayContext.Provider value={{ wallpaper, setWallpaper }}>
            <DisplayWrapper>
                <TabsContainer>
                    { tabs.map((title, i) => (
                        <TabItem key={title} chosen={i} >
                            { title }
                        </TabItem>
                    ))}
                </TabsContainer>
                <TabsArea />
                <DisplayMain>
                    <Computer />
                    <DisplayBackgorundOptionsContainer />
                </DisplayMain>
                <div style={{ padding: '1rem', gap: '5px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <PanelButton onClick={handleOk}>Ok</PanelButton>
                    <PanelButton onClick={handleCancel}>Cancel</PanelButton>
                    <PanelButton disabled={isTheSameWallpaper} onClick={handleApply}>Apply</PanelButton>
                </div>
            </DisplayWrapper>
        </DisplayContext.Provider>
    )
}

export default DisplayAlertContent