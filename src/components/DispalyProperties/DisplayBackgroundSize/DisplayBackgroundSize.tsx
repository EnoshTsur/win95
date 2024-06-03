import Underline from "components/Underline/Underline";
import styled from "styled-components";
import { useEffect } from "react";
import { useMainScreenBackgroundSizeStore } from "components/MainScreen/store/store";
import { useDisplayBackgroundSizeStore, useDisplayBackgroundStore } from "../store/store";

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

const DisplayBackgroundSize = () => {

    const { displayBackgroundSize, setDisplayBackgroundSize  } = useDisplayBackgroundSizeStore(({ displayBackgroundSize, setDisplayBackgroundSize }) => ({ 
        displayBackgroundSize, 
        setDisplayBackgroundSize 
    }))

    const { mainScreenBackgroundSize } = useMainScreenBackgroundSizeStore(({ mainScreenBackgroundSize }) => ({ mainScreenBackgroundSize }))

    useEffect(() => {
        setDisplayBackgroundSize(mainScreenBackgroundSize)
    }, [])

    return (
        <BackgroundSizeWrapper>
            <DisplaySpan>
                <Underline color="black">D</Underline>isplay:
            </DisplaySpan>
            <div style={{ display: 'flex', gap: '8px'}}>
            <DisplayButtonRadio onClick={() => setDisplayBackgroundSize('cover')}>
                { displayBackgroundSize === 'cover' && (<DisplayButtonRadioOn /> )}
            </DisplayButtonRadio>
            <DisplaySpan>
                <Underline>T</Underline>ile
            </DisplaySpan>
            </div>
            <div style={{ display: 'flex', gap: '8px'}}>
            <DisplayButtonRadio onClick={() => setDisplayBackgroundSize('contain')}>
                { displayBackgroundSize === 'contain' && (<DisplayButtonRadioOn /> )}
            </DisplayButtonRadio>
            <DisplaySpan>
                <Underline>C</Underline>enter
            </DisplaySpan>
            </div>
        </BackgroundSizeWrapper>
    )
}

export default DisplayBackgroundSize