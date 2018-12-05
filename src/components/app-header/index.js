import React from 'react'
import {connect} from 'react-redux'
import {Avatar, Icon, Button, Spin} from 'antd'

import './index.css'
class AppHeader extends React.Component{
    render(){
        const {whoAmI} = this.props
        return(
            <div className='app-header-wrapper'>
                <div className='app-header-logo'>
                    <a href='/'>
                        <Icon type="plus" />
                    </a>
                    <span><a href='/'>doc_doc</a></span>
                </div>
                <div className='avatar'>
                {whoAmI.loaded 
                    ? whoAmI.user
                        ?
                        <React.Fragment>        
                            <Avatar size='medium' style={{fontSize: '1.5em', backgroundColor: 'rgb(135, 208, 104)'}} >
                                {whoAmI.user.first_name ? whoAmI.user.first_name[0] : 'D'}
                            </Avatar>
                            <span className='avatar-username'>{`Dr. ${whoAmI.user.first_name} ${whoAmI.user.last_name}`}</span>
                        </React.Fragment>
                        : 
                        <Button type='primary' size='large' href='http://localhost:8000/api-auth/login/?next=/'>
                            Sign in
                        </Button>
                    : <Spin indicator={<Icon type='loading' />} />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        whoAmI: state.whoAmI
    }
}
export default connect(mapStateToProps)(AppHeader)