import React from 'react'
import {connect} from 'react-redux'

class PatientProfile extends React.Component{
    render(){
        const {patient} = this.props
        return(
            <div className='patient-profile-wrapper'>
                <div className='patient-profile-row'>
                    <div><span className='patient-profile-heading'>Name:</span> {patient.patient.name}</div>
                    <div><span className='patient-profile-heading'>Contact:</span> {patient.patient.contact}</div>
                </div>
                <div className='patient-profile-row'>
                    <div><span className='patient-profile-heading'>Age:</span> {patient.patient.age}</div>
                    <div><span className='patient-profile-heading'>Gender:</span> {patient.patient.gender}</div>
                    <div><span className='patient-profile-heading'>Blood Group:</span> {patient.patient.blood_group}</div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        patient: state.activePatient
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile)