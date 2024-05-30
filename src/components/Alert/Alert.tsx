import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { BsQuestion } from "react-icons/bs";
import Button, { ButtonProps } from "components/Button/Button";

const AlertWrapper = styled.div`
    position: fixed;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
    flex-direction: column;
    border-bottom: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-right: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-top: 2px solid ${({ theme }) => theme.colors.white};
`

const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 5px;
    color: ${({ theme }) => theme.colors.white };
    background-color: ${({ theme }) => theme.colors.alertTitleBar };
    &:hover {
        cursor: grab;
    }
    `
    
    const TitleText = styled.span`
    padding: 0 5px;
    display: flex;
    align-items: center;
    font-family: mslevi;
    font-weight: 600;
    letter-spacing: 1px;
`

const AlertContent = styled.div`
    background-color: ${({ theme }) => theme.colors.menu };
`

const ButtonsArea = styled.div`
    display: flex;
`

interface AlertProps {
    readonly title?: string
    readonly children: React.ReactNode
    readonly onClose: () => void
}

const buttonStyles: React.CSSProperties = {
    margin: '2px 0',
    display: 'flex',
    alignItems: 'center'
}

const TitleButton = ({ children, ...rest }: ButtonProps) => (
    <Button style={buttonStyles} {...rest}>
        { children }
    </Button>
)

const Alert = ({ title, children, onClose }: AlertProps) => {

    return (
        <AlertWrapper >
            <TitleBar>
                <TitleText>
                { title }
                </TitleText>
                <ButtonsArea>
                    <TitleButton>   
                        <BsQuestion />
                    </TitleButton>
                    <TitleButton onClick={onClose}>
                        <IoMdClose />
                    </TitleButton>
                </ButtonsArea>
            </TitleBar>
            <AlertContent>
                {children}
            </AlertContent>
        </AlertWrapper>
    )
}

export default Alert

