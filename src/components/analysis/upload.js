import React from 'react'
import { Button, Icon, Tooltip } from 'antd';
import {connect} from 'react-redux'

import PatientProfile from './patientProfile'
import { setActiveAnalysis, changeStep, addImage, analyseImage } from './actions';

class UploadFile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            previewImage: '',
            file: false
        }
    }
    handleChange = (e) => {
        console.log(e.target.files[0], this.props.patient.patient.id)
        this.setState({
            file: e.target.files[0],
            previewVisible: false,
            previewImage: URL.createObjectURL(e.target.files[0])
        })
    }
    handleUpload = () => {
        var formData = new FormData()
        formData.append('patient', this.props.patient.patient.id)
        formData.append('uploaded', this.state.file)
        this.props.AddImage(this.props.analysis, formData)
    }
    handleAnalyse = () => {
        this.props.AnalyseImage(this.props.analysis, this.props.image.id)
    }
    render(){
        const { previewImage, file } = this.state;
        const {step} = this.props
        return(
            <div className='upload-wrapper'>
                <PatientProfile />
                    <div className='upload-container'>             
                    {!file ?
                    <React.Fragment>  
                        <label htmlFor='uploadPhoto'>
                        <div className='upload-button'>
                            <Icon type="plus" />
                            <div className="ant-upload-text">Upload</div>
                        </div>
                        </label>
                        <input
                            type='file'
                            onChange={this.handleChange}
                            name={'uploadedFile'}
                            id='uploadPhoto'
                            style={{display: 'none'}}
                        />
                        </React.Fragment>
                        : <img alt="example" style={{ height: '25em' }} src={previewImage}/>
                    }
                    {this.state.file 
                    ? step == 1 
                        ?                     
                        <Tooltip placement='bottom' title='Upload Report'>
                            <Button type="primary" shape="circle" icon="upload" size='large' onClick={this.handleUpload} style={{marginTop: '1em'}}/>
                        </Tooltip>
                        :  
                        <Tooltip placement='bottom' title='Analyse Report'>
                            <Button type="primary" shape="circle" icon="search" size='large' onClick={this.handleAnalyse} style={{marginTop: '1em'}} />
                        </Tooltip>
                    : null
                    }
                    </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        analysis: state.analysis,
        step: state.analysisStep,
        patient: state.activePatient,
        image: state.image
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
        AddImage: (active, data) => {
            dispatch(addImage(active, data))
        },
        AnalyseImage: (active, id) => {
            dispatch(analyseImage(active, id))
        }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)