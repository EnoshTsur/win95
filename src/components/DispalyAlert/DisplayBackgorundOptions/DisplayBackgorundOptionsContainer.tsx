import styled from "styled-components"
import DisplayBackgorundOptionsItem from "./DisplayBackgorundOptionsItem"
import Select from "components/Select/Select"
import Button from "components/Button/Button"
import Underline from "components/Underline/Underline"
import { useContext, useMemo, useState } from "react"
import DisplayContext, { patterListData, wallpaperListData } from "../context/DisplayContext"
import { useBackgroundState } from "store/store"

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

    const { setWallpaper } = useContext(DisplayContext)
    const { backgroundUrl } = useBackgroundState()

    const handleSelectedWallpaper = (index: number) => {
        setWallpaper(wallpaperListData[index])
    }

    const initialSelectedIndex = useMemo(() => wallpaperListData.findIndex((bg) => bg  === backgroundUrl) ?? 0, [backgroundUrl])

    return (
        <OptionsWrapper>
            <DisplayBackgorundOptionsItem title="Pattern">
                <Select setSelectedValue={() => {}} listData={patterListData} />
                <DisabledButtonWrapper>
                    <DisabledButton >
                        <Underline color="grey">E</Underline><span>dit Pattern</span>
                    </DisabledButton>
                </DisabledButtonWrapper>
            </DisplayBackgorundOptionsItem>
            <DisplayBackgorundOptionsItem title="Wallpaper">
                <Select 
                    initialSelectedIndex={initialSelectedIndex}
                    setSelectedValue={handleSelectedWallpaper} 
                    listData={wallpaperListData} 
                />
                <DisabledButtonWrapper>
                    <DisabledButton>
                        <Underline color="grey">B</Underline><span>rowse</span>
                    </DisabledButton>
                </DisabledButtonWrapper>
            </DisplayBackgorundOptionsItem>
        </OptionsWrapper>
    )
}

export default DisplayBackgorundOptionsContainer