import { ButtonProps } from "components/Button/Button"
import PanelButton from "./PanelButton"
import styled from "styled-components"

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 5px;
    padding: 10px;
    justify-content: center;
    align-items: center;
`

export interface PannelButtonsContainerProps {
    readonly data: ReadonlyArray<ButtonProps>
    readonly style?: React.CSSProperties
}

const PannelButtonsContainer = ({ data, style }: PannelButtonsContainerProps) => {
    return (
        <ButtonsWrapper style={style}>
            { data.map((props, i) => (
                <PanelButton key={`pannelButton ${props.children} ${i}`} {...props} />
            ))}
        </ButtonsWrapper>
    )
}

export default PannelButtonsContainer