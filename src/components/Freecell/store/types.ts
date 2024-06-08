export enum GameCardSuit {
    HEARTS = 'Hearts',
    DIAMONDS = 'Diamons',
    CLUBS = 'Clubs',
    SPADES = 'Spades'
}

export enum GameCardValue {
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    JACK = 11,
    QUEEN = 12,
    KING = 13,
    ACE = 14
}

export type GameCardColor = 'red' | 'black'

export interface GameCard {
    readonly id: string
    readonly suit: GameCardSuit
    readonly value: GameCardValue
    readonly color: GameCardColor
    readonly image: string
    readonly isActive: boolean
}

export type Deck = ReadonlyArray<GameCard>

export interface FreeCellGameStore {
    readonly initialDeck: Deck
    readonly finishDeck: Deck
    readonly initiateGame: () => void
    readonly finishGame: () => void
    readonly moveCardToFinishDeck: (card: GameCard) => void
    readonly toggleActive: (id: string) => void
}


export interface FreeCellWindowStore {
    readonly isFreecellOpen: boolean
    readonly setFreecellOpen: (value: boolean) => void
}