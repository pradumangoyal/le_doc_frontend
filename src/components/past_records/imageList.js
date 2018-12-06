import React from 'react'
import {connect} from 'react-redux'

import DisplayImage from './list'
import PatientProfile from './patientProfile'
class ImageList extends React.Component{
    
    render(){     
        const {imageList} = this.props
        return(
            <div className='image-list-wrapper'>
                <PatientProfile />
                {
                    imageList.list.length === 0
                    ?   <div className='no-records'>No records Found.</div>
                    :   <DisplayImage />
                }
            </div>
        )
    }}

function mapStateToProps (state) {
    return {
        imageList: state.imageList
    }
  }
  export default connect(mapStateToProps)(ImageList)