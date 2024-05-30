import Button from "components/Button/Button";
import styled from "styled-components";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { useState } from "react";
import scrollBg from '../../assets/bg-scroll.png'

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
    justify-content: space-between;
    margin-top: 15px;
    margin-right: 10px;
    border: 1px solid ${({ theme }) => theme.colors.buttonShadow};
    background-image: url(${scrollBg});
}
`

const buttonStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

interface SelectProps {
    readonly listData: ReadonlyArray<string>
    readonly initialSelectedIndex?: number
    readonly setSelectedValue: (index: number) => void
}

const Select = ({ listData, setSelectedValue, initialSelectedIndex = 0 }: SelectProps) => {

    const [selectedIndex, setSelectedIndex ] = useState(initialSelectedIndex)

    const handleSelection = (index: number) => {
        setSelectedIndex(index)
        setSelectedValue(index)
    }

    return (
        <SelectConainer>
            <SelectWrapper>
                { listData.map(( value, i ) => (
                    <SelectOption 
                        selected={i === selectedIndex}
                        key={value} 
                        onClick={() => handleSelection(i)}
                    >
                     {value} 
                    </SelectOption>
                ))}
            </SelectWrapper>
            <ScrollArea >
                <Button disabled style={buttonStyles}>
                    <TiArrowSortedUp />
                </Button>
                <Button disabled style={buttonStyles}>
                    <TiArrowSortedDown />
                </Button>
            </ScrollArea>
        </SelectConainer>
    )
}

export default Select;