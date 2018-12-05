const initialState = {
    loading: false
}

const addPatient = (state=initialState, action) => {
    switch(action.type) {
        case 'CHANGE_ADD_PATIENT':
            return {loading: action.payload}
        default:
            return state
    }
}

export default addPatient