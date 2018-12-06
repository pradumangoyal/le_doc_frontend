import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Slider, Modal, Table} from 'antd'

class DisplayImages extends React.Component{
    state = {
        value: 0,
        date: Math.floor(moment(this.props.imageList.list[0].timestamp).format('x')),
        activeImage: this.props.imageList.list[0],
        visible: false,
        previewImage: ''
    }
    showModalUploaded = () => {
        this.setState({
            visible: true,
            previewImage: this.state.activeImage.uploaded
        })
    }


    showModalClustered = () => {
        this.setState({
            visible: true,
            previewImage: this.state.activeImage.clustered
        })
    }
    
    handleCancel = (e) => {
        this.setState({
            visible: false,
            previewImage: ''
        })
    }
    
    handleChange = (value) => {
        const {imageList} = this.props
        const step = moment(imageList.list[imageList.list.length-1].timestamp).format('x') - moment(imageList.list[0].timestamp).format('x')
        const kink = moment(imageList.list[0].timestamp).format('x')
        let date = (value*step)
        date = date/100
        date = Math.floor(date)+Math.floor(kink)
        this.setState({
            value: value,
            date: date,
            activeImage: this.getIdJustBefore(date)
        })
    }
    dateToString = (x) => {
        let d = new Date(x)
        return d.toString()
    }
    getIdJustBefore = (x) => {
        const {imageList} = this.props
        for (let i=0; i<imageList.list.length; i++){
            if(Math.floor(moment(imageList.list[i].timestamp).format('x'))>x){
                return imageList.list[i-1]
            }}
            return(imageList.list[imageList.list.length-1])
        }
    render(){     
        const {imageList, pastRecords} = this.props
        const {activeImage, previewImage} = this.state
        const marks = imageList.list.map((x, index) => {
            return ({
                // 'label': moment(x.timestamp).format('MMM Do YYYY, h:mm:ss a'),
                'label': `${index}`,
                'value': ((moment(x.timestamp).format('x') - moment(imageList.list[0].timestamp).format('x'))/(moment(imageList.list[imageList.list.length-1].timestamp).format('x') - moment(imageList.list[0].timestamp).format('x')))*100
                // 'value': index*(100/imageList.list.length)
            })
        })
        let result = {}
        for (let i=0; i<marks.length; i++){
            result[marks[i].value] = marks[i].label
        }

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
            probability: Number(activeImage.melanoma),
          },{
            key: '2',
            component: 'Vascular',
            probability: Number(activeImage.vascular),
          },{
            key: '3',
            component: 'Nevus',
            probability: Number(activeImage.nevus),
          },{
            key: '4',
            component: 'Dermatofibroma',
            probability: Number(activeImage.dermatofibroma),
          },{
            key: '5',
            component: 'Bowen',
            probability: Number(activeImage.bowen),
          },{
            key: '6',
            component: 'Keratoses',
            probability: Number(activeImage.keratoses),
          },{
            key: '7',
            component: 'Carcinoma',
            probability: Number(activeImage.carcinoma),
          },];
        return(
            <div className='display-image-wrapper'>
            <div className='slider-container'>
            <Slider marks={imageList.list.length === 1 ? {} : result} defaultValue={0} onChange={this.handleChange} value={this.state.value} />
            <div className='current-date'>{moment(this.dateToString(this.state.date)).format('MMM Do YYYY, h:mm:ss a')}</div>
            </div>
            <div className='display-images'>
                <div className='display-image-upload-container'><img src={activeImage.uploaded} className='display-image-upload' alt='uploaded' onClick={this.showModalUploaded} /></div>
                <div className='display-image-clustered-container'><img src={activeImage.clustered} className='display-image-clustered' alt='clustered' onClick={this.showModalClustered} /></div>
            </div>
            <div className='display-details'>
                <h3>{moment(activeImage.timestamp).format('MMM Do YYYY, h:mm:ss a')}</h3>
                    {pastRecords === 'skin_cancer'
                    ? <div><Table columns={columns} dataSource={dataSource} /></div>
                    : <div className='expected-stage'><h3>Expected Stage: </h3>{activeImage.stage}</div>
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
                    <a href={`http://localhost:8000${previewImage}`} target='blank'><img src={previewImage} className='modal-image' alt='Result' /></a>
                </Modal>
            </div>
        )
    }}

function mapStateToProps (state) {
    return {
        imageList: state.imageList,
        pastRecords: state.pastRecord
    }
  }
  export default connect(mapStateToProps)(DisplayImages)