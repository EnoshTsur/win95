import { useMemo } from "react"
import styled from "styled-components"
import { useDisplayBackgroundStore } from "../store/store"

const ComputerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ComputerBorder1 = styled  .div`
    width: 200px;
    height: 150px;
    margin-top: 10px;
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-top: 2px solid ${({ theme }) => theme.colors.white};
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
    border-right: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-radius: 6px;
`

const ComputerBorder2 = styled.div`
    width: 194px;
    height: 142px;
    border-left: 4px solid ${({ theme }) => theme.colors.white};
    border-top: 4px solid ${({ theme }) => theme.colors.white};
    border-bottom: 4px solid ${({ theme }) => theme.colors.buttonShadow};
    border-right: 4px solid ${({ theme }) => theme.colors.buttonShadow};
`
const ComputerBorder3 = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 189px;
    height: 138px;
    border-left: 3px dashed #e0e0e0;
    border-top: 3px dashed #e0e0e0;
    border-bottom: 3px dashed #b0b0b0;
    border-right: 3px dashed #b0b0b0;
`

const ComputerBorder4 = styled.div<{ backgroundurl: string | null, backgroundsize: string }>`
    width: 150px;
    height: 100px;
    background-color: ${({ theme }) => theme.colors.windowsBg};
    background-image: ${({ backgroundurl }) => backgroundurl !== '' ? `url(${backgroundurl})` : 'none'};
    background-size: ${({ backgroundsize }) => backgroundsize};
    border-left: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-top: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-right: 2px solid ${({ theme }) => theme.colors.white};
    border-bottom: 2px solid ${({ theme }) => theme.colors.white};
`
const ComputerUnder = styled  .div`
    width: 100px;
    height: 10px;
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-top: 1px solid ${({ theme }) => theme.colors.black};
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
    border-right: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    box-shadow: 0 3px 2px grey;
    position: relative;
`
const ComputerUnderLine = styled  .div`
    width: 100px;
    height: 5px;
    background-color: darkgrey;
`

const ComputerGreenLight = styled.div`
    position: absolute;
    top: 0;
    left: 70px;
    width: 5px;
    height: 3px;
    background-color: lime;
    border-left: 2px solid black;
    border-top: 2px solid black;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
`
const ComputerGreyButton = styled.div`
    position: absolute;
    top: 0;
    left: 80px;
    width: 10px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.menu };
    border-bottom: 2px solid ${({ theme }) => theme.colors.buttonShadow };
    border-left: 2px solid white;
    border-right:  2px solid ${({ theme }) => theme.colors.buttonShadow };
`

const ComputerUnder2 = styled  .div`
    width: 80px;
    height: 10px;
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-top: 2px solid ${({ theme }) => theme.colors.black};
    border-right: 2px solid ${({ theme }) => theme.colors.black};
    box-shadow: -1px 1px 0px 1px grey;
`
const ComputerUnder3 = styled  .div`
    width: 120px;
    height: 3px;
    border: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-radius: 2px;
`

const ComputerUnder3Inside = styled  .div`
    width: 100%;
    height: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.white};
    border-left: 1px solid ${({ theme }) => theme.colors.white};
`


const Computer = () => {

    const { displayBackground, displayBackgroundSize } = useDisplayBackgroundStore(({ displayBackground, displayBackgroundSize }) => ({ 
        displayBackground, 
        displayBackgroundSize 
    }))

    const backgroundUrl = useMemo(() => displayBackground.url, [displayBackground]);

    return (
        <ComputerWrapper>
            <ComputerBorder1>
                <ComputerBorder2>
                    <ComputerBorder3>
                        <ComputerBorder4 backgroundurl={backgroundUrl} backgroundsize={displayBackgroundSize} />
                    </ComputerBorder3>
                </ComputerBorder2>
            </ComputerBorder1>
            <ComputerUnder>
                <ComputerUnderLine />
                <ComputerGreenLight />
                <ComputerGreyButton />
            </ComputerUnder>
            <ComputerUnder2 />
            <ComputerUnder3 >
                <ComputerUnder3Inside />
            </ComputerUnder3>
        </ComputerWrapper>
    )
}

export default Computer