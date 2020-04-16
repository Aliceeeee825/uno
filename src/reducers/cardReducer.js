import randomGenerator from '../components/Card'

const initState = {
    currentPlayer: 0,
    numOfPlayer: 2,
    currentAllCards: [],
    cardOnDesk: [],
    currentCards: [],
    colorChosen: '',
}

const cardReducer = (state = initState, action) => {
    switch (action.type){
        case 'INIT_CARD':
            let cards = randomGenerator(7)
            console.log([cards])
            return {
                ...state,
                currentAllCards: [...state.currentAllCards, cards],
                currentCards: cards
            }
        case 'DRAW_CARD':
            let newCards = randomGenerator(action.numbOfCard) 
            let currentCards = state.currentAllCards[0]
            currentCards = currentCards.concat(newCards)
            let currentState = state.currentAllCards
            currentState[0] = currentCards
            return {
                ...state,
                currentAllCards: currentState,
                currentCards: currentCards
            }
        case 'PLAY_CARD':
            console.log('actioncard',action.card)
            if (state.cardOnDesk.length === 0){
                if (action.card.length === 1){
                    return {
                        ...state,
                        cardOnDesk: action.card[0]
                    }
                }
                if (action.card.length > 1) {
                    
                }
            }
            // else{
            //     console.log(action.card)
                // let handColor = action.card.slice(0, action.card.indexOf(','))
                // let handNumber = action.card.slice(action.card.indexOf(',')+1)
                // let deskColor = state.cardOnDesk.slice(0, state.cardOnDesk.indexOf(','))
                // let deskNumber = state.cardOnDesk.slice(state.cardOnDesk.indexOf(',') + 1)

                // console.log('hand number',handNumber)
                // console.log('desk number', deskNumber)

                // if (handColor === deskColor || handNumber === deskNumber){
                //     return {
                //         ...state,
                //         cardOnDesk: action.card
                //     }
                // }
            // }
    }
    return state
}

export default cardReducer