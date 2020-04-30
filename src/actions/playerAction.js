export const setPlayer = (num) =>{
    return{
        type: 'SET_PLAYER',
        num: num
    }
}

export const initCard = (id) => {
    return {
        type: 'INIT_CARD',
        id
    }
}

export const playCard = (id, card) => {
    return {
        type: 'PLAY_CARD',
        card: card,
        id
    }
}

export const drawCard = (id, numbOfCard) =>{
    return {
        type: 'DRAW_CARD',
        numbOfCard: numbOfCard,
        id
    }
}

export const takeTurn = (id) => {
    return {
        type: 'TAKE_TURN',
        id
    }
}

export const challengeUno = (id) => {
    return {
        type: 'CHALLENGE_UNO',
        id
    }
}

export const stack = (id) => {
    return {
        type: 'STACK',
        id
    }
}

export const forcePlay = (id) => {
    return {
        type: 'FORCE_PLAY',
        id
    }
}