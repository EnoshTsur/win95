import styled from "styled-components";
import Computer from "./Computer/Computer";
import DisplayBackgorundOptionsContainer from "./DisplayBackgorundOptions/DisplayBackgorundOptionsContainer";
import DisplayContext from "./context/DisplayContext";
import { useCallback, useContext, useMemo } from "react";
import { useBackgroundState, useDispaySettingsState } from "store/store";
import DisplayTabs from "./DisplayTabs/DisplayTabs";
import PannelButtonsContainer from "components/PanelButton/PannelButtonsContainer";

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


    const handleOk = useCallback(() => {
        setBackgroundUrl(wallpaper)
        setApplyBackgroundUrl(wallpaper)
        setDisplaySettingsOpen(false)
    }, [wallpaper])

    const handleApply = useCallback(() => {                
        setApplyBackgroundUrl(wallpaper)
    }, [wallpaper])

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
    ], [isApplyAllowed])

    return (
            <DisplayWrapper>
                <DisplayTabs />
                <DisplayMain>
                    <Computer />
                    <DisplayBackgorundOptionsContainer />
                </DisplayMain>
                <PannelButtonsContainer data={buttonsData} />
            </DisplayWrapper>
    )
}

export default DisplayAlertContent