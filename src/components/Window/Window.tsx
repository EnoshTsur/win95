import React from "react";
import styled from "styled-components";
import { ButtonProps } from "components/Button/Button";
import PannelButtonsContainer from "components/PanelButton/PannelButtonsContainer";
import WindowTitle from "./WindowTitle/WindowTitle";
import { useOpenWindowState } from "store/store";
import useWindow from "./useWindow";

const WindowWrapper = styled.div<{ zindex: number, offset?: { x: number, y: number } }>`
    position: ${({ offset }) => offset ? 'absolute' : 'fixed'};
    top: ${({ offset }) => offset ? `${offset.y}px` : '50%' };
    left: ${({ offset }) => offset ? `${offset.x}px` : '50%' };
    ${({ offset }) => !offset && 'transform: translate(-50%, -50%);'}
    border-bottom: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-right: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-top: 2px solid ${({ theme }) => theme.colors.white};
    z-index: ${({ zindex }) => zindex};
`

interface TitleProps {
    readonly title?: string
    readonly titleButtons?: ReadonlyArray<ButtonProps>
}

interface WindowProps {
    readonly offset?: { x: number, y: number }
    readonly title?: TitleProps
    readonly style?: React.CSSProperties
    readonly children: React.ReactNode
    readonly panelButtons?: ReadonlyArray<ButtonProps>
    readonly panelButtonsStyle?: React.CSSProperties
    readonly getZIndex?: (zIndex: number) => void
}


const Window = ({ title, children, style, offset, panelButtons, panelButtonsStyle, getZIndex }: WindowProps) => {

    const { zIndex, windowId } = useWindow({ getZIndex })
    const { moveToTop } = useOpenWindowState(({ moveToTop }) => ({ moveToTop }))

    return (
        <WindowWrapper style={style} zindex={zIndex} offset={offset} onClick={() => moveToTop(windowId)}>
            { 
                title != null && (
                    <WindowTitle title={title.title} titleButtons={title.titleButtons ?? []} /> 
                )
            }
                {children}
            { panelButtons && <PannelButtonsContainer data={panelButtons} style={panelButtonsStyle}/> }
        </WindowWrapper>
    )
}


export default Window

