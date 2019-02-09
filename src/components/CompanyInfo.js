import React from 'react'
import {connect } from 'react-redux'

class CompanyInfo extends React.Component {
  render(){

    return (
      <div>
        {this.props.companyInfo ? this.props.companyInfo.description : null}
      </div>
    )
  }
}

const mapStateToProps =(state) => {
  return {
    companyInfo: state.companyInfo
  }
}

export default connect(mapStateToProps)(CompanyInfo)
