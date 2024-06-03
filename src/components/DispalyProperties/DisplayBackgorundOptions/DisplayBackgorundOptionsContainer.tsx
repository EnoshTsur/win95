import styled from "styled-components"
import DisplayBackgorundOptionsItem from "./DisplayBackgorundOptionsItem"
import Button from "components/Button/Button"
import Underline from "components/Underline/Underline"
import {  useCallback, useEffect, useMemo, useState } from "react"
import BrowseImage from "components/BrowseImage/BrowseImage"
import Select from "components/Select/Select"
import { useBackgroundStore, useWallpaperStore } from "../store/store"
import { Background } from "../store/types"

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
    
    const patterListData: ReadonlyArray<string> = useMemo(() => [
        '[None]', 'Bricks', 'Buttons', 'Cargo Net', 'Circuits'
    ], [])

    const [{ selectedPatternItemIndex, selectedPatternChunkIndex }, setSelectedPatternIndexes ] = useState({ 
        selectedPatternItemIndex: 0, 
        selectedPatternChunkIndex: 0
    })

    const { backgroundList, addUserBackground } = useBackgroundStore(({ backgroundList, addUserBackground }) => ({ backgroundList, addUserBackground}))

    const {
        wallpaper,
        wallpaperSelection,
        setWallpaper,
        setWallpaperActiveIndex,
        setWallpaperSelection,
    } = useWallpaperStore(({
        wallpaper, 
        wallpaperSelection, 
        setWallpaper,
        setWallpaperActiveIndex, 
        setWallpaperSelection 
    }) => ({
        wallpaper,
        wallpaperSelection,
        setWallpaper,
        setWallpaperActiveIndex,
        setWallpaperSelection
    }))

    const selectWallpaperList = useMemo(() => backgroundList.map(({ fileName }) => fileName ), [backgroundList])

    const computeWallpaperSelection = useCallback(() => {
        const flatternIndex = backgroundList.findIndex(({ fileName }) => fileName  === wallpaper.fileName)
        const chunkIndex = Math.floor(flatternIndex / 5)
        const itemIndex = flatternIndex % 5
        return { activeSelectedChunk: chunkIndex, activeSelectedIndex: itemIndex }
    }, [backgroundList])
    
    useEffect(() => {
       const activeSelection = computeWallpaperSelection()
       setWallpaperSelection(activeSelection)
    }, [])


    const handleImageAdditoin = useCallback((image: Background) => {
        addUserBackground(image)
        setWallpaper(image)
        setWallpaperSelection({ activeSelectedChunk: 0, activeSelectedIndex: 1})
    }, [backgroundList, wallpaper])


    const handleWallpaperSelectedIndex = useCallback((index: number) => {
        debugger
        const flatternIndex = wallpaperSelection.activeSelectedChunk * 5 + index
        setWallpaper(backgroundList[flatternIndex])
        setWallpaperActiveIndex(index)

    }, [backgroundList, wallpaper, wallpaperSelection, selectWallpaperList])


    const handleWallpaperSelectedChunk = useCallback((index: number) => {
        debugger
        const itemIndex = index > wallpaperSelection.activeSelectedChunk ? 0 : 4
        const flatternIndex = index * 5 + itemIndex
        setWallpaper(backgroundList[flatternIndex])
        setWallpaperSelection(({ activeSelectedIndex: itemIndex, activeSelectedChunk: index }))

    }, [backgroundList, wallpaper, wallpaperSelection, selectWallpaperList])

    const handlePatternSelectedIndex = useCallback((index: number) => {
        setSelectedPatternIndexes((pre) => ({ ...pre, selectedPatternItemIndex: index }))
    }, [selectedPatternItemIndex])


    const handlePatternSelectedChunk = useCallback((index: number) => {
        setSelectedPatternIndexes((pre) => ({...pre, selectedPatternChunkIndex: index }))
    }, [selectedPatternChunkIndex])

    return (
        <OptionsWrapper>
            <DisplayBackgorundOptionsItem title="Pattern">
                <Select
                    tabIndex={1}
                    selectData={patterListData} 
                    chunkSize={5}
                    selectedChunkIndex={selectedPatternChunkIndex}
                    selectedItemIndex={selectedPatternItemIndex}
                    onChunkChange={handlePatternSelectedChunk}
                    onItemChange={handlePatternSelectedIndex}
                />
                <DisabledButtonWrapper>
                    <DisabledButton >
                        <Underline color="grey">E</Underline><span>dit Pattern</span>
                    </DisabledButton>
                </DisabledButtonWrapper>
            </DisplayBackgorundOptionsItem>
            <DisplayBackgorundOptionsItem title="Wallpaper">
                <Select
                    tabIndex={2}
                    selectData={selectWallpaperList} 
                    chunkSize={5}
                    selectedChunkIndex={wallpaperSelection.activeSelectedChunk}
                    selectedItemIndex={wallpaperSelection.activeSelectedIndex}
                    onChunkChange={handleWallpaperSelectedChunk}
                    onItemChange={handleWallpaperSelectedIndex}
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