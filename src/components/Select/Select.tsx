import Button from "components/Button/Button";
import styled from "styled-components";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { memo, useEffect, useMemo, useState } from "react";
import scrollBg from '../../assets/bg-scroll.png'
import { splitIntoLimitedLengthChunks } from "utils/functions";


const SelectConainer = styled.div`
    display: flex;
`

const SelectWrapper = styled.div`
    flex-basis: 90%;
    margin-top: 15px; 
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    border-top: 2px solid black;
    border-left: 2px solid black;
    height: 117px;
    background-color: ${({ theme }) => theme.colors.white};
    
`

const SelectOption = styled.div<{ selected: boolean }>`
    font-family: mslevi;    
    background-color: ${({ theme, selected }) => selected ? theme.colors.alertTitleBar : theme.colors.white};
    color: ${({ theme, selected }) => selected ? theme.colors.white : theme.colors.black};
    border: 1px solid white;
    &:hover {
        border: 1px dashed ${({ theme }) => theme.colors.buttonFace};
        cursor: pointer;
    }
`

const ScrollArea = styled.div`
    flex-basis: 10%;
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-right: 10px;
    border: 1px solid ${({ theme }) => theme.colors.buttonShadow};

    button {
        flex-basis: 10%;
    }
}
`

const ScrollIndicator = styled.div<{ indicatorsize: number}>`
    background-color: ${({ theme }) => theme.colors.menu};
    border-left: 1px solid ${({ theme }) => theme.colors.white};
    border-top: 1px solid ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.buttonShadow};
    border-right: 1px solid ${({ theme }) => theme.colors.buttonShadow};
    height: ${({ indicatorsize }) => indicatorsize}%;
    width: 100%;
`

const ScrollIndicatorArea = styled.div<{ indicatorposition: string }>`
    display: flex;
    align-items: ${({ indicatorposition }) => indicatorposition };
    background-image: url(${scrollBg});
    flex-basis: 80%;
`

const buttonStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

interface SelectProps {
    readonly selectData: ReadonlyArray<string>
    readonly chunkSize: number
    readonly selectedChunkIndex: number
    readonly selectedItemIndex: number
    readonly onChunkChange: (index: number) => void
    readonly onItemChange: (index: number) => void 
}

const Select2 = ({ selectData, chunkSize, selectedChunkIndex, selectedItemIndex, onChunkChange, onItemChange }: SelectProps) => {

    const [chunks, setChunks] = useState<ReadonlyArray<ReadonlyArray<string>>>([[]])

    useEffect(() => {
        const chunkData = splitIntoLimitedLengthChunks(selectData)(chunkSize)
        setChunks(chunkData)
    }, [selectData, chunkSize])

    const handleChunkChange = (index: number) => {
        onChunkChange(index)
    }

    const handleItemChange = (index: number) => {
        onItemChange(index)
    }

    const indicatorSize = useMemo(() => 100 / chunks.length, [chunks])


    const scrollIndicatorFlexPosition = useMemo(() => {
        const middle = Math.floor(chunks.length / 2);
        if (selectedChunkIndex === 0) {
            return 'flex-start'
        }

        if (selectedChunkIndex === chunks.length - 1) {
            return 'flex-end'
        }

        if (selectedChunkIndex === middle) {
            return 'center'
        }

        return selectedChunkIndex > middle ? 'flex-end' : 'flex-start'
        
    }, [selectedChunkIndex, chunks])


    return (
        <SelectConainer>
            <SelectWrapper>
                { chunks[selectedChunkIndex].map(( item, index ) => (
                    <SelectOption 
                        selected={index === selectedItemIndex}
                        key={`${item} + ${index}`} 
                        onClick={() => handleItemChange(index)}
                    >
                     {item} 
                    </SelectOption>
                ))}
            </SelectWrapper>
            <ScrollArea >
                <Button disabled={selectedChunkIndex === 0} style={buttonStyles} onClick={() => {
                    handleChunkChange(selectedChunkIndex - 1)
                }}>
                    <TiArrowSortedUp />
                </Button>
                <ScrollIndicatorArea indicatorposition={scrollIndicatorFlexPosition}>
                    <ScrollIndicator  indicatorsize={indicatorSize}/>
                </ScrollIndicatorArea>
                <Button disabled={selectedChunkIndex === chunks.length - 1} style={buttonStyles} onClick={() => {
                    handleChunkChange(selectedChunkIndex + 1)
                    }}>
                    <TiArrowSortedDown />
                </Button>
            </ScrollArea>
        </SelectConainer>
    )
}

export default Select2