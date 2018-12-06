import React from 'react'
import {Modal, Table} from 'antd'
import moment from 'moment'
import {connect} from 'react-redux'

import PatientProfile from './patientProfile'
class Done extends React.Component{
    state = { visible: false }

    showModal = () => {
    this.setState({
        visible: true,
    })
    }

    handleOk = (e) => {
    this.setState({
        visible: false,
    })
    }

    handleCancel = (e) => {
    this.setState({
        visible: false,
    });}

    render(){
        const {image, analysis} = this.props

        const columns = [{
            title: 'Component',
            dataIndex: 'component',
            key: 'component',
        }, {
            title: 'Probability',
            dataIndex: 'probability',
            key: 'probability',
        }]

        const dataSource = [{
            key: '1',
            component: 'Melanoma',
            probability: Number(image.melanoma),
          },{
            key: '2',
            component: 'Vascular',
            probability: Number(image.vascular),
          },{
            key: '3',
            component: 'Nevus',
            probability: Number(image.nevus),
          },{
            key: '4',
            component: 'Dermatofibroma',
            probability: Number(image.dermatofibroma),
          },{
            key: '5',
            component: 'Bowen',
            probability: Number(image.bowen),
          },{
            key: '6',
            component: 'Keratoses',
            probability: Number(image.keratoses),
          },{
            key: '7',
            component: 'Carcinoma',
            probability: Number(image.carcinoma),
          },];
          
        return(
            <div className='done-wrapper'>
                <PatientProfile />
                <div className='done-container'>
                    <img src={image.clustered} alt='Result' onClick={this.showModal} />
                    <h3>{moment(image.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                    {
                        analysis === 'skin_cancer' 
                        ? 
                        <div className='chart-container'>
                            <Table columns={columns} dataSource={dataSource} />
                        </div> 
                        : <div><h3>Expected Stage: </h3>{image.stage}</div>
                    }
                </div>
                <Modal
                footer={null}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                centered
                style = {{
                    padding: '0',
                    display: 'inline-table'
                }}
                >
                    <a href={`http://localhost:8000${image.clustered}`} target='blank'><img src={image.clustered} alt='Result' className='modal-image' /></a>
                </Modal>
            </div>
        )
    }}

function mapStateToProps (state) {
    return {
        analysis: state.analysis,
        step: state.analysisStep,
        image: state.image
    }
  }
  export default connect(mapStateToProps)(Done)