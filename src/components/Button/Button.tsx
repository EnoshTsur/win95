import styled from "styled-components"

const ButtonWrapper = styled.button`
    padding: 0;
    background-color: ${({ theme }) => theme.colors.buttonFace };
    border-left: 3px solid ${({ theme }) => theme.colors.white };
    border-top: 3px solid ${({ theme }) => theme.colors.white };
    border-bottom: 3px solid ${({ theme }) => theme.colors.black };
    border-right: 3px solid ${({ theme }) => theme.colors.black };
    
    ${({ disabled }) => !disabled && `&:hover {
        cursor:  pointer;
    }`}

    ${({ theme, disabled }) => !disabled && `&:active {
        border-left: 3px solid ${theme.colors.black};
        border-top: 3px solid ${theme.colors.black};
        border-bottom: 3px solid ${theme.colors.white};
        border-right: 3px solid ${theme.colors.white };
    } 
    }`}
`

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{}

const Button = ({ children, ...rest }: ButtonProps) => {
    return (
        <ButtonWrapper { ...rest } >
            { children }
        </ButtonWrapper>
    )
}

export default Button