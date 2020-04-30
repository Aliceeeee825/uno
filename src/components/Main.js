import React, {Component} from 'react'
import { connect } from 'react-redux'
import { CirclePicker } from 'react-color'

import { initCard, playCard, drawCard, setPlayer, takeTurn} from '../actions/playerAction'

class Main extends Component{
    constructor(){
        super()

        this.state = {
            active: [],
            addedItems: [],
            numOfPlayer: 1
        }
    }

    handleNumberChange = (e) =>{
        this.setState({
            numOfPlayer: Number(e.target.value)
        })
    }

    startClick = () => {
        const currentPlayer = this.props.currentPlayer
        this.props.setPlayer(this.state.numOfPlayer)
        this.props.initCard(currentPlayer)
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps){
            let active = []
            for (let i = 0; i < this.props.currentAllCards[this.props.currentPlayer].length; i++) {
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
        this.props.drawCard(this.props.currentPlayer, 1)
    }

    play = () => {
        const activeList = this.state.active
        let cardsToPlay = []
        for (let i = 0; i < activeList.length; i++){
            if (activeList[i] === true){
                cardsToPlay.push(this.props.currentCards[i])
            }
        }
        this.props.playCard(this.props.currentPlayer, cardsToPlay)
        this.props.takeTurn(this.props.currentPlayer)
    }


    render(){
        let addedItems = []
        if (this.
            props.currentAllCards.length){
            addedItems = this.props.currentAllCards[this.props.currentPlayer].map((card, index) => {
                return (
                <button className={this.state.active[index] ? 'card activeCard' : 'card'} key={index} style={{background: card.color}} onClick={this.clickCard} value={card.number} cardcolor={card.color} listid = {index}>
                    {card.number}
                </button>
                )
            })
        }



        return(
            <div className='mainContent'>
                <div className="cardOnDesk">
                    {/* <div className={this.props.showColorPicker ? 'colorPicker visible' : 'colorPicker'}>
                        <p>which color do you want to go with:</p>
                        <CirclePicker onChange={this.pickColor} colors={['#ffc857', '#2d728f', '#c52233', 'seagreen']} />
                    </div> */}
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
                        <div className="startScreen">
                            <form action="">
                                <label htmlFor="">For how many people?</label>
                                <input type="number" min='1' max='3' value={this.state.numOfPlayer} onChange={this.handleNumberChange}/>
                                <button className='startButton' onClick={this.startClick}>Start now</button>
                            </form>
                        </div>
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
        colorChosen: state.colorChosen,
        showColorPicker: state.showColorPicker
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPlayer: (numOfPlayer) => {dispatch(setPlayer(numOfPlayer))},
        initCard: (id) => { dispatch(initCard(id)) },
        playCard: (id, card) => {dispatch(playCard(id,card))},
        drawCard: (id, num) => {dispatch(drawCard(id, num))},
        takeTurn: (id) => {dispatch(takeTurn(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)