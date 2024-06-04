import Underline from "components/Underline/Underline"
import { useCallback, useMemo, useRef, useState } from "react"
import { useStartMenuState } from "store/store"
import styled from "styled-components"
import { useDisplayModalStore } from "components/DispalyProperties/store/store"
import { FaCaretRight } from "react-icons/fa"

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
    position: relative;
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
        color: ${({ disabled, theme }) => disabled ? theme.colors.buttonFace :  'white' };
    }
    
`

const ScreenMenuItemWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
        color: white;
        background-color: ${({ theme }) => theme.colors.alertTitleBar};
    }
`

export interface ScreenMenuItem {
    readonly children: React.ReactNode
    readonly hasCaret: boolean
    readonly disabled: boolean
    readonly onClick: () => void
    readonly next?: ReadonlyArray<ReadonlyArray<ScreenMenuItem>>
}

interface ScreenItemProps {
    readonly offset: { x: number, y: number }
    readonly menuItems: ReadonlyArray<ReadonlyArray<ScreenMenuItem>>
}

const ScreenMenu = ({ offset: { x, y }, menuItems }: ScreenItemProps) => {

    const [isMouseHover, setMouseHover] = useState(false)

    const ref = useRef<HTMLDivElement | null>(null)

    const handleMouseEnter = useCallback((disabled: boolean) => {
        if (disabled) {
            return
        }
        setMouseHover(true)
    }, [])

    const handleMouseLeave = useCallback((disabled: boolean) => {
        if (disabled) {
            return
        }
        setMouseHover(false)
    }, [])

    return (
        <ScreenMenuWrapper x={x} y={y} ref={ref}>
            { menuItems.map((row, rowIndex) => (
                <ScreenMenuItemsContainer key={`menuscreen${row.length}${rowIndex}`} hasbordertop={rowIndex !== 0} hasborderbottom={rowIndex !== menuItems.length - 1}>
                    { row.map(({ children, hasCaret, disabled, onClick, next }, colIndex) => (
                        <ScreenMenuItemWrapper key={`memuscreenitem${children}${colIndex}`} >
                            <ScreenMenuItem  
                                onClick={onClick} 
                                disabled={disabled} 
                                onMouseEnter={() => handleMouseEnter(disabled)} 
                                onMouseLeave={() => handleMouseLeave(disabled)}
                            >
                                { ( isMouseHover && next != null ) && (
                                    <ScreenMenu menuItems={next} offset={{ x: ref?.current?.getBoundingClientRect().width ?? 0, y: -1 }} />
                                )}
                                { children }
                            </ScreenMenuItem>
                            { hasCaret && <FaCaretRight /> }
                        </ScreenMenuItemWrapper>
                    ))}
                </ScreenMenuItemsContainer>
            ))}
        </ScreenMenuWrapper>
    )
}

export default ScreenMenu