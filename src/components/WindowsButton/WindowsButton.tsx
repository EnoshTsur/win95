import styled from "styled-components";
import Button from "../Button/Button"
import { useStartMenuState } from "store/store";
import StartMenu from "components/StartMenu/StartMenu";
import startIcon from '../../assets/start.png'

const ButtonWrapper = styled.div`
    display: flex;
    gap: 2px;
    align-items: center;
    font-family: mslevi;
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: 600;
    width: 100%;

    span {
       padding-right: 4px;
    }  
`
const IconWrapper = styled.img`
    width: 25px;
    height: 25px;
`

const WindowsIcon = () => {
    return (
        <IconWrapper src={startIcon} />
    )
}    

const WindowsButton = () => {
    const { toggleStartMenu, isOpen } = useStartMenuState()
    
    return (
        <Button 
            style={{
                margin: '4px',
                position: 'relative',
                borderLeft: `3px solid ${!isOpen ? 'white': 'black'}`,
                borderTop: `3px solid ${!isOpen ? 'white': 'black'}`,
                borderBottom: `3px solid ${!isOpen ? 'black': 'white'}`,
                borderRight: `3px solid ${!isOpen ? 'black': 'white'}`,
            }}
            onClick={() => toggleStartMenu()}
        >
            { isOpen && <StartMenu /> }
            <ButtonWrapper>
            <WindowsIcon />
            <span>
             Start
            </span>
            </ButtonWrapper>
        </Button>
    )
}
export default WindowsButton;