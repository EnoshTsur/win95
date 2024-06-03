import Underline from "components/Underline/Underline"
import { useMemo } from "react"
import { useStartMenuState } from "store/store"
import styled from "styled-components"
import { useDisplayModalStore } from "components/DispalyProperties/store/store"

const ScreenMenuWrapper = styled.div<{ x: number, y: number }>`
    position: absolute;
    top: ${({ y }) => y}px;
    left: ${({ x }) => x}px;
    background-color: ${({ theme }) => theme.colors.menu};
    padding: 5px;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid white;
    border-top: 1px solid white;
    display: flex;
    flex-direction: column;
`

const ScreenMenuItemsContainer = styled.div<{ hasbordertop: boolean, hasborderbottom: boolean }>`
    display: flex;
    flex-direction: column;
    ${({ hasbordertop, theme }) => hasbordertop && `border-top: 1px solid ${theme.colors.white};`}
    ${({ hasborderbottom, theme }) => hasborderbottom && `border-bottom: 1px solid ${theme.colors.buttonShadow};`}
`

const ScreenMenuItem = styled.button`
    font-family: mslevi;
    text-align: left;
    letter-spacing: 1px;
    font-weight: 500;
    padding: 5px 25px;
    font-size: 16px;
    background: transparent;
    border: none;
    &:hover {
        cursor: pointer;
        color: white;
        background-color: ${({ theme }) => theme.colors.alertTitleBar};
    }
`

interface ScreenItemProps {
    readonly offset: { x: number, y: number }
}

const ScreenMenu = ({ offset: { x, y } }: ScreenItemProps) => {

    const { openDisplayProperties } = useDisplayModalStore(({ openDisplayProperties }) => ({ openDisplayProperties }))
    const { closeStartMenu } = useStartMenuState()

    const items = useMemo(() => [
        [
            { 
                children: <>Arrange <Underline>I</Underline>cons</>,
                hasCarret: true,
                disabled: false,
                onClick: () => {},
            },
            { 
                children: <>Lin<Underline>e</Underline> up Icons</>,
                hasCarret: false,
                disabled: false,
                onClick: () => {},
            },
        ],
        [
            { 
                children: <><Underline color="light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3))">P</Underline>aste</>,
                hasCarret: false,
                disabled: true,
                onClick: () => {},
            },
            { 
                children: <>Paste <Underline color="light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3))">S</Underline>hortcut</>,
                hasCarret: false,
                disabled: true,
                onClick: () => {},
            },
        ],
        [
            { 
                children: <>Ne<Underline>w</Underline></>,
                hasCarret: true,
                disabled: false,
                onClick: () => {},
            }, 
        ],
        [
            { 
                children: <>P<Underline>r</Underline>operties</>,
                hasCarret: false,
                disabled: false,
                onClick: () => {
                    openDisplayProperties()
                    closeStartMenu()
                },
            },
        ]
    ], [])

    return (
        <ScreenMenuWrapper x={x} y={y} >
            { items.map((row, rowIndex) => (
                <ScreenMenuItemsContainer key={`menuscreen${row.length}${rowIndex}`} hasbordertop={rowIndex !== 0} hasborderbottom={rowIndex !== items.length - 1}>
                    { row.map(({ children, hasCarret, disabled, onClick }, colIndex) => (
                        <ScreenMenuItem key={`menuscreenitem${children}${colIndex}`} onClick={onClick} disabled={disabled}>
                            { children }
                        </ScreenMenuItem>
                    ))}
                </ScreenMenuItemsContainer>
            ))}
        </ScreenMenuWrapper>
    )
}

export default ScreenMenu