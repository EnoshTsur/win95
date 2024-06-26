import React from "react";
import styled from "styled-components";
import { ButtonProps } from "components/Button/Button";
import PannelButtonsContainer from "components/PanelButton/PannelButtonsContainer";
import WindowTitle from "./WindowTitle/WindowTitle";
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
    box-shadow: inset 1px 1px 0px 1px ${({ theme }) => theme.colors.buttonShadow};
    padding: 1px;

`

export interface TitleProps {
    readonly title?: string
    readonly titleButtons?: ReadonlyArray<ButtonProps>
    readonly icon?: string
}

interface WindowProps {
    readonly children: React.ReactNode
    readonly offset?: { x: number, y: number }
    readonly title?: TitleProps
    readonly style?: React.CSSProperties
    readonly panelButtons?: ReadonlyArray<ButtonProps>
    readonly panelButtonsStyle?: React.CSSProperties
    readonly getZIndex?: (zIndex: number) => void
}


const Window = ({ children, title, style, offset, panelButtons, panelButtonsStyle, getZIndex }: WindowProps) => {

    const { zIndex } = useWindow({ getZIndex })

    return (
        <WindowWrapper style={style} zindex={zIndex} offset={offset}>
            { 
                title != null && (
                    <WindowTitle title={title.title} titleButtons={title.titleButtons ?? []} icon={title.icon}/> 
                )
            }
                {children}
            { panelButtons && <PannelButtonsContainer data={panelButtons} style={panelButtonsStyle}/> }
        </WindowWrapper>
    )
}


export default Window

