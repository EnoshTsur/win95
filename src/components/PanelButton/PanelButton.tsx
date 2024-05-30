import Button, { ButtonProps } from "components/Button/Button";
import styled from "styled-components";

const ButtonWrapper = styled(Button)<ButtonProps>`
    font-family: mslevi;
    letter-spacing: 2px;
    font-weight: 600;
    width: 70px; 
    height: 30px;
    border-top: 1px solid white;
    border-left: 1px solid white;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    ${({ disabled }) => !disabled && `&:hover {
        background-color:  #b5b5b5;
    }`}

    ${({ disabled }) => !disabled && `&:active {
        background-color:  #aca9a9;
        border-top: 1px solid black;
        border-left: 1px solid black;
        border-bottom: 1px solid white;
        border-right: 1px solid white;
    }`}
`

const PanelButton = ({ children, ...rest }: ButtonProps) => {
    return (
        <ButtonWrapper { ...rest} >
            { children }
        </ButtonWrapper>
    )
}

export default PanelButton