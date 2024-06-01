import Button from "components/Button/Button";
import styled from "styled-components";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { SetStateAction, memo, useCallback, useEffect, useMemo, useState } from "react";
import scrollBg from '../../assets/bg-scroll.png'
import { useBackgroundState } from "store/store";
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
    readonly initialSelectedIndex: number
    readonly selectData: ReadonlyArray<string>
    readonly select: (value: number) => void
}

const Select = ({ selectData, select, initialSelectedIndex }: SelectProps) => {

    const [{ activeArray, activeIndex }, setSelecetdIndexes] = useState({
        activeArray: Math.floor(initialSelectedIndex / 5),
        activeIndex: initialSelectedIndex % 5
    })

    const {backgroundList} = useBackgroundState()

    const selectChunks = useMemo(() =>  splitIntoLimitedLengthChunks(selectData)(5), [selectData]);

    const indicatorSize = useMemo(() => 100 / selectChunks.length, [selectChunks])

    const isUpDisabled = useMemo(() => !(activeArray > 0), [activeArray, selectChunks])

    const isDownDisabled = useMemo(() => (activeArray === selectChunks.length - 1), [activeArray, selectChunks])

    useEffect(() => {
        const flattenedIndex = flatternSelection(activeIndex)
        select(flattenedIndex)
    }, [activeIndex, activeArray])


    useEffect(() => {
        console.log({ selectData });
        
    }, [selectData])

    const flatternSelection = useCallback((index: number) => {
        const elementsBefore = selectChunks.slice(0, activeArray).reduce((acc, curr) => acc + curr.length, 0);
        const flattenedIndex = elementsBefore + index;        
        return flattenedIndex
    }, [selectChunks, activeArray])

    const handleSelection = useCallback((index: number) => {        
        setSelecetdIndexes({ activeArray, activeIndex: index })
        const selectDataActiveIndex = flatternSelection(index)        
        console.log({ selectDataActiveIndex, backgroundList });
        
        select(selectDataActiveIndex)
    }, [activeArray, selectChunks])


    const scrollIndicatorFlexPosition = useMemo(() => {
        const middle = Math.floor(selectChunks.length / 2);
        if (activeArray === 0) {
            return 'flex-start'
        }

        if (activeArray === selectChunks.length - 1) {
            return 'flex-end'
        }

        if (activeArray === middle) {
            return 'center'
        }

        return activeArray > middle ? 'flex-end' : 'flex-start'
        
    }, [activeArray, selectChunks])


    return (
        <SelectConainer>
            <SelectWrapper>
                { selectChunks[activeArray].map(( value, i ) => (
                    <SelectOption 
                        selected={i === activeIndex}
                        key={value + i} 
                        onClick={() => handleSelection(i)}
                    >
                     {value} 
                    </SelectOption>
                ))}
            </SelectWrapper>
            <ScrollArea >
                <Button disabled={isUpDisabled} style={buttonStyles} onClick={() => {
                       setSelecetdIndexes((pre) => ({ activeIndex: 4, activeArray: pre.activeArray - 1 }))

                }}>
                    <TiArrowSortedUp />
                </Button>
                <ScrollIndicatorArea indicatorposition={scrollIndicatorFlexPosition}>
                    <ScrollIndicator  indicatorsize={indicatorSize}/>
                </ScrollIndicatorArea>
                <Button disabled={isDownDisabled} style={buttonStyles} onClick={() => {
                        setSelecetdIndexes((pre) => ({ activeIndex: 0, activeArray: pre.activeArray  + 1 }))
                    }
                }>
                    <TiArrowSortedDown />
                </Button>
            </ScrollArea>
        </SelectConainer>
    )
}

export default memo<SelectProps>(Select, (pre, next) => pre.selectData === next.selectData);