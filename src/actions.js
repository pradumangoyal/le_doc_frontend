import axios from 'axios'

import {urlPatients} from './urls'

export const setPatients = () => {
    return dispatch => {
        axios.get(urlPatients())
        .then(res => {
            dispatch({
                type: 'SET_PATIENTS',
                payload: {loaded: true, patients:res.data}
            })
        })
        .catch(() => {
            dispatch({
                type: 'SET_PATIENTS',
                payload: {loaded: true, patients: []}
            })
        })
    }
}

export const addPatient = (data) => {
    return dispatch => {
        dispatch({
            type: 'ADD_PATIENT',
            payload: data
        })
    }
}