const initialState = {
    loading: false,
    data: {}
}

const image = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_IMAGE':
            return action.payload
        case 'SET_IMAGE_LOADING':
            return {
                loading: action.payload,
                data: {}
            }
        default:
            return state
    }
}

export default image