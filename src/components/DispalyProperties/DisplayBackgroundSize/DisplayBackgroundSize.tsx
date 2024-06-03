import Underline from "components/Underline/Underline";
import { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import { BackgroundSize } from "../store/types";

const BackgroundSizeWrapper = styled.div`
    display: flex;
    font-family: mslevi;
    padding: 5px 0;
    margin: 0 10px;
    gap: 15px;
`
const DisplaySpan = styled.span`

`

const DisplayButtonRadio = styled.div`
    border-radius: 50%;
    height: 15px;
    width: 15px;
    background: white;
    border-left: 2px solid black;
    border-top: 2px solid black;
    border-right: 2px solid #dfdede;
    border-bottom: 2px solid #dfdede;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`

const DisplayButtonRadioOn = styled.div`
    border-radius: 50%;
    height: 7px;
    flex-basis: 50%;
    background: black;
`

interface DisplayBackgroundSizeProps {
    readonly backgroundSize: BackgroundSize
    readonly setBackgroundSize: React.Dispatch<SetStateAction<BackgroundSize>>
}

const DisplayBackgroundSize = ({ backgroundSize, setBackgroundSize }: DisplayBackgroundSizeProps) => {

    return (
        <BackgroundSizeWrapper>
            <DisplaySpan>
                <Underline color="black">D</Underline>isplay:
            </DisplaySpan>
            <div style={{ display: 'flex', gap: '8px'}}>
            <DisplayButtonRadio onClick={() => setBackgroundSize('cover')}>
                { backgroundSize === 'cover' && (<DisplayButtonRadioOn /> )}
            </DisplayButtonRadio>
            <DisplaySpan>
                <Underline>T</Underline>ile
            </DisplaySpan>
            </div>
            <div style={{ display: 'flex', gap: '8px'}}>
            <DisplayButtonRadio onClick={() => setBackgroundSize('center')}>
                { backgroundSize === 'center' && (<DisplayButtonRadioOn /> )}
            </DisplayButtonRadio>
            <DisplaySpan>
                <Underline>C</Underline>enter
            </DisplaySpan>
            </div>
        </BackgroundSizeWrapper>
    )
}

export default DisplayBackgroundSize