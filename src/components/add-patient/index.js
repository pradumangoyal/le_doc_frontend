import React from 'react'
import AddPatientForm from './form'

import ProfileStrip from '../profile-strip'
import HomeIcon from '../home-icon'
import './index.css'
export default class AddPatient extends React.Component{
    render(){
        return(
            <div className='add-patient-wrapper'>
                <ProfileStrip />
                <HomeIcon />
                <AddPatientForm />
            </div>
        )
    }
}