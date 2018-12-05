import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../home'
import AddPatient from '../add-patient'
import Analysis from '../analysis'
import HomeIcon from '../home-icon'
import Sidebar from '../sidebar'

import './index.css'
export default class AppMain extends React.Component{
    render(){
        return(
            <div className='app-main-wrapper'>
                <div className='home-sidebar'>
                    <Sidebar />
                </div>
                <div className='home-container'>
                    <HomeIcon />
                    <Route exact path="/" component={Home} />
                    <Route path='/brain_tumour' component={Analysis} />
                    <Route path='/brain_stroke' component={Analysis} />
                    <Route path='/skin_cancer' component={Analysis} />
                    <Route path='/past_records/brain_tumour' component={Analysis} />
                    <Route path='/past_records/brain_stroke' component={Analysis} />
                    <Route path='/past_records/skin_cancer' component={Analysis} />
                    <Route path='/add_patient' component={AddPatient} />
                </div>
            </div>
        )
    }
}