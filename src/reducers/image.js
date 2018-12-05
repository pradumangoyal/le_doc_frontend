const initialState = {}

const image = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_IMAGE':
            return action.payload
        default:
            return state
    }
}

export default image