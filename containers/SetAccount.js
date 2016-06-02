'use strict'

import {
  
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ModifyAccountActions from '../actions/ModifyAccountActions'
import SetAccountLayout from '../components/SetAccountLayout'

class SetAccount extends Component{
  render(){
    return (
      <SetAccountLayout
        navigator={this.props.navigator}
        account={this.props.account}
        modifyAvatar={this.props.modifyAvatar}
        modifyName={this.props.modifyName}
        modifyGender={this.props.modifyGender}
        modifyDistrict={this.props.modifyDistrict}
        modifySignature={this.props.modifySignature}
        updateAvatar={this.props.updateAvatar}
        >
      </SetAccountLayout>
    )
  }
}

SetAccount.propTypes = {
  navigator: PropTypes.any.isRequired,
  account: PropTypes.object.isRequired,
  modifyAvatar: PropTypes.func.isRequired,
  modifyName: PropTypes.func.isRequired,
  modifyGender: PropTypes.func.isRequired,
  modifyDistrict: PropTypes.func.isRequired,
  modifySignature: PropTypes.func.isRequired,
}
// PropTypes

function mapStateToProps(state) {
  return {
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modifyAvatar: bindActionCreators(ModifyAccountActions.modifyAvatar, dispatch),
    modifyName: bindActionCreators(ModifyAccountActions.modifyName, dispatch),
    modifyGender: bindActionCreators(ModifyAccountActions.modifyGender, dispatch),
    modifyDistrict:bindActionCreators(ModifyAccountActions.modifyDistrict, dispatch),
    modifySignature:bindActionCreators(ModifyAccountActions.modifySignature, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetAccount)
