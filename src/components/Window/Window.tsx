import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import { ButtonProps } from "components/Button/Button";
import PannelButtonsContainer from "components/PanelButton/PannelButtonsContainer";
import WindowTitle from "./WindowTitle/WindowTitle";
import { useOpenWindowState } from "store/store";

const WindowWrapper = styled.div<{ zindex: number }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-flex;
    flex-direction: column;
    border-bottom: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-right: 2px solid ${({ theme }) => theme.colors.buttonShadow};
    border-left: 2px solid ${({ theme }) => theme.colors.white};
    border-top: 2px solid ${({ theme }) => theme.colors.white};
`

const WindowContent = styled.div`
    background-color: ${({ theme }) => theme.colors.menu };
`

interface WindowProps {
    readonly title?: string
    readonly style?: React.CSSProperties
    readonly children: React.ReactNode
    readonly titleButtons: ReadonlyArray<ButtonProps>
    readonly panelButtons?: ReadonlyArray<ButtonProps>
    readonly panelButtonsStyle?: React.CSSProperties
    readonly getZIndex?: (zIndex: number) => void
}

const windowIdGenerator = () => {
    let idgen = 0;

    return (title: string) => `${title} ${idgen++}`
}

const idGenerator = windowIdGenerator()


const Window = ({ title, children, titleButtons, style, panelButtons = [], panelButtonsStyle, getZIndex }: WindowProps) => {

    const { addWindow, removeWindow, openedWindows } = useOpenWindowState()
    
    const windowId = useMemo(() => idGenerator(title ?? ''), [])

    const zIndex = useMemo(() => openedWindows.find(({ id }) => id === windowId)?.zIndex ?? 0, [openedWindows])

    useEffect(() => {
        addWindow(windowId)

        return () => {
            removeWindow(windowId)
        }
    }, [])

    useEffect(() => {
        if (getZIndex != null) {
            getZIndex(zIndex)
        }
    }, [zIndex])

    return (
        <WindowWrapper style={style} zindex={zIndex}>
            <WindowTitle title={title} titleButtons={titleButtons} />
            <WindowContent>
                {children}
            <PannelButtonsContainer data={panelButtons} style={panelButtonsStyle}/>
            </WindowContent>
        </WindowWrapper>
    )
}


export default Window

