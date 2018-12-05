const initialState = ''

const analysis = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_ANALYSIS':
            return action.payload
        default:
            return state
    }
}

export default analysis