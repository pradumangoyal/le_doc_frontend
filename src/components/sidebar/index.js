import React from 'react'
import {Link} from 'react-router-dom'
import {Menu,Icon} from 'antd'

import './index.css'
export default class AppMain extends React.Component{
    render(){
        return(
            <Menu
            style={{height: '100%',width: '13em'}}
            defaultOpenKeys={['sub1', 'sub2']}
            mode='inline'>
                <Menu.Item key="7"><Link to='/add_patient'><Icon type="user-add" />Add Patient</Link></Menu.Item>
                <Menu.SubMenu key='sub1' title={<span><Icon type="line-chart" />Analysis</span>}>
                    <Menu.Item key="1"><Link to='/brain_tumour'>Brain Tumour</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/brain_stroke'>Brain Stroke</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/skin_cancer'>Skin Cancer</Link></Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key='sub2' title={<span><Icon type="folder-open" />Past Records</span>}>
                    <Menu.Item key="4"><Link to='/past_records/brain_tumour'>Brain Tumour</Link></Menu.Item>
                    <Menu.Item key="5"><Link to='/past_records/brain_stroke'>Brain Stroke</Link></Menu.Item>
                    <Menu.Item key="6"><Link to='/past_records/skin_cancer'>Skin Cancer</Link></Menu.Item>
                </Menu.SubMenu>
                
            </Menu>
        )
    }
}