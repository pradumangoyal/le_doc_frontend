import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Form, Input,message, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,} from 'antd'

import {getCookie} from '../../utils'
import {addPatient} from '../../actions'
import {urlUsernameAvailaible, urlPatients} from '../../urls'
import './form.css'
class AddPatientForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            valStatus: '',
            errors: {}
        }
    }
    handleUsernameChange = (e) => {
        // this.setState({valStatus: 'validating'})
        axios.get(urlUsernameAvailaible(e.target.value))
        .then(res => {
            res.data.available ? this.setState({valStatus: 'success'}) : this.setState({valStatus: 'error'})
        })
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleGenderChange = (e) => {
        this.setState({
            gender: e
        })
    }
    handleChange = (e) => {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }
    handleSubmit = () => {
        this.setState({
            loading: true
        })
        let data = {
        username: this.state.username,
        name: this.state.name,
        age: this.state.age,
        gender: this.state.gender,
        contact: this.state.gender,
        blood_group: this.state.blood_group
        }
        let headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        }
        axios.post(urlPatients(),  data, { headers: headers })
        .then(res => {
            this.setState({
                loading: false,
                username: '',
                name: '',
                contact: '',
                age: '',
                gender: '',
                blood_group: '',
                errors: {},
                valStatus: ''
            })
            this.props.AddPatient(res.data)
            message.success(`New Patient ${res.data.name} added successfully` ,2)
        })
        .catch(err => {
            this.setState({
                loading: false,
                errors: err.response.data,
                valStatus: 'error'
            })
            message.error('Error while adding new patient' ,2)
        })
    }
    render(){
        return(
            <div className='add-patient-form-wrapper'>
                <div className='add-patient-form-container'>  
                    <Form>
                        <Form.Item label='Username' hasFeedback validateStatus={this.state.valStatus}>
                            <Input name='username' value={this.state.username} onChange={this.handleUsernameChange} placeholder='A unique username' />
                        </Form.Item>
                        <Form.Item label='Name' hasFeedback validateStatus={("name" in this.state.errors) ? 'error' : ''}>
                            <Input name='name' value={this.state.name} onChange={this.handleChange} placeholder='Name' />
                        </Form.Item>
                        <Form.Item hasFeedback validateStatus={("contact" in this.state.errors) ? 'error' : ''} label='Contact'>
                            <Input name='contact' value={this.state.contact} onChange={this.handleChange} placeholder='Contact Info' />
                        </Form.Item>
                        <div className='add-patient-form-group'>
                        <Form.Item hasFeedback validateStatus={("age" in this.state.errors) ? 'error' : ''} label='Age'>
                            <Input name='age' value={this.state.age} onChange={this.handleChange} placeholder='Age' />
                        </Form.Item>
                        <Form.Item hasFeedback validateStatus={("gender" in this.state.errors) ? 'error' : ''} label='Gender'>
                            <Select onChange={this.handleGenderChange} value={this.state.gender} style={{width: '7em'}}>
                                <Select.Option value="M">Male</Select.Option>
                                <Select.Option value="F">Female</Select.Option>
                                <Select.Option value="O">Other</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item hasFeedback validateStatus={("blood_group" in this.state.errors) ? 'error' : ''} label='Blood Group'>
                            <Input name='blood_group' value={this.state.blood_group} onChange={this.handleChange} placeholder='Blood Group' />
                        </Form.Item>
                        </div>
                        <Form.Item style={{textAlign: 'right', marginTop: '1em'}}>
                            <Button type="primary" shape="circle" size='large' onClick={this.handleSubmit}>
                                <Icon type={this.state.loading ? 'loading' : 'user-add'} spin={this.state.loading ? true : false} />
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        AddPatient: (data) => {
          dispatch(addPatient(data))
        }
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(AddPatientForm)