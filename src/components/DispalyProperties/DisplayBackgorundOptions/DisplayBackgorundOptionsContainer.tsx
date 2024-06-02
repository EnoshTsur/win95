import styled from "styled-components"
import DisplayBackgorundOptionsItem from "./DisplayBackgorundOptionsItem"
import Button from "components/Button/Button"
import Underline from "components/Underline/Underline"
import {  useCallback, useEffect, useMemo, useState } from "react"
import { useBackgroundState } from "store/store"
import BrowseImage from "components/BrowseImage/BrowseImage"
import { UserBackgroundUpload } from "store/types"
import Select from "components/Select/Select"

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
    
    const patterListData: ReadonlyArray<string> = [
        '[None]', 'Bricks', 'Buttons', 'Cargo Net', 'Circuits'
    ]

    const [{ selectedWallpaperItemIndex, selectedWallpaperChunkIndex }, setSelectedWallpaperIndexes ] = useState({ 
        selectedWallpaperItemIndex: 0, 
        selectedWallpaperChunkIndex: 0
    })

    const [{ selectedPatternItemIndex, selectedPatternChunkIndex }, setSelectedPatternIndexes ] = useState({ 
        selectedPatternItemIndex: 0, 
        selectedPatternChunkIndex: 0
    })


    const { addUserBackground, backgroundList, wallpaper, setWallpaper } = useBackgroundState()

    const selectWallpaperList = useMemo(() => backgroundList.map(({ fileName }) => fileName ), [backgroundList])
    
    useEffect(() => {
       const flatternIndex = backgroundList.findIndex(({ fileName }) => fileName  === wallpaper.fileName)
       const chunkIndex = Math.floor(flatternIndex / 5)
       const itemIndex = flatternIndex % 5
       setSelectedWallpaperIndexes({ selectedWallpaperChunkIndex: chunkIndex, selectedWallpaperItemIndex: itemIndex })
    }, [])


    const handleImageAdditoin = useCallback((image: UserBackgroundUpload) => {
        addUserBackground(image)
        setWallpaper(image)
        setSelectedWallpaperIndexes({ selectedWallpaperChunkIndex: 0, selectedWallpaperItemIndex: 0})
    }, [backgroundList, wallpaper])


    const handleSelectedIndex = useCallback((index: number) => {
        const flatternIndex = selectedWallpaperChunkIndex * 5 + index
        setWallpaper(backgroundList[flatternIndex])
        setSelectedWallpaperIndexes((pre) => ({...pre, selectedWallpaperItemIndex: index }))
    }, [backgroundList, wallpaper, selectWallpaperList])


    const handleSelectedChunk = useCallback((index: number) => {
        const itemIndex = index > selectedWallpaperChunkIndex ? 0 : 4
        const flatternIndex = index * 5 + itemIndex
        setWallpaper(backgroundList[flatternIndex])
        setSelectedWallpaperIndexes(() => ({ selectedWallpaperItemIndex: itemIndex, selectedWallpaperChunkIndex: index }))
    }, [backgroundList, wallpaper, selectedWallpaperItemIndex, selectedWallpaperChunkIndex, selectWallpaperList])

    return (
        <OptionsWrapper>
            <DisplayBackgorundOptionsItem title="Pattern">
                <Select
                    selectData={patterListData} 
                    chunkSize={5}
                    selectedChunkIndex={selectedPatternChunkIndex}
                    selectedItemIndex={selectedPatternItemIndex}
                    onChunkChange={() => {}}
                    onItemChange={() => {}}
                />
                <DisabledButtonWrapper>
                    <DisabledButton >
                        <Underline color="grey">E</Underline><span>dit Pattern</span>
                    </DisabledButton>
                </DisabledButtonWrapper>
            </DisplayBackgorundOptionsItem>
            <DisplayBackgorundOptionsItem title="Wallpaper">
                <Select
                    selectData={selectWallpaperList} 
                    chunkSize={5}
                    selectedChunkIndex={selectedWallpaperChunkIndex}
                    selectedItemIndex={selectedWallpaperItemIndex}
                    onChunkChange={handleSelectedChunk}
                    onItemChange={handleSelectedIndex}
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