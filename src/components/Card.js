
const deckAll = []
// const colors = ['blue', 'green', 'red', 'yellow''#83b692']
const colors = ['#ffc857', '#2d728f', '#c52233', 'seagreen']
const actions = {10:'draw 2', 11:'reverse', 12:'skip'}

colors.forEach((color) => {
    for (let i = 0; i <= 12; i++){
        let card = {}
        if (i <= 9){
            card = {'color': color, 'number': i}
        }
        else{
            card = { 'color': color, 'number': actions[i]}
        }
        deckAll.push(card)
    }
})

const randomGenerator = (numOfCards) => {
    const cardOut = []
    for (let i = 0; i < numOfCards; i ++){
        let card = {}
        const currentColor = colors[Math.floor(Math.random() * 4)]
        const currentNumber = Math.floor(Math.random()* 12)
        console.log('numbers',currentNumber)
        if (currentNumber >= 10){
            card = { 'color': currentColor, 'number': actions[currentNumber]}
        }
        else{
            card = { 'color': currentColor, 'number': currentNumber}
        }
        cardOut.push(card)
    }
    return cardOut
}

export default randomGenerator