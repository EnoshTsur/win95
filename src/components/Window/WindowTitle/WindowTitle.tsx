import Button, { ButtonProps } from "components/Button/Button"
import styled from "styled-components"

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

const TitleButton = styled(Button)<ButtonProps>`
    margin: 2px 0;
    display: flex;
    align-items: center;
`

const TitleButtonsArea = styled.div`
    display: flex;
`

const TitleIcon = styled.img`
    width: 35px;
    height: 30px;
`

interface WindowTitleProps {
    readonly title?: string
    readonly icon?: string
    readonly style?: React.CSSProperties
    readonly titleButtons: ReadonlyArray<ButtonProps>
}

const WindowTitle = ({ icon, title, titleButtons, style = {}}: WindowTitleProps) => {

    return (
            <TitleBar style={style}>
                <div style={{ display: 'flex'}}>
                    { icon && (
                        <TitleIcon src={icon} />
                    )}
                    <TitleText>
                        { title }
                    </TitleText>
                </div>
                <TitleButtonsArea>
                    { titleButtons.map((buttonProps, i) => (
                        <TitleButton {...buttonProps} key={`${buttonProps.children ?? ''} ${i}`}>
                            {buttonProps.children}
                        </TitleButton>
                    ))}
                </TitleButtonsArea>
            </TitleBar>
        ) 
                    
}

export default WindowTitle