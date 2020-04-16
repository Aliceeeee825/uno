import React, {Component} from 'react'
import { connect } from 'react-redux'

import { initCard,playCard, drawCard } from '../actions/playerAction'

class Main extends Component{
    constructor(){
        super()

        this.state = {
            active: [],
            addedItems: []
        }
    }

    startClick = () => {
        this.props.initCard(0)
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps){
            let active = []
            for (let i = 0; i < this.props.currentAllCards[0].length; i++) {
                active.push(false)
            }
            this.setState({
                active:active
            })
        }
    }

    clickCard = (e) => {
        const cardClicked = e.target.attributes.listid.value
        let newState = this.state.active
        newState[cardClicked] = !newState[cardClicked]
        this.setState({
            active:newState
        })
    }

    pass = () => {
        this.props.drawCard(0, 1)
    }

    play = () => {
        const activeList = this.state.active
        let cardsToPlay = []
        for (let i = 0; i < activeList.length; i++){
            if (activeList[i] === true){
                cardsToPlay.push(this.props.currentCards[i])
            }
        }
        this.props.playCard(0, cardsToPlay)
    }

    render(){
        let addedItems = this.props.currentCards.map((card, index) => {
            return (
            <button className={this.state.active[index] ? 'card activeCard' : 'card'} key={index} style={{background: card.color}} onClick={this.clickCard} value={card.number} cardcolor={card.color} listid = {index}>
                {card.number}
            </button>
            )
        })


        return(
            <div className='mainContent'>
                <div className="cardOnDesk">
                    
                    <p className='card onDesk' style={{background: this.props.cardOnDesk.color}}>{
                    this.props.cardOnDesk.number}</p>
                </div>
                    {
                    (this.props.currentAllCards.length) ? 
                    <div className="user">
                        <div className="userButton">
                            <button onClick={this.pass}>PASS</button>
                            <button onClick={this.play}>PLAY THE CARD</button>
                        </div>
                        <div className="handCards">
                            {addedItems}
                        </div>
                    </div> : 
                        <button className='startButton' onClick={this.startClick}>Start now</button>
                    }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentPlayer: state.currentPlayer,
        numOfPlayer: state.numOfPlayer,
        currentAllCards: state.currentAllCards,
        cardOnDesk: state.cardOnDesk,
        currentCards: state.currentCards,
        colorChosen: state.colorChosen
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initCard: (id) => { dispatch(initCard(id)) },
        playCard: (id, card) => {dispatch(playCard(id,card))},
        drawCard: (id, num) => {dispatch(drawCard(id, num))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)