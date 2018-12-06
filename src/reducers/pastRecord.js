const initialState = ''

const analysis = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_PAST_RECORD':
            return action.payload
        default:
            return state
    }
}

export default analysis