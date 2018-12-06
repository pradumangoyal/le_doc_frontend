import React from 'react'
import {connect} from 'react-redux'

import ProfileStrip from '../profile-strip'
import ImageList from './imageList'
import SetPatient from './setPatient'
import './index.css'
import { setActivePastRecord, nullActivePatient } from './actions';

function heading(data){
    switch (data){
        case 'brain_tumour':
            return 'Brain Tumour'
        case 'brain_stroke':
            return 'Brain Stroke'
        case 'skin_cancer':
            return 'Skin Cancer'
        default:
            return ''
    }
}
class PastRecord extends React.Component{
    componentDidMount(){
        this.props.SetActivePastRecord(this.props.match.path.slice(14,this.props.match.path.length))
        this.props.NullActivePatient()
    }
    render(){
        const {pastRecord, imageList, patient} = this.props
        return(
            <div className='past-record-wrapper'>
                <div className='past-record-constant'>
                    <ProfileStrip />
                    <h2 className='past-record-heading'>{heading(pastRecord)}</h2>
                    <div className='past-record-step'>
                    </div>
                </div>
                <div className='past-record-main'>
                {
                    !imageList.loaded || !patient.loaded
                    ? <SetPatient />
                    : <ImageList />
                }
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        pastRecord: state.pastRecord,
        imageList: state.imageList,
        patient: state.activePatient
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        SetActivePastRecord: (data) => {
          dispatch(setActivePastRecord(data))
        },
        NullActivePatient: () => {
            dispatch(nullActivePatient())
        }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(PastRecord)