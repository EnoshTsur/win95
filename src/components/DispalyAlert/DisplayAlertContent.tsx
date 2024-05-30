import styled from "styled-components";
import Computer from "./Computer/Computer";
import DisplayBackgorundOptionsContainer from "./DisplayBackgorundOptions/DisplayBackgorundOptionsContainer";
import DisplayContext from "./context/DisplayContext";
import { useContext, useMemo } from "react";
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

interface DisplayAlertContentProps {
    readonly handleClose: () => void
}


const DisplayAlertContent = ({ handleClose }: DisplayAlertContentProps) => {

    const { wallpaper } = useContext(DisplayContext)
    const { backgroundUrl, setBackgroundUrl, applyBackgroundUrl, setApplyBackgroundUrl } = useBackgroundState()
    const { setDisplaySettingsOpen } = useDispaySettingsState()

    const isApplyAllowed = useMemo(() => {
        if (applyBackgroundUrl !== '') {
            return applyBackgroundUrl !== wallpaper
        }
        return wallpaper != backgroundUrl
    }, [applyBackgroundUrl, wallpaper, backgroundUrl])


    const handleOk = () => {
        setBackgroundUrl(wallpaper)
        setApplyBackgroundUrl(wallpaper)
        setDisplaySettingsOpen(false)
    }

    const handleApply = () => {                
        setApplyBackgroundUrl(wallpaper)
    }

    return (
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
                    <PanelButton onClick={handleClose}>Cancel</PanelButton>
                    <PanelButton disabled={!isApplyAllowed} onClick={handleApply}>Apply</PanelButton>
                </div>
            </DisplayWrapper>
    )
}

export default DisplayAlertContent