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

    columns = () => {
        const {analysis} = this.props
        if(analysis === 'skin_cancer')
        {
            return [{
                title: 'Component',
                dataIndex: 'component',
                key: 'component',
            }, {
                title: 'Percentage',
                dataIndex: 'probability',
                key: 'probability',
            }]
        }
        else{
            return [{
                title: '',
                dataIndex: 'component',
                key: 'component',
            }, {
                title: 'Percentage',
                dataIndex: 'probability',
                key: 'probability',
            }]
        }
    }

    dataSource = () => {
        const {image, analysis} = this.props
        if(analysis === 'skin_cancer')
        {
            return [{
                key: '1',
                component: 'Melanoma',
                probability: Number(image.data.melanoma),
              },{
                key: '2',
                component: 'Vascular',
                probability: Number(image.data.vascular),
              },{
                key: '3',
                component: 'Nevus',
                probability: Number(image.data.nevus),
              },{
                key: '4',
                component: 'Dermatofibroma',
                probability: Number(image.data.dermatofibroma),
              },{
                key: '5',
                component: 'Bowen',
                probability: Number(image.data.bowen),
              },{
                key: '6',
                component: 'Keratoses',
                probability: Number(image.data.keratoses),
              },{
                key: '7',
                component: 'Carcinoma',
                probability: Number(image.data.carcinoma),
              },].sort(function(a,b){
                  return b.probability - a.probability
              });
        }
        else if(analysis === 'brain_tumour'){
            return [{
                key: '1',
                component: 'Tumour Area(%)',
                probability: Number(image.data.stage.split(',')[0]),
            },{
                key: '2',
                component: 'Growth Area(%)',
                probability: Number(image.data.stage.split(',')[1]),
            },{
                key: '3',
                component: 'Type',
                probability: Number(image.data.stage.split(',')[2]),
            },]
        }
        else{
            return [{
                key: '1',
                component: 'Expected Transient Area(%)',
                probability: Number(image.data.stage.split(',')[0]),
            },{
                key: '2',
                component: 'Stroke Area',
                probability: Number(image.data.stage.split(',')[1]),
            },]
        }
    }
    render(){
        const {image} = this.props
          
        return(
            <div className='done-wrapper'>
                <PatientProfile />
                <div className='done-container'>
                    <img src={image.data.clustered} alt='Result' onClick={this.showModal} />
                    <h3>{moment(image.data.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</h3>
                    {
                        <div className='chart-container'>
                            <Table columns={this.columns()} dataSource={this.dataSource()} />
                        </div> 
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
                    <a href={`http://localhost:8000${image.data.clustered}`} target='blank'><img src={image.data.clustered} alt='Result' className='modal-image' /></a>
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