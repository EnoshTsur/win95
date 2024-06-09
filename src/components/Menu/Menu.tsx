import styled from "styled-components"
import { FaCaretRight } from "react-icons/fa"
import Window from "components/Window/Window"
import useMenu from "./useMenu"
import { useLayoutEffect } from "react"

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
    padding: 0.2rem;

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

const ScreenMenuItemWrapper = styled.div<{ xdirection: string }>`
    position: relative;
    display: flex;
    flex-direction: ${({ xdirection }) => xdirection === 'left' ? 'row-reverse' : 'row'};
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
    readonly isSubMenu?: boolean
}

const Menu = ({ offset: { x, y }, menuItems, isSubMenu = false }: ScreenItemProps) => {

    const {ref, adjustPosition, xDirection, menuPosition, hoveredItem, setHoveredItem, computeSubMenuX } = useMenu()

    useLayoutEffect(() => {
        if (!isSubMenu) {
            adjustPosition(x, y);
        }
    }, [x, y, adjustPosition, isSubMenu]);

    return (
        <Window offset={isSubMenu ? { x, y } : menuPosition}>
        <ScreenMenuWrapper ref={ref}>
            { menuItems.map((row, rowIndex) => (
                <ScreenMenuItemsContainer 
                    key={`menuscreen${row.length}${rowIndex}`} 
                    hasbordertop={`${rowIndex !== 0}`} 
                    hasborderbottom={`${rowIndex !== menuItems.length - 1}`}
                >
                    { row.map(({ children, hasCaret, disabled, onClick, next }, colIndex) => (
                        <ScreenMenuItemWrapper 
                            xdirection={xDirection}
                            key={`memuscreenitem${colIndex}`}
                            onMouseEnter={() => {
                                setHoveredItem({ row: rowIndex, col: colIndex })
                                
                            }}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            { 
                                !disabled && hasCaret && next && hoveredItem?.row === rowIndex && hoveredItem?.col === colIndex && (
                                    <Menu 
                                        isSubMenu={true}
                                        menuItems={next!} 
                                        offset={{ x: computeSubMenuX(xDirection), y: -5 }} 
                                    />
                                )
                            }
                            <ScreenMenuItem  
                                onClick={onClick} 
                                disabled={disabled} 

                            >
                                { children }
                            </ScreenMenuItem>
                            { hasCaret && <FaCaretRight style={{ transform: `rotate(${xDirection === 'left' ? '180deg' : '0'})`}}/> } 
                        </ScreenMenuItemWrapper>
                    ))}
                </ScreenMenuItemsContainer>
            ))}
        </ScreenMenuWrapper>
        </Window>
    )
}

export default Menu