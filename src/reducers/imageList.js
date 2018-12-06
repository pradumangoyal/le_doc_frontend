const initialState = {loaded: false, list: []}

const imageList = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_IMAGE_LIST':
            return action.payload
        default:
            return state
    }
}

export default imageList