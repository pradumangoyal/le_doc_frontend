import axios from 'axios'

import {urlWhoAmI} from '../../urls'

export const setUser = () => {
    return dispatch => {
        axios.get(urlWhoAmI())
        .then(res => {
            dispatch({
                type: 'SET_USER',
                payload: {loaded: true, user:res.data}
            })
        })
        .catch(() => {
            dispatch({
                type: 'SET_USER',
                payload: {loaded: true, user: false}
            })
        })
    }
}