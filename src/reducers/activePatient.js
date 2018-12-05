const initialState = {
    loaded: false,
    patient: {}
}

const activePatient = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_ACTIVE_PATIENT':
            return action.payload
        default:
            return state
    }
}

export default activePatient