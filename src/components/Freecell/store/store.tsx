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
    initialDeck: [],
    finishDeck: [],
    initiateGame: () => set({ initialDeck: pipe(generateInitialDeck(), shuffleDeck), finishDeck: []}),
    moveCardToFinishDeck: (card) => set((pre) => ({
        initialDeck: pipe(
            pre.initialDeck,
            A.filter(({ value, suit}) => value !== card.value || suit !== card.suit)
        ),
        finishDeck: [...pre.finishDeck, card]
    })),
    finishGame: () => set({ initialDeck: [], finishDeck: []}),
    toggleActive: (id) => set((pre) => ({
        initialDeck: pre.initialDeck.map((card) => card.id === id ? {...card, isActive: !card.isActive } : card),
        finishDeck: pre.finishDeck.map((card) => card.id === id ? {...card, isActive: !card.isActive } : card),
    }))
}))

export const useFreecellWindowStore = create<FreeCellWindowStore>((set) => ({
    isFreecellOpen: false,
    setFreecellOpen: (value) => set({ isFreecellOpen: value })
}))