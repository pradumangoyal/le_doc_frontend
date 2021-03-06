import React from 'react'
import {Button, AutoComplete, Tooltip} from 'antd'
import {connect} from 'react-redux'

import { setActiveAnalysis, changeStep, setActivePatient, nullActivePatient } from './actions';

class SetPatient extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            patient: ''
        }
    }
    componentDidMount(){
        this.props.NullActivePatient()
    }
    handleSelect = (e) => {
        this.setState({
            patient: e
        })
    }
    handleSubmit = () => {
        this.props.SetActivePatient(this.state.patient)
    }
    render(){
        const {patients} = this.props
        return(
            <div className='set-patient-wrapper'>
                <div className='set-patient-input'>
                    <h2>Select Patient</h2>
                    <AutoComplete style={{width: '100%', margin: '1em 0'}} dataSource={patients.patients.map(x => {return x.username})} onSelect={this.handleSelect} placeholder='Search Patient by username' />
                    <Tooltip placement='bottom' title='Set Patient'>
                        <Button type="primary" shape="circle" icon="user-add" size='large' onClick={this.handleSubmit} disabled={!this.state.patient} />
                    </Tooltip>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        patients: state.patients,
        analysis: state.analysis,
        step: state.analysisStep
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        SetActiveAnalysis: (data) => {
          dispatch(setActiveAnalysis(data))
        },
        ChangeStep: (data) => {
            dispatch(changeStep(data))
        },
        SetActivePatient: (patient) => {
            dispatch(setActivePatient(patient))
        },
        NullActivePatient: () => {
            dispatch(nullActivePatient())
        }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SetPatient)