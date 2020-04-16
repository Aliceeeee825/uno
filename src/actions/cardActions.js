export const skip = (id) => {
    return {
        type: 'SKIP',
        id
    }
}

export const reverse = (id) => {
    return{
        type: 'REVERSE',
        id
    }
} 

export const changeColor = (id) => {
    return{
        type: 'CHANGE_COLOR',
        id
    }
}

export const drawTwo = (id) => {
    return {
        type: 'DRAW_TWO',
        id
    }
} 

export const drawFour = (id) => {
    return {
        type: 'DRAW_FOUR',
        id
    }
} 
