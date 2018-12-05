import React from 'react'
import {Route} from 'react-router-dom'
import Home from '../home'

import './index.css'
export default class AppMain extends React.Component{
    render(){
        return(
            <div className='app-main-wrapper'>
                <Route path="/" exact component={Home} />
                <Route path='/brain_tumour' component={Home} />
                <Route path='/brain_stroke' component={Home} />
                <Route path='/skin_cancer' component={Home} />
                <Route path='/past_records/brain_tumour' component={Home} />
                <Route path='/past_records/brain_stroke' component={Home} />
                <Route path='/past_records/skin_cancer' component={Home} />
                <Route path='/add_patient' component={Home} />

            </div>
        )
    }
}