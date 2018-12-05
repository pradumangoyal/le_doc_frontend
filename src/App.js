import React, { Component } from 'react';
import {Spin, Icon} from 'antd'
import axios from 'axios'
import {connect} from 'react-redux'

import {setUser} from './components/app-header/actions'
import {setPatients} from './actions'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppMain from './components/app-main'
import './App.css'
class App extends Component {
  componentDidMount(){
    this.props.SetUser()
    this.props.setPatients()
    axios.get('/ensure_csrf')
}
  render() {
    return (
      <div className="app-wrapper">
      {this.props.whoAmI.loaded
      ? <React.Fragment>
          <AppHeader/>
          {this.props.whoAmI.user ?
          <AppMain />
          : false}
          <AppFooter />
        </React.Fragment>
      : <Spin indicator={<Icon type='loading' />} />}
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
      whoAmI: state.whoAmI
  }
}
const mapDispatchToProps = dispatch => {
  return {
      SetUser: () => {
          dispatch(setUser())
      },
      setPatients: () => {
        dispatch(setPatients())
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
