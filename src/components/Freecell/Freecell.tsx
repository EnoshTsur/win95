import Window from "components/Window/Window"
import { useFreecellWindowStore } from "./store/store"
import FileExplorerMenu from "components/FileExplorer/FileExplorerTopMenu/FileExplorerTopMenu"
import useFileExplorer from "components/FileExplorer/hooks/useFileExplorer"
import Underline from "components/Underline/Underline"
import freecellIcon from '../../svg/freecell.svg'
import freecellLeftIcon from '../../assets/freecell-left-icon.png'
import styled from "styled-components"
import { useState } from "react"

const FreeCellGameContent = styled.div`
    height: 500px;
    width: 750px;
    background-color: green;
`

const TopPanel = styled.div`
    display: flex; 
    justify-content: space-between;
`

const TopCardsPanel = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    div {
        width: 5rem;
        height: 7rem;
        border-right: 1px solid lime;
        border-bottom: 1px solid lime;
        box-shadow: inset 1px 1px 0px 1px black;
    }
`

const FreeCellKing = styled.div<{ direction: 'left' | 'right'}>`
    display: flex;
    align-items: center;

    div{
        padding: 5px;
        border-left: 1px solid lime;
        border-top: 1px solid lime;
        box-shadow: inset -1px -1px 1px 0px black;
        img {
            width: 2rem;
            ${({ direction }) => direction === 'right' && 'transform: scaleX(-1)'}
        }
    }

`

const menuItems = [
    { 
        children: <><Underline>G</Underline>ame</>,
        onClick: () => {}
    },
    { 
        children: <><Underline>H</Underline>elp</>,
        onClick: () => {}
    },
]

const Freecell = () => {

    const { setFreecellOpen } = useFreecellWindowStore(({ setFreecellOpen }) => ({ setFreecellOpen }))
    const { generateTitleButtons } = useFileExplorer()
    
    const [direction, setDirection] = useState<'left' | 'right'>('left')

    return (
        <Window title={{ title: 'FreeCell', icon: freecellIcon, titleButtons: generateTitleButtons(() => setFreecellOpen(false)) }}>
            <FileExplorerMenu menuItems={menuItems}/>
            <FreeCellGameContent>
                <TopPanel>
                    <TopCardsPanel onMouseEnter={() => setDirection('left')}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </TopCardsPanel>
                    
                    <FreeCellKing direction={direction}>
                        <div>
                            <img src={freecellLeftIcon} alt="freecell" />
                        </div>
                    </FreeCellKing>
                    
                    <TopCardsPanel onMouseEnter={() => setDirection('right')}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </TopCardsPanel>
                </TopPanel>
            </FreeCellGameContent>
        </Window>
    )
}

export default Freecell