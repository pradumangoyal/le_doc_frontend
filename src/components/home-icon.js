import React from 'react'
import {Affix, Button} from 'antd'

export default class HomeIcon extends React.Component{
    render(){
        return(
                <Affix style={{ position: 'absolute', bottom: '2em', right: '10px'}}>
                    <a href='/'><Button type="primary" shape="circle" icon="home" size='large' /></a>
                </Affix>
        )
    }
}