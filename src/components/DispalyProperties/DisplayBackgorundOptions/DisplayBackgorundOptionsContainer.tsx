import styled from "styled-components"
import DisplayBackgorundOptionsItem from "./DisplayBackgorundOptionsItem"
import Button from "components/Button/Button"
import Underline from "components/Underline/Underline"
import {  useCallback, useEffect, useMemo, useState } from "react"
import BrowseImage from "components/BrowseImage/BrowseImage"
import Select from "components/Select/Select"
import DisplayBackgroundSize from "../DisplayBackgroundSize/DisplayBackgroundSize"
import { useMainScreenBackgroundStore } from "components/MainScreen/store/store"
import { useDisplayBackgroundStore } from "../store/store"
import { Background } from "components/MainScreen/store/types"

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

    const { mainScreenBackgroundList, addUserBackground } = useMainScreenBackgroundStore(({ mainScreenBackgroundList, addUserBackground }) => ({ 
        mainScreenBackgroundList, 
        addUserBackground
    }))

    const { 
        displayBackground,
        displayBackgroundSelection,
        setDisplayBackground,
        setDisplayBackgroundActiveIndex,
        setDisplayBackgroundSelection,
    } = useDisplayBackgroundStore(({ 
        displayBackground,
        displayBackgroundSelection,
        setDisplayBackground,
        setDisplayBackgroundActiveIndex,
        setDisplayBackgroundSelection,
    }) => ({
        displayBackground,
        displayBackgroundSelection,
        setDisplayBackground,
        setDisplayBackgroundActiveIndex,
        setDisplayBackgroundSelection
    }))

    const selectWallpaperList = useMemo(() => mainScreenBackgroundList.map(({ fileName }) => fileName ), [mainScreenBackgroundList])

    const computeWallpaperSelection = useCallback(() => {
        const flatternIndex = mainScreenBackgroundList.findIndex(({ fileName }) => fileName  === displayBackground.fileName)
        const chunkIndex = Math.floor(flatternIndex / 5)
        const itemIndex = flatternIndex % 5
        return { activeSelectedChunk: chunkIndex, activeSelectedIndex: itemIndex }
    }, [mainScreenBackgroundList])
    
    useEffect(() => {
       const activeSelection = computeWallpaperSelection()
       setDisplayBackgroundSelection(activeSelection)
    }, [])


    const handleImageAdditoin = useCallback((image: Background) => {
        addUserBackground(image)
        setDisplayBackground(image)
        setDisplayBackgroundSelection({ activeSelectedChunk: 0, activeSelectedIndex: 1})
    }, [mainScreenBackgroundList, displayBackground])


    const handleWallpaperSelectedIndex = useCallback((index: number) => {
        const flatternIndex = displayBackgroundSelection.activeSelectedChunk * 5 + index
        setDisplayBackground(mainScreenBackgroundList[flatternIndex])
        setDisplayBackgroundActiveIndex(index)

    }, [mainScreenBackgroundList, displayBackground, displayBackgroundSelection, selectWallpaperList])


    const handleWallpaperSelectedChunk = useCallback((index: number) => {
        const itemIndex = index > displayBackgroundSelection.activeSelectedChunk ? 0 : 4
        const flatternIndex = index * 5 + itemIndex
        setDisplayBackground(mainScreenBackgroundList[flatternIndex])
        setDisplayBackgroundSelection(({ activeSelectedIndex: itemIndex, activeSelectedChunk: index }))

    }, [mainScreenBackgroundList, displayBackground, displayBackgroundSelection, selectWallpaperList])

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
                    selectedChunkIndex={displayBackgroundSelection.activeSelectedChunk}
                    selectedItemIndex={displayBackgroundSelection.activeSelectedIndex}
                    onChunkChange={handleWallpaperSelectedChunk}
                    onItemChange={handleWallpaperSelectedIndex}
                />
                <DisabledButtonWrapper>
                    <BrowseImage saveImage={handleImageAdditoin}>
                        <Underline color="grey">B</Underline><span>rowse</span>
                    </BrowseImage>
                </DisabledButtonWrapper>
                <DisplayBackgroundSize />
            </DisplayBackgorundOptionsItem>
        </OptionsWrapper>
    )
}

export default DisplayBackgorundOptionsContainer