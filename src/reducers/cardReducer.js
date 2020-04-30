import randomGenerator from '../components/Card'
import Swal from 'sweetalert2'
import winningCat from '../assets/winningCat.jpg'

const initState = {
    currentPlayer: 0,
    numOfPlayer: 1,
    currentAllCards: [],
    cardOnDesk: {},
    currentCards: [],
    colorChosen: '',
    showColorPicker: false,
}

const cardReducer = (state = initState, action) => {
    switch (action.type){
        case 'SET_PLAYER':
            return{
                ...state,
                numOfPlayer: action.num
            }

        case 'INIT_CARD':
            let allCards = []
            for (let i = 0; i < state.numOfPlayer; i++){
                const cards = randomGenerator(7)
                allCards.push(cards)
            }
            return {
                ...state,
                currentAllCards: allCards,
                currentCards: allCards[state.currentPlayer]
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
            if (Object.keys(state.cardOnDesk).length === 0){
                if (action.card.length === 1){
                    let currentCards = state.currentCards
                    currentCards = currentCards.filter((card) => {
                        return (card !== action.card[0])
                    })
                    let currentAllCards = state.currentAllCards
                    currentAllCards[0] = currentCards
                    return {
                        ...state,
                        cardOnDesk: action.card[0],
                        currentCards: currentCards,
                        currentAllCards: currentAllCards
                    }
                }
            }
            else if (state.currentCards.length === 1 && (action.card[0].number === state.cardOnDesk.number || action.card[0].color === state.cardOnDesk.color)){
                // Swal.fire({
                //     title: 'Winner!',
                //     text: 'Uno is number 1',
                //     imageUrl: winningCat,
                //     imageWidth: 400,
                //     imageHeight: 200,
                //     imageAlt: 'A proud winning cat',
                // })
                Swal.fire({
                    title: 'You win!',
                    text: "Uno is number 1",
                    imageUrl: winningCat,
                    imageAlt: 'A proud winning cat',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes!!!'
                }).then((result) => {
                    if (result.value) {
                        window.location.reload()
                    }
                })
            }

            else{
                if (action.card[0].number === state.cardOnDesk.number || action.card[0].color === state.cardOnDesk.color){
                    let currentCards = state.currentCards
                    currentCards = currentCards.filter((card) => {
                        return (card !== action.card[0])
                    })
                    let currentAllCards = state.currentAllCards
                    currentAllCards[0] = currentCards
                    return{
                        ...state,
                        cardOnDesk: action.card[0],
                        currentCards: currentCards,
                        currentAllCards: currentAllCards
                    }
                }
            }
        case 'TAKE_TURN':
            console.log('take turn', action)
            const currentId = state.currentPlayer + 1
            return{
                ...state,
                currentPlayer: currentId
            }
    }
    return state
}

export default cardReducer