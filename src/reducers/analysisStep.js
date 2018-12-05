const initialState = 0

const analysisStep = (state=initialState, action) => {
    switch(action.type) {
        case 'CHANGE_ANALYSIS_STEP':
            return action.payload
        default:
            return state
    }
}

export default analysisStep