import React from 'react'
import {connect} from 'react-redux'

import './index.css'
class ProfileStrip extends React.Component{
    render(){
        const {whoAmI, patients} = this.props
        return(
            <div className='profile-strip-wrapper'>
                <div>Dr. {whoAmI.loaded && whoAmI.user.first_name} {whoAmI.loaded && whoAmI.user.last_name}</div>
                <div>{whoAmI.loaded && whoAmI.user.email}</div>
                <div>Toatal Patients: {patients.loaded && patients.patients.length}</div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        whoAmI: state.whoAmI,
        patients: state.patients
    }
}
export default connect(mapStateToProps)(ProfileStrip)
