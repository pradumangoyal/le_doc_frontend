import React from 'react'
import {connect} from 'react-redux'
import {Icon} from 'antd'

import './index.css'
class Home extends React.Component{
    render(){
        return(
            <div className='home-main-wrapper'>
                <div className='home-welcome'>
                    <div>
                        <div className='home-welcome-heading'>Welcome,</div>
                        <div className='home-welcome-heading'>Dr. {this.props.whoAmI.user.first_name} {this.props.whoAmI.user.last_name}</div>
                        <div className='home-welcome-desc'>{this.props.whoAmI.user.email}</div>
                        <div className='home-welcome-desc'>@{this.props.whoAmI.user.username}</div>
                        <div className='home-welcome-patients'><Icon type="usergroup-add" className='home-welcome-patients-logo'/>Total Registered Patients: <span className='home-welcome-patients-logo'>{this.props.patients.loaded ? this.props.patients.patients.length: 0}</span></div>
                    </div>
                </div>
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

export default connect(mapStateToProps)(Home)