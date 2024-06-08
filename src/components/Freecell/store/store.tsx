import { create } from "zustand";
import { Deck, FreeCellGameStore, FreeCellWindowStore, GameCard, GameCardColor, GameCardSuit, GameCardValue } from "./types";

import { pipe } from "fp-ts/function";
import * as A from 'fp-ts/ReadonlyArray'
import { getImageForCard } from "./card-images";

const suits: ReadonlyArray<GameCardSuit> = [GameCardSuit.HEARTS, GameCardSuit.DIAMONDS, GameCardSuit.CLUBS, GameCardSuit.SPADES]

const colors: Readonly<Record<GameCardSuit, GameCardColor>> = {
    [GameCardSuit.HEARTS]: 'red',
    [GameCardSuit.DIAMONDS]: 'red',
    [GameCardSuit.CLUBS]: 'black',
    [GameCardSuit.SPADES]: 'black'
} 

const generateInitialDeck = (): ReadonlyArray<GameCard> => suits.flatMap((suit) => Array.from({ length: 13 }, (_, i) => ({
    suit,
    value: i + 2,
    color: colors[suit],
    image: getImageForCard(suit, i + 2),
    isActive: false,
    id: `${suit}${i + 2}`
})))

const shuffleDeck = (deck: Deck): Deck => deck.reduce<Deck>((shuffledDeck, _, index) => {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    return [
        ...shuffledDeck.slice(0, randomIndex),
        deck[index],
        ...shuffledDeck.slice(randomIndex)
    ]
}, [])


export const useFreeCellGameStore = create<FreeCellGameStore>((set) => ({
    activeGameDeckId: null,
    activeBankDeckId: null,
    activeFinishDeckId: null,
    gameDeck: [],
    finishDeck: [],
    bankDeck: [],
    initiateDeck: () => {
        const fullDeck = pipe(generateInitialDeck(), shuffleDeck)
        const finalDeck = Array.from({ length: 8 }).map((_, colIndex) => fullDeck.slice(
                    colIndex * 7 - Math.max(0, colIndex - 4), 
                    (colIndex + 1) * 7 - Math.max(0, colIndex - 3)
        ))
        set({ gameDeck: finalDeck, bankDeck: [], finishDeck: [] })
    },
    moveCardToFinishDeck: (card) => set((pre) => ({
        gameDeck: pipe(
            pre.gameDeck,
            A.map((cardColumn) => cardColumn.filter(({ value, suit}) => value !== card.value || suit !== card.suit))
        ),
        finishDeck: [...pre.finishDeck, card]
    })),
    moveCardToBankDeck: (card) => set((pre) => ({
        gameDeck: pipe(
            pre.gameDeck,
            A.map((cardColumn) => cardColumn.filter(({ value, suit}) => value !== card.value || suit !== card.suit))

        ),
        bankDeck: [...pre.bankDeck, {...card, isActive: false }],
        isActiveCard: false,
    })),
    finishGame: () => set({ gameDeck: [], finishDeck: [], bankDeck: []}),
    toggleGameDeckActive: (cardId) => set((pre) => ({
        gameDeck: pre.gameDeck.map((col) => col.map(({ isActive, id, ...rest }) => ({...rest, id, isActive:  id === cardId ? !isActive : isActive }))),
        activeGameDeckId: pre.activeGameDeckId == null ? cardId : null
    })),
    toggleBankActive: (cardId) => set((pre) => ({
        bankDeck: pre.bankDeck.map(({ isActive, id, ...rest }) => ({...rest, id, isActive:  id === cardId ? !isActive : isActive })),
        activeBankDeckId: pre.activeBankDeckId === null ? cardId : null
    })),
    toggleFinishActive: (cardId) => set((pre) => ({
        finishDeck: pre.finishDeck.map(({ isActive, id, ...rest }) => ({...rest, id, isActive:  id === cardId ? !isActive : isActive })),
        activeFinishDeckId: pre.activeFinishDeckId == null ? cardId : null,
    }))
}))

export const useFreecellWindowStore = create<FreeCellWindowStore>((set) => ({
    isFreecellOpen: false,
    setFreecellOpen: (value) => set({ isFreecellOpen: value })
}))