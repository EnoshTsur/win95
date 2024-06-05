import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import { FaCaretRight } from "react-icons/fa"
import Window from "components/Window/Window"

const ScreenMenuWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.menu};
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    border-left: 1px solid white;
    border-top: 1px solid white;
    display: flex;
    flex-direction: column;
`

const ScreenMenuItemsContainer = styled.div<{ hasbordertop: string, hasborderbottom: string }>`
    display: flex;
    flex-direction: column;
    padding: 3px;

    ${({ hasbordertop, theme }) => hasbordertop === 'true' && `border-top: 1px solid ${theme.colors.white};`}
    ${({ hasborderbottom, theme }) => hasborderbottom === 'true' && `border-bottom: 1px solid ${theme.colors.buttonShadow};`}
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
    white-space: nowrap;
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
    // readonly zIndex: number
    readonly menuItems: ReadonlyArray<ReadonlyArray<ScreenMenuItem>>
}

const ScreenMenu = ({ offset: { x, y }, menuItems }: ScreenItemProps) => {

    // const [isMouseHover, setMouseHover] = useState(false)
    const [hoveredItem, setHoveredItem] = useState<{ row: number, col: number } | null>(null)

    const ref = useRef<HTMLDivElement | null>(null)

    const computedX = useMemo(() => {
        if (ref.current != null) {
            const { width } = ref.current.getBoundingClientRect()
            return width - 10
        }
        return 0;
    }, [ref.current])

    return (
        <Window offset={{ x, y }}>
        <ScreenMenuWrapper ref={ref}>
            { menuItems.map((row, rowIndex) => (
                <ScreenMenuItemsContainer 
                    key={`menuscreen${row.length}${rowIndex}`} 
                    hasbordertop={`${rowIndex !== 0}`} 
                    hasborderbottom={`${rowIndex !== menuItems.length - 1}`}
                >
                    { row.map(({ children, hasCaret, disabled, onClick, next }, colIndex) => (
                        <ScreenMenuItemWrapper 
                            key={`memuscreenitem${colIndex}`}
                            onMouseEnter={() => setHoveredItem({ row: rowIndex, col: colIndex })}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            { 
                                !disabled && hasCaret && next && hoveredItem?.row === rowIndex && hoveredItem?.col === colIndex && (
                                    <ScreenMenu 
                                        menuItems={next!} 
                                        offset={{ x: computedX, y: -5 }} 
                                    />
                                )
                            }
                            <ScreenMenuItem  
                                onClick={onClick} 
                                disabled={disabled} 
                            >
                                { children }
                            </ScreenMenuItem>
                            { hasCaret && <FaCaretRight /> } 
                        </ScreenMenuItemWrapper>
                    ))}
                </ScreenMenuItemsContainer>
            ))}
        </ScreenMenuWrapper>
        </Window>
    )
}

export default ScreenMenu