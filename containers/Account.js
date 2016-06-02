'use strict'

import {
  
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ModifyAccountActions from '../actions/ModifyAccountActions'
import * as OperateMonolithActions from '../actions/OperateMonolithActions'
import AccountLayout from '../components/AccountLayout'

class Account extends Component{
  render(){
    return (
      <AccountLayout
        navigator={this.props.navigator}
        account={this.props.account}
        register={this.props.register}
        >
      </AccountLayout>
    )
  }
}

Account.propTypes = {
  navigator: PropTypes.any.isRequired,
  account: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    account: state.account
  }
}

function mapDispatchToProps(dispatch) {
  return {
    register: bindActionCreators(ModifyAccountActions.register,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account)
