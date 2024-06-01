import styled from "styled-components"
import DisplayBackgorundOptionsItem from "./DisplayBackgorundOptionsItem"
import Select from "components/Select/Select"
import Button from "components/Button/Button"
import Underline from "components/Underline/Underline"
import { memo, useCallback, useContext, useEffect, useMemo, useState } from "react"
import DisplayContext, { patterListData } from "../context/DisplayContext"
import { useBackgroundState } from "store/store"
import BrowseImage from "components/BrowseImage/BrowseImage"
import { UserBackgroundUpload } from "store/types"
import { splitIntoLimitedLengthChunks } from "utils/functions"

const OptionsWrapper = styled.div`
    padding: 20px;
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
`

const DisabledButtonWrapper = styled.div`
    display: flex; 
    justify-content: flex-end; 
    margin-top: 5px; 
    margin-right: 10px; 
    margin-bottom: 5px;
`

interface DisabledButtonProps {
    readonly children: React.ReactNode
}

const DisabledButton = ({ children }: DisabledButtonProps) => {
    const style: React.CSSProperties = { 
        padding: '5px', 
        borderLeft: '1px solid white', 
        borderTop: '1px solid white', 
        borderBottom: '1px solid black', 
        borderRight: '2px solid black', 
        color: 'grey', 
        textShadow: 'white -1px 1px 0px'
    }
    return (
            <Button disabled style={style}>
                { children }
            </Button>
    )
}

const DisplayBackgorundOptionsContainer = () => {
    
    const { setWallpaper, wallpaper } = useContext(DisplayContext)

    const { addUserBackground, backgroundList } = useBackgroundState()

    const selectWallpaperList = useMemo(() => backgroundList.map(({ fileName }) => fileName ), [backgroundList])
    
    const initialSelectedIndex = useMemo(() => backgroundList.findIndex(({ fileName }) => fileName  === wallpaper.fileName), [backgroundList])


    const handleSelectedValue = useCallback((index: number) => {
        setWallpaper(backgroundList[index])
    }, [backgroundList])


    const handleImageAdditoin = (image: UserBackgroundUpload) => {
        addUserBackground(image)
        setWallpaper(image)
    }

    return (
        <OptionsWrapper>
            <DisplayBackgorundOptionsItem title="Pattern">
                <Select
                    initialSelectedIndex={0}
                    selectData={patterListData}
                    select={() => {}}
                    />
                <DisabledButtonWrapper>
                    <DisabledButton >
                        <Underline color="grey">E</Underline><span>dit Pattern</span>
                    </DisabledButton>
                </DisabledButtonWrapper>
            </DisplayBackgorundOptionsItem>
            <DisplayBackgorundOptionsItem title="Wallpaper">
                <Select 
                    initialSelectedIndex={initialSelectedIndex}
                    selectData={selectWallpaperList}
                    select={handleSelectedValue}
                />
                <DisabledButtonWrapper>
                    <BrowseImage saveImage={handleImageAdditoin}>
                        <Underline color="grey">B</Underline><span>rowse</span>
                    </BrowseImage>
                </DisabledButtonWrapper>
            </DisplayBackgorundOptionsItem>
        </OptionsWrapper>
    )
}

export default DisplayBackgorundOptionsContainer