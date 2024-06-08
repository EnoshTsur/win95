import hearts2 from '../../../assets/freecell/hearts-2.png';
import hearts3 from '../../../assets/freecell/hearts-3.png';
import hearts4 from '../../../assets/freecell/hearts-4.png';
import hearts5 from '../../../assets/freecell/hearts-5.png';
import hearts6 from '../../../assets/freecell/hearts-6.png';
import hearts7 from '../../../assets/freecell/hearts-7.png';
import hearts8 from '../../../assets/freecell/hearts-8.png';
import hearts9 from '../../../assets/freecell/hearts-9.png';
import hearts10 from '../../../assets/freecell/hearts-10.png';
import hearts11 from '../../../assets/freecell/hearts-11.png';
import hearts12 from '../../../assets/freecell/hearts-12.png';
import hearts13 from '../../../assets/freecell/hearts-13.png';
import hearts14 from '../../../assets/freecell/hearts-14.png';

import clubs2 from '../../../assets/freecell/clubs-2.png';
import clubs3 from '../../../assets/freecell/clubs-3.png';
import clubs4 from '../../../assets/freecell/clubs-4.png';
import clubs5 from '../../../assets/freecell/clubs-5.png';
import clubs6 from '../../../assets/freecell/clubs-6.png';
import clubs7 from '../../../assets/freecell/clubs-7.png';
import clubs8 from '../../../assets/freecell/clubs-8.png';
import clubs9 from '../../../assets/freecell/clubs-9.png';
import clubs10 from '../../../assets/freecell/clubs-10.png';
import clubs11 from '../../../assets/freecell/clubs-11.png';
import clubs12 from '../../../assets/freecell/clubs-12.png';
import clubs13 from '../../../assets/freecell/clubs-13.png';
import clubs14 from '../../../assets/freecell/clubs-14.png';

import spades2 from '../../../assets/freecell/spades-2.png';
import spades3 from '../../../assets/freecell/spades-3.png';
import spades4 from '../../../assets/freecell/spades-4.png';
import spades5 from '../../../assets/freecell/spades-5.png';
import spades6 from '../../../assets/freecell/spades-6.png';
import spades7 from '../../../assets/freecell/spades-7.png';
import spades8 from '../../../assets/freecell/spades-8.png';
import spades9 from '../../../assets/freecell/spades-9.png';
import spades10 from '../../../assets/freecell/spades-10.png';
import spades11 from '../../../assets/freecell/spades-11.png';
import spades12 from '../../../assets/freecell/spades-12.png';
import spades13 from '../../../assets/freecell/spades-13.png';
import spades14 from '../../../assets/freecell/spades-14.png';

import diamonds2 from '../../../assets/freecell/diamonds-2.png';
import diamonds3 from '../../../assets/freecell/diamonds-3.png';
import diamonds4 from '../../../assets/freecell/diamonds-4.png';
import diamonds5 from '../../../assets/freecell/diamonds-5.png';
import diamonds6 from '../../../assets/freecell/diamonds-6.png';
import diamonds7 from '../../../assets/freecell/diamonds-7.png';
import diamonds8 from '../../../assets/freecell/diamonds-8.png';
import diamonds9 from '../../../assets/freecell/diamonds-9.png';
import diamonds10 from '../../../assets/freecell/diamonds-10.png';
import diamonds11 from '../../../assets/freecell/diamonds-11.png';
import diamonds12 from '../../../assets/freecell/diamonds-12.png';
import diamonds13 from '../../../assets/freecell/diamonds-13.png';
import diamonds14 from '../../../assets/freecell/diamonds-14.png';

import { GameCardSuit, GameCardValue } from './types';

const imageMap: Record<GameCardSuit, Record<GameCardValue, string>> = {
    [GameCardSuit.HEARTS]: {
        [GameCardValue.TWO]: hearts2,
        [GameCardValue.THREE]: hearts3,
        [GameCardValue.FOUR]: hearts4,
        [GameCardValue.FIVE]: hearts5,
        [GameCardValue.SIX]: hearts6,
        [GameCardValue.SEVEN]: hearts7,
        [GameCardValue.EIGHT]: hearts8,
        [GameCardValue.NINE]: hearts9,
        [GameCardValue.TEN]: hearts10,
        [GameCardValue.JACK]: hearts11,
        [GameCardValue.QUEEN]: hearts12,
        [GameCardValue.KING]: hearts13,
        [GameCardValue.ACE]: hearts14,
    },
    [GameCardSuit.CLUBS]: {
        [GameCardValue.TWO]: clubs2,
        [GameCardValue.THREE]: clubs3,
        [GameCardValue.FOUR]: clubs4,
        [GameCardValue.FIVE]: clubs5,
        [GameCardValue.SIX]: clubs6,
        [GameCardValue.SEVEN]: clubs7,
        [GameCardValue.EIGHT]: clubs8,
        [GameCardValue.NINE]: clubs9,
        [GameCardValue.TEN]: clubs10,
        [GameCardValue.JACK]: clubs11,
        [GameCardValue.QUEEN]: clubs12,
        [GameCardValue.KING]: clubs13,
        [GameCardValue.ACE]: clubs14,
    },
    [GameCardSuit.SPADES]: {
        [GameCardValue.TWO]: spades2,
        [GameCardValue.THREE]: spades3,
        [GameCardValue.FOUR]: spades4,
        [GameCardValue.FIVE]: spades5,
        [GameCardValue.SIX]: spades6,
        [GameCardValue.SEVEN]: spades7,
        [GameCardValue.EIGHT]: spades8,
        [GameCardValue.NINE]: spades9,
        [GameCardValue.TEN]: spades10,
        [GameCardValue.JACK]: spades11,
        [GameCardValue.QUEEN]: spades12,
        [GameCardValue.KING]: spades13,
        [GameCardValue.ACE]: spades14,
    },
    [GameCardSuit.DIAMONDS]: {
        [GameCardValue.TWO]: diamonds2,
        [GameCardValue.THREE]: diamonds3,
        [GameCardValue.FOUR]: diamonds4,
        [GameCardValue.FIVE]: diamonds5,
        [GameCardValue.SIX]: diamonds6,
        [GameCardValue.SEVEN]: diamonds7,
        [GameCardValue.EIGHT]: diamonds8,
        [GameCardValue.NINE]: diamonds9,
        [GameCardValue.TEN]: diamonds10,
        [GameCardValue.JACK]: diamonds11,
        [GameCardValue.QUEEN]: diamonds12,
        [GameCardValue.KING]: diamonds13,
        [GameCardValue.ACE]: diamonds14,
    }
};

export const getImageForCard = (suit: GameCardSuit, value: GameCardValue): string => {
    return imageMap[suit][value];
};