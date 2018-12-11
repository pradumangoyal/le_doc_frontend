import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Slider, Modal, Table, Button, message} from 'antd'

class DisplayImages extends React.Component{
    state = {
        value: 0,
        date: Math.floor(moment(this.props.imageList.list[0].timestamp).format('x')),
        activeImage: this.props.imageList.list[0],
        visible: false,
        previewImage: '',
        index: 0
    }
    showModalUploaded = () => {
        this.setState({
            visible: true,
            previewImage: this.state.activeImage.uploaded
        })
    }
    handleNext = () => {
        if(this.state.index < this.props.imageList.list.length-1){
            const {imageList} = this.props
            let date = Math.floor(moment(this.props.imageList.list[this.state.index+1].timestamp).format('x'))
            const step = moment(imageList.list[imageList.list.length-1].timestamp).format('x') - moment(imageList.list[0].timestamp).format('x')
            const kink = moment(imageList.list[0].timestamp).format('x')
            let value = Math.floor(date)-Math.floor(kink)
            value = value/step
            value = Math.floor(value*100)
            this.setState(prevState => ({
                index: prevState.index+1,
                activeImage: this.props.imageList.list[prevState.index+1],
                date: date,
                value: value
            }))}
        else{
            message.error('Max limit reached',2)
        }
    }
    handlePrevious = () => {
        if(this.state.index > 0){
            const {imageList} = this.props
            let date = Math.floor(moment(this.props.imageList.list[this.state.index-1].timestamp).format('x'))
            const step = moment(imageList.list[imageList.list.length-1].timestamp).format('x') - moment(imageList.list[0].timestamp).format('x')
            const kink = moment(imageList.list[0].timestamp).format('x')
            let value = Math.floor(date)-Math.floor(kink)
            value = value/step
            value = Math.floor(value*100)
            this.setState(prevState => ({
                index: prevState.index-1,
                activeImage: this.props.imageList.list[prevState.index-1],
                date: date,
                value: value
            }))}
        else{
            message.error('Min limit reached',2)
        }
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
            activeImage: this.getIdJustBefore(date).list,
            index: this.getIdJustBefore(date).index
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
                return {index: i-1 ,list: imageList.list[i-1]}
            }}
            return({index: imageList.list.length-1,list: imageList.list[imageList.list.length-1]})
        }
    
    columns = () => {
        const {pastRecords} = this.props
        if(pastRecords === 'skin_cancer')
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
        const {activeImage} = this.state
        const {pastRecords} = this.props
        if(pastRecords === 'skin_cancer')
        {
            return [{
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
                },].sort(function(a,b){
                    return b.probability - a.probability
                });
        }
        else if(pastRecords === 'brain_tumour'){
            return [{
                key: '1',
                component: 'Tumour Area(%)',
                probability: Number(activeImage.stage.split(',')[0]),
            },{
                key: '2',
                component: 'Growth Area(%)',
                probability: Number(activeImage.stage.split(',')[1]),
            },{
                key: '3',
                component: 'Type',
                probability: (activeImage.stage.split(',')[2]),
            },]
        }
        else{
            return [{
                key: '1',
                component: 'Expected Transient Area(%)',
                probability: Number(activeImage.stage.split(',')[0]),
            },{
                key: '2',
                component: 'Stroke Area',
                probability: Number(activeImage.stage.split(',')[1]),
            },]
        }
    }    
    render(){     
        const {imageList} = this.props
        const {activeImage, previewImage, index} = this.state
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
        return(
            <div className='display-image-wrapper'>
            <div className='slider-container'>
                <div className='slider-next-back'>
                    <Button type='primary' disabled={index===0} icon='left' onClick={this.handlePrevious} shape='circle' />
                    <div className='sider-around'>
                        <Slider marks={imageList.list.length === 1 ? {} : result} defaultValue={0} onChange={this.handleChange} value={this.state.value} />
                    </div>
                    <Button type='primary' disabled={index===imageList.list.length-1} icon='right' onClick={this.handleNext} shape='circle' />
                </div>
            <div className='current-date'>{moment(this.dateToString(this.state.date)).format('MMM Do YYYY, h:mm:ss a')}</div>
            </div>
            <div className='display-images'>
                <div className='display-image-upload-container'><img src={activeImage.uploaded} className='display-image-upload' alt='uploaded' onClick={this.showModalUploaded} /></div>
                <div className='display-image-clustered-container'><img src={activeImage.clustered} className='display-image-clustered' alt='clustered' onClick={this.showModalClustered} /></div>
            </div>
            <div className='display-details'>
                <h3>{moment(activeImage.timestamp).format('MMM Do YYYY, h:mm:ss a')}</h3>
                    <div><Table columns={this.columns()} dataSource={this.dataSource()} /></div>
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