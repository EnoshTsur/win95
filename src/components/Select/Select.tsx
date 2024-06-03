import Button from "components/Button/Button";
import styled from "styled-components";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

    &:focus, &:focus-visible {
        outline: none;
    }
    
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

const ScrollIndicator = styled.div<{ indicatorsize: number, indicatorposition: string }>`
    position: absolute;
    box-sizing: border-box;
    transition: top 400ms cubic-bezier(0.49, 0.19, 0.48, 1.05);
    left: 0;
    top: ${({ indicatorposition }) => indicatorposition};
    background-color: #aeaeae;
    border-left: 1px solid ${({ theme }) => theme.colors.white};
    border-top: 1px solid ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.buttonShadow};
    border-right: 1px solid ${({ theme }) => theme.colors.buttonShadow};
    height: ${({ indicatorsize }) => indicatorsize}px;
    width: 100%;
`

const ScrollIndicatorArea = styled.div`
    position: relative;
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
    readonly tabIndex: number
    readonly onChunkChange: (index: number) => void
    readonly onItemChange: (index: number) => void 
}

const Select = ({ selectData, chunkSize, selectedChunkIndex, selectedItemIndex, tabIndex, onChunkChange, onItemChange }: SelectProps) => {

    const [chunks, setChunks] = useState<ReadonlyArray<ReadonlyArray<string>>>([[]])

    const selectRef = useRef<HTMLDivElement | null>(null)

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

    const indicatorSize = useMemo(() => 78 / selectData.length, [selectData])

    const indicatorPosition = useMemo(() => ((selectedChunkIndex * 5) + selectedItemIndex) * indicatorSize
    , [selectedChunkIndex, selectedItemIndex, indicatorSize, chunks])


    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {

            const totalLength = chunks.reduce((elementsSum, nextArray) =>  elementsSum + nextArray.length, 0) -1           

            if (chunks[selectedChunkIndex][selectedItemIndex] === selectData[totalLength]) {
                return
            }

            if ((selectedItemIndex + 1) % 5 === 0) {
                onItemChange(0)
                onChunkChange(selectedChunkIndex + 1)

            } else {
                onItemChange(selectedItemIndex + 1)

            }
        } else if (event.key === 'ArrowUp') {            
            if (selectedItemIndex === 0 && selectedChunkIndex === 0) {
                return
            }
            if ( selectedItemIndex === 1 && selectedChunkIndex === 0) {
                onItemChange(0)
                return
            }
            if (selectedItemIndex === 0) {
                onItemChange(4)
                onChunkChange(selectedChunkIndex - 1)

            } else {
                onItemChange(selectedItemIndex - 1)

            }
        }
      }, [chunks, selectedItemIndex, selectedChunkIndex, selectData])

      useEffect(() => {
        const listContainer = selectRef.current;
        if (listContainer) {
          listContainer.addEventListener('keydown', handleKeyDown);
        }
    
        return () => {
          if (listContainer) {
            listContainer.removeEventListener('keydown', handleKeyDown);
          }
        };
      }, [chunks, selectedChunkIndex, selectedItemIndex, selectData]);


    const handleArrowUp = useCallback(() => {
        if (selectedChunkIndex === 0 && selectedItemIndex === 0) {
            return
        }
        if (selectedChunkIndex > 0 && selectedItemIndex === 0) {
            handleChunkChange(selectedChunkIndex - 1)
            return
        }
        handleItemChange(selectedItemIndex - 1)
    }, [chunks, selectedChunkIndex, selectedItemIndex])


    const handleArrowDown = useCallback(() => {
        if (selectedChunkIndex === chunks.length - 1 && selectedItemIndex === chunks[selectedChunkIndex].length - 1) {
            return
        }
        if (selectedItemIndex === 4) {
            handleChunkChange(selectedChunkIndex + 1)
            return
        }
        handleItemChange(selectedItemIndex + 1)
    }, [chunks, selectedChunkIndex, selectedItemIndex])


    return (
        <SelectConainer>
            <SelectWrapper ref={selectRef} tabIndex={tabIndex} onClick={() => {
                if (selectRef?.current != null) {
                    selectRef.current.focus()
                }
            }}>
                { (chunks[selectedChunkIndex] ?? chunks[0]).map(( item, index ) => (
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
                <Button disabled={selectedItemIndex === 0 && selectedChunkIndex === 0} style={buttonStyles} onClick={handleArrowUp}>
                    <TiArrowSortedUp />
                </Button>
                <ScrollIndicatorArea>
                    <ScrollIndicator indicatorposition={`${indicatorPosition}px`}  indicatorsize={indicatorSize}/>
                </ScrollIndicatorArea>
                <Button disabled={selectedChunkIndex === chunks.length - 1 && selectedItemIndex === chunks[chunks.length - 1].length - 1} style={buttonStyles} onClick={handleArrowDown}>
                    <TiArrowSortedDown />
                </Button>
            </ScrollArea>
        </SelectConainer>
    )
}

export default Select