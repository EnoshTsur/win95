import styled from "styled-components";
import Computer from "./Computer/Computer";
import DisplayBackgorundOptionsContainer from "./DisplayBackgorundOptions/DisplayBackgorundOptionsContainer";
import { useCallback, useMemo } from "react";
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


const DisplayPropertiesContent = ({ handleClose }: DisplayAlertContentProps) => {

    const { applyBackground, backgroundList, setApplyBackground, setSelectedBackground, setWallpaperSelection, selectedBackground, wallpaper } = useBackgroundState(({ 
        applyBackground, 
        backgroundList,
        setApplyBackground,
        setSelectedBackground,
        setWallpaperSelection,
        selectedBackground, 
        wallpaper,
    }) => ({ 
        applyBackground, 
        backgroundList,
        setApplyBackground,
        setSelectedBackground,
        setWallpaperSelection,
        selectedBackground, 
        wallpaper, 
    }))

    const { setDisplaySettingsOpen } = useDispaySettingsState()

    const isApplyAllowed = useMemo(() => {
        if (applyBackground.fileName !== '[None]') {
            return applyBackground.fileName !== wallpaper.fileName
        }
        return wallpaper.fileName != selectedBackground.fileName
    }, [applyBackground, wallpaper, selectedBackground])


    const handleOk = useCallback(() => {
        setSelectedBackground(wallpaper)
        setApplyBackground(wallpaper)
        setDisplaySettingsOpen(false)
    }, [wallpaper, backgroundList])

    const handleApply = useCallback(() => {          
        setApplyBackground(wallpaper)
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
    ], [isApplyAllowed, wallpaper])

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