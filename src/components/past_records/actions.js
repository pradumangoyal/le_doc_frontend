import axios from 'axios'
import {message} from 'antd'

import {urlPatientDetails, urlGetPastRecords} from '../../urls'

export function setActivePastRecord(data){
    return dispatch => {
        dispatch({
            type: 'SET_ACTIVE_PAST_RECORD',
            payload: data
        })
    }
}

export function changeStep(data){
    return dispatch => {
        dispatch({
            type: 'CHANGE_ANALYSIS_STEP',
            payload: data
        })
    }
}

export function setActivePatient(active, patient){
    return dispatch => {
        axios.get(urlPatientDetails(patient))
        .then(res => {
            dispatch({
                type: 'SET_ACTIVE_PATIENT',
                payload: {loaded: true, patient: res.data}
            })
            message.success(`${res.data.name}`, 2)
        })
        .catch(err => {
            message.error('Error while setting patient', 2)
        })

        axios.get(urlGetPastRecords(active, patient))
        .then(res => {
            dispatch({
                type: 'SET_IMAGE_LIST',
                payload: {loaded: true, list: res.data}
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: 'SET_IMAGE_LIST',
                payload: {loaded: false, list: {}}
            })
            message.error('Error while getting images', 2)
        })
    }
}

export function nullActivePatient(){
    return dispatch => {
        dispatch({
            type: 'SET_ACTIVE_PATIENT',
            payload: {loaded: false, patient: {}}
        })
    }
}