import React, {Component} from 'react'
import {CirclePicker} from 'react-color'

class Color extends Component {
    render(){
        return <CirclePicker colors={['#ffc857', '#2d728f', '#c52233', 'seagreen']}/>
    }
}

export default Color