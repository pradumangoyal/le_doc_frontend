import React from 'react'
import {Steps, Icon} from 'antd'
import {connect} from 'react-redux'

import ProfileStrip from '../profile-strip'
import SetPatient from './setPatient'
import Upload from './upload'
import Done from './done'
import './index.css'
import { setActiveAnalysis, changeStep } from './actions';

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
function componentAccordingToStep(x){
    switch(x){
        case 0:
            return <SetPatient />
        case 1:
            return <Upload />
        case 2:
            return <Upload />
        case 3:
            return <Done />
        default:
            return <SetPatient />
    }
}

class Analysis extends React.Component{
    componentDidMount(){
        this.props.ChangeStep(0)
        this.props.SetActiveAnalysis(this.props.match.path.slice(1,this.props.match.path.length))
    }
    render(){
        const {analysis, step} = this.props
        const Step = Steps.Step
        return(
            <div className='analysis-wrapper'>
                <div className='analysis-constant'>
                    <ProfileStrip />
                    <h2 className='analysis-heading'>{heading(analysis)}</h2>
                    <div className='analysis-step'>
                        <Steps>
                            <Step status={step === 0 ? 'process' : 'finish'} title='Set Patient' icon={<Icon type='user-add'/>} />
                            <Step status={step === 1 ? 'process' : step < 1 ? 'wait' : 'finish'} title='Upload Reports' icon={<Icon type='upload'/>} />
                            <Step status={step === 2 ? 'process' : step < 2 ? 'wait' : 'finish'} title='Analyse' icon={<Icon type='file-search'/>} />
                        </Steps>
                    </div>
                </div>
                <div className='analysis-main'>
                    {componentAccordingToStep(step)}
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        analysis: state.analysis,
        step: state.analysisStep,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        SetActiveAnalysis: (data) => {
          dispatch(setActiveAnalysis(data))
        },
        ChangeStep: (data) => {
            dispatch(changeStep(data))
        }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Analysis)