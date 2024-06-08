import Window from "components/Window/Window";
import { useFreeCellGameStore, useFreecellWindowStore } from "./store/store";
import FileExplorerMenu from "components/FileExplorer/FileExplorerTopMenu/FileExplorerTopMenu";
import useFileExplorer from "components/FileExplorer/hooks/useFileExplorer";
import Underline from "components/Underline/Underline";
import freecellIcon from '../../svg/freecell.svg';
import freecellLeftIcon from '../../assets/freecell-left-icon.png';
import styled from "styled-components";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { finished } from "stream";

const FreeCellGameContent = styled.div`
    height: 500px;
    width: 750px;
    background-color: green;
`;

const TopPanel = styled.div`
    display: flex;
    justify-content: space-between;
`;

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
`;

const FreeCellKing = styled.div<{ direction: 'left' | 'right'}>`
    display: flex;
    align-items: center;

    div {
        padding: 5px;
        border-left: 1px solid lime;
        border-top: 1px solid lime;
        box-shadow: inset -1px -1px 1px 0px black;

        img {
            width: 2rem;
            ${({ direction }) => direction === 'right' && 'transform: scaleX(-1)'}
        }
    }
`;

const BottomPanelWrapper = styled.div`
    display: flex;
    padding: 2rem 0;
    justify-content: center;
    gap: 0.5rem;
`;

const CardColumn = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    height: 35rem;
    width: 5rem;
`;

const GameCardView = styled.div<{ col: number, isactive: string }>`
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7rem;
    position: absolute;
    top: ${({ col }) => col * 2}rem;
    z-index: ${({ col }) => col};
    ${({ isactive }) => isactive === 'true' && 'filter: invert(1);'}
`;

const menuItems = [
    { 
        children: <><Underline>G</Underline>ame</>,
        onClick: () => {}
    },
    { 
        children: <><Underline>H</Underline>elp</>,
        onClick: () => {}
    },
];

const Freecell = () => {

    const { setFreecellOpen } = useFreecellWindowStore(({ setFreecellOpen }) => ({ setFreecellOpen }));
    
    const { generateTitleButtons } = useFileExplorer();
    
    const [direction, setDirection] = useState<'left' | 'right'>('left');

    const { initialDeck, initiateGame, finishGame, toggleActive } = useFreeCellGameStore(({ 
        initialDeck, 
        finishGame, 
        initiateGame, 
        toggleActive, 
    }) => ({ 
        initialDeck,  
        initiateGame,
        finishGame,
        toggleActive 
    }));

    const menuItems = useMemo(() => [
        { 
            children: <><Underline>G</Underline>ame</>,
            onClick: () => initiateGame()
        },
        { 
            children: <><Underline>H</Underline>elp</>,
            onClick: () => {}
        },
    ], [])
    


    const handleClose = () => {
        setFreecellOpen(false)
        finishGame()
    }

    return (
        <Window title={{ title: 'FreeCell', icon: freecellIcon, titleButtons: generateTitleButtons(handleClose) }}>
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
                <BottomPanelWrapper>
                    {Array.from({ length: 8 }).map((_, colIndex) => (
                        <CardColumn key={colIndex}>
                            {initialDeck && initialDeck.slice(
                                colIndex * 7 - Math.max(0, colIndex - 4), 
                                (colIndex + 1) * 7 - Math.max(0, colIndex - 3)
                            ).map((card, cardIndex) => (
                                <GameCardView key={cardIndex} col={cardIndex} onClick={() => toggleActive(card.id)} isactive={`${card.isActive}`}>
                                    <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                                </GameCardView>
                            ))}
                        </CardColumn>
                    ))}
                </BottomPanelWrapper>
            </FreeCellGameContent>
        </Window>
    );
}
export default Freecell