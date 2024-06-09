import Window from "components/Window/Window";
import { useFreeCellGameStore, useFreecellWindowStore } from "./store/store";
import FileExplorerMenu from "components/FileExplorer/FileExplorerTopMenu/FileExplorerTopMenu";
import useFileExplorer from "components/FileExplorer/hooks/useFileExplorer";
import Underline from "components/Underline/Underline";
import freecellIcon from '../../svg/freecell.svg';
import freecellLeftIcon from '../../assets/freecell-left-icon.png';
import styled from "styled-components";
import { useCallback, useMemo, useState } from "react";
import { GameCard } from "./store/types";
import Alert from "components/Alert/Alert";
import { IoMdClose } from "react-icons/io";

const FreeCellGameContent = styled.div`
    height: 31.5rem;
    width: 47rem;
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

const GameCardView = styled.div<{ col: number, isactive: string,  }>`
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

const GameCardBankView = styled.div<{ isactive: string,  }>`
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 7rem;
    ${({ isactive }) => isactive === 'true' && 'filter: invert(1);'}
`;


const Freecell = () => {
    const [isError, setError] = useState(false)

    const { setFreecellOpen } = useFreecellWindowStore(({ setFreecellOpen }) => ({ setFreecellOpen }));
    
    const { generateTitleButtons } = useFileExplorer();
    
    const [direction, setDirection] = useState<'left' | 'right'>('left');

    const { 
        activeGameDeckId, 
        activeBankDeckId, 
        gameDeck, 
        bankDeck, 
        initiateDeck, 
        finishGame, 
        toggleGameDeckActive, 
        toggleBankActive, 
        moveCardToBankDeck, 
    } = useFreeCellGameStore(({ 
        activeGameDeckId,
        activeBankDeckId,
        gameDeck, 
        bankDeck,
        finishGame, 
        initiateDeck, 
        toggleBankActive,
        toggleGameDeckActive, 
        moveCardToBankDeck
    }) => ({ 
        activeGameDeckId,
        activeBankDeckId,
        gameDeck,  
        bankDeck,
        initiateDeck,
        finishGame,
        toggleBankActive,
        toggleGameDeckActive,
        moveCardToBankDeck
    }));

    const menuItems = useMemo(() => [
        { 
            children: <><Underline>G</Underline>ame</>,
            onClick: () => {
                initiateDeck()
            }
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

    const handleBankClick = useCallback(() => {

        if (bankDeck.length === 4) {
            setError(true)
            return
        }

        if (activeGameDeckId != null && activeBankDeckId == null) {
            const active = gameDeck.reduce<GameCard | null>((acc,  cardColumn) => {
                    if (acc != null) {
                        return acc
                    }
                    const active = cardColumn.find(({ isActive }) => isActive )
                    return active ? active : acc
                }, null)
        
                if (active) {
                    toggleGameDeckActive(active.id)
                    moveCardToBankDeck(active)
                }

        }
    }, [bankDeck, gameDeck, activeGameDeckId, activeBankDeckId])


    const handleGamePanelCardClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (activeBankDeckId != null) {
            return
        }
        const targetId = (e.target as HTMLElement).id;        
        
        if (activeGameDeckId == null || targetId === activeGameDeckId) {
            toggleGameDeckActive(targetId)
        }
    }, [activeGameDeckId, activeBankDeckId])


    const handleBankCardClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (activeGameDeckId != null) {
            return
        }
        const targetId = (e.target as HTMLElement).id;
        
        debugger
        if (activeBankDeckId == null || targetId === activeBankDeckId) {
            toggleBankActive(targetId)
        }
    }, [activeBankDeckId, activeGameDeckId])


    return (
        <Window title={{ title: 'FreeCell', icon: freecellIcon, titleButtons: generateTitleButtons(handleClose) }}>
            {
                isError && ( 
                    <Alert 
                        status="INFO"
                        title={{ 
                            title: 'FreeCell', 
                            titleButtons: [
                                { children: <IoMdClose />, onClick: () => { setError(false) } }
                            ]
                        }} 
                        panelButtons={[
                            { children: 'OK', onClick: () => { setError(false) } }
                        ]}
                        message="That move is not allowed" 
                    />
                )
            }
            <FileExplorerMenu menuItems={menuItems}/>
            <FreeCellGameContent>
                <TopPanel>
                    <TopCardsPanel onMouseEnter={() => setDirection('left')}>
                    {Array.from({ length: 4 }).map((_, colIndex) => (
                        <div key={colIndex} style={{ zIndex: 90 }} onClick={handleBankClick}>
                            { bankDeck[colIndex] && (

                            <GameCardBankView 
                                id={bankDeck[colIndex].id} 
                                key={colIndex +100} 
                                onClick={handleBankCardClick}
                                isactive={`${bankDeck[colIndex].isActive}`}
                            >
                                    <img 
                                        id={bankDeck[colIndex].id} 
                                        src={bankDeck[colIndex].image} 
                                        alt={`${bankDeck[colIndex].value} of ${bankDeck[colIndex].suit}`} 
                                    />
                            </GameCardBankView>

                            )}
                        </div>
                    ))}
                    </TopCardsPanel>
                    
                    <FreeCellKing direction={direction}>
                        <div>
                            <img src={freecellLeftIcon} alt="freecell" />
                        </div>
                    </FreeCellKing>
                    
                    <TopCardsPanel onMouseEnter={() => setDirection('right')}>
                    {Array.from({ length: 4 }).map((_, colIndex) => (
                        <div key={colIndex}>

                        </div>
                    ))}
                    </TopCardsPanel>
                </TopPanel>
                <BottomPanelWrapper>
                    { gameDeck.map((col, index) => (
                        <CardColumn key={`cardcol${index}`}>
                            { 
                                col.map((card, cardIndex) => (

                                    <GameCardView 
                                        id={card.id} 
                                        key={`card${cardIndex}`} 
                                        col={cardIndex} onClick={(e)=>
                                            col[col.length - 1].id == card.id && handleGamePanelCardClick(e)} 
                                        isactive={`${card.isActive}`}
                                    >
                                        <img 
                                            id={card.id} 
                                            src={card.image} 
                                            alt={`${card.value} of ${card.suit}`} 
                                        />
                                    </GameCardView>

                                )) 
                            }
                        </CardColumn>
                    ))}
                </BottomPanelWrapper>
            </FreeCellGameContent>
        </Window>
    );
}
export default Freecell