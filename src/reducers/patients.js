const initialState = {
    loaded: false,
    patients: []
}

const patients = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_PATIENTS':
            return action.payload
        default:
            return state
    }
}

export default patients