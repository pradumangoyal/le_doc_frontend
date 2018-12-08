import axios from 'axios'
import {message} from 'antd'

import {getCookie} from '../../utils'
import {urlPatientDetails, urlPostReports, urlOperate} from '../../urls'

export function setActiveAnalysis(data){
    return dispatch => {
        dispatch({
            type: 'SET_ACTIVE_ANALYSIS',
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

export function setActivePatient(patient){
    return dispatch => {
        axios.get(urlPatientDetails(patient))
        .then(res => {
            dispatch({
                type: 'SET_ACTIVE_PATIENT',
                payload: {loaded: true, patient: res.data}
            })
            dispatch({
                type: 'CHANGE_ANALYSIS_STEP',
                payload: 1
            })
            message.success(`${res.data.name}`, 2)
        })
        .catch(err => {
            message.error('Error while setting patient', 2)
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

export const addImage = (active, data) => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      'X-CSRFToken': getCookie('csrftoken'),
      "X-Requested-With": "XMLHttpRequest"
    }
    return dispatch => {
        dispatch({
            type: 'SET_IMAGE_LOADING',
            payload: false
            })
        axios.post(urlPostReports(active), data, { headers: headers })
        .then(res => {
            dispatch({
                type: 'SET_IMAGE',
                payload: {loading: false, data: res.data}
            })
            dispatch({
                type: 'CHANGE_ANALYSIS_STEP',
                payload: 2
            })
            message.success(`Image uploaded successfully`, 2)
        })
        .catch(err => {
            message.error('Some error occured', 2)
        })
    }
  }

  export const analyseImage = (active, id) => {
    return dispatch => { 
        dispatch({
            type: 'SET_IMAGE_LOADING',
            payload: true
        }) 
        axios.get(urlOperate(active, id))
        .then(res => {
            dispatch({
                type: 'SET_IMAGE',
                payload: {loading: false, data: res.data}
            })
            dispatch({
                type: 'CHANGE_ANALYSIS_STEP',
                payload: 3
            })
        })
        .catch(err => {
            message.error('Some error occured', 2)
        })
    }
  }