import Button from "components/Button/Button";
import styled from "styled-components";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useMemo, useState } from "react";
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
    readonly listData: ReadonlyArray<string>
    readonly selectedIndex?: number
    readonly setSelectedValue: (index: number) => void
    readonly setSelectedIndex: (index: number) => void
}

const Select = ({ listData, setSelectedValue, setSelectedIndex, selectedIndex = 0 }: SelectProps) => {

    const handleSelection = (index: number) => {
        setSelectedIndex(index)
        setSelectedValue(index)
    }

    const listCunks = useMemo(() => splitIntoLimitedLengthChunks(listData)(5), [listData])

    const indicatorSize = useMemo(() => 100 / listCunks.length, [listCunks])

    const [activeArrayIndex, setActiveArrayIndex] = useState(0)

    const isUpDisabled = useMemo(() => !(activeArrayIndex > 0), [activeArrayIndex, listCunks])

    const isDownDisabled = useMemo(() => (activeArrayIndex === listCunks.length - 1), [activeArrayIndex, listCunks])

    const scrollIndicatorFlexPosition = useMemo(() => {
        const middle = Math.floor(listCunks.length / 2);
        if (activeArrayIndex === 0) {
            return 'flex-start'
        }

        if (activeArrayIndex === listCunks.length - 1) {
            return 'flex-end'
        }

        if (activeArrayIndex === middle) {
            return 'center'
        }

        return activeArrayIndex > middle ? 'flex-end' : 'flex-start'
        
    }, [activeArrayIndex, listCunks])


    return (
        <SelectConainer>
            <SelectWrapper>
                { listCunks[activeArrayIndex].map(( value, i ) => (
                    <SelectOption 
                        selected={i === selectedIndex}
                        key={value + i} 
                        onClick={() => handleSelection(i)}
                    >
                     {value} 
                    </SelectOption>
                ))}
            </SelectWrapper>
            <ScrollArea >
                <Button disabled={isUpDisabled} style={buttonStyles} onClick={() => setActiveArrayIndex((pre) => pre - 1)}>
                    <TiArrowSortedUp />
                </Button>
                <ScrollIndicatorArea indicatorposition={scrollIndicatorFlexPosition}>
                    <ScrollIndicator  indicatorsize={indicatorSize}/>
                </ScrollIndicatorArea>
                <Button disabled={isDownDisabled} style={buttonStyles} onClick={() => setActiveArrayIndex((pre) => pre + 1)}>
                    <TiArrowSortedDown />
                </Button>
            </ScrollArea>
        </SelectConainer>
    )
}

export default Select;